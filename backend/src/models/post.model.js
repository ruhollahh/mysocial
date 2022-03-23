import { Post } from './post.mongo.js';

async function createPost({ userId, body }) {
  return await Post.create({ userId, body });
}

async function findPostById(id) {
  return await Post.findById(id);
}

async function updatePost(id, update) {
  return await Post.findByIdAndUpdate(id, update, { new: true });
}

async function deletePost(id) {
  return await Post.findByIdAndRemove(id);
}

// Like situation

async function incPostLikeCount(id) {
  const { likeCount } = await Post.findById(id, { likeCount: 1 });
  return await Post.findByIdAndUpdate(id, { likeCount: likeCount + 1 });
}

async function decPostLikeCount(id) {
  const { likeCount } = await Post.findById(id, { likeCount: 1 });
  return await Post.findByIdAndUpdate(id, { likeCount: likeCount - 1 });
}

// Comment situation

async function incPostCommentCount(id) {
  const { commentCount } = await Post.findById(id, { commentCount: 1 });
  return await Post.findByIdAndUpdate(id, { commentCount: commentCount + 1 });
}

async function decPostCommentCount(id) {
  const { commentCount } = await Post.findById(id, { commentCount: 1 });
  return await Post.findByIdAndUpdate(id, { commentCount: commentCount - 1 });
}

export {
  createPost,
  findPostById,
  updatePost,
  deletePost,
  incPostLikeCount,
  decPostLikeCount,
  incPostCommentCount,
  decPostCommentCount,
};
