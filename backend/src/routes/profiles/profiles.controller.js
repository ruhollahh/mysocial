import { updateUser } from '../../models/user.model.js';
import { HttpError } from '../../utils/HttpError.js';
import 'dotenv/config';
import { profileSchema } from './profiles.schemas.js';
import { linkify } from './helpers.js';

const baseURL = process.env.BASE_URL;

async function httpUpdateProfile(req, res, next) {
  const { id } = req.params;
  if (id !== req.user._id.toString()) {
    return next(new HttpError('Unauthorized', 403));
  }

  const image = `${baseURL}/${req.file.path}`;
  const website = req.body.website ? linkify(req.body.website) : '';

  const fields = { ...req.body, image, website };

  try {
    await profileSchema.validate(fields);
  } catch (error) {
    return next(new HttpError('Wrong inputs', 400));
  }

  try {
    const user = await updateUser(id, fields);
    res.status(200).json({ user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
}

export { httpUpdateProfile };
