import { Request, Response } from 'express';
import { findAccountById, updateInstagramToken } from '../repositories/account.data';

export class AccountController {
  public async getProfile(req: Request, res: Response): Promise<void> {
    const account = req.accountId ? await findAccountById(req.accountId) : undefined;
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }
    res.json({ id: account.id, name: account.name, email: account.email, createdAt: account.createdAt, instagramConnected: Boolean(account.instagramAccessToken) });
  }

  public async connectInstagram(req: Request, res: Response): Promise<void> {
    const token = typeof req.body.accessToken === 'string' ? req.body.accessToken.trim() : '';
    if (!token) {
      res.status(400).json({ message: 'Instagram accessToken is required' });
      return;
    }
    const account = req.accountId ? await updateInstagramToken(req.accountId, token) : undefined;
    if (!account) {
      res.status(404).json({ message: 'Account not found' });
      return;
    }
    res.json({ instagramConnected: true });
  }
}