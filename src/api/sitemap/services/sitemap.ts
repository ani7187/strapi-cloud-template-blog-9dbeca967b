// /**
//  * sitemap service
//  */

// import { factories } from "@strapi/strapi";

// const EXCLUDE_TYPES = ["api::test.test"];

// export default factories.createCoreService(
//   "api::sitemap.sitemap",
//   ({ strapi }) => ({
//     async getLocales() {
//       const locales = await strapi.plugin("i18n").service("locales").find();
//       return locales;
//     },

//     getContentTypes() {
//       const contentTypes = Object.values(strapi.contentTypes);
//       return contentTypes;
//     },

//     filterContentTypes(contentTypes: any[]) {
//       return contentTypes.filter((contentType) => {
//         const uid = contentType.uid;
//         // Exclude internal types, plugins (unless needed), and specific exclusions
//         if (!uid.startsWith("api::")) return false;
//         if (uid.includes("-request")) return false;
//         if (EXCLUDE_TYPES.includes(uid)) return false;
//         return true;
//       });
//     },

//     async getEntriesForLocale(uid: string, locale: string) {
//       const contentType = strapi.contentTypes[uid];
//       if (!contentType) return [];

//       if (contentType.kind === "singleType") {
//         // Check if it's a "page" single type
//         const apiId = contentType.info.singularName || contentType.info.name; // fallback
//         if (!apiId.endsWith("-page") && !uid.endsWith("-page")) {
//           // The requirement says: Consider a single type as a "page" only if its API ID ends with "-page".
//           // We'll check the singularName or the UID suffix.
//           // Let's stick strictly to the requirement: "API ID ends with '-page'"
//           // API ID is usually the second part of 'api::name.name' or stored in info.singularName
//           if (!contentType.info.singularName.endsWith("-page")) {
//             return [];
//           }
//         }

//         const entry = await strapi.entityService.findOne(uid, 1, {
//           locale,
//           populate: "*", // Populate to get slug if it exists
//         });
//         return entry ? [entry] : [];
//       } else {
//         // Collection Type
//         const entries = await strapi.entityService.findMany(uid, {
//           locale,
//           populate: "*",
//         });
//         return entries;
//       }
//     },

//     buildSitemapIndex(locales: any[], origin: string) {
//       const sitemaps = locales.map((locale) => ({
//         loc: `${origin}/api/sitemap/${locale.code}`,
//       }));
//       // Import helper dynamically or use the one we defined.
//       // Since we are in the service, we can import from utils.
//       const { buildSitemapIndexXml } = require("../utils/xml");
//       return buildSitemapIndexXml(sitemaps);
//     },

//     async buildLocaleSitemap(
//       locale: string,
//       contentTypes: any[],
//       origin: string
//     ) {
//       const urls: { loc: string }[] = [];
//       const { buildUrlSetXml } = require("../utils/xml");

//       for (const contentType of contentTypes) {
//         const uid = contentType.uid;
//         const entries = await this.getEntriesForLocale(uid, locale);

//         if (!entries || (Array.isArray(entries) && entries.length === 0))
//           continue;

//         const entriesArray = Array.isArray(entries) ? entries : [entries];

//         for (const entry of entriesArray) {
//           let slug = entry.slug;

//           // Handle Single Types without slug
//           if (contentType.kind === "singleType" && !slug) {
//             // Use content type name (API ID without namespace)
//             // e.g. api::home-page.home-page -> home-page -> home (if we strip -page? No, requirement says: "home-page" becomes "home"??
//             // Requirement: "For single types without a slug: Use {contentTypeName} (derived from API ID, e.g., "home-page" becomes "home")."
//             // Wait, "home-page" becomes "home" implies stripping "-page"?
//             // Or just using the name. Let's look at the example: "home-page" becomes "home".
//             // If the API ID is "about-us-page", does it become "about-us"?
//             // Let's assume we strip "-page" suffix if present for the URL segment.

//             let name = contentType.info.singularName;
//             if (name.endsWith("-page")) {
//               name = name.replace(/-page$/, "");
//             }
//             slug = name;
//           } else if (!slug) {
//             // Collection type without slug? Skip or use id?
//             // Requirement: "Assume each entry has a 'slug' field; add a URL for every entry's slug"
//             // If no slug, we might skip.
//             continue;
//           }

//           // URL Construction
//           // Base URL: https://your-domain.com/{locale}/{slug}/
//           // For default locale ('en'), omit the locale.

//           // We need to know the default locale.
//           // Ideally pass it in or fetch it. Let's fetch locales again or pass it.
//           // For efficiency, we should probably fetch default locale once.
//           // But here we are inside the loop.

//           // Let's assume 'en' is default for now as per example, or better, check the isDefault property if available in locales.
//           // But getLocales returns all. We can find the default one.

//           // Let's just implement the logic:
//           // If locale === 'en', url = origin + / + slug + /
//           // Else url = origin + / + locale + / + slug + /

//           // Wait, we need to be sure about the default locale.
//           // strapi.plugin('i18n').service('locales').getDefaultLocale() might exist?
//           // Let's try to get default locale in the controller and pass it, or fetch here.

//           // For now, I will assume 'en' is default based on the prompt example,
//           // BUT I will try to fetch it to be robust.

//           let url = "";
//           const isDefault = locale === "en"; // simplified assumption from prompt example "For the default locale ('en')"

//           // However, to be safe, let's check if we can get the default locale.
//           // const defaultLocale = await strapi.plugin('i18n').service('locales').getDefaultLocale();
//           // if (defaultLocale === locale) ...

//           // Since I cannot be 100% sure of the API for getDefaultLocale without checking,
//           // and the prompt explicitly says "For the default locale ('en')", I will stick to 'en' check
//           // OR better, I will fetch all locales in the controller and pass the default one's code.

//           // Refactoring: I'll assume the controller passes the 'isDefault' flag or I'll just use 'en' for now
//           // to match the prompt's specific example.
//           // Actually, I'll add a helper to check default locale if possible, but 'en' is safe per requirements.

//           if (locale === "en") {
//             url = `${origin}/${slug}/`;
//           } else {
//             url = `${origin}/${locale}/${slug}/`;
//           }

//           urls.push({ loc: url });
//         }
//       }

//       return buildUrlSetXml(urls);
//     },
//   })
// );
