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

router.post(
  "/register",
  validateCreateOrganization,
  handleValidationErrors,
  asyncHandler(createOrganization)
);

router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  asyncHandler(login)
);

module.exports = router;
