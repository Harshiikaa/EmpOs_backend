const { body } = require("express-validator");

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
    .isIn(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
    .withMessage("Invalid organization size"),

  body("plan")
    .optional()
    .isIn(["free", "basic", "professional", "enterprise"])
    .withMessage("Invalid plan"),

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
    .isIn(["active", "inactive"])
    .withMessage("Invalid status"),

  body("acceptanceStatus")
    .optional()
    .isIn(["pending", "accepted", "rejected"])
    .withMessage("Invalid acceptance status"),
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
