/**
 * sitemap-xml service
 */

import { buildSitemapIndexXml, buildUrlSetXml } from "../utils/xml";
import { promises as fs, existsSync, mkdirSync, rmSync } from "fs";
import { PAGE_TYPE_MAPPING as RoutingPageType } from "../../../utils/seo/pageTypeMapping";
import path from "path";

const SITEMAP_DIR = path.join(process.cwd(), "public", "sitemaps");
const EXCLUDE_TYPES = ["api::test.test"];
const EXCLUDE_WORDS = ["-request"];
const PAGE_SIZE = 1000;

export default () => ({
  async getLocales(isDefaultLocale = false) {
    if (isDefaultLocale) {
      return await strapi.plugin("i18n").service("locales").getDefaultLocale();
    }
    return await strapi.plugin("i18n").service("locales").find();
  },

  getContentTypes() {
    const contentTypes = Object.values(strapi.contentTypes);
    return contentTypes;
  },

  filterContentTypes(contentTypes: any[]) {
    return contentTypes.filter((contentType) => {
      const uid = contentType.uid;
      // Exclude internal types, plugins (unless needed), and specific exclusions
      if (!uid.startsWith("api::")) return false;
      if (EXCLUDE_WORDS.some((word) => uid.includes(word))) return false;
      if (EXCLUDE_TYPES.includes(uid)) return false;
      if (contentType.attributes && !contentType.attributes.include_sitemap) {
        return false;
      }
      return true;
    });
  },

  async saveSitemapToFile(filename: string, content: string) {
    const filePath = path.join(SITEMAP_DIR, filename);
    await fs.writeFile(filePath, content);
  },

  async getEntriesForLocale(uid: any, locale: string) {
    const contentType = strapi.contentTypes[uid];
    if (!contentType) return [];

    // Check if the content type has the include_sitemap attribute
    const hasSitemapField =
      contentType.attributes && contentType.attributes.include_sitemap;

    if (!hasSitemapField) {
      return [];
    }

    if (contentType.kind === "singleType") {
      // Check if it's a "page" single type
      const apiId = contentType.info.singularName || contentType.info.name; // fallback
      if (!apiId.endsWith("-page") && !uid.endsWith("-page")) {
        if (!contentType.info.singularName.endsWith("-page")) {
          return [];
        }
      }

      const entry = await strapi.entityService.findOne(uid, 1, {
        locale,
        populate: "*", // Populate to get slug if it exists
        filters: {
          include_sitemap: true,
        },
      });
      return entry ? [entry] : [];
    } else {
      // Collection Type
      const entries = await strapi.entityService.findMany(uid, {
        locale,
        populate: "*",
        filters: {
          include_sitemap: true,
        },
      });
      return entries;
    }
  },

  async getContentTypeCounts(locale: string, contentTypes: any[]) {
    const counts: Record<string, number> = {};
    let total = 0;

    await Promise.all(
      contentTypes.map(async (contentType) => {
        const count = await strapi.entityService.count(contentType.uid, {
          locale,
          filters: {
            include_sitemap: true,
          },
        } as any);
        counts[contentType.uid] = count;
        total += count;
      })
    );

    return { total, counts };
  },

  async buildSitemapIndex(cacheFilename: string, isRegenerate = false) {
    const locales = await this.getLocales();
    const origin = process.env.BACKEND_ADMIN_URL;
    const sitemaps: { loc: string }[] = [];

    if (isRegenerate) {
      rmSync(SITEMAP_DIR, { recursive: true });
    }
    if (!existsSync(SITEMAP_DIR)) {
      mkdirSync(SITEMAP_DIR, { recursive: true });
    }

    const defaultLocale = await this.getLocales(true);
    const contentTypes = this.getContentTypes();
    const filteredTypes = this.filterContentTypes(contentTypes);

    await Promise.all(
      locales.map(async (locale) => {
        const { total: totalCount, counts } = await this.getContentTypeCounts(
          locale.code,
          filteredTypes
        );
        const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;

        for (let page = 0; page < totalPages; page++) {
          // Page 0 is the main file "sitemap-en.xml"
          // Page 1+ is "sitemap-en-1.xml"
          const suffix = page === 0 ? "" : `-${page}`;
          const filename = `sitemap-${locale.code}${suffix}.xml`;

          // Add to index
          sitemaps.push({
            loc: `${origin}/sitemaps/${filename}`,
          });

          // Generate file
          const xml = await this.buildLocaleSitemap(
            locale.code,
            filteredTypes,
            process.env.FRONT_URL,
            defaultLocale,
            page,
            counts
          );
          await fs.writeFile(path.join(SITEMAP_DIR, filename), xml);
        }
      })
    );

    const xml = buildSitemapIndexXml(sitemaps);
    await this.saveSitemapToFile(cacheFilename, xml);

    return xml;
  },

  async buildLocaleSitemap(
    locale: string,
    contentTypes: any[],
    origin: string,
    defaultLocale: string = "en",
    page: number = 0,
    counts?: Record<string, number>
  ) {
    const urls: { loc: string; lastmod: string }[] = [];

    let skip = page * PAGE_SIZE;
    let limit = PAGE_SIZE;

    for (const contentType of contentTypes) {
      if (limit <= 0) break; // Filled the page

      const uid = contentType.uid;

      // Get count for this type
      let count = counts ? counts[uid] : 0;
      if (!counts) {
        count = await strapi.entityService.count(uid, {
          locale,
          filters: {
            include_sitemap: true,
          },
        } as any);
      }

      if (count === 0) continue;

      if (skip >= count) {
        // Skip this entire type
        skip -= count;
        continue;
      }

      // We need to fetch from this type
      // We skip 'skip' amount (which is now relative to this type)
      // And we take 'limit' amount (or less if type doesn't have enough)
      const typeLimit = Math.min(limit, count - skip);

      let entries = [];
      if (contentType.kind === "singleType") {
        // Single types usually have count 1 if they exist and match filter
        // If skip is 0 and we need it, we fetch it.
        if (skip === 0 && typeLimit > 0) {
          entries = await this.getEntriesForLocale(uid, locale);
        }
      } else {
        entries = await strapi.entityService.findMany(uid, {
          locale,
          filters: {
            include_sitemap: true,
          },
          start: skip,
          limit: typeLimit,
        } as any);
      }

      // Update global skip and limit for next iteration
      // After fetching from this type, we have consumed 'skip' (it becomes 0 for next types)
      // and we have reduced 'limit' by the amount we fetched.
      skip = 0;
      limit -= Array.isArray(entries) ? entries.length : entries ? 1 : 0;

      if (!entries || (Array.isArray(entries) && entries.length === 0)) {
        continue;
      }

      const entriesArray = Array.isArray(entries) ? entries : [entries];

      let prefix = "";
      if (
        contentType.kind === "collectionType" &&
        contentType.info.singularName !== "template-page"
      ) {
        const name = contentType.info.singularName;
        prefix = RoutingPageType[name] || name;
      }

      for (const entry of entriesArray) {
        let slug = entry.slug;

        // Handle Single Types without slug
        if (contentType.kind === "singleType") {
          const contentTypeName = contentType.info.singularName;
          slug = RoutingPageType[contentTypeName] || slug;
        } else {
          slug = entry.slug;
        }

        if (!slug) continue;

        // URL Construction
        let url = "";
        const isDefault = locale === defaultLocale;

        const urlSlug = prefix ? `${prefix}/${slug}` : slug;
        if (isDefault) {
          url = `${origin}/${urlSlug}/`;
        } else {
          url = `${origin}/${locale}/${urlSlug}/`;
        }

        urls.push({ loc: url, lastmod: entry.updatedAt || entry.publishedAt });
      }
    }

    return buildUrlSetXml(urls);
  },
});
