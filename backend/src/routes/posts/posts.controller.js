import {
  createPost,
  deletePost,
  findPostById,
} from '../../models/post.model.js';
import { HttpError } from '../../utils/HttpError.js';

async function httpCreatePost(req, res, next) {
  const { body } = req.body;
  const userId = req.user._id;
  try {
    const post = await createPost({ userId, body });
    return res.status(201).json({ post });
  } catch (e) {
    return next(e.message);
  }
}

async function httpDeletePost(req, res, next) {
  const { id } = req.params;

  try {
    const post = await findPostById(id);
    if (!post) {
      return next(new HttpError('Not Found', 404));
    } else if (post.userId !== req.user._id) {
      return next(new HttpError('Unauthorized', 403));
    }
    await deletePost(id);
  } catch (e) {
    return next(new HttpError(e.message));
  }
}

export { httpCreatePost, httpDeletePost };
