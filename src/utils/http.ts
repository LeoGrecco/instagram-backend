import axios from 'axios';

export const get = async (url: string, headers?: Record<string, string>) => {
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`GET request failed: ${message}`);
    }
};

export const post = async (url: string, data: any, headers?: Record<string, string>) => {
    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`POST request failed: ${message}`);
    }
};