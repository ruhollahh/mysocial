import {
  createComment,
  deleteComment,
  findPostComments,
  findCommentById,
} from '../../models/comment.model.js';
import { HttpError } from '../../utils/HttpError.js';

async function httpCreateComment(req, res, next) {
  const { postId, body } = req.body;
  if (!postId) {
    return next(new HttpError('Post ID is required', 400));
  }

  const userId = req.user._id;
  try {
    const comment = await createComment({ userId, postId, body });
    return res.status(201).json({ comment });
  } catch (error) {
    return next(new HttpError(error.message));
  }
}

async function httpFindPostComments(req, res, next) {
  const { postId } = req.query;
  if (!postId) {
    return next(new HttpError('Post ID is required', 400));
  }
  try {
    const comments = await findPostComments(postId);
    return res.status(200).json({ comments });
  } catch (error) {
    return next(new HttpError(error.message));
  }
}

async function httpDeleteComment(req, res, next) {
  const { id } = req.params;

  try {
    const comment = await findCommentById(id);
    if (!comment) {
      return next(new HttpError('Not Found', 404));
    } else if (comment.userId !== req.user._id) {
      return next(new HttpError('Unauthorized', 403));
    }
    await deleteComment(id);
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (e) {
    return next(new HttpError(e.message));
  }
}

export { httpCreateComment, httpFindPostComments, httpDeleteComment };
