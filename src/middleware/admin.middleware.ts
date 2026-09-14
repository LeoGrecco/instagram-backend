import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (!token || !authService.isAdminSession(token)) {
    res.status(401).json({ message: 'Owner authentication required' });
    return;
  }
  next();
};