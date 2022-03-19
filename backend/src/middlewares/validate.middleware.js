import { HttpError } from '../utils/HttpError.js';

function validateMiddleware(schema) {
  return async function (req, res, next) {
    try {
      await schema.validate(req.body);
    } catch (error) {
      return next(new HttpError(error.message, 400));
    }
    return next();
  };
}

export { validateMiddleware };
