import mongoose from 'mongoose';
import 'dotenv/config';

const baseURL = process.env.BASE_URL;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
    },
    handle: {
      type: String,
      require: [true, 'Handle is required.'],
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
      required: [true, 'Email is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
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
