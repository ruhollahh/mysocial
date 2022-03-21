import { Router } from 'express';
import { validateMiddleware } from '../../middlewares/validate.middleware.js';
import { httpCreatePost } from './posts.controller.js';
import { postSchema } from './posts.schemas.js';

const postsRouter = Router();

postsRouter.post('/', validateMiddleware(postSchema), httpCreatePost);

export { postsRouter };
