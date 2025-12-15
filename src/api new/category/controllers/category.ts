/**
 *  category controller
 */

import { factories } from "@strapi/strapi";
import { Context } from "koa";

export default factories.createCoreController("api::category.category", ({ strapi }) => ({
    async getCategoriesByType(ctx: Context) {
      const { type } = ctx.params as { type: string };

      const typeToCollection: Record<string, string> = {
        article: "api::article.article",
        blog: "api::blog-post.blog-post",
      };

      if (!Object.prototype.hasOwnProperty.call(typeToCollection, type)) {
        return ctx.badRequest(
          "Invalid type value. Expected 'article' or 'blog'."
        );
      }

      const relatedCollection = typeToCollection[type];

      try {
        // Fetch only category documentIds directly with query projection
        const items = await strapi.db.query(relatedCollection).findMany({
          select: ["id"], // only need this field
          where: {
            article_category: { $notNull: true },
          },
          populate: { article_category: true },
        });

        // Flatten and deduplicate all documentIds
        const categories = [
          ...new Map(
            items
              .map((item: any) => item.article_category)
              .filter(Boolean)
              .map((cat: any) => [cat.documentId, cat])
          ).values(),
        ];

        if (!categories.length) {
          return ctx.send([]);
        }

        ctx.send(categories);
      } catch (err) {
        strapi.log.error(err);
        return ctx.internalServerError("Something went wrong");
      }
    },
  })
);
