import { Like } from './like.mongo.js';
import { decPostLikeCount, incPostLikeCount } from './post.model.js';

async function createLike({ userIdObject, postId }) {
  const userId = userIdObject.toString();
  const userId_postId = userId + '_' + postId;
  const like = await Like.create({
    userId_postId,
    userId,
    postId,
  });

  await incPostLikeCount(postId);

  return like;
}

async function findLike({ userIdObject, postId }) {
  const userId = userIdObject.toString();
  const userId_postId = userId + '_' + postId;
  return await Like.findOne({ userId_postId });
}

async function deleteLike(id) {
  const { postId } = await Like.findById(id);
  const result = await Like.findByIdAndRemove(id);
  await decPostLikeCount(postId);
  return result;
}

export { createLike, findLike, deleteLike };
