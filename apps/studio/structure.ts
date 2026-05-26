import {
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  DocumentsIcon,
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
import {navigationSingletons} from './schemaTypes/documents/navigation'
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
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              singletonListItem(S, {
                title: 'Homepage',
                icon: HomeIcon,
                schemaType: 'homepage',
                documentId: 'singleton-homepage',
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
                        S.documentTypeListItem('program').title('Programs shown on care pages').icon(StackIcon),
                        S.documentTypeListItem('faq').title('Care FAQs').icon(HelpCircleIcon),
                      ]),
                      pageBundleListItem(S, landingPage('services'), []),
                      pageBundleListItem(S, landingPage('programs'), [
                        S.documentTypeListItem('program').title('Program entries').icon(StackIcon),
                      ]),
                      pageBundleListItem(S, landingPage('primary-care'), [
                        S.documentTypeListItem('condition')
                          .title('Primary care conditions')
                          .icon(HeartIcon)
                          .child(
                            S.documentTypeList('condition')
                              .title('Primary care conditions')
                              .filter('_type == "condition" && category == $category')
                              .params({category: 'primary-care'}),
                          ),
                      ]),
                      pageBundleListItem(S, landingPage('addiction-medicine'), [
                        S.documentTypeListItem('condition')
                          .title('Addiction medicine conditions')
                          .icon(HeartIcon)
                          .child(
                            S.documentTypeList('condition')
                              .title('Addiction medicine conditions')
                              .filter('_type == "condition" && category == $category')
                              .params({category: 'addiction-medicine'}),
                          ),
                      ]),
                      pageBundleListItem(S, landingPage('weight-loss-mgmt'), [
                        S.documentTypeListItem('condition')
                          .title('Weight loss conditions')
                          .icon(HeartIcon)
                          .child(
                            S.documentTypeList('condition')
                              .title('Weight loss conditions')
                              .filter('_type == "condition" && category == $category')
                              .params({category: 'weight-loss-mgmt'}),
                          ),
                      ]),
                    ]),
                ),
              S.listItem()
                .title('Organization pages')
                .icon(UsersIcon)
                .child(
                  S.list()
                    .title('Organization pages')
                    .items([
                      pageBundleListItem(S, landingPage('about'), [
                        S.documentTypeListItem('provider').title('Team members featured across people pages').icon(UsersIcon),
                        S.divider(),
                        pageBundleListItem(S, landingPage('patient-rights-privacy'), [
                          pageSettingsListItem(S, landingPage('medical-record-request')),
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
                            title: 'Terms of service',
                            icon: DocumentTextIcon,
                            schemaType: 'websitePage',
                            documentId: 'website-page-terms-of-service',
                          }),
                        ]),
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
        .title('Components')
        .icon(HeartIcon)
        .child(
          S.list()
            .title('Components')
            .items([
              S.listItem()
                .title('Care components')
                .icon(HeartIcon)
                .child(
                  S.list()
                    .title('Care components')
                    .items([
                      S.documentTypeListItem('condition').title('Conditions').icon(HeartIcon),
                      S.documentTypeListItem('program').title('Programs').icon(StackIcon),
                      S.documentTypeListItem('faq').title('FAQs').icon(HelpCircleIcon),
                    ]),
                ),
              S.listItem()
                .title('Organization directory')
                .icon(UsersIcon)
                .child(
                  S.list()
                    .title('Organization directory')
                    .items([
                      S.documentTypeListItem('provider').title('Team members').icon(UsersIcon),
                      S.documentTypeListItem('location').title('Locations').icon(PinIcon),
                    ]),
                ),
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
                    .items(
                      navigationSingletons.map((nav) =>
                        S.listItem()
                          .title(nav.title)
                          .icon(ListIcon)
                          .child(
                            S.document()
                              .schemaType('navigation')
                              .documentId(nav.id)
                              .initialValueTemplate(`navigation-${nav.key}`)
                              .title(nav.title),
                          ),
                      ),
                    ),
                ),
              S.documentTypeListItem('announcement').title('Announcements').icon(BellIcon),
            ]),
        ),
    ])
