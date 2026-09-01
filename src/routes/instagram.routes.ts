import { Router } from 'express';
import InstagramController from '../controllers/instagram.controller';

const router = Router();
const instagramController = new InstagramController();

export const setRoutes = () => {
    router.get('/posts', instagramController.getPosts.bind(instagramController));
    return router;
};