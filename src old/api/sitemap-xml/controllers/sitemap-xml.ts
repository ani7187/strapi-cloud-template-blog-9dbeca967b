import { promises as fs, existsSync, mkdirSync } from "fs";
import path from "path";

/**
 * A set of functions called "actions" for `sitemap-xml`
 */

const SITEMAP_DIR = path.join(process.cwd(), "public", "sitemaps");

// Ensure sitemap directory exists
if (!existsSync(SITEMAP_DIR)) {
  mkdirSync(SITEMAP_DIR, { recursive: true });
}

const getSitemapFromFile = async (filename: string) => {
  const filePath = path.join(SITEMAP_DIR, filename);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    return null;
  }
};

export default {
  async index(ctx) {
    try {
      const cacheFilename = "sitemap.xml";

      const cachedXml = await getSitemapFromFile(cacheFilename);
      if (cachedXml) {
        ctx.set("Content-Type", "application/xml");
        ctx.body = cachedXml;
        return;
      }

      const sitemapService = strapi.service("api::sitemap-xml.sitemap-xml");
      const xml = await sitemapService.buildSitemapIndex(cacheFilename);

      ctx.set("Content-Type", "application/xml");
      ctx.body = xml;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async locale(ctx) {
    try {
      const { locale } = ctx.params;
      // const { refresh } = ctx.query;
      const cacheFilename = `sitemap-${locale}.xml`;

      // if (refresh !== "true") {
      const cachedXml = await getSitemapFromFile(cacheFilename);
      if (cachedXml) {
        ctx.set("Content-Type", "application/xml");
        ctx.body = cachedXml;
        return;
      }
      // }

      // Parse locale and page (e.g., "en" or "en-1")
      // const match = locale.match(/^([a-z-]+)(?:-(\d+))?$/);
      // if (!match) {
      //   ctx.throw(400, "Invalid locale format");
      //   return;
      // }

      // const realLocale = match[1];
      // const page = match[2] ? parseInt(match[2], 10) : 0;

      // const sitemapService = strapi.service("api::sitemap-xml.sitemap-xml");

      // const defaultLocale = await strapi
      //   .plugin("i18n")
      //   .service("locales")
      //   .getDefaultLocale();

      // const contentTypes = sitemapService.getContentTypes();
      // const filteredTypes = sitemapService.filterContentTypes(contentTypes);
      // const origin = process.env.FRONT_URL;

      // const xml = await sitemapService.buildLocaleSitemap(
      //   realLocale,
      //   filteredTypes,
      //   origin,
      //   defaultLocale,
      //   page
      // );

      // await saveSitemapToFile(cacheFilename, xml);

      // ctx.set("Content-Type", "application/xml");
      // ctx.body = xml;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
