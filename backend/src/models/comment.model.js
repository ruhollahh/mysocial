import { Comment } from './comment.mongo.js';
import { decPostCommentCount, incPostCommentCount } from './post.model.js';

async function createComment({ userIdObject, postId, body }) {
  const userId = userIdObject.toString();
  const comment = await Comment.create({
    userId,
    postId,
    body,
  });

  await incPostCommentCount(postId);

  return comment;
}

async function findComments({ userIdObject, postId }) {
  const userId = userIdObject.toString();
  return await Comment.find({ userId, postId });
}

async function deleteComment(id) {
  const { postId } = await Comment.findById(id);
  const result = await Comment.findByIdAndRemove(id);
  await decPostCommentCount(postId);
  return result;
}

export { createComment, findComments, deleteComment };
