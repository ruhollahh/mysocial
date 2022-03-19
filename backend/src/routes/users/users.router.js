import { Router } from 'express';
import { httpUpdateProfile } from './users.controller.js';
import { fileUploadMiddleware } from '../../middlewares/fileUpload.middleware.js';

const usersRouter = Router();

usersRouter.put(
  '/:id',
  fileUploadMiddleware.single('image'),
  httpUpdateProfile
);

export { usersRouter };
