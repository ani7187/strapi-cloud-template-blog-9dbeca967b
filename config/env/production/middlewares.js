module.exports = [
  'strapi::logger',
  'strapi::errors',
  // 'strapi::security',
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  // 'strapi::body',
  {
    name: 'strapi::body',
    config: {
      formLimit: '1gb',
      jsonLimit: '1gb',
      textLimit: '1gb',
      formidable: {
        maxFileSize: 1024 * 1024 * 1024, // 1GB
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  
];
