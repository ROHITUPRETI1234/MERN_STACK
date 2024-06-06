const { body, validationResult } = require("express-validator");
const User = require("../models/user-model.js");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(200).send("Full Stack Development");
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Express-validator used for checking validation logic
const register = async (req, res, next) => {
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
      token: await userCreate.generateToken(), // instance method defined in userSchema
      userId: userCreate._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

const login = [
  body("email").isEmail().withMessage("email must be valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password is required of min. length 6"),
  async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      // const isMatch = await bcrypt.compare(password, userExist.password);
      const isMatch = await userExist.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Email or password incorrect" });
      } else {
        res.status(200).json({
          msg: "User login successfully",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      }
    } catch (error) {
      next(error);
      // res
      //   .status(500)
      //   .json({ msg: "Internal Server Error", error: error.message });
    }
  },
];

module.exports = { home, register, login };
