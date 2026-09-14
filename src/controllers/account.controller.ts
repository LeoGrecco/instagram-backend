import { Request, Response } from 'express';
import { accountStore } from '../stores/account.store';

export class AccountController {
  public getProfile(req: Request, res: Response): void {
    const account = req.accountId ? accountStore.findById(req.accountId) : undefined;
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }
    res.json({ id: account.id, name: account.name, email: account.email, createdAt: account.createdAt, instagramConnected: Boolean(account.instagramAccessToken) });
  }

  public connectInstagram(req: Request, res: Response): void {
    const token = typeof req.body.accessToken === 'string' ? req.body.accessToken.trim() : '';
    if (!token) {
      res.status(400).json({ message: 'Instagram accessToken is required' });
      return;
    }
    const account = req.accountId ? accountStore.updateInstagramToken(req.accountId, token) : undefined;
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }
    res.json({ instagramConnected: true });
  }
}