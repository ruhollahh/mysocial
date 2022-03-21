import { Router } from 'express';
import { httpUpdateProfile } from './profiles.controller.js';
import { fileUploadMiddleware } from '../../middlewares/fileUpload.middleware.js';

const profilesRouter = Router();

profilesRouter.put(
  '/',
  fileUploadMiddleware.single('image'),
  httpUpdateProfile
);

export { profilesRouter };
