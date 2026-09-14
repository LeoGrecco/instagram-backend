import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { accountStore } from '../stores/account.store';
import { ENV } from '../config/env';

const publicAccount = (account: { id: string; name: string; email: string; createdAt: string }) => ({
  id: account.id,
  name: account.name,
  email: account.email,
  createdAt: account.createdAt,
});

export class AuthController {
  public register(req: Request, res: Response): void {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    const requestedPlan = req.body.plan;
    const plan = requestedPlan === 'studio' || requestedPlan === 'agency' ? requestedPlan : 'starter';
    if (!name || !email.includes('@') || password.length < 8) {
      res.status(400).json({ message: 'Name, valid email and password with at least 8 characters are required' });
      return;
    }
    if (accountStore.findByEmail(email)) {
      res.status(409).json({ message: 'Email is already registered' });
      return;
    }
    const account = accountStore.create({ name, email, passwordHash: authService.hashPassword(password), plan });
    res.status(201).json({ account: publicAccount(account), token: authService.createSession(account) });
  }

  public login(req: Request, res: Response): void {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    const account = accountStore.findByEmail(email);
    if (!account || !authService.verifyPassword(password, account.passwordHash)) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    res.status(200).json({ account: publicAccount(account), token: authService.createSession(account) });
  }

  public adminLogin(req: Request, res: Response): void {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    if (email !== ENV.ADMIN_EMAIL.toLowerCase() || password !== ENV.ADMIN_PASSWORD) {
      res.status(401).json({ message: 'Invalid owner credentials' });
      return;
    }
    res.json({ token: authService.createAdminSession(), owner: { email: ENV.ADMIN_EMAIL } });
  }
}