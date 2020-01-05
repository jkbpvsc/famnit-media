import { Router } from 'express'
import multer from 'multer';
import authRouter from "./auth";
import { protectedRoute } from "../middleware/protected";
import {createVideo, getVideoById, getVideos, updateVideoById} from "../controllers/video";

const router = new Router();
const upload = multer({ dest: 'temp'});

router.use('/auth', authRouter);

router.post('/videos', protectedRoute, upload.single('file'), createVideo);
router.get('/videos', getVideos);
router.get('/videos/:id', getVideoById);
router.put('/videos/:id', protectedRoute, updateVideoById);

export default router;
