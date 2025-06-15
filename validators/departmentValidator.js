const { body } = require("express-validator");

// validator to create Department
exports.validateCreateDepartment = [
  body("departmentName")
    .trim()
    .notEmpty()
    .withMessage("Department Name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Department name cannot be more than 100 character"),
];
