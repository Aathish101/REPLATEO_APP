const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};

export default adminAuth;