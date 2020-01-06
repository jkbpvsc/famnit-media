import { Router } from 'express'
import { adminRoute } from "../middleware/protected";
import { createVideo, getVideoById, getVideos, updateVideoById } from "../controllers/video";
import { login, addUser } from '../controllers/user';
import { verifyToken } from '../controllers/auth';
import { getCategories, getSubcategories, getCategoryById, updateCategoryById, createCategory } from '../controllers/category';
import { deleteCategoryById } from '../model_controllers/category';
import { deleteVideoById, getVideoByCategoryId } from '../model_controllers/video';

const router = new Router();

router.get('/', (_, res) => res.send('ok'))

// Video routes
router.post('/videos', adminRoute, createVideo);
router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);
router.put('/videos/:id', adminRoute, updateVideoById);
router.delete('/video/:id', adminRoute, deleteVideoById);
router.get('/categories/:id/videos', getVideoByCategoryId);

// Category routes
router.get('/categories', getCategories);
router.get('/categories/:id/subcategories', getSubcategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', adminRoute, updateCategoryById);
router.post('/categories', adminRoute, createCategory);
router.delete('/categories/:id', adminRoute, deleteCategoryById);

// User / Auth routes
router.post('/login', login);
router.post('/user', adminRoute, addUser);
router.get('/verify', adminRoute, verifyToken);

export default router;
