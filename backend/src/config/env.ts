import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  refreshSecret: process.env.REFRESH_SECRET || 'refreshsecret',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  minItems: Number(process.env.MIN_ITEMS || 1),
  maxItems: Number(process.env.MAX_ITEMS || 5),
  purchaseCap: Number(process.env.PURCHASE_CAP || 1),
  downloadTokenSecret: process.env.DOWNLOAD_TOKEN_SECRET || 'downloadsecret',
  downloadTokenExpiration: process.env.DOWNLOAD_TOKEN_EXPIRATION || '30m'
};
