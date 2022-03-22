import { Post } from './post.mongo.js';

async function createPost({ userIdObject, body }) {
  const userId = userIdObject.toString();
  return await Post.create({ userId, body });
}

async function findPost(id) {
  return await Post.findById(id);
}

async function updatePost(id, update) {
  return await Post.findByIdAndUpdate(id, update, { new: true });
}

async function deletePost(id) {
  return await Post.findByIdAndRemove(id);
}

async function getPostFields(id, fields) {
  const { likeCount } = await Post.findById(id, fields);
  return likeCount;
}

// Like situation

async function incPostLikeCount(id) {
  const likeCount = await getPostFields(id, { likeCount });
  return await Post.findByIdAndUpdate({ likeCount: likeCount + 1 });
}

async function decPostLikeCount(id) {
  const likeCount = await getPostFields(id, { likeCount });
  return await Post.findByIdAndUpdate({ likeCount: likeCount - 1 });
}

// Comment situation

async function incPostCommentCount(id) {
  const commentCount = await getPostFields(id, { commentCount });
  return await Post.findByIdAndUpdate({ commentCount: commentCount + 1 });
}

async function decPostCommentCount(id) {
  const commentCount = await getPostFields(id, { commentCount });
  return await Post.findByIdAndUpdate({ commentCount: commentCount - 1 });
}

export {
  createPost,
  findPost,
  updatePost,
  deletePost,
  incPostLikeCount,
  decPostLikeCount,
  incPostCommentCount,
  decPostCommentCount,
};
