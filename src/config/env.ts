import { config } from 'dotenv';

config();

export const ENV = {
    PORT: process.env.PORT || 3000,
    INSTAGRAM_API_URL: process.env.INSTAGRAM_API_URL,
    INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,
};