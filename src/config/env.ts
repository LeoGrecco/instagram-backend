import { config } from 'dotenv';

config();

const isProduction = process.env.NODE_ENV === 'production';
const requiredInProduction = ['APP_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD', 'DATABASE_URL', 'ASAAS_WEBHOOK_TOKEN'];

if (isProduction) {
  const missing = requiredInProduction.filter((name) => !process.env[name]?.trim());
  const unsafe = [
    process.env.APP_SECRET === 'development-only-secret',
    process.env.ADMIN_PASSWORD === 'admin12345',
    process.env.ASAAS_WEBHOOK_TOKEN === 'change-me',
  ];
  if (missing.length || unsafe.some(Boolean)) {
    throw new Error(`Production secrets are missing or use an unsafe default: ${[...missing, ...(unsafe.some(Boolean) ? ['unsafe-default'] : [])].join(', ')}`);
  }
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 3000),
  INSTAGRAM_API_URL: process.env.INSTAGRAM_API_URL || 'https://graph.instagram.com',
  INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN || '',
  APP_SECRET: process.env.APP_SECRET || 'development-only-secret',
  SESSION_TTL_HOURS: Number(process.env.SESSION_TTL_HOURS || 24),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'owner@socialdeck.local',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin12345',
  DATABASE_URL: process.env.DATABASE_URL || '',
  ASAAS_API_KEY: process.env.ASAAS_API_KEY || '',
  ASAAS_ENVIRONMENT: process.env.ASAAS_ENVIRONMENT === 'production' ? 'production' : 'sandbox',
  ASAAS_WEBHOOK_TOKEN: process.env.ASAAS_WEBHOOK_TOKEN || '',
};
