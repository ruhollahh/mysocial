import { generatePassword } from '../routes/auth/helpers.js';
import { User } from './user.mongo.js';

async function createNewUser({ firstName, lastName, handle, email, password }) {
  const { salt, hashedPassword } = generatePassword(password);
  return await User.create({
    firstName,
    lastName,
    handle,
    email,
    salt,
    password: hashedPassword,
  });
}

async function getUser(id) {
  return await User.findById(id, '-salt -password');
}

async function updateProfile(id, { image }) {
  await User.findByIdAndUpdate(id, { image }, { new: true });
  return await getUser(id);
}

export { createNewUser, updateProfile, getUser };
