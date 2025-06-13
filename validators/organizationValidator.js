const { body } = require("express-validator");
const {
  PLAN,
  ORGANIZATION_STATUS,
  ACCEPTANCE_STATUS,
  ORGANIZATION_SIZE,
} = require("../constants/enums");

exports.validateCreateOrganization = [
  body("organizationName")
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ max: 100 })
    .withMessage("Organization name must be under 100 characters"),

  body("organizationEmail")
    .notEmpty()
    .withMessage("Organization email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 100 })
    .withMessage("Email must be under 100 characters"),

  body("organizationAddress")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Address must be under 200 characters"),

  body("organizationWebsite")
    .optional()
    .isURL()
    .withMessage("Invalid website URL")
    .isLength({ max: 200 })
    .withMessage("Website must be under 200 characters"),

  body("industry")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Industry must be under 100 characters"),

  body("size")
    .optional()
    .isIn(ORGANIZATION_SIZE)
    .withMessage(
      `Organization size must be one of: ${ORGANIZATION_SIZE.join(", ")}`
    ),

  body("plan")
    .optional()
    .isIn(PLAN)
    .withMessage(`Plan must be from : ${PLAN.join(", ")}`),

  body("adminFirstName")
    .notEmpty()
    .withMessage("Admin first name is required")
    .isLength({ max: 100 })
    .withMessage("First name must be under 100 characters"),

  body("adminLastName")
    .notEmpty()
    .withMessage("Admin last name is required")
    .isLength({ max: 100 })
    .withMessage("Last name must be under 100 characters"),

  body("adminEmail")
    .notEmpty()
    .withMessage("Admin email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 100 })
    .withMessage("Admin email must be under 100 characters"),

  body("adminPhoneNumber")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Phone number must be under 20 characters"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("status")
    .optional()
    .isIn(ORGANIZATION_STATUS)
    .withMessage(`Status must be one of: ${ORGANIZATION_STATUS.join(", ")}`),

  body("acceptanceStatus")
    .optional()
    .isIn(ACCEPTANCE_STATUS)
    .withMessage(
      `Acceptance status must be one of: ${ACCEPTANCE_STATUS.join(", ")}`
    ),
];

exports.validateLogin = [
  body("adminEmail")
    .notEmpty()
    .withMessage("Admin email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
