import { Request, Response } from 'express';
import { accountStore } from '../stores/account.store';

export class AdminController {
  public overview(_req: Request, res: Response): void {
    const accounts = accountStore.list();
    res.json({
      metrics: {
        totalAccounts: accounts.length,
        connectedAccounts: accounts.filter((account) => Boolean(account.instagramAccessToken)).length,
        starter: accounts.filter((account) => account.plan === 'starter').length,
        monthlyRevenue: accounts.reduce((total, account) => total + (account.plan === 'agency' ? 129 : account.plan === 'studio' ? 49 : 19), 0),
      },
      recentAccounts: accounts.slice(-8).reverse().map((account) => ({ id: account.id, name: account.name, email: account.email, plan: account.plan, connected: Boolean(account.instagramAccessToken), createdAt: account.createdAt })),
    });
  }

  public accounts(_req: Request, res: Response): void {
    res.json(accountStore.list().map((account) => ({ id: account.id, name: account.name, email: account.email, plan: account.plan, connected: Boolean(account.instagramAccessToken), createdAt: account.createdAt })));
  }
}