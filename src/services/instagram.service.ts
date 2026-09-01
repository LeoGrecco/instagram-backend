import axios from 'axios';
import { ENV } from '../config/env';
import { Post } from '../types';

export class InstagramService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async fetchPosts(): Promise<Post[]> {
    if (!this.accessToken) {
      throw new Error('INSTAGRAM_ACCESS_TOKEN is missing. Add it to the .env file.');
    }

    try {
      const response = await axios.get(`${ENV.INSTAGRAM_API_URL}/me/media`, {
        params: {
          access_token: this.accessToken,
          fields: 'id,caption,media_type,media_url,thumbnail_url,timestamp'
        }
      });

      return response.data.data as Post[];
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch posts: ${message}`);
    }
  }
}