const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const { sendError } = require("../utils/response");
const Organization = require("../models/organization");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return sendError(res, new Error("No token provided"), 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const org = await Organization.findById(decoded.id).select("-password");
  // console.log("Decoded ID in middleware:", decoded.id);
  // console.log("req.user set to:", req.user);
  // console.log("Org found in DB:", org);

  if (!org) {
    return sendError(res, new Error("Admin not found"), 401);
  }

  req.user = org;

  next();
});

// const admin = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return sendError(
//       res,
//       new Error("You are not authorized to access this route"),
//       403
//     );
//   }
//   next();
// };
// const authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user || !allowedRoles.includes(req.user.role)) {
//       return sendError(
//         res,
//         new Error(`Access denied. Requires role: ${allowedRoles.join(", ")}`),
//         403
//       );
//     }
//     next();
//   };
// };

module.exports = { protect };
