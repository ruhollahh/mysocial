import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: [true, 'userId is required'],
    },
    body: {
      type: String,
      required: [true, 'body is required'],
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export { Post };
