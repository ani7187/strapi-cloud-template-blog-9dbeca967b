'use strict';
const bootstrap = require("./bootstrap");
const diagnose = require("./diagnose-s3");

const migrateMedia = require("./migrate-media-to-s3");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    strapi.server.httpServer.on('listening', async () => {
      await migrateMedia({ strapi });
    });
    /* await bootstrap();
    try {
        await diagnose();
    } catch (error) {
        strapi.log.error('S3 Diagnostic failed:', error);
    } */
   
  },

};
