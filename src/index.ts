// import type { Core } from '@strapi/strapi';
import axios from "axios";
import { registerSEOMiddleware } from "./utils/seo/structuredData";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    registerSEOMiddleware(strapi);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */

  async bootstrap({ strapi }) {
    const url = process.env.FRONT_REVALIDATE_URL;
    const secret = process.env.REVALIDATE_SECRET;
    const bypassToken = process.env.VERCEL_BYPASS_TOKEN;

    // Register global lifecycles for all models
    const models = Object.keys(strapi.contentTypes);

    models
      .filter((modelName) => !modelName.includes("-request"))
      .forEach((modelName) => {
        const model = strapi.contentTypes[modelName];
        if (model.kind === "collectionType" || model.kind === "singleType") {
          strapi.db.lifecycles.subscribe({
            models: [modelName],
            async afterUpdate(event: any) {
              if (
                [
                  "api::global.global",
                  "plugin::navigation.navigation-item",
                ].includes(modelName)
              ) {
                await triggerRevalidation(event);
              }
            },
            async afterCreate(event: any) {
              await triggerRevalidation(event);
              if (model.attributes?.include_sitemap) {
                await sitemapRegenerate();
              }
            },
            async afterDelete(event: any) {
              await triggerRevalidation(event);
              if (model.attributes?.include_sitemap) {
                await sitemapRegenerate();
              }
            },
          });
        }
      });

    async function triggerRevalidation(event: any) {
      if (!url) {
        strapi.log.info("URL missing");
        return;
      }

      const data = event.params?.data;
      // Check if data does not exist for actions other than 'afterDelete'
      if (
        (typeof data === "undefined" || data === null) &&
        event.action !== "afterDelete"
      ) {
        return;
      }

      try {
        const response = await axios.post(
          url,
          { /* path: data?.locale ? `/${data.locale}` : , */ type: "page" },
          {
            headers: {
              "Content-Type": "application/json",
              "x-webhook-secret": secret ?? "",
              "x-vercel-protection-bypass": bypassToken ?? "",
            },
            timeout: 8000,
            validateStatus: () => true,
          }
        );
        strapi.log.info(
          `Revalidation response ${response.status} - ${response.statusText}`
        );
      } catch (error) {
        strapi.log.error("Failed to revalidate Next.js homepage", error);
      }
    }

    async function sitemapRegenerate() {
      try {
        const sitemapService = strapi.service("api::sitemap-xml.sitemap-xml");
        await sitemapService.buildSitemapIndex("sitemap.xml", true);

        strapi.log.info("Sitemap regenerated successfully");
      } catch (error) {
        strapi.log.error("Failed to regenerate sitemap", error);
      }
    }
  },
};
