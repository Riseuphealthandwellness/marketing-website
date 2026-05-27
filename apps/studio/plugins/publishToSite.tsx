import {RocketIcon} from '@sanity/icons'
import {useState} from 'react'
import {definePlugin} from 'sanity'

function PublishToSiteTool() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const siteUrl =
    (process.env.SANITY_STUDIO_SITE_URL ?? 'https://riseupwv.org').replace(/\/$/, '')
  const secret = process.env.SANITY_STUDIO_REVALIDATE_SECRET ?? ''

  async function handlePublish() {
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch(`${siteUrl}/api/revalidate`, {
        method: 'POST',
        headers: {'x-revalidate-secret': secret},
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(`Cache cleared at ${new Date(data.revalidatedAt).toLocaleTimeString()}`)
      } else {
        setStatus('error')
        setMessage(data.message ?? 'Revalidation failed.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error — could not reach the site.')
    }
  }

  return (
    <div style={{padding: '2rem', maxWidth: 420}}>
      <div style={{marginBottom: '1rem'}}>
        <h2 style={{margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 700}}>
          Publish to live site
        </h2>
        <p style={{margin: 0, color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.5}}>
          Clears the site cache so your latest changes appear immediately. Changes normally
          appear within 5 minutes on their own.
        </p>
      </div>

      <button
        disabled={status === 'loading'}
        onClick={handlePublish}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          background: status === 'loading' ? '#9ca3af' : '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {status !== 'loading' && <RocketIcon style={{width: 16, height: 16}} />}
        {status === 'loading' ? 'Clearing cache…' : 'Publish to live site'}
      </button>

      {status === 'success' && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            background: '#d1fae5',
            color: '#065f46',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        >
          ✓ {message}
        </div>
      )}
      {status === 'error' && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            background: '#fee2e2',
            color: '#991b1b',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        >
          ✗ {message}
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
