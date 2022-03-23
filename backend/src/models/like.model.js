import { Like } from './like.mongo.js';
import { decPostLikeCount, incPostLikeCount } from './post.model.js';

async function createLike({ userId, postId }) {
  const userId_postId = userId + '_' + postId;
  const like = await Like.create({
    userId_postId,
    userId,
    postId,
  });

  await incPostLikeCount(postId);

  return like;
}

async function findUserLike({ userId, postId }) {
  const userId_postId = userId + '_' + postId;
  return await Like.findOne({ userId_postId });
}

async function findLikeById(id) {
  return await Like.findById(id);
}

async function deleteLike(id) {
  const { postId } = await Like.findById(id);
  const result = await Like.findByIdAndRemove(id);
  await decPostLikeCount(postId);
  return result;
}

export { createLike, findUserLike, findLikeById, deleteLike };
