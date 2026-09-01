import axios from 'axios';

export const get = async (url: string, headers?: Record<string, string>) => {
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw new Error(`GET request failed: ${error.message}`);
    }
};

export const post = async (url: string, data: any, headers?: Record<string, string>) => {
    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error(`POST request failed: ${error.message}`);
    }
};