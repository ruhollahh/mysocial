import mongoose from 'mongoose';
import 'dotenv/config';

const baseURL = process.env.BASE_URL;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'first name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'last name is required'],
    },
    handle: {
      type: String,
      require: [true, 'handle is required'],
      unique: true,
    },
    image: {
      type: String,
      default: `${baseURL}/uploads/images/person-avatar-placeholder.png`,
    },
    bio: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    salt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export { User };
