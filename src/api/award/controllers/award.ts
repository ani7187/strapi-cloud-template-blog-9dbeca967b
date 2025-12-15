/**
 * award controller
 */

import { factories } from "@strapi/strapi";
import { Context } from "koa";

export default factories.createCoreController(
  "api::award.award",
  ({ strapi }) => ({
    /**
     * Custom endpoint: GET /api/awards/years
     */
    async getUniqueYears(ctx: Context) {
      const awards = await strapi.db.query("api::award.award").findMany({
        select: ["year"],
      });

      // Extract unique years, filter out null/undefined, sort ascending
      const years = Array.from(
        new Set(
          awards
            .map((a) => Number(a.year)) // convert string to number
            .filter((y) => !isNaN(y)) // remove invalid numbers
        )
      ).sort((a, b) => a - b);

      ctx.body = { years };
    },

    async findProducts() {
      // Fetch awards with related products
      const awards = await strapi.db.query("api::award.award").findMany({
        populate: {
          products: true, // populate the relation
        },
      });

      // Collect all related products
      const allProducts = awards.flatMap((award: any) => award.products || []);

      // Deduplicate products by documentId
      const uniqueProducts = Object.values(
        allProducts.reduce((acc: Record<string, any>, product: any) => {
          if (product.documentId) {
            acc[product.documentId] = product;
          }
          return acc;
        }, {})
      );

      return uniqueProducts;
    },

    async findCategories() {
      const categories = await strapi.db.query("api::award.award").findMany({
        select: ["title"],
      });

      const uniqueCategories = Array.from(
        new Set(categories.map((a: any) => a.title))
      );

      return uniqueCategories;
    },
  })
);
