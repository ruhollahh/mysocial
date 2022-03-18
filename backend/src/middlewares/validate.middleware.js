function validateMiddleware(schema) {
  return async function (req, res, next) {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

export { validateMiddleware };
