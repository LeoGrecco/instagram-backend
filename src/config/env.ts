import { config } from 'dotenv';

config();

export const ENV = {
  PORT: Number(process.env.PORT || 3000),
  INSTAGRAM_API_URL: process.env.INSTAGRAM_API_URL || 'https://graph.instagram.com',
  INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN || '',
};