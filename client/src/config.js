const config = {
  APP_PORT: process.env.APP_PORT || 8080,
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_HOST: process.env.API_HOST || 'localhost',
  API_PORT: process.env.API_PORT || 8081,
  HTTP_PROTOCOL: process.env.HTTP_PROTOCOL || 'http',
};

module.exports = config;
