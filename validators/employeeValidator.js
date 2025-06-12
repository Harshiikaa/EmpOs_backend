const { body } = require("express-validator");

exports.validateCreateEmployees = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 }),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("department")
    .notEmpty()
    .withMessage("Department ID is required")
    .isMongoId()
    .withMessage("Invalid department ID"),

  body("position").notEmpty().withMessage("Position is required"),

  body("managerId").optional().isMongoId().withMessage("Invalid manager ID"),

  body("joinDate")
    .optional()
    .isISO8601()
    .withMessage("Join date must be a valid ISO date (e.g., 2025-06-12)"),

  body("status")
    .optional()
    .isIn(["Active", "On Leave", "Inactive"])
    .withMessage("Status must be Active, On Leave, or Inactive"),
  body("employeeImage").optional(),
  // .isURL()
  // .withMessage("Employee image must be a valid URL"),
];
