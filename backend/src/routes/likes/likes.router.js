import { Router } from 'express';
import {
  httpCreateLike,
  httpDeleteLike,
  httpFindLike,
} from './likes.controller.js';

const likesRouter = Router();

likesRouter.post('/', httpCreateLike);
likesRouter.get('/', httpFindLike);
likesRouter.delete('/:id', httpDeleteLike);

export { likesRouter };
