import { createNewUser } from "../../models/user.model.js";
import { userSchema } from "./schemas.js";

async function authController(req, res) {
  const { firstName, lastName, email } = req.user;
  return res.status(200).json({ user: { firstName, lastName, email } });
}

async function signupController(req, res) {
  try {
    await userSchema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ error });
  }

  try {
    const user = await createNewUser(req.body);
    return res.status(201).json({ user });
  } catch (error) {
    if (error.code && error.code === 11000) {
      if (error.keyValue && error.keyValue.email) {
        return res
          .status(400)
          .json({
            error: { path: "email", message: "Email is already in use" },
          });
      } else if (error.keyValue && error.keyValue.handle) {
        return res
          .status(400)
          .json({
            error: { path: "handle", message: "Handle is already in use" },
          });
      }
    }
    return res.status(400).json({ error });
  }
}

async function signoutController(req, res) {
  req.logout();
  return res.redirect("/");
}

export { authController, signupController, signoutController };
