import { Router } from 'express';
import { httpCreateLike, httpFindLike } from './likes.controller.js';

const likesRouter = Router();

likesRouter.post('/', httpCreateLike);
likesRouter.get('/', httpFindLike);

export { likesRouter };
