import Router from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import LocalStrategy from 'passport-local';
import { User } from '../models/user.mongo.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authRouter } from './auth/auth.router.js';
import { verifyPassword } from './auth/helpers.js';
import { usersRouter } from './users/users.router.js';

const v1 = Router();

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

async function verifyCallback(email, password, done) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false);
    }
    if (!verifyPassword(password, user.password, user.salt)) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

passport.use(new LocalStrategy(customFields, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await User.findOne({ email }, '-salt -password');
    done(null, user);
  } catch (error) {
    done(error);
  }
});

v1.use(
  cookieSession({
    name: 'session',
    keys: ['lol'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

v1.use(passport.initialize());
v1.use(passport.session());

v1.use('/auth', authRouter);
v1.use('/users', authMiddleware, usersRouter);

export { v1 };
