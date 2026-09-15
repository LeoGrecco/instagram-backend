import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { AuthController } from '../controllers/auth.controller';

const authRateLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false });

export const setAuthRoutes = (): Router => {
  const router = Router();
  const controller = new AuthController();
  router.post('/register', authRateLimit, controller.register.bind(controller));
  router.post('/login', authRateLimit, controller.login.bind(controller));
  router.post('/admin-login', authRateLimit, controller.adminLogin.bind(controller));
  return router;
};