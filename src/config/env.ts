import { config } from 'dotenv';

config();

export const ENV = {
  PORT: Number(process.env.PORT || 3000),
  INSTAGRAM_API_URL: process.env.INSTAGRAM_API_URL || 'https://graph.instagram.com',
  INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN || '',
  APP_SECRET: process.env.APP_SECRET || 'development-only-secret',
  SESSION_TTL_HOURS: Number(process.env.SESSION_TTL_HOURS || 24),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'owner@socialdeck.local',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin12345',
};