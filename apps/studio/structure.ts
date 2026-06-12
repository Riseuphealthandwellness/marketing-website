import {
  TagIcon,
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  DocumentsIcon,
  FilterIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  LaunchIcon,
  PinIcon,
  ListIcon,
  StackIcon,
  UsersIcon,
} from '@sanity/icons'
import type {ComponentType} from 'react'
import type {StructureResolver} from 'sanity/structure'
import {SITE_FOOTER_ID} from './schemaTypes/documents/siteFooter'
import {websiteManagedPages} from './schemaTypes/documents/websitePage'

type StructureBuilder = Parameters<StructureResolver>[0]

function landingPage(key: (typeof websiteManagedPages)[number]['key']) {
  const page = websiteManagedPages.find((item) => item.key === key)

  if (!page) {
    throw new Error(`Missing website page settings for "${key}"`)
  }

  return page
}

function singletonListItem(
  S: StructureBuilder,
  {
    title,
    icon,
    schemaType,
    documentId,
  }: {
    title: string
    icon: ComponentType
    schemaType: string
    documentId: string
  },
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title))
}

function pageSettingsListItem(S: Parameters<StructureResolver>[0], page: (typeof websiteManagedPages)[number]) {
  return S.listItem()
    .title(page.title)
    .icon(DocumentsIcon)
    .child(
      S.document()
        .schemaType('websitePage')
        .documentId(page.id)
        .initialValueTemplate(page.id)
        .title(`${page.title} page`),
    )
}

