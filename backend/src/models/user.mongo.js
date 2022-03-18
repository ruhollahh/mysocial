import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    handle: {
      type: String,
      require: [true, "Handle is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    salt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
