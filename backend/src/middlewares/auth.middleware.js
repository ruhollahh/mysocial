import { HttpError } from '../utils/HttpError.js';

function authMiddleware(req, res, next) {
  if (!req.isAuthenticated()) {
    return next(new HttpError('Unauthenticated', 401));
  }
  return next();
}

export { authMiddleware };
