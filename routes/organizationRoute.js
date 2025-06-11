const express = require("express");
const router = express.Router();
const { createOrganization } = require("../controllers/organizationController");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  validateCreateOrganization,
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

module.exports = router;
