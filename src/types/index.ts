export interface Post {
    id: string;
    caption: string;
    media_url: string;
    timestamp: string;
    username: string;
}

export interface User {
    id: string;
    username: string;
    full_name: string;
    profile_picture: string;
}

export interface Account {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    instagramAccessToken?: string;
    plan: 'starter' | 'studio' | 'agency';
    createdAt: string;
}

export interface SessionAccount {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface AsaasAccount {
    id: string;
    name: string;
    environment: 'sandbox' | 'production';
    apiKey: string;
    walletId?: string;
    active: boolean;
    createdAt: string;
}