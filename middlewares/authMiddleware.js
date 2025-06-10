const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("./asyncHandler");
const { sendError } = require("../utils/responseHandler"); // path to your helpers

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return sendError(res, new Error("No token provided"), 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return sendError(res, new Error("User not found"), 401);
    }

    next();
  } catch (err) {
    return sendError(res, new Error("Invalid or expired token"), 401);
  }
});



const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        new Error(`Access denied. Requires role: ${allowedRoles.join(", ")}`),
        403
      );
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
