function authMiddleware(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }
  return next();
}

export { authMiddleware };
