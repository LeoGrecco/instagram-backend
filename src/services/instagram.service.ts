import axios from 'axios';
import { Post } from '../types';

export class InstagramService {
    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    public async fetchPosts(): Promise<Post[]> {
        try {
            const response = await axios.get(`https://graph.instagram.com/me/media`, {
                params: {
                    access_token: this.accessToken,
                    fields: 'id,caption,media_type,media_url,thumbnail_url,timestamp'
                }
            });
            return response.data.data;
        } catch (error) {
            throw new Error(`Failed to fetch posts: ${error.message}`);
        }
    }
}