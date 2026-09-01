import { Request, Response } from 'express';
import { InstagramService } from '../services/instagram.service';

export class InstagramController {
    private instagramService: InstagramService;

    constructor() {
        this.instagramService = new InstagramService();
    }

    public async getPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await this.instagramService.fetchPosts();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error });
        }
    }
}