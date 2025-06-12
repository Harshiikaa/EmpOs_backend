const { body } = require("express-validator");

exports.validateCreateDepartment = [
  body("departmentName")
    .trim()
    .notEmpty()
    .withMessage("Department Name cannot be empty")
    .isLength({ max: 100 }),

  body("organization")
    .trim()
    .notEmpty()
    .isMongoId()
    .withMessage("Organization name is required")
    .isLength({ max: 100 }),

  body("employees").optional().isArray(),

  body("employees.*")
    .optional()
    .isMongoId()
    .withMessage("Each employee must be a valid MongoDB ObjectId"),
];

