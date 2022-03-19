import { createNewUser } from '../../models/user.model.js';
import { signupSchema } from './auth.schemas.js';
import { generatePassword } from './helpers.js';

async function authController(req, res) {
  const { email } = req.user;
  return res.status(200).json({ user: { email } });
}

async function signupController(req, res) {
  try {
    await signupSchema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ error });
  }
  try {
    const { salt, hashedPassword: password } = generatePassword(
      req.body.password
    );
    const fields = { ...req.body, password, salt };
    const user = await createNewUser(fields);
    const { email } = user;
    return res.status(201).json({ user: { email } });
  } catch (error) {
    if (error.code && error.code === 11000) {
      if (error.keyValue && error.keyValue.email) {
        return res.status(400).json({
          error: { path: 'email', message: 'Email is already in use' },
        });
      } else if (error.keyValue && error.keyValue.handle) {
        return res.status(400).json({
          error: { path: 'handle', message: 'Handle is already in use' },
        });
      }
    }
    return res.status(400).json({ error });
  }
}

async function signoutController(req, res) {
  req.logout();
  return res.redirect('/');
}

export { authController, signupController, signoutController };
