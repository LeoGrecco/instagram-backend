import { Request, Response } from 'express';
import { ENV } from '../config/env';
import { InstagramService } from '../services/instagram.service';

export class InstagramController {
  private instagramService: InstagramService;

  constructor() {
    this.instagramService = new InstagramService(ENV.INSTAGRAM_ACCESS_TOKEN);
  }

  public async getPosts(_req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.instagramService.fetchPosts();
      res.status(200).json(posts);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ message: 'Error fetching posts', error: message });
    }
  }
}