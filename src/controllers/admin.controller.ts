import { Request, Response } from 'express';
import { accountStore } from '../stores/account.store';
import { asaasService } from '../services/asaas.service';
import { asaasStore } from '../stores/account.store';
import { listAccounts } from '../repositories/account.data';

export class AdminController {
  public asaasSettings(_req: Request, res: Response): void {
    res.json(asaasStore.list().map((account) => ({ ...account, apiKey: `${account.apiKey.slice(0, 8)}...${account.apiKey.slice(-4)}` })));
  }

  public addAsaasAccount(req: Request, res: Response): void {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const apiKey = typeof req.body.apiKey === 'string' ? req.body.apiKey.trim() : '';
    const environment = req.body.environment === 'production' ? 'production' : 'sandbox';
    const walletId = typeof req.body.walletId === 'string' ? req.body.walletId.trim() : undefined;
    if (!name || !apiKey) {
      res.status(400).json({ message: 'Name and Asaas API key are required' });
      return;
    }
    const account = asaasStore.create({ name, apiKey, environment, walletId, active: true });
    res.status(201).json({ ...account, apiKey: `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}` });
  }

  public async testAsaasConnection(req: Request, res: Response): Promise<void> {
    const account = asaasStore.findById(req.params.id);
    if (!account) {
      res.status(404).json({ message: 'Asaas account not found' });
      return;
    }
    try {
      const result = await asaasService.testConnection(account);
      res.json({ connected: true, ...result });
    } catch {
      res.status(502).json({ connected: false, message: 'Asaas rejected the credentials or is unavailable' });
    }
  }

  public async overview(_req: Request, res: Response): Promise<void> {
    const accounts = await listAccounts();
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

  public async accounts(_req: Request, res: Response): Promise<void> {
    const accounts = await listAccounts();
    res.json(accounts.map((account) => ({ id: account.id, name: account.name, email: account.email, plan: account.plan, connected: Boolean(account.instagramAccessToken), createdAt: account.createdAt })));
  }
}