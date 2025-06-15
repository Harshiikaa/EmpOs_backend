const express = require("express");
const router = express.Router();
const {
  createOrganization,
  login,
} = require("../controllers/organizationController");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  validateCreateOrganization,
  validateLogin,
} = require("../validators/organizationValidator");
const {
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");

// Route to register organization

router.post(
  "/register",
  validateCreateOrganization,
  handleValidationErrors,
  asyncHandler(createOrganization)
);

// Route to login by the organization to the system
router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  asyncHandler(login)
);

module.exports = router;
