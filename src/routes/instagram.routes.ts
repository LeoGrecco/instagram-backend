import { Router } from 'express';
import { InstagramController } from '../controllers/instagram.controller';

export const setRoutes = () => {
  const router = Router();
  const instagramController = new InstagramController();

  router.get('/posts', instagramController.getPosts.bind(instagramController));
  return router;
};