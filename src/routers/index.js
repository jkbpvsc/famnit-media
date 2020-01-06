import { Router } from 'express'
import { protectedRoute, adminRoute } from "../middleware/protected";
import { createVideo, getVideoById, getVideos, updateVideoById } from "../controllers/video";
import { login, addUser } from '../controllers/user';
import { verifyToken } from '../controllers/auth';
import { getCategories, getSubcategories, getCategoryById, updateCategoryById, createCategory } from '../controllers/category';

const router = new Router();

// Category routes
router.get('/categories', getCategories);
router.get('/categories/:id/subcategories', getSubcategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', adminRoute, updateCategoryById);
router.post('/categories', adminRoute, createCategory);

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
