import fs from 'fs';

function errorHandlerMiddleware(error, req, res, next) {
  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      console.error(error);
    });
  }

  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.code || 500).json({ error });
}

export { errorHandlerMiddleware };
