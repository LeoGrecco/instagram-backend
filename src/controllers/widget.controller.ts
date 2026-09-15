import { Request, Response } from 'express';
import { findAccountById } from '../repositories/account.data';
import { InstagramService } from '../services/instagram.service';

export class WidgetController {
  public async posts(req: Request, res: Response): Promise<void> {
    const account = await findAccountById(req.params.accountId);
    if (!account?.instagramAccessToken) {
      res.status(422).json({ message: 'This widget is not connected to Instagram yet' });
      return;
    }
    try {
      const posts = await new InstagramService(account.instagramAccessToken).fetchPosts();
      res.json({ account: account.name, posts });
    } catch {
      res.status(502).json({ message: 'Instagram is temporarily unavailable' });
    }
  }
}