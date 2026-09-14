import { Router } from 'express';
import { InstagramController } from '../controllers/instagram.controller';
import { requireAuth } from '../middleware/auth.middleware';

export const setRoutes = () => {
  const router = Router();
  const instagramController = new InstagramController();

  router.get('/posts', requireAuth, instagramController.getPosts.bind(instagramController));
  return router;
};