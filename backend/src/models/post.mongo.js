import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userHandle: {
      type: String,
      required: [true, "User handle is required."],
    },
    body: {
      type: String,
      required: [true, "Body is required."],
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

const Post = mongoose.model("Post", userSchema);

export { Post };
