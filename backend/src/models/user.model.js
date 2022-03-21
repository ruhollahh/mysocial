import { User } from './user.mongo.js';

async function createUser(fields) {
  return await User.create(fields);
}

async function findUser(id) {
  return await User.findById(id, '-salt -password');
}

async function updateUser(id, update) {
  return await User.findByIdAndUpdate(id, update, { new: true });
}

export { createUser, updateUser, findUser };
