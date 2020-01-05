import { Router } from 'express'
import multer from 'multer';
import {uploadController} from "../model_controllers";

const router = new Router();
const upload = multer({ dest: 'temp/ '})

router.post(
  '/upload',
  upload.single('video'),
  uploadController,
);


export default router;
