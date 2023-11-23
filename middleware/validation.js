const { body, validationResult } = require("express-validator");

const validateFields = [
  body("email").isEmail().withMessage("Invalid Email Address"),
  body("name").notEmpty().withMessage("Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validateFieldsMiddleware = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateFields, validateFieldsMiddleware };
