export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'nestjs_bff',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  oauth2: {
    clientId: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.OAUTH2_CLIENT_SECRET,
    callbackUrl: process.env.OAUTH2_CALLBACK_URL,
  },
  apiKey: process.env.STATIC_API_KEY || 'default-api-key',
  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60,
    limit: parseInt(process.env.RATE_LIMIT_LIMIT, 10) || 100,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
});