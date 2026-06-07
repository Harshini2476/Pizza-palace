const adminMiddleware = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
};

export default adminMiddleware;
