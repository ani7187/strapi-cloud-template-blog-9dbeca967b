'use strict';

const fs = require('fs'); // Use native fs for streams if needed, or fs-extra
const axios = require('axios');
const path = require('path');
const os = require('os');

async function migrateMedia({ strapi }) {
  try {
    console.log('🚀 Starting media migration from Strapi Cloud to S3...');

    // 1. Query files to migrate
    // We look for files where the URL contains 'strapiapp.com' (Strapi Cloud default domain)
    // Adjust the query if your old URLs follow a different pattern.
    const filesToMigrate = await strapi.db.query('plugin::upload.file').findMany({
      where: {
        provider: {
          $ne: 'aws-s3', // optimization: skip if already marked as aws-s3 (though URL check should suffice)
        },
        // name: {
        //   $eq: 'symbol_of_Armenia.png', // optimization: skip if already marked as aws-s3 (though URL check should suffice)
        // },
      },
      // start: 3,
      // limit: 1, // Process in batches if you have massive amounts, but 10k is a reasonable start
    });

    console.log(filesToMigrate);
    
    console.log(`Found ${filesToMigrate.length} files to migrate.`);

    if (filesToMigrate.length === 0) {
      console.log('No files found to migrate.');
      return;
    }

    const uploadService = strapi.plugin('upload').service('upload');

    let successCount = 0;
    let errorCount = 0;

    for (const file of filesToMigrate) {
      let tempFilePath = null;
      try {
        console.log(`Processing: ${file.name} ${file.url} (ID: ${file.id})`);
        
        // 2. Download file
        // Ensure URL is absolute if needed, though for Strapi Cloud it should be absolute.
        const fileUrl = file.url.startsWith('http') ? file.url : `http://localhost:1337${file.url}`;
        
        console.log(fileUrl);
        const response = await axios({
          method: 'GET',
          url: fileUrl,
          responseType: 'arraybuffer',
        });

        const buffer = Buffer.from(response.data);

        // Write buffer to a temp file because Strapi expects a filepath
        const tempDir = os.tmpdir();
        tempFilePath = path.join(tempDir, file.name);
        fs.writeFileSync(tempFilePath, buffer);

        // 3. Use Strapi's replace functionality
        // This handles uploading to the new provider (S3), deleting from old (if matching),
        // and updating the database record.

        const fileForUpload = {
          data: {
            fileInfo: {
              name: file.name,
              caption: file.caption,
              alternativeText: file.alternativeText,
            },
          },
          file: {
            originalFilename: file.name,
            mimetype: file.mime,
            size: buffer.length,
            filepath: tempFilePath,
          },
        };
        await uploadService.replace(file.id, fileForUpload);

        console.log(`✅ Migrated: ${file.name}`);

        successCount++;

      } catch (err) {
        console.error(`❌ Failed to migrate file ID ${file.id} (${file.name}):`, err.message);
        errorCount++;
      } finally {
        // Clean up temp file if it exists
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
      }
    } 

    console.log('------------------------------------------------');
    console.log(`Migration complete.`);
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);

  } catch (error) {
    console.error('Fatal error during migration:', error);
  }
}

module.exports = migrateMedia;