import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'body is required'],
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

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
