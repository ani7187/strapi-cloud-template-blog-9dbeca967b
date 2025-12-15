const configFactory = require('./config/env/production/plugins.js');

const mockEnv = (key, defaultValue) => defaultValue || 'mock-value';

try {
  const config = configFactory({ env: mockEnv });
  console.log('Config loaded successfully');
  console.log('RequestHandler instance:', config.upload.config.providerOptions.s3Options.requestHandler.constructor.name);
} catch (error) {
  console.error('Error loading config:', error);
  process.exit(1);
}
