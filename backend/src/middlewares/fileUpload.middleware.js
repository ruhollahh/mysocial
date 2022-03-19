import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpError } from '../utils/HttpError.js';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const fileUploadMiddleware = multer({
  limits: 1024000,
  storage: multer.diskStorage({
    destination: 'uploads/images',
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${uuid()}.${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error = isValid ? null : new HttpError('Invalid mimetype', 400);
    cb(error, isValid);
  },
});

export { fileUploadMiddleware };
