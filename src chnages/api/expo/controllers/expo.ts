/** expo controller */

import { Context } from "koa";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::expo.expo",
  ({ strapi }) => ({
    async getYears(ctx: Context) {
      const expoTypes = await strapi.db
        .query("api::expo-type.expo-type")
        .findMany({
          populate: ["main_expo"],
        });

      if (!expoTypes) {
        ctx.throw(400, "expo_type not found");
      }

      const excludeExpos = Array.from(
        new Set(
          expoTypes
            .filter((et) => et.main_expo)
            .map((et) => et.main_expo.documentId)
        )
      );

      // Fetch expos with expo_type relation
      const expos = await strapi.db.query("api::expo.expo").findMany({
        select: ["start_date"],
        populate: ["expo_type"],
        where: {
          documentId: {
            $notIn: excludeExpos,
          },
          expo_type: {
            $notNull: true,
          },
        },
      });

      // Group years by expo type
      const yearsFiltered: Record<string, number[]> = {};

      expos.forEach((expo) => {
        const year = new Date(expo.start_date).getFullYear();
        const typeName = expo.expo_type?.slug || "uncategorized";

        if (!yearsFiltered[typeName]) {
          yearsFiltered[typeName] = [];
        }

        if (!yearsFiltered[typeName].includes(year)) {
          yearsFiltered[typeName].push(year);
        }
      });

      // Sort years within each type
      Object.keys(yearsFiltered).forEach((type) => {
        yearsFiltered[type].sort((a, b) => a - b);
      });

      ctx.body = { years: yearsFiltered };
    },
  })
);
