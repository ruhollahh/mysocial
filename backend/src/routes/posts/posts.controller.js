import { createPost, deletePost } from '../../models/post.model.js';
import { HttpError } from '../../utils/HttpError.js';

async function httpCreatePost(req, res, next) {
  const { body } = req.body;
  const userIdObject = req.user._id;
  try {
    const post = await createPost({ userIdObject, body });
    return res.status(201).json({ post });
  } catch (e) {
    return next(e.message);
  }
}

async function httpDeletePost(req, res, next) {
  const { id } = req.params;

  try {
    await deletePost(id);
  } catch (e) {
    return next(new HttpError(e.message));
  }
}

export { httpCreatePost, httpDeletePost };
