// const { body, validationResult } = require("express-validator");
const User = require("../models/user-model.js");
// const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(200).send("Full Stack Development");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Express-validator used for checking validation logic
const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User(email) already exists" });
    }

    const userCreate = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
      token: await userCreate.generateToken(), // instance method defined in userSchema
      userId: userCreate._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      // return res.status(401).json({ msg: "Invalid credentials" }) ;
      const status = 400;
      const message = "Invalid credentials";
      const extraDetails = "Email does not register previously";

      const err = {
        status,
        message,
        extraDetails,
      };
      next(err);
    }

    // const isMatch = await bcrypt.compare(password, userExist.password);
    const isMatch = await userExist.comparePassword(password);
    if (!isMatch) {
      const status = 400;
      const message = "Invalid credentials";
      const extraDetails = "Fill password correctly";

      const err = {
        status,
        message,
        extraDetails,
      };
      next(err);
    } else {
      res.status(200).json({
        message: "User login successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }
  } catch (error) {
    next(error);
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error from user route {error}`);
  }
};

module.exports = { home, register, login, user };
