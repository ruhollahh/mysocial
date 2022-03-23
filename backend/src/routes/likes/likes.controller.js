import {
  createLike,
  deleteLike,
  findLikeById,
  findUserLike,
} from '../../models/like.model.js';
import { HttpError } from '../../utils/HttpError.js';

async function httpCreateLike(req, res, next) {
  const { postId } = req.body;
  if (!postId) {
    return next(new HttpError('Post ID is required', 400));
  }

  const userId = req.user._id;
  try {
    const like = await createLike({ userId, postId });
    return res.status(201).json({ like });
  } catch (error) {
    if (error.code === 11000 && error.keyValue?.userId_postId) {
      return next(new HttpError('You have already liked this post', 400));
    }
    return next(new HttpError(error.message));
  }
}

async function httpFindLike(req, res, next) {
  const { postId } = req.query;
  if (!postId) {
    return next(new HttpError('Post ID is required', 400));
  }
  const userId = req.user._id;
  try {
    const like = await findUserLike({ userId, postId });
    return res.status(200).json({ like });
  } catch (error) {
    return next(new HttpError(error.message));
  }
}

async function httpDeleteLike(req, res, next) {
  const { id } = req.params;
  try {
    const like = await findLikeById(id);
    if (!like) {
      return next(new HttpError('Not Found', 404));
    } else if (like.userId !== req.user._id) {
      return next(new HttpError('Unauthorized', 403));
    }
    await deleteLike(id);
    return res.status(200).json({ message: 'Like deleted successfully' });
  } catch (e) {
    return next(new HttpError(e.message));
  }
}

export { httpCreateLike, httpFindLike, httpDeleteLike };
