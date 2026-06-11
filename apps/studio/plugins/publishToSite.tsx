import {RocketIcon} from '@sanity/icons'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {definePlugin, useClient} from 'sanity'

type PendingDocument = {
  _id: string
  _type: string
  _createdAt?: string
  _rev?: string
  _updatedAt?: string
  [key: string]: unknown
  title?: string
  name?: string
  question?: string
  slug?: string
  path?: string
  status?: string
}

type PendingContentItem = PendingDocument & {
  changedFields?: string[]
  latestChangeAt?: string
  liveId?: string
  state: 'draftChanges' | 'newDraft' | 'statusDraft'
}

const fieldLabels: Record<string, string> = {
  body: 'Body content',
  description: 'Description',
  faqs: 'FAQs',
  hero: 'Hero',
  heroImage: 'Hero image',
  image: 'Image',
  intro: 'Intro',
  name: 'Name',
  path: 'Path',
  question: 'Question',
  sections: 'Page sections',
  slug: 'Slug',
  status: 'Status',
  supplementalSections: 'Supplemental sections',
  title: 'Title',
}

const ignoredDiffFields = new Set(['_createdAt', '_id', '_rev', '_type', '_updatedAt', 'liveId'])

function titleForDocument(doc: PendingContentItem) {
  return doc.title || doc.name || doc.question || doc.slug || doc.path || doc.liveId || doc._id
}

function labelForType(type: string) {
  const labels: Record<string, string> = {
    announcement: 'Announcement',
    condition: 'Condition',
    drug: 'Treatment',
    faq: 'FAQ',
    homepage: 'Homepage',
    location: 'Location',
    navigation: 'Navigation',
    program: 'Program',
    provider: 'Team member',
    service: 'Service',
    siteSettings: 'Organization profile',
    websitePage: 'Page',
  }

  return labels[type] ?? type
}

function stateLabel(item: PendingContentItem) {
  if (item.state === 'newDraft') return 'New draft'
  if (item.state === 'statusDraft') return item.status === 'archived' ? 'Archived' : 'Marked draft'
  return 'Unpublished changes'
}

function formatDateTime(value?: string) {
  if (!value) return null
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function normalizeForDiff(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeForDiff)
  if (!value || typeof value !== 'object') return value

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !key.startsWith('_') || key === '_ref')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, nestedValue]): [string, unknown] => [key, normalizeForDiff(nestedValue)]),
  )
}

function getChangedFields(draft: PendingDocument, published?: PendingDocument) {
  if (!published) return []

  const keys = new Set([...Object.keys(draft), ...Object.keys(published)])
  return [...keys]
    .filter((key) => !ignoredDiffFields.has(key))
    .filter((key) => {
      return JSON.stringify(normalizeForDiff(draft[key])) !== JSON.stringify(normalizeForDiff(published[key]))
    })
    .map((key) => fieldLabels[key] ?? key)
    .sort((a, b) => a.localeCompare(b))
}

function changeSummary(item: PendingContentItem) {
  if (item.state === 'newDraft') return 'New document has not been published yet.'
  if (item.state === 'statusDraft') return `Status is ${item.status ?? 'not published'}.`
  if (!item.changedFields?.length) return 'Draft metadata changed.'

  const visibleFields = item.changedFields.slice(0, 4).join(', ')
  const remainingCount = item.changedFields.length - 4
  return remainingCount > 0 ? `${visibleFields}, +${remainingCount} more` : visibleFields
}

