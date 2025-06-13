const { body } = require("express-validator");
const { EMPLOYEE_ROLES, EMPLOYEE_STATUSES } = require("../constants/enums");
const {default_employee_avatar} = require("../assets/images/default-employee-avatar.jpg")
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
  body("role")
    .isIn(EMPLOYEE_ROLES)
    .withMessage(`Role must be one of : ${EMPLOYEE_ROLES.join(", ")}`),
  body("previlege").isBoolean().withMessage("Previlage must be true or false"),
  body("joinDate")
    .optional()
    .isISO8601()
    .withMessage("Join date must be a valid ISO date (e.g., 2025-06-12)"),

  body("status")
    .optional()
    .isIn(EMPLOYEE_STATUSES)
    .withMessage(`Status must be one of : ${EMPLOYEE_STATUSES.join(", ")}`),
  body("employeeImage")
  .customSanitizer((value)=> {
    if(!value || value.trim()==="") return default_employee_avatar;
return value;
  })

  // .isURL()
  // .withMessage("Employee image must be a valid URL"),
];
