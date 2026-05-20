import {
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  DocumentsIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  ListIcon,
  PinIcon,
  StackIcon,
  UsersIcon,
} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('RiseUp WV')
    .items([
      // ── Site settings (singleton) ────────────────────────────────────────
      S.documentListItem()
        .schemaType('siteSettings')
        .id('siteSettings')
        .title('Site settings')
        .icon(CogIcon),

      S.divider(),

      // ── Site structure ───────────────────────────────────────────────────
      S.listItem()
        .title('Site structure')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site structure')
            .items([
              S.documentListItem()
                .schemaType('homepage')
                .id('homepage')
                .title('Homepage')
                .icon(HomeIcon),
              S.listItem()
                .title('Navigation menus')
                .icon(ListIcon)
                .child(S.documentTypeList('navigation').title('Navigation menus')),
              S.documentListItem()
                .schemaType('referralSettings')
                .id('referralSettings')
                .title('Referral settings')
                .icon(DocumentTextIcon),
              S.listItem()
                .title('Legal pages')
                .icon(DocumentTextIcon)
                .child(
                  S.list()
                    .title('Legal pages')
                    .items([
                      S.documentListItem()
                        .schemaType('legalPage')
                        .id('legalPage.privacy')
                        .title('Privacy policy')
                        .icon(DocumentTextIcon),
                      S.documentListItem()
                        .schemaType('legalPage')
                        .id('legalPage.terms')
                        .title('Terms of service')
                        .icon(DocumentTextIcon),
                    ]),
                ),
            ]),
        ),

      S.divider(),

      // ── Pages ────────────────────────────────────────────────────────────
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(S.documentTypeList('page').title('Pages')),

      S.divider(),

      // ── Care content ─────────────────────────────────────────────────────
      S.listItem()
        .title('Care content')
        .icon(HeartIcon)
        .child(
          S.list()
            .title('Care content')
            .items([
              S.documentTypeListItem('service').title('Services').icon(HeartIcon),
              S.documentTypeListItem('program').title('Programs').icon(StackIcon),
              S.documentTypeListItem('faq').title('FAQs').icon(HelpCircleIcon),
            ]),
        ),

      // ── People & places ──────────────────────────────────────────────────
      S.listItem()
        .title('People & places')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('People & places')
            .items([
              S.documentTypeListItem('provider').title('Team members').icon(UsersIcon),
              S.documentTypeListItem('location').title('Locations').icon(PinIcon),
            ]),
        ),

      S.divider(),

      // ── Operations ───────────────────────────────────────────────────────
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
