/**
 * career controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::career.career', ({ strapi }) => ({
  /**
   * Return distinct locations, departments, seniorities and keywords
   * that are linked to at least one career entry.
   *
   * GET /career/filters
   */
  async filters(ctx) {
    // Pull only the relations we need – no extra fields are requested.
    const careers = await strapi.entityService.findMany('api::career.career', {
      populate: ['location', 'department', 'career_seniority', 'career_keywords'],
    });

    const locations   = new Map<number, any>();
    const departments = new Map<number, any>();
    const seniorities = new Map<number, any>();
    const keywords    = new Map<number, any>();

    (careers as any[]).forEach(c => {
      // ---- locations -------------------------------------------------
      if (c.location && c.location.id) {
        locations.set(c.location.id, c.location);
      }

      // ---- departments -----------------------------------------------
      if (c.department && c.department.id) {
        departments.set(c.department.id, c.department);
      }

      // ---- seniorities -----------------------------------------------
      if (c.career_seniority && c.career_seniority.id) {
        seniorities.set(c.career_seniority.id, c.career_seniority);
      }

      // ---- keywords --------------------------------------------------
      if (Array.isArray(c.career_keywords)) {
        c.career_keywords.forEach(k => {
          if (k && k.id) keywords.set(k.id, k);
        });
      }
    });

    ctx.send({
      data: {
        locations:   Array.from(locations.values()),
        departments: Array.from(departments.values()),
        seniorities: Array.from(seniorities.values()),
        keywords:    Array.from(keywords.values()),
      },
    });
  },
}));