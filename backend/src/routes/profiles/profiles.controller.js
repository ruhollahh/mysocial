import { updateUser } from '../../models/user.model.js';
import { HttpError } from '../../utils/HttpError.js';
import 'dotenv/config';
import { profileSchema } from './profiles.schemas.js';
import { linkify } from './helpers.js';

const baseURL = process.env.BASE_URL;

async function httpUpdateProfile(req, res, next) {
  const { handle } = req.query;
  if (handle !== req.user.handle) {
    return next(new HttpError('Unauthorized', 403));
  }

  const image = req.file ? `${baseURL}/${req.file?.path}` : undefined;
  const website = req.body.website ? linkify(req.body.website) : undefined;

  const fields = { ...req.body, image, website };

  try {
    await profileSchema.validate(fields);
  } catch (error) {
    return next(new HttpError(error.message, 400));
  }

  try {
    const user = await updateUser(req.user._id, fields);
    res.status(200).json({ user });
  } catch (error) {
    if (error.code === 11000 && error.keyValue?.handle) {
      return next(new HttpError('Handle is already in use', 400));
    }
    return next(new HttpError(error.message, 500));
  }
}

export { httpUpdateProfile };