function pageBundleListItem(
  S: StructureBuilder,
  page: (typeof websiteManagedPages)[number],
  items: ReturnType<StructureBuilder['listItem']>[],
) {
  const childItems =
    items.length > 0
      ? [pageSettingsListItem(S, page).title(`${page.title} page`), S.divider(), ...items]
      : [pageSettingsListItem(S, page)]

  return S.listItem()
    .title(page.title)
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title(`${page.title} content`)
        .items(childItems),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content Management')
    .items([
      S.listItem()
        .title('Page Settings')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Page Settings')
            .items([
              singletonListItem(S, {
                title: 'Homepage',
                icon: HomeIcon,
                schemaType: 'homepageSettings',
                documentId: 'homepageSettings',
              }),
              S.divider(),
              S.listItem()
                .title('Patient access pages')
                .icon(LaunchIcon)
                .child(
                  S.list()
                    .title('Patient access pages')
                    .items([
                      pageSettingsListItem(S, landingPage('contact')),
                      pageSettingsListItem(S, landingPage('referrals')),
                      pageSettingsListItem(S, landingPage('new-patients')),
                      pageSettingsListItem(S, landingPage('insurance-payment')),
                      pageSettingsListItem(S, landingPage('patient-resources')),
                    ]),
                ),
              S.listItem()
                .title('Care pages')
                .icon(HeartIcon)
                .child(
                  S.list()
                    .title('Care pages')
                    .items([
                      pageBundleListItem(S, landingPage('care'), [
                        S.documentTypeListItem('faq').title('Care FAQs').icon(HelpCircleIcon),
                      ]),
                      pageSettingsListItem(S, landingPage('services')),
                      pageSettingsListItem(S, landingPage('programs')),
                    ]),
                ),
              S.listItem()
                .title('Organization pages')
                .icon(UsersIcon)
                .child(
                  S.list()
                    .title('Organization pages')
                    .items([
                      singletonListItem(S, {
                        title: 'About',
                        icon: DocumentsIcon,
                        schemaType: 'websitePage',
                        documentId: 'website-page-about',
                      }),
                      pageBundleListItem(S, landingPage('patients-rights-privacy'), [
                        singletonListItem(S, {
                          title: 'Notice of privacy practices',
                          icon: DocumentTextIcon,
                          schemaType: 'websitePage',
                          documentId: 'website-page-notice-privacy-practices',
                        }),
                        singletonListItem(S, {
                          title: 'Privacy policy',
                          icon: DocumentTextIcon,
                          schemaType: 'websitePage',
                          documentId: 'website-page-privacy-policy',
                        }),
                        singletonListItem(S, {
                          title: 'Medical record request & authorization',
                          icon: DocumentTextIcon,
                          schemaType: 'websitePage',
                          documentId: 'website-page-medical-record-request-authorization',
                        }),
                        singletonListItem(S, {
                          title: 'Terms of use',
                          icon: DocumentTextIcon,
                          schemaType: 'websitePage',
                          documentId: 'website-page-terms-of-use',
                        }),
                      ]),
                      pageBundleListItem(S, landingPage('team'), [
                        S.documentTypeListItem('provider').title('Team member entries').icon(UsersIcon),
                      ]),
                      pageBundleListItem(S, landingPage('locations'), [
                        S.documentTypeListItem('location').title('Location entries').icon(PinIcon),
                      ]),
                      pageSettingsListItem(S, landingPage('careers')),
                    ]),
                ),
              S.divider(),
              S.documentTypeListItem('websitePage')
                .title('Custom pages')
                .icon(DocumentTextIcon)
                .child(
                  S.documentTypeList('websitePage')
                    .title('Custom pages')
                    .filter('_type == "websitePage" && pageType == "custom"'),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Content')
        .icon(StackIcon)
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('service').title('Services').icon(HeartIcon),
              S.documentTypeListItem('program').title('Programs').icon(StackIcon),
              S.listItem()
                .title('Conditions')
                .icon(FilterIcon)
                .child(
                  S.list()
                    .title('Conditions')
                    .items([
                      S.documentTypeListItem('condition').title('All conditions').icon(FilterIcon),
                      S.documentTypeListItem('condition')
                        .title('Primary care conditions')
                        .id('content-primary-care-conditions')
                        .icon(FilterIcon)
                        .child(
                          S.documentTypeList('condition')
                            .title('Primary care conditions')
                            .filter('_type == "condition" && category == $category')
                            .params({category: 'primary-care'}),
                        ),
                      S.documentTypeListItem('condition')
                        .title('Addiction medicine conditions')
                        .id('content-addiction-medicine-conditions')
                        .icon(FilterIcon)
                        .child(
                          S.documentTypeList('condition')
                            .title('Addiction medicine conditions')
                            .filter('_type == "condition" && category == $category')
                            .params({category: 'addiction-medicine'}),
                        ),
                      S.documentTypeListItem('condition')
                        .title('Weight loss conditions')
                        .id('content-weight-loss-conditions')
                        .icon(FilterIcon)
                        .child(
                          S.documentTypeList('condition')
                            .title('Weight loss conditions')
                            .filter('_type == "condition" && category == $category')
                            .params({category: 'weight-loss-mgmt'}),
                        ),
                    ]),
                ),
              S.documentTypeListItem('drug')
                .title('Treatments & medications')
                .icon(TagIcon),
              S.divider(),
              S.documentTypeListItem('provider').title('Team members').icon(UsersIcon),
              S.documentTypeListItem('location').title('Locations').icon(PinIcon),
              S.documentTypeListItem('faq').title('FAQs').icon(HelpCircleIcon),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Site administration')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site administration')
            .items([
              singletonListItem(S, {
                title: 'Organization profile',
                icon: CogIcon,
                schemaType: 'siteSettings',
                documentId: 'siteSettings',
              }),
              S.listItem()
                .title('Navigation menus')
                .icon(ListIcon)
                .child(
                  S.list()
                    .title('Navigation menus')
                    .items([
                      S.listItem()
                        .title('Main navigation')
                        .icon(ListIcon)
                        .child(
                          S.document()
                            .schemaType('navigation')
                            .documentId('navigation-main')
                            .title('Main navigation'),
                        ),
                      singletonListItem(S, {
                        title: 'Footer',
                        icon: ListIcon,
                        schemaType: 'siteFooter',
                        documentId: SITE_FOOTER_ID,
                      }),
                    ]),
                ),
              S.documentTypeListItem('announcement').title('Announcements').icon(BellIcon),
            ]),
        ),
    ])
