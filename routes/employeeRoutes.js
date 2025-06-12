const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { validateCreateEmployees } = require("../validators/employeeValidator");
const {
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");
const asyncHandler = require("../middlewares/asyncHandler");
const { createEmployee } = require("../controllers/employeeController");
const router = express.Router();

router.post(
  "/createEmployee",
  protect,
  validateCreateEmployees,
  handleValidationErrors,
  asyncHandler(createEmployee)
);

module.exports = router;
