import { Router } from 'express';
import { validateMiddleware } from '../../middlewares/validate.middleware.js';
import {
  httpCreateComment,
  httpDeleteComment,
  httpFindPostComments,
} from './comments.controller.js';
import { commentSchema } from './comments.schemas.js';

const commentsRouter = Router();

commentsRouter.post('/', validateMiddleware(commentSchema), httpCreateComment);
commentsRouter.get('/', httpFindPostComments);
commentsRouter.delete('/:id', httpDeleteComment);

export { commentsRouter };
