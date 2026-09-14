import { Router } from 'express';
import { WidgetController } from '../controllers/widget.controller';

export const setWidgetRoutes = (): Router => {
  const router = Router();
  const controller = new WidgetController();
  router.get('/:accountId/posts', controller.posts.bind(controller));
  return router;
};