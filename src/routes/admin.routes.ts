import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { requireAdmin } from '../middleware/admin.middleware';

export const setAdminRoutes = (): Router => {
  const router = Router();
  const controller = new AdminController();
  router.use(requireAdmin);
  router.get('/overview', controller.overview.bind(controller));
  router.get('/accounts', controller.accounts.bind(controller));
  return router;
};