import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    userId_postId: {
      type: String,
      required: [true, 'userId_postId is required'],
      unique: true,
    },
    userId: {
      type: mongoose.ObjectId,
      required: [true, 'userId is required'],
    },
    postId: {
      type: mongoose.ObjectId,
      required: [true, 'postId is required'],
    },
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);

export { Like };
