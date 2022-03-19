import fs from 'fs';
import { HttpError } from '../utils/HttpError.js';

function errorHandlerMiddleware(error, req, res, next) {
  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      console.error(error);
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.code).json({ message: error.message });
  }

  return next(error);
}

export { errorHandlerMiddleware };
