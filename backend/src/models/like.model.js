import { Like } from './like.mongo.js';
import { findPost, updatePost } from './post.model.js';

async function createLike({ userIdObject, postId }) {
  const userId = userIdObject.toString();
  const userId_postId = userId + '_' + postId;
  const like = await Like.create({
    userId_postId,
    userId,
    postId,
  });

  const { likeCount } = await findPost(postId);
  await updatePost(postId, { likeCount: likeCount + 1 });

  return like;
}

async function findLike({ userIdObject, postId }) {
  const userId = userIdObject.toString();
  const userId_postId = userId + '_' + postId;
  return await Like.findOne({ userId_postId });
}

export { createLike, findLike };
