import { Router } from 'express';
import { BillingController } from '../controllers/billing.controller';
import { requireAuth } from '../middleware/auth.middleware';

export const setBillingRoutes = (): Router => {
  const router = Router();
  const controller = new BillingController();
  router.post('/webhooks/asaas', controller.webhook.bind(controller));
  router.post('/subscribe', requireAuth, controller.subscribe.bind(controller));
  return router;
};