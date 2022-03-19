import { User } from './user.mongo.js';

async function createNewUser(fields) {
  return await User.create(fields);
}

async function getUser(id) {
  return await User.findById(id, '-salt -password');
}

async function updateUser(id, update) {
  await User.findByIdAndUpdate(id, update, { new: true });
  return await getUser(id);
}

export { createNewUser, updateUser, getUser };
