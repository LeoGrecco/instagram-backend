import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import { requireAuth } from '../middleware/auth.middleware';

export const setAccountRoutes = (): Router => {
  const router = Router();
  const controller = new AccountController();
  router.use(requireAuth);
  router.get('/', controller.getProfile.bind(controller));
  router.put('/instagram', controller.connectInstagram.bind(controller));
  return router;
};