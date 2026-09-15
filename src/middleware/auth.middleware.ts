import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { findAccountById } from '../repositories/account.data';

declare global {
  namespace Express {
    interface Request {
      accountId?: string;
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const header = req.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  const accountId = token ? authService.readSession(token) : undefined;
  if (!accountId || !(await findAccountById(accountId))) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }
  req.accountId = accountId;
  next();
};