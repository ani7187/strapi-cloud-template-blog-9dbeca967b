import type { Schema, Struct } from '@strapi/strapi';

export interface ChartChart extends Struct.ComponentSchema {
  collectionName: 'components_sections_charts';
  info: {
    displayName: 'Chart';
    icon: 'apps';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    chart: Schema.Attribute.Relation<'oneToOne', 'api::chart.chart'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ChartChartItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_chart_items';
  info: {
    displayName: 'Chart item';
    icon: 'chartPie';
  };
  attributes: {
    column_type: Schema.Attribute.Enumeration<['default', 'before', 'after']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
    extra_breakdown: Schema.Attribute.Component<'chart.extra', false>;
    horizontal: Schema.Attribute.String & Schema.Attribute.Required;
    vertical: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ChartExtra extends Struct.ComponentSchema {
  collectionName: 'components_chart_extras';
  info: {
    displayName: 'Extra';
    icon: 'bulletList';
  };
  attributes: {
    item: Schema.Attribute.Component<'chart.extra-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface ChartExtraItem extends Struct.ComponentSchema {
  collectionName: 'components_chart_extra_items';
  info: {
    displayName: 'Extra item';
    icon: 'dashboard';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ExtendedSectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'landscape';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.gallery', true>;
    title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsItem extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_items';
  info: {
    displayName: 'Item';
    icon: 'hashtag';
  };
  attributes: {
    listing_img: Schema.Attribute.Media<'images'>;
    listing_summary: Schema.Attribute.Text;
    listing_title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsItemList extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_item_lists';
  info: {
    displayName: 'Item list';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.item', true> &
      Schema.Attribute.Required;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsItemListWithBtn
  extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_item_list_with_btns';
  info: {
    displayName: 'Item list with btn';
    icon: 'apps';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.item-with-btn', true> &
      Schema.Attribute.Required;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsItemWithBtn extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_item_with_btns';
  info: {
    displayName: 'Item with btn';
    icon: 'cast';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.link-btn', true>;
    listing_img: Schema.Attribute.Media<'images'>;
    listing_summary: Schema.Attribute.Text;
    listing_title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsMissionVision extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_mission_visions';
  info: {
    displayName: 'Mission vision';
    icon: 'grid';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.item', true> &
      Schema.Attribute.Required;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsRelatedContent extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_related_contents';
  info: {
    displayName: 'Related Content';
    icon: 'attachment';
  };
  attributes: {
    related_content: Schema.Attribute.Relation<
      'oneToOne',
      'api::related-content.related-content'
    >;
    title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsRichContentMarkdown
  extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_rich_content_markdown_s';
  info: {
    displayName: 'Rich Content(Markdown)';
    icon: 'feather';
  };
  attributes: {
    body: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultMarkdown';
        }
      >;
  };
}

export interface ExtendedSectionsScrollableItems
  extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_scrollable_items';
  info: {
    displayName: 'Scrollable Items';
    icon: 'arrowRight';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    products: Schema.Attribute.Component<'extended-sections.item', true>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsServicesItemList
  extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_services_item_lists';
  info: {
    displayName: 'Services item list';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.item', true> &
      Schema.Attribute.Required;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsTimeline extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_timelines';
  info: {
    displayName: 'Timeline';
    icon: 'bulletList';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.item', true> &
      Schema.Attribute.Required;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ExtendedSectionsVoices extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_voices';
  info: {
    displayName: 'Voices';
    icon: 'microphone';
  };
  attributes: {
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    voice_items: Schema.Attribute.Component<'sub-sections.voice-item', true>;
  };
}

export interface ExtendedSectionsWhiteItemListWithBtn
  extends Struct.ComponentSchema {
  collectionName: 'components_extended_sections_white_item_list_with_btns';
  info: {
    displayName: 'White Item list with btn';
    icon: 'apps';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    products: Schema.Attribute.Component<
      'extended-sections.item-with-btn',
      true
    >;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface LicencesCertificationsCertifications
  extends Struct.ComponentSchema {
  collectionName: 'components_licences_certifications_certifications';
  info: {
    displayName: 'Certification';
    icon: 'filePdf';
  };
  attributes: {
    certificate_number: Schema.Attribute.String & Schema.Attribute.Required;
    certified_product_list: Schema.Attribute.Component<
      'licences-certifications.certified-product',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface LicencesCertificationsCertifiedProduct
  extends Struct.ComponentSchema {
  collectionName: 'components_licences_certifications_certified_products';
  info: {
    displayName: 'Certified product';
    icon: 'filePdf';
  };
  attributes: {
    certified_product: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LicencesCertificationsLicences extends Struct.ComponentSchema {
  collectionName: 'components_licences_certifications_licences';
  info: {
    displayName: 'License';
    icon: 'stack';
  };
  attributes: {
    license_type: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsAmbassador extends Struct.ComponentSchema {
  collectionName: 'components_sections_ambassadors';
  info: {
    displayName: 'Ambassador';
    icon: 'user';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    img: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    position: Schema.Attribute.String;
    summary: Schema.Attribute.Text;
  };
}

export interface SectionsAward extends Struct.ComponentSchema {
  collectionName: 'components_sections_awards';
  info: {
    displayName: 'Award';
    icon: 'crown';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    awards_list: Schema.Attribute.Relation<'oneToMany', 'api::award.award'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsBottomPanel extends Struct.ComponentSchema {
  collectionName: 'components_sections_bottom_panels';
  info: {
    displayName: 'Bottom panel';
    icon: 'server';
  };
  attributes: {
    bottom_panel: Schema.Attribute.Relation<
      'oneToOne',
      'api::bottom-panel.bottom-panel'
    >;
    is_show_general: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface SectionsClientReview extends Struct.ComponentSchema {
  collectionName: 'components_sections_client_reviews';
  info: {
    displayName: 'Client review';
    icon: 'emotionHappy';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsDescription extends Struct.ComponentSchema {
  collectionName: 'components_sections_descriptions';
  info: {
    displayName: 'Description';
    icon: 'layout';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    btn: Schema.Attribute.Component<'shared.link-btn', true>;
    img: Schema.Attribute.Media<'images'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos'>;
    video_url: Schema.Attribute.String;
  };
}

export interface SectionsDescriptionSimple extends Struct.ComponentSchema {
  collectionName: 'components_sections_description_simples';
  info: {
    displayName: 'Description Simple';
    icon: 'layout';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    img: Schema.Attribute.Media<'images'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface SectionsEventFeatures extends Struct.ComponentSchema {
  collectionName: 'components_sections_event_features';
  info: {
    displayName: 'Reports';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    reports: Schema.Attribute.Relation<'oneToMany', 'api::report.report'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_forms';
  info: {
    displayName: 'Form';
    icon: 'hashtag';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    img: Schema.Attribute.Media<'images'>;
    map: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFounder extends Struct.ComponentSchema {
  collectionName: 'components_sections_founders';
  info: {
    displayName: 'Person';
    icon: 'user';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    img: Schema.Attribute.Media<'images'>;
    person: Schema.Attribute.Relation<'oneToOne', 'api::person.person'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFutures extends Struct.ComponentSchema {
  collectionName: 'components_sections_futures';
  info: {
    displayName: 'Features';
    icon: 'bulletList';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    key_feature: Schema.Attribute.Component<'sub-sections.key-feature', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHeaderSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_header_sections';
  info: {
    displayName: 'Header section';
    icon: 'house';
  };
  attributes: {
    background_img: Schema.Attribute.Media<'images'>;
    background_video: Schema.Attribute.Media<'videos'>;
    button: Schema.Attribute.Component<'shared.link-btn', true>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsItemList extends Struct.ComponentSchema {
  collectionName: 'components_sections_item_lists';
  info: {
    displayName: 'Item list';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.item', true>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsItemListWithBtn extends Struct.ComponentSchema {
  collectionName: 'components_sections_item_list_with_btns';
  info: {
    displayName: 'Item list with btn';
    icon: 'apps';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.item-with-btn', true>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLicences extends Struct.ComponentSchema {
  collectionName: 'components_sections_licences';
  info: {
    displayName: 'Licences';
    icon: 'slideshow';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    license_and_certifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::license-and-certification.license-and-certification'
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLicensesByCountry extends Struct.ComponentSchema {
  collectionName: 'components_sections_licenses_by_countries';
  info: {
    displayName: 'Licenses By Country';
    icon: 'bulletList';
  };
  attributes: {
    all_title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'All'>;
    anchor_link: Schema.Attribute.String;
    is_show_all: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    is_show_popular: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    popular_title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Popular'>;
    regions: Schema.Attribute.Relation<'oneToMany', 'api::region.region'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsManagement extends Struct.ComponentSchema {
  collectionName: 'components_sections_managements';
  info: {
    displayName: 'Management';
    icon: 'user';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    btn: Schema.Attribute.Component<'shared.link-btn', true>;
    people: Schema.Attribute.Relation<'oneToMany', 'api::person.person'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsNews extends Struct.ComponentSchema {
  collectionName: 'components_sections_news';
  info: {
    displayName: 'News';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsNumber extends Struct.ComponentSchema {
  collectionName: 'components_sections_numbers';
  info: {
    displayName: 'Numbers';
    icon: 'apps';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    numbers: Schema.Attribute.Component<'shared.number', true>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsNumbersWithBtn extends Struct.ComponentSchema {
  collectionName: 'components_sections_numbers_with_btns';
  info: {
    displayName: 'Numbers with btn';
    icon: 'apps';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    buttons: Schema.Attribute.Component<'shared.link-btn', true>;
    img: Schema.Attribute.Media<'images'>;
    numbers: Schema.Attribute.Component<'shared.number', true>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsOurBrands extends Struct.ComponentSchema {
  collectionName: 'components_sections_our_brands';
  info: {
    displayName: 'Our Brands';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    brands: Schema.Attribute.Relation<'oneToMany', 'api::brand.brand'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsOurProducts extends Struct.ComponentSchema {
  collectionName: 'components_sections_our_products';
  info: {
    displayName: 'Our Products';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    products: Schema.Attribute.Component<'sub-sections.our-product', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPartners extends Struct.ComponentSchema {
  collectionName: 'components_sections_partners';
  info: {
    displayName: 'Partners';
    icon: 'briefcase';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    partners: Schema.Attribute.Relation<'oneToMany', 'api::partner.partner'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPeople extends Struct.ComponentSchema {
  collectionName: 'components_sections_people';
  info: {
    displayName: 'People';
    icon: 'emotionHappy';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    persons: Schema.Attribute.Relation<'oneToMany', 'api::person.person'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProductList extends Struct.ComponentSchema {
  collectionName: 'components_sections_product_lists';
  info: {
    displayName: 'Product list';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProductSolutions extends Struct.ComponentSchema {
  collectionName: 'components_sections_product_solutions';
  info: {
    displayName: 'Product solutions';
    icon: 'magic';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    product_solution: Schema.Attribute.Component<
      'sub-sections.product-solution',
      true
    > &
      Schema.Attribute.Required;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProducts extends Struct.ComponentSchema {
  collectionName: 'components_sections_products';
  info: {
    displayName: 'Home Products';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    products: Schema.Attribute.Component<'sub-sections.product', true>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsRichContentList extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_content_lists';
  info: {
    displayName: 'Rich Content List';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    rich_content: Schema.Attribute.Component<'shared.rich-content', true> &
      Schema.Attribute.Required;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSolutions extends Struct.ComponentSchema {
  collectionName: 'components_sections_solutions';
  info: {
    displayName: 'Solutions';
    icon: 'dashboard';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    solutions: Schema.Attribute.Component<'sub-sections.solution', true>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSuccessStory extends Struct.ComponentSchema {
  collectionName: 'components_sections_success_stories';
  info: {
    displayName: 'Success story';
    icon: 'lightbulb';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    success_stories: Schema.Attribute.Relation<
      'oneToMany',
      'api::success-story.success-story'
    >;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTeam extends Struct.ComponentSchema {
  collectionName: 'components_sections_teams';
  info: {
    displayName: 'Team';
    icon: 'apps';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    persons: Schema.Attribute.Relation<'oneToMany', 'api::person.person'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SettingsAnalyticsSettings extends Struct.ComponentSchema {
  collectionName: 'components_settings_analytics_settings';
  info: {
    displayName: 'Analytics Settings';
    icon: 'cog';
  };
  attributes: {
    custom_scripts_body: Schema.Attribute.Text;
    custom_scripts_head: Schema.Attribute.Text;
    facebook_pixel_id: Schema.Attribute.String;
    google_analytics_id: Schema.Attribute.String;
    google_tag_manager_id: Schema.Attribute.String;
    hotjar_id: Schema.Attribute.String;
  };
}

export interface SettingsNotification extends Struct.ComponentSchema {
  collectionName: 'components_settings_notifications';
  info: {
    displayName: 'Notification';
    icon: 'bell';
  };
  attributes: {
    email: Schema.Attribute.Email;
    type: Schema.Attribute.Enumeration<
      [
        'about-business-request',
        'book-a-meeting-request',
        'consultation-request',
        'contact-request',
        'role-request',
        'subscribe-request',
      ]
    >;
    webhook_url: Schema.Attribute.String;
  };
}

export interface SharedBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_banners';
  info: {
    displayName: 'Banner';
    icon: 'layout';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    btn: Schema.Attribute.Component<'shared.link-btn', true>;
    is_subscribe: Schema.Attribute.Boolean;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedChartExtraBreakdown extends Struct.ComponentSchema {
  collectionName: 'components_shared_chart_extra_breakdowns';
  info: {
    displayName: 'Chart extra breakdown';
    icon: 'manyToMany';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SharedGallery extends Struct.ComponentSchema {
  collectionName: 'components_shared_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'folder';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SharedImages extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'Images';
    icon: 'landscape';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    btn: Schema.Attribute.Component<'shared.link-btn', true>;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedInteractiveMap extends Struct.ComponentSchema {
  collectionName: 'components_shared_interactive_maps';
  info: {
    displayName: 'Interactive map';
    icon: 'earth';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    countries: Schema.Attribute.Relation<'oneToMany', 'api::country.country'>;
    img: Schema.Attribute.Media<'images'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface SharedItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_items';
  info: {
    displayName: 'Item';
    icon: 'picture';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedItemWithBtn extends Struct.ComponentSchema {
  collectionName: 'components_shared_item_with_btns';
  info: {
    displayName: 'Item with btn';
    icon: 'picture';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.link-btn', true>;
    img: Schema.Attribute.Media<'images'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedLinkBtn extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_btns';
  info: {
    displayName: 'Link btn';
    icon: 'link';
  };
  attributes: {
    info: Schema.Attribute.String &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<'Fill only one of the fields below: URL(external or internal), Inner Page, Scroll Section, Popup Type, or the combination of Inner Page + Scroll Section.'>;
    inner_page: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isExternal: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    popup_type: Schema.Attribute.Enumeration<
      ['none', 'about_business', 'book_meeting', 'book_meeting_simple']
    >;
    scroll_section: Schema.Attribute.String;
    seo_title: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedListing extends Struct.ComponentSchema {
  collectionName: 'components_shared_listings';
  info: {
    displayName: 'Listing';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    btn: Schema.Attribute.Component<'shared.link-btn', true>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedNumber extends Struct.ComponentSchema {
  collectionName: 'components_shared_numbers';
  info: {
    displayName: 'Number';
  };
  attributes: {
    number: Schema.Attribute.String & Schema.Attribute.Required;
    summary: Schema.Attribute.Text;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    twitterCardType: Schema.Attribute.Enumeration<
      ['summary', ' summary_large_image']
    >;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichContent extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_contents';
  info: {
    displayName: 'Rich Content';
    icon: 'layout';
  };
  attributes: {
    body: Schema.Attribute.RichText;
    img: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedShortDescription extends Struct.ComponentSchema {
  collectionName: 'components_shared_short_descriptions';
  info: {
    displayName: 'Short description';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    files: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedTitle extends Struct.ComponentSchema {
  collectionName: 'components_shared_titles';
  info: {
    displayName: 'Summary text';
    icon: 'check';
  };
  attributes: {
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_videos';
  info: {
    displayName: 'Video';
    icon: 'television';
  };
  attributes: {
    anchor_link: Schema.Attribute.String;
    img: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

export interface SubSectionsKeyFeature extends Struct.ComponentSchema {
  collectionName: 'components_sub_sections_key_features';
  info: {
    displayName: 'Key Feature';
    icon: 'layout';
  };
  attributes: {
    btn: Schema.Attribute.Component<'shared.link-btn', true>;
    key_feature: Schema.Attribute.Relation<
      'oneToOne',
      'api::key-feature.key-feature'
    >;
  };
}

export interface SubSectionsOurProduct extends Struct.ComponentSchema {
  collectionName: 'components_sub_sections_our_products';
  info: {
    displayName: 'Our Product';
    icon: 'lightbulb';
  };
  attributes: {
    btn: Schema.Attribute.Component<'shared.link-btn', false>;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    summary: Schema.Attribute.Text;
  };
}

export interface SubSectionsProduct extends Struct.ComponentSchema {
  collectionName: 'components_sub_sections_products';
  info: {
    displayName: 'Home Product';
    icon: 'monitor';
  };
  attributes: {
    btn: Schema.Attribute.Component<'shared.link-btn', true>;
    img: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    summary: Schema.Attribute.Text;
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface SubSectionsProductSolution extends Struct.ComponentSchema {
  collectionName: 'components_sub_sections_product_solutions';
  info: {
    displayName: 'Product solution';
    icon: 'link';
  };
  attributes: {
    btn: Schema.Attribute.Component<'shared.link-btn', true>;
    product_solutions: Schema.Attribute.Relation<
      'oneToOne',
      'api::product-solution.product-solution'
    >;
  };
}

export interface SubSectionsSolution extends Struct.ComponentSchema {
  collectionName: 'components_sub_sections_solutions';
  info: {
    displayName: 'Solution';
    icon: 'monitor';
  };
  attributes: {
    btn: Schema.Attribute.Component<'shared.link-btn', true>;
    solution: Schema.Attribute.Relation<'oneToOne', 'api::solution.solution'>;
  };
}

export interface SubSectionsVoiceItem extends Struct.ComponentSchema {
  collectionName: 'components_sub_sections_voice_items';
  info: {
    displayName: 'Voice item';
    icon: 'hashtag';
  };
  attributes: {
    full_name: Schema.Attribute.String;
    img: Schema.Attribute.Media<'images'>;
    position: Schema.Attribute.String;
    summary: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'chart.chart': ChartChart;
      'chart.chart-item': ChartChartItem;
      'chart.extra': ChartExtra;
      'chart.extra-item': ChartExtraItem;
      'extended-sections.gallery': ExtendedSectionsGallery;
      'extended-sections.item': ExtendedSectionsItem;
      'extended-sections.item-list': ExtendedSectionsItemList;
      'extended-sections.item-list-with-btn': ExtendedSectionsItemListWithBtn;
      'extended-sections.item-with-btn': ExtendedSectionsItemWithBtn;
      'extended-sections.mission-vision': ExtendedSectionsMissionVision;
      'extended-sections.related-content': ExtendedSectionsRelatedContent;
      'extended-sections.rich-content-markdown': ExtendedSectionsRichContentMarkdown;
      'extended-sections.scrollable-items': ExtendedSectionsScrollableItems;
      'extended-sections.services-item-list': ExtendedSectionsServicesItemList;
      'extended-sections.timeline': ExtendedSectionsTimeline;
      'extended-sections.voices': ExtendedSectionsVoices;
      'extended-sections.white-item-list-with-btn': ExtendedSectionsWhiteItemListWithBtn;
      'licences-certifications.certifications': LicencesCertificationsCertifications;
      'licences-certifications.certified-product': LicencesCertificationsCertifiedProduct;
      'licences-certifications.licences': LicencesCertificationsLicences;
      'sections.ambassador': SectionsAmbassador;
      'sections.award': SectionsAward;
      'sections.bottom-panel': SectionsBottomPanel;
      'sections.client-review': SectionsClientReview;
      'sections.description': SectionsDescription;
      'sections.description-simple': SectionsDescriptionSimple;
      'sections.event-features': SectionsEventFeatures;
      'sections.form': SectionsForm;
      'sections.founder': SectionsFounder;
      'sections.futures': SectionsFutures;
      'sections.header-section': SectionsHeaderSection;
      'sections.item-list': SectionsItemList;
      'sections.item-list-with-btn': SectionsItemListWithBtn;
      'sections.licences': SectionsLicences;
      'sections.licenses-by-country': SectionsLicensesByCountry;
      'sections.management': SectionsManagement;
      'sections.news': SectionsNews;
      'sections.number': SectionsNumber;
      'sections.numbers-with-btn': SectionsNumbersWithBtn;
      'sections.our-brands': SectionsOurBrands;
      'sections.our-products': SectionsOurProducts;
      'sections.partners': SectionsPartners;
      'sections.people': SectionsPeople;
      'sections.product-list': SectionsProductList;
      'sections.product-solutions': SectionsProductSolutions;
      'sections.products': SectionsProducts;
      'sections.rich-content-list': SectionsRichContentList;
      'sections.solutions': SectionsSolutions;
      'sections.success-story': SectionsSuccessStory;
      'sections.team': SectionsTeam;
      'settings.analytics-settings': SettingsAnalyticsSettings;
      'settings.notification': SettingsNotification;
      'shared.banner': SharedBanner;
      'shared.chart-extra-breakdown': SharedChartExtraBreakdown;
      'shared.gallery': SharedGallery;
      'shared.images': SharedImages;
      'shared.interactive-map': SharedInteractiveMap;
      'shared.item': SharedItem;
      'shared.item-with-btn': SharedItemWithBtn;
      'shared.link-btn': SharedLinkBtn;
      'shared.listing': SharedListing;
      'shared.media': SharedMedia;
      'shared.number': SharedNumber;
      'shared.open-graph': SharedOpenGraph;
      'shared.quote': SharedQuote;
      'shared.rich-content': SharedRichContent;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.short-description': SharedShortDescription;
      'shared.slider': SharedSlider;
      'shared.title': SharedTitle;
      'shared.video': SharedVideo;
      'sub-sections.key-feature': SubSectionsKeyFeature;
      'sub-sections.our-product': SubSectionsOurProduct;
      'sub-sections.product': SubSectionsProduct;
      'sub-sections.product-solution': SubSectionsProductSolution;
      'sub-sections.solution': SubSectionsSolution;
      'sub-sections.voice-item': SubSectionsVoiceItem;
    }
  }
}
