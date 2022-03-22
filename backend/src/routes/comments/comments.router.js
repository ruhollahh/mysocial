import { Router } from 'express';
import { validateMiddleware } from '../../middlewares/validate.middleware.js';
import {
  httpCreateComment,
  httpDeleteComment,
  httpFindComments,
} from './comments.controller.js';
import { commentSchema } from './comments.schemas.js';

const commentsRouter = Router();

commentsRouter.post('/', validateMiddleware(commentSchema), httpCreateComment);
commentsRouter.get('/', httpFindComments);
commentsRouter.delete('/:id', httpDeleteComment);

export { commentsRouter };
