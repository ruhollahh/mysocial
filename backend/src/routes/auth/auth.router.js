import { Router } from "express";
import cookieSession from "cookie-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "../../models/user.mongo.js";
import {
  authController,
  signupController,
  signoutController,
} from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { verifyPassword } from "./helpers.js";

const authRouter = Router();

const customFields = {
  usernameField: "email",
  passwordField: "password",
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
    const user = await User.findOne({ email }, "-salt -password");
    done(null, user);
  } catch (error) {
    done(error);
  }
});

authRouter.use(
  cookieSession({
    name: "session",
    keys: ["lol"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.get("/me", authMiddleware, authController);

authRouter.post("/signup", signupController);

authRouter.post("/signin", passport.authenticate("local"), authController);

authRouter.get("/signout", signoutController);

export { authRouter };
