import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { accountStore } from '../stores/account.store';

declare global {
  namespace Express {
    interface Request {
      accountId?: string;
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  const accountId = token ? authService.readSession(token) : undefined;
  if (!accountId || !accountStore.findById(accountId)) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }
  req.accountId = accountId;
  next();
};