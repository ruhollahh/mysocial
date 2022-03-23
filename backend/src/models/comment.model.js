import { Comment } from './comment.mongo.js';
import { decPostCommentCount, incPostCommentCount } from './post.model.js';

async function createComment({ userId, postId, body }) {
  const comment = await Comment.create({
    userId,
    postId,
    body,
  });

  await incPostCommentCount(postId);

  return comment;
}

async function findPostComments(postId) {
  return await Comment.find({ postId });
}

async function findCommentById(id) {
  return await Comment.findById(id);
}

async function deleteComment(id) {
  const { postId } = await Comment.findById(id);
  const result = await Comment.findByIdAndRemove(id);
  await decPostCommentCount(postId);
  return result;
}

export { createComment, findPostComments, findCommentById, deleteComment };
