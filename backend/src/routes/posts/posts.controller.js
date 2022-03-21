import { createPost } from '../../models/post.model.js';

async function httpCreatePost(req, res, next) {
  const { body } = req.body;
  const userIdObject = req.user._id;
  try {
    const post = await createPost({ userIdObject, body });
    return res.status(201).json({ post });
  } catch (e) {
    return next(e.message);
  }
}

export { httpCreatePost };
