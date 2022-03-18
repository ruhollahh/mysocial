import { generatePassword } from "../routes/auth/helpers.js";
import { User } from "./user.mongo.js";

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

export { createNewUser };
