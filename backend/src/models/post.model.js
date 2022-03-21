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

export { createPost, findPost, updatePost };
