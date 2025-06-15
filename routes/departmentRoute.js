const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getDepartments,
  getDepartmentList,
} = require("../controllers/departmentController");
const {
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");
const {
  validateCreateDepartment,
} = require("../validators/departmentValidator");
const asyncHandler = require("../middlewares/asyncHandler");
const { protect } = require("../middlewares/authMiddleware");

// Route for Department Creation
router.post(
  "/createDepartment",
  protect,
  validateCreateDepartment,
  handleValidationErrors,
  asyncHandler(createDepartment)
);
// Route to get Department details
router.get("/", protect, asyncHandler(getDepartments));
// Route to get Department list only
router.get("/departmentList", protect, asyncHandler(getDepartmentList));

module.exports = router;
