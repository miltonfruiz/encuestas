const { check, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
      ];
    }
    case 'loginUser': {
      return [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
      ];
    }
    default:
      return [];
  }
};

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validate, validateInput };