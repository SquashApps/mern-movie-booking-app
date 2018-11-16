const config = {
  APP_PORT: process.env.APP_PORT || 8080,
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_HOST: process.env.API_HOST || 'localhost',  // valid values: localhost, stage, prod
};

module.exports = config;
