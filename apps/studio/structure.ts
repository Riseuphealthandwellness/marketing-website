import {
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  DocumentsIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  LaunchIcon,
  ListIcon,
  StackIcon,
  UsersIcon,
} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'
import {landingPageSettingPages} from './schemaTypes/documents/landingPageSettings'
import {navigationSingletons} from './schemaTypes/documents/navigation'

const pageSettingGroups = [
  {
    title: 'Patient access',
    icon: LaunchIcon,
    items: [
      {
        title: 'Referrals',
        icon: LaunchIcon,
        child: (S: Parameters<StructureResolver>[0]) =>
          S.document()
            .schemaType('referralPageSettings')
            .documentId('referralPageSettings')
            .title('Referral page settings'),
      },
      ...landingPageSettingPages.filter((page) => page.group === 'patientAccess'),
    ],
  },
  {
    title: 'Care pages',
    icon: HeartIcon,
    items: landingPageSettingPages.filter((page) => page.group === 'care'),
  },
  {
    title: 'Organization pages',
    icon: UsersIcon,
    items: landingPageSettingPages.filter((page) => page.group === 'organization'),
  },
] as const

function pageSettingsListItem(S: Parameters<StructureResolver>[0], page: (typeof landingPageSettingPages)[number]) {
  return S.listItem()
    .title(page.title)
    .icon(DocumentsIcon)
    .child(
      S.document()
        .schemaType('landingPageSettings')
        .documentId(page.id)
        .initialValueTemplate(`landing-page-settings-${page.slug}`)
        .title(`${page.title} page settings`),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Marketing website')
    .items([
      S.listItem()
        .title('Care library')
        .icon(HeartIcon)
        .child(
          S.list()
            .title('Care library')
            .items([
              S.documentTypeListItem('service').title('Services').icon(HeartIcon),
              S.documentTypeListItem('condition').title('Conditions').icon(HeartIcon),
              S.documentTypeListItem('program').title('Programs').icon(StackIcon),
              S.documentTypeListItem('faq').title('FAQs').icon(HelpCircleIcon),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Operations')
        .icon(BellIcon)
        .child(
          S.list()
            .title('Operations')
            .items([
              S.documentTypeListItem('provider').title('Team members').icon(UsersIcon),
              S.documentTypeListItem('announcement').title('Announcements').icon(BellIcon),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Page builder')
        .icon(DocumentsIcon)
        .child(S.documentTypeList('page').title('Page builder')),

      S.listItem()
        .title('Page settings')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Page settings')
            .items([
              S.listItem()
                .title('Homepage')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('homepageSettings')
                    .documentId('homepageSettings')
                    .title('Homepage settings'),
                ),
              S.listItem()
                .title('Patient access')
                .icon(LaunchIcon)
                .child(
                  S.list()
                    .title('Patient access')
                    .items(
                      pageSettingGroups[0].items.map((item) => {
                        if ('child' in item) {
                          return S.listItem()
                            .title(item.title)
                            .icon(item.icon)
                            .child(item.child(S))
                        }

                        return pageSettingsListItem(S, item)
                      }),
                    ),
                ),
              ...pageSettingGroups.slice(1).map((group) =>
                S.listItem()
                  .title(group.title)
                  .icon(group.icon)
                  .child(
                    S.list()
                      .title(group.title)
                      .items(group.items.map((page) => pageSettingsListItem(S, page))),
                  ),
              ),
            ]),
        ),

      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site settings')
            .items([
              S.listItem()
                .title('Organization profile')
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('Organization profile'),
                ),
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
              S.listItem()
                .title('Legal pages')
                .icon(DocumentTextIcon)
                .child(
                  S.list()
                    .title('Legal pages')
                    .items([
                      S.listItem()
                        .title('Privacy policy')
                        .icon(DocumentTextIcon)
                        .child(
                          S.document()
                            .schemaType('legalPage')
                            .documentId('legal-page-privacy')
                            .title('Privacy policy'),
                        ),
                      S.listItem()
                        .title('Terms of service')
                        .icon(DocumentTextIcon)
                        .child(
                          S.document()
                            .schemaType('legalPage')
                            .documentId('legal-page-terms')
                            .title('Terms of service'),
                        ),
                    ]),
                ),
            ]),
        ),
    ])
