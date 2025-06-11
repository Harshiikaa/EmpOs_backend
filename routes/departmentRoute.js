const express = require("express");
const router = express.Router();

const { createDepartment } = require("../controllers/departmentController");
const {
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");
const {
  validateCreateDepartment,
} = require("../validators/departmentValidator");
const asyncHandler = require("../middlewares/asyncHandler");
const { protect } = require("../middlewares/authMiddleware");

router.post(
  "/createDepartment",
  protect,
  validateCreateDepartment,
  handleValidationErrors,
  asyncHandler(createDepartment)
);

module.exports = router;
