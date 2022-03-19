import { Router } from 'express';

import passport from 'passport';

import {
  authController,
  signupController,
  signoutController,
} from './auth.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validateMiddleware } from '../../middlewares/validate.middleware.js';
import { signinSchema, signupSchema } from './auth.schemas.js';

const authRouter = Router();

authRouter.get('/me', authMiddleware, authController);

authRouter.post('/signup', validateMiddleware(signupSchema), signupController);

authRouter.post(
  '/signin',
  validateMiddleware(signinSchema),
  passport.authenticate('local'),
  authController
);

authRouter.get('/signout', signoutController);

export { authRouter };
