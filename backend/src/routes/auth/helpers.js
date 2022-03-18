import crypto from "crypto";

function generatePassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 310000, 32, "sha256")
    .toString("hex");

  return { salt, hashedPassword };
}

function verifyPassword(userInputPassword, hashedPassword, salt) {
  const userInputHashed = crypto
    .pbkdf2Sync(userInputPassword, salt, 310000, 32, "sha256")
    .toString("hex");
  return userInputHashed === hashedPassword;
}

export { generatePassword, verifyPassword };
