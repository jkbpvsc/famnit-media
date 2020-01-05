import { Router } from 'express'
import { protectedRoute, adminRoute } from "../middleware/protected";
import {createVideo, getVideoById, getVideos, updateVideoById} from "../controllers/video";
import { login, addUser } from '../controllers/user';
import { verifyToken } from '../controllers/auth';

const router = new Router();

// Video routes
router.post('/videos', adminRoute, createVideo);
router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);
router.put('/videos/:id', protectedRoute, updateVideoById);

// User / Auth routes
router.post('/login', login);
router.post('/user', adminRoute, addUser);
router.get('/verify', protectedRoute, verifyToken);

export default router;
