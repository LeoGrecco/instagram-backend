import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const setAuthRoutes = (): Router => {
  const router = Router();
  const controller = new AuthController();
  router.post('/register', controller.register.bind(controller));
  router.post('/login', controller.login.bind(controller));
  router.post('/admin-login', controller.adminLogin.bind(controller));
  return router;
};