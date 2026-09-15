import { Request, Response } from 'express';
import { findAccountById } from '../repositories/account.data';
import { InstagramService } from '../services/instagram.service';

export class InstagramController {
  private instagramService!: InstagramService;

  constructor() {}

  public async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const account = req.accountId ? await findAccountById(req.accountId) : undefined;
      if (!account?.instagramAccessToken) {
        res.status(422).json({ message: 'Instagram account is not configured' });
        return;
      }
      this.instagramService = new InstagramService(account.instagramAccessToken);
      const posts = await this.instagramService.fetchPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Instagram fetch failed', error instanceof Error ? error.message : error);
      res.status(500).json({ message: 'Error fetching posts' });
    }
  }
}