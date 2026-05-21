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
import {navigationSingletons} from './schemaTypes/documents/navigation'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Marketing website')
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
                .title('Landing pages')
                .icon(DocumentsIcon)
                .child(
                  S.document()
                    .schemaType('landingPageSettings')
                    .documentId('landingPageSettings')
                    .title('Landing page settings'),
                ),
              S.listItem()
                .title('Referrals')
                .icon(LaunchIcon)
                .child(
                  S.document()
                    .schemaType('referralPageSettings')
                    .documentId('referralPageSettings')
                    .title('Referral page settings'),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Website content')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Website content')
            .items([
              S.listItem()
                .title('Page builder')
                .icon(DocumentsIcon)
                .child(S.documentTypeList('page').title('Page builder')),
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
                            .documentId('legalPage.privacy')
                            .title('Privacy policy'),
                        ),
                      S.listItem()
                        .title('Terms of service')
                        .icon(DocumentTextIcon)
                        .child(
                          S.document()
                            .schemaType('legalPage')
                            .documentId('legalPage.terms')
                            .title('Terms of service'),
                        ),
                    ]),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Care library')
        .icon(HeartIcon)
        .child(
          S.list()
            .title('Care library')
            .items([
              S.documentTypeListItem('service').title('Services').icon(HeartIcon),
              S.documentTypeListItem('program').title('Programs').icon(StackIcon),
              S.documentTypeListItem('faq').title('FAQs').icon(HelpCircleIcon),
            ]),
        ),

      S.listItem()
        .title('Team')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Team')
            .items([
              S.documentTypeListItem('provider').title('Team members').icon(UsersIcon),
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
              S.documentTypeListItem('announcement').title('Announcements').icon(BellIcon),
            ]),
        ),
    ])
