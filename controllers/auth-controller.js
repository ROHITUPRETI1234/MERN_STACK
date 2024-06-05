const { body, validationResult } = require("express-validator");
const User = require("../models/user-model.js");

const home = async (req, res) => {
  try {
    res.status(200).send("Full Stack Development");
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

//express-validator used for checking validation logic
const register = [
  // Validation rules
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("phone")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be a valid 10-digit number"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),

  async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: "Validation Error", errors: errors.array() });
    }

    try {
      const { username, email, phone, password } = req.body;

      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const userCreate = await User.create({
        username,
        email,
        phone,
        password,
      });
      res.status(201).json({
        msg: "User created successfully",
        // user: userCreate,
        token: await userCreate.generateToken(), //instance method defined in userSchema
        userId: userCreate._id.toString(),
      });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Internal Server Error", error: error.message });
    }
  },
];

module.exports = { home, register };
