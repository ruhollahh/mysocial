import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    toFromType: {
      type: String,
      required: [true, 'toFromType is required'],
      unique: true,
    },
    toUserId: {
      type: mongoose.ObjectId,
      required: [true, 'toUserId is required'],
    },
    fromUserId: {
      type: mongoose.ObjectId,
      required: [true, 'fromUserId is required'],
    },
    postId: {
      type: mongoose.ObjectId,
      required: [true, 'postId is required'],
    },
    seen: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: [true, 'type is required'],
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export { Notification };
