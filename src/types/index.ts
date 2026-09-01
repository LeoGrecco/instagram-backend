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