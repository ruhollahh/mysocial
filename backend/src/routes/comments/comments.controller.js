import {
  createComment,
  deleteComment,
  findComments,
} from '../../models/comment.model.js';
import { HttpError } from '../../utils/HttpError.js';

async function httpCreateComment(req, res, next) {
  const { postId, body } = req.body;
  if (!postId) {
    return next(new HttpError('Post ID is required', 400));
  }

  const userIdObject = req.user._id;
  try {
    const comment = await createComment({ userIdObject, postId, body });
    return res.status(201).json({ comment });
  } catch (error) {
    return next(new HttpError(error.message));
  }
}

async function httpFindComments(req, res, next) {
  const { postId } = req.query;
  if (!postId) {
    return next(new HttpError('Post ID is required', 400));
  }
  const userIdObject = req.user._id;
  try {
    const comments = await findComments({ userIdObject, postId });
    return res.status(200).json({ comments });
  } catch (error) {
    return next(new HttpError(error.message));
  }
}

async function httpDeleteComment(req, res, next) {
  const { id } = req.params;
  try {
    await deleteComment(id);
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (e) {
    return next(new HttpError(e.message));
  }
}

export { httpCreateComment, httpFindComments, httpDeleteComment };
