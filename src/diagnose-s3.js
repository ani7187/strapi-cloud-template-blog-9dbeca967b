require('dotenv').config();
const { S3Client, ListBucketsCommand, PutObjectCommand } = require('@aws-sdk/client-s3');

async function diagnose() {
  console.log('--- Starting S3 Diagnostics ---');

  const requiredVars = [
    'AWS_ACCESS_KEY_ID',
    'AWS_ACCESS_SECRET',
    'AWS_REGION',
    'AWS_BUCKET',
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '));
    console.log('Please ensure these are set in your production environment.');
    return;
  }

  console.log('✅ All required environment variables are present.');
  console.log(`Region: ${process.env.AWS_REGION}`);
  console.log(`Bucket: ${process.env.AWS_BUCKET}`);

  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
  });

  try {
    console.log('Attempting to list buckets...');
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log('✅ Successfully connected to AWS S3.');
    console.log('Buckets found:', data.Buckets.map(b => b.Name).join(', '));
    
    const bucketExists = data.Buckets.some(b => b.Name === process.env.AWS_BUCKET);
    if (bucketExists) {
        console.log(`✅ Bucket "${process.env.AWS_BUCKET}" found in account.`);
    } else {
        console.warn(`⚠️ Bucket "${process.env.AWS_BUCKET}" NOT found in account. Check spelling or permissions.`);
    }

  } catch (err) {
    console.error('❌ Failed to connect to AWS S3 or list buckets.');
    console.error('Error:', err.message);
    if (err.name === 'InvalidAccessKeyId') {
        console.error('Hint: Check your AWS_ACCESS_KEY_ID.');
    } else if (err.name === 'SignatureDoesNotMatch') {
        console.error('Hint: Check your AWS_ACCESS_SECRET.');
    }
  }
  
  // Optional: Try to upload a small test file
  try {
      console.log(`Attempting to upload a test file to ${process.env.AWS_BUCKET}...`);
      const testKey = 'diagnostic-test-' + Date.now() + '.txt';
      await s3Client.send(new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: testKey,
          Body: 'This is a test file from the diagnostic script.',
      }));
      console.log(`✅ Successfully uploaded test file: ${testKey}`);
  } catch (err) {
      console.error('❌ Failed to upload test file.');
      console.error('Error:', err.message);
  }

  console.log('--- Diagnostics Complete ---');
}

module.exports = diagnose;
