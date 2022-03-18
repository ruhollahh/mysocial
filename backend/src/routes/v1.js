import Router from "express";
import { authRouter } from "./auth/auth.router.js";

const v1 = Router();

v1.use("/auth", authRouter);
v1.get("/hi", (req, res) => {
  return res.send("hello");
});

export { v1 };
