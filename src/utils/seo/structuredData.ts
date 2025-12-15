interface SEOData {
  title?: string;
  slug?: string;
  summary?: string;
  creation_date?: string;
  updatedAt?: string;
  author?: string;
  locale?: string;
  header?: {
    title?: string;
    summary?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string | undefined;
}

interface BreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbItem[];
}

interface ArticleSchema {
  "@type": string;
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    "@type": "Person";
    name: string;
  };
  [key: string]: any;
}

import { PAGE_TYPE_MAPPING as TYPE_MAPPING } from "./pageTypeMapping";

const FRONT_URL = process.env.FRONT_URL || "";

function formatBreadcrumbName(type: string): string {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getContentTypeSlug(contentType: string): string {
  const parts = contentType.split("api::");
  return parts.length > 1 ? parts[1].split(".")[0] : "";
}

function getLocalizedUrl(
  path: string,
  locale?: string,
  defaultLocale: string = "en"
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (locale && locale !== defaultLocale) {
    return `${FRONT_URL}/${locale}${normalizedPath}`;
  }
  return `${FRONT_URL}${normalizedPath}`;
}

// Helper to fetch default locale from i18n plugin
async function fetchDefaultLocale(strapi: any): Promise<string> {
  let defaultLocale = "en";
  try {
    defaultLocale = await strapi
      .plugin("i18n")
      .service("locales")
      .getDefaultLocale();
  } catch (e) {
    console.warn("Could not fetch default locale, falling back to 'en'", e);
  }
  return defaultLocale;
}

function generateStructuredData(
  data: SEOData,
  contentType: string,
  isCollection: boolean,
  defaultLocale: string = "en"
) {
  const structured: Record<string, any>[] = [];

  // 1. Breadcrumb Schema
  const breadcrumbSchema: BreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getLocalizedUrl("/", data.locale, defaultLocale),
      },
    ],
  };

  const mainType = getContentTypeSlug(contentType);

  if (mainType) {
    let type = TYPE_MAPPING[mainType] || mainType;
    const humanReadableName = formatBreadcrumbName(type);

    if (type === "template-page") {
      type = data.slug;
    }

    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: humanReadableName,
      item: getLocalizedUrl(`/${type}`, data.locale, defaultLocale),
    });

    if (isCollection && mainType !== "template-page") {
      // Add current page
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        position: breadcrumbSchema.itemListElement.length + 1,
        name: data.seo?.metaTitle || data.header?.title || data.title || "Page",
        item: getLocalizedUrl(
          `/${type}/${data.slug}`,
          data.locale,
          defaultLocale
        ),
      });
    }

    structured.push(breadcrumbSchema);

    // Only add Article schema if it has meaningful content and is an article type
    if (
      ["api::blog-post.blog-post", "api::article.article"].includes(contentType)
    ) {
      const url = getLocalizedUrl(`/${type}`, data.locale, defaultLocale);

      let schemaType = "Article";
      if (contentType === "api::blog-post.blog-post") {
        schemaType = "BlogPosting";
      } else if (contentType === "api::article.article") {
        schemaType = "NewsArticle";
      }

      // 2. Article Schema
      const articleSchema: ArticleSchema = {
        "@type": schemaType,
        headline: data.seo?.metaTitle || data.title,
        description: data.seo?.metaDescription || data.summary,
        url: `${url}/${data.slug}`,
        datePublished: data.creation_date,
        dateModified: data.updatedAt,
        publisher: {
          "@type": "Organization",
          name: "Digitain",
          logo: {
            "@type": "ImageObject",
            url: `${process.env.LOGO_URL}`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${url}/${data.slug}`,
        },
      };

      if (contentType === "api::blog-post.blog-post" && data.author) {
        articleSchema.author = {
          "@type": "Person",
          name: data.author,
        };
      }

      // Remove undefined properties
      Object.keys(articleSchema).forEach(
        (k) => articleSchema[k] === undefined && delete articleSchema[k]
      );

      structured.push(articleSchema);
    }
  }

  // Return graph if multiple, or single item
  if (structured.length === 1) {
    return structured[0];
  }

  return {
    "@context": "https://schema.org",
    "@graph": structured,
  };
}

function registerSEOMiddleware(strapi: any) {
  strapi.documents.use(async (context: any, next: any) => {
    // Only run for the desired content type and action
    if (
      ["create", "update"].includes(context.action) &&
      !context.uid.includes("-request") &&
      !context.uid.includes("home-page") &&
      context.params.data &&
      context.params.data.seo &&
      !context.params.data.seo.structuredData
    ) {
      const data = context.params.data;
      const contentType = strapi.contentTypes[context.uid];
      const isCollection = contentType.kind === "collectionType";

      const defaultLocale = await fetchDefaultLocale(strapi);

      data.seo.structuredData = generateStructuredData(
        data,
        context.uid,
        isCollection,
        defaultLocale
      );
    }
    return next();
  });
}

export { generateStructuredData, registerSEOMiddleware };