function normalizeSiteUrl(value: string) {
  const trimmedValue = value.trim().replace(/\/$/, '')
  if (/^https?:\/\/riseupwv\.org$/i.test(trimmedValue)) return 'https://riseupwv.com'
  return /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`
}

function PublishToSiteTool() {
  const [cacheStatus, setCacheStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [cacheMessage, setCacheMessage] = useState('')
  const [pendingStatus, setPendingStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [pendingMessage, setPendingMessage] = useState('')
  const [pendingItems, setPendingItems] = useState<PendingContentItem[]>([])
  const [publishingItems, setPublishingItems] = useState<Set<string>>(new Set())
  const [publishAllStatus, setPublishAllStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [publishAllMessage, setPublishAllMessage] = useState('')
  const client = useClient({apiVersion: '2025-01-01'})

  const siteUrl = normalizeSiteUrl(process.env.SANITY_STUDIO_SITE_URL ?? 'https://riseupwv.com')
  const secret = process.env.SANITY_STUDIO_REVALIDATE_SECRET ?? ''

  const loadPendingContent = useCallback(async () => {
    setPendingStatus('loading')
    setPendingMessage('')

    try {
      const result = await client.fetch<{
        drafts: PendingDocument[]
        statusDrafts: PendingDocument[]
      }>(`{
        "drafts": *[_id in path("drafts.**") && !(_type in ["system.group"]) ] | order(_updatedAt desc){
          ...,
          "slug": slug.current
        },
        "statusDrafts": *[
          !(_id in path("drafts.**")) &&
          defined(status) &&
          status != "published"
        ] | order(_updatedAt desc){
          ...,
          "slug": slug.current
        }
      }`)

      const draftLiveIds = result.drafts.map((doc) => doc._id.replace(/^drafts\./, ''))
      const publishedMatches = draftLiveIds.length
        ? await client.fetch<PendingDocument[]>('*[_id in $ids]{..., "slug": slug.current}', {
            ids: draftLiveIds,
          })
        : []
      const publishedDocsById = new Map(publishedMatches.map((doc) => [doc._id, doc]))

      const drafts = result.drafts.map((doc): PendingContentItem => {
        const liveId = doc._id.replace(/^drafts\./, '')
        const publishedDoc = publishedDocsById.get(liveId)
        return {
          ...doc,
          changedFields: getChangedFields(doc, publishedDoc),
          liveId,
          state: publishedDoc ? 'draftChanges' : 'newDraft',
        }
      })

      const draftIds = new Set(draftLiveIds)
      const statusDrafts = result.statusDrafts
        .filter((doc) => !draftIds.has(doc._id))
        .map((doc): PendingContentItem => ({...doc, liveId: doc._id, state: 'statusDraft'}))

      const pendingDocuments = [...drafts, ...statusDrafts]

      setPendingItems(
        pendingDocuments.map((doc) => ({
          ...doc,
          latestChangeAt: doc._updatedAt,
        })),
      )
      setPendingStatus('success')
    } catch {
      setPendingStatus('error')
      setPendingMessage('Could not load draft content from Sanity.')
    }
  }, [client])

  useEffect(() => {
    void loadPendingContent()
  }, [loadPendingContent])

  async function publishItem(item: PendingContentItem) {
    if (item.state === 'statusDraft') {
      await client.patch(item.liveId!).set({status: 'published'}).commit()
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {changedFields, latestChangeAt, liveId, state, _id: draftId, ...rest} = item
      const liveDoc = {...rest, _id: liveId!}
      await client.transaction().createOrReplace(liveDoc).delete(draftId).commit()
    }
  }

  async function handlePublishItem(item: PendingContentItem) {
    setPublishingItems((prev) => new Set([...prev, item._id]))
    try {
      await publishItem(item)
    } finally {
      setPublishingItems((prev) => {
        const next = new Set(prev)
        next.delete(item._id)
        return next
      })
      void loadPendingContent()
    }
  }

  async function handlePublishAll() {
    if (pendingItems.length === 0) return
    setPublishAllStatus('loading')
    setPublishAllMessage('')
    setPublishingItems(new Set(pendingItems.map((i) => i._id)))

    try {
      await Promise.all(pendingItems.map((item) => publishItem(item)))
      setPublishAllStatus('success')
      setPublishAllMessage(
        `Published ${pendingItems.length} item${pendingItems.length !== 1 ? 's' : ''} successfully.`,
      )
    } catch (error) {
      setPublishAllStatus('error')
      setPublishAllMessage(
        error instanceof Error && error.message ? error.message : 'Failed to publish all items.',
      )
    } finally {
      setPublishingItems(new Set())
      void loadPendingContent()
    }
  }

  async function handleClearCache() {
    setCacheStatus('loading')
    setCacheMessage('')
    try {
      const res = await fetch(`${siteUrl}/api/revalidate`, {
        method: 'POST',
        headers: {'x-revalidate-secret': secret},
      })
      const data = await res.json()
      if (res.ok) {
        setCacheStatus('success')
        setCacheMessage(`Cache cleared at ${new Date(data.revalidatedAt).toLocaleTimeString()}`)
        void loadPendingContent()
      } else {
        setCacheStatus('error')
        setCacheMessage(data.message ?? 'Revalidation failed.')
      }
    } catch (error) {
      setCacheStatus('error')
      const details = error instanceof Error && error.message ? ` ${error.message}` : ''
      setCacheMessage(`Could not reach ${siteUrl}.${details}`)
    }
  }

  const groupedPendingItems = useMemo(() => {
    return pendingItems.reduce<Record<string, PendingContentItem[]>>((groups, item) => {
      const label = labelForType(item._type)
      groups[label] = [...(groups[label] ?? []), item]
      return groups
    }, {})
  }, [pendingItems])

  const anyPublishing = publishingItems.size > 0

  return (
    <div style={{padding: '2rem', maxWidth: 760, color: 'var(--card-fg-color)'}}>
      <div style={{marginBottom: '1rem'}}>
        <h2 style={{margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 700}}>
          Publish &amp; deploy
        </h2>
        <p
          style={{
            margin: 0,
            color: 'var(--card-muted-fg-color, var(--card-fg-color))',
            fontSize: '0.875rem',
            lineHeight: 1.5,
          }}
        >
          Use <strong>Publish</strong> buttons to push draft documents live in Sanity. Use{' '}
          <strong>Clear cache</strong> after publishing to make changes appear on the website
          immediately.
        </p>
      </div>

      <div
        style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          border: '1px solid var(--card-border-color)',
          borderRadius: '0.5rem',
          background: 'var(--card-bg-color)',
          color: 'var(--card-fg-color)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: pendingItems.length || pendingStatus !== 'success' ? '0.75rem' : 0,
          }}
        >
          <h3 style={{margin: 0, fontSize: '0.95rem', fontWeight: 700}}>
            Draft or not-live content
          </h3>
          <button
            disabled={pendingStatus === 'loading'}
            onClick={() => void loadPendingContent()}
            style={{
              border: '1px solid var(--card-border-color)',
              background: 'var(--card-bg-color)',
              borderRadius: '0.375rem',
              padding: '0.375rem 0.625rem',
              color: 'var(--card-fg-color)',
              cursor: pendingStatus === 'loading' ? 'not-allowed' : 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600,
              opacity: pendingStatus === 'loading' ? 0.65 : 1,
            }}
          >
            {pendingStatus === 'loading' ? 'Checking...' : 'Refresh list'}
          </button>
        </div>

        {pendingStatus === 'loading' ? (
          <p
            style={{
              margin: 0,
              color: 'var(--card-muted-fg-color, var(--card-fg-color))',
              fontSize: '0.875rem',
            }}
          >
            Checking Sanity for draft content...
          </p>
        ) : null}

        {pendingStatus === 'error' ? (
          <p style={{margin: 0, color: 'var(--card-critical-fg-color)', fontSize: '0.875rem'}}>
            {pendingMessage}
          </p>
        ) : null}

        {pendingStatus === 'success' && pendingItems.length === 0 ? (
          <p style={{margin: 0, color: 'var(--card-positive-fg-color)', fontSize: '0.875rem'}}>
            No draft or not-live content found. Clear cache below if you need published changes to
            appear on the website immediately.
          </p>
        ) : null}

        {pendingStatus === 'success' && pendingItems.length > 0 ? (
          <div style={{display: 'grid', gap: '0.875rem'}}>
            {Object.entries(groupedPendingItems).map(([group, items]) => (
              <div key={group}>
                <h4
                  style={{
                    margin: '0 0 0.375rem',
                    color: 'var(--card-muted-fg-color, var(--card-fg-color))',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {group}
                </h4>
                <ul style={{display: 'grid', gap: '0.375rem', margin: 0, padding: 0}}>
                  {items.map((item) => {
                    const isPublishing = publishingItems.has(item._id)
                    return (
                      <li
                        key={item._id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          listStyle: 'none',
                          padding: '0.625rem 0.75rem',
                          border: '1px solid var(--card-border-color)',
                          borderRadius: '0.375rem',
                          background:
                            'color-mix(in srgb, var(--card-bg-color), var(--card-fg-color) 3%)',
                          opacity: isPublishing ? 0.7 : 1,
                          transition: 'opacity 0.15s',
                        }}
                      >
                        <span style={{minWidth: 0}}>
                          <span
                            style={{
                              display: 'block',
                              color: 'var(--card-fg-color)',
                              fontSize: '0.875rem',
                              fontWeight: 600,
                            }}
                          >
                            {titleForDocument(item)}
                          </span>
                          {item.path || item.slug ? (
                            <span
                              style={{
                                display: 'block',
                                color: 'var(--card-muted-fg-color, var(--card-fg-color))',
                                fontSize: '0.75rem',
                              }}
                            >
                              {item.path ?? item.slug}
                            </span>
                          ) : null}
                          <span
                            style={{
                              display: 'block',
                              color: 'var(--card-muted-fg-color, var(--card-fg-color))',
                              fontSize: '0.75rem',
                              lineHeight: 1.4,
                              marginTop: '0.375rem',
                            }}
                          >
                            Changed: {changeSummary(item)}
                          </span>
                          <span
                            style={{
                              display: 'block',
                              color: 'var(--card-muted-fg-color, var(--card-fg-color))',
                              fontSize: '0.75rem',
                              lineHeight: 1.4,
                              marginTop: '0.125rem',
                            }}
                          >
                            Updated{' '}
                            {formatDateTime(item.latestChangeAt)
                              ? `on ${formatDateTime(item.latestChangeAt)}`
                              : 'recently'}
                          </span>
                        </span>

                        <span
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '0.5rem',
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              color: 'var(--card-badge-caution-fg-color, var(--card-fg-color))',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {stateLabel(item)}
                          </span>
                          <button
                            disabled={isPublishing || anyPublishing}
                            onClick={() => void handlePublishItem(item)}
                            style={{
                              border: 'none',
                              background: isPublishing ? '#9ca3af' : '#16a34a',
                              color: '#fff',
                              borderRadius: '0.25rem',
                              padding: '0.3rem 0.75rem',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: isPublishing || anyPublishing ? 'not-allowed' : 'pointer',
                              whiteSpace: 'nowrap',
                              opacity: !isPublishing && anyPublishing ? 0.5 : 1,
                            }}
                          >
                            {isPublishing ? 'Publishing…' : 'Publish'}
                          </button>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Bottom action bar */}
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center'}}>
        {/* Publish all — green */}
        <button
          disabled={
            pendingItems.length === 0 || anyPublishing || pendingStatus !== 'success'
          }
          onClick={() => void handlePublishAll()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            background:
              pendingItems.length === 0 || anyPublishing || pendingStatus !== 'success'
                ? '#9ca3af'
                : '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor:
              pendingItems.length === 0 || anyPublishing || pendingStatus !== 'success'
                ? 'not-allowed'
                : 'pointer',
          }}
        >
          {anyPublishing ? 'Publishing…' : `Publish all${pendingItems.length > 0 ? ` (${pendingItems.length})` : ''}`}
        </button>

        {/* Clear cache — blue */}
        <button
          disabled={cacheStatus === 'loading'}
          onClick={() => void handleClearCache()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            background: cacheStatus === 'loading' ? '#9ca3af' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: cacheStatus === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          {cacheStatus !== 'loading' && <RocketIcon style={{width: 16, height: 16}} />}
          {cacheStatus === 'loading' ? 'Clearing cache…' : 'Clear cache from live site'}
        </button>
      </div>

      {/* Publish all feedback */}
      {publishAllStatus === 'success' && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'var(--card-positive-bg-color)',
            color: 'var(--card-positive-fg-color)',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        >
          {publishAllMessage}
        </div>
      )}
      {publishAllStatus === 'error' && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'var(--card-critical-bg-color)',
            color: 'var(--card-critical-fg-color)',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        >
          Publish all failed: {publishAllMessage}
        </div>
      )}

      {/* Cache clear feedback */}
      {cacheStatus === 'success' && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'var(--card-positive-bg-color)',
            color: 'var(--card-positive-fg-color)',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        >
          Success: {cacheMessage}
        </div>
      )}
      {cacheStatus === 'error' && (
        <div
          style={{
            marginTop: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'var(--card-critical-bg-color)',
            color: 'var(--card-critical-fg-color)',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        >
          Error: {cacheMessage}
        </div>
      )}
    </div>
  )
}

export const publishToSitePlugin = definePlugin({
  name: 'publish-to-site',
  tools: [
    {
      name: 'publish-to-site',
      title: 'Publish',
      icon: RocketIcon,
      component: PublishToSiteTool,
    },
  ],
})
