import { createNewUser } from '../../models/user.model.js';
import { HttpError } from '../../utils/HttpError.js';
import { generatePassword } from './helpers.js';

async function authController(req, res) {
  const { email } = req.user;
  return res.status(200).json({ user: { email } });
}

async function signupController(req, res, next) {
  try {
    const { salt, hashedPassword: password } = generatePassword(
      req.body.password
    );
    const fields = { ...req.body, password, salt };
    const user = await createNewUser(fields);

    req.login(user, function (err) {
      if (err) {
        return next(new HttpError(err.message, 500));
      }
    });

    const { email } = user;
    return res.status(201).json({ user: { email } });
  } catch (error) {
    if (error.code && error.code === 11000) {
      if (error.keyValue && error.keyValue.email) {
        return next(new HttpError('Email is already in use', 400));
      } else if (error.keyValue && error.keyValue.handle) {
        return next(new HttpError('Handle is already in use', 400));
      }
    }
    return next(new HttpError(error.message, 400));
  }
}

async function signoutController(req, res) {
  req.logout();
  return res.redirect('/');
}

export { authController, signupController, signoutController };
