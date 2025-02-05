const { body } = require("express-validator");

exports.createUserSchema = [
  body("firstName")
    .exists()
    .withMessage("Your First Name is required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("lastName")
    .exists()
    .withMessage("Your Last Name is required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Password must contain at least 3 characters")
    .isLength({ max: 30 })
    .withMessage("Password can contain max 30 characters"),
  body("role")
    .exists()
    .withMessage("User role is required")
    .isIn(["student", "job_seeker", "employer"])
    .withMessage("Invalid Role type"),
];

exports.validateLogin = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password must be filled"),
];
