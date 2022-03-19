import { getUser, updateProfile } from '../../models/user.model.js';
import { HttpError } from '../../utils/HttpError.js';
import 'dotenv/config';

const baseURL = process.env.BASE_URL;

async function httpUpdateProfile(req, res, next) {
  const { id } = req.params;
  if (id !== req.user._id.toString()) {
    return next(new HttpError('Request is not allowed', 403));
  }

  const image = `${baseURL}/${req.file.path}`;

  try {
    await getUser(id);
  } catch (error) {
    return next(new HttpError('Not Found', 404));
  }

  try {
    const user = await updateProfile(id, { image });
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}

export { httpUpdateProfile };
