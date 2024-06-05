const User = require("../models/user-model.js");

const home = async (req, res) => {
  try {
    res.status(200).send("Full Stack Development");
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  //use validation using express-validator
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    // Validate input
    if (!username || !email || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const userCreate = await User.create({ username, email, phone, password });
    res
      .status(201)
      .json({ msg: "User created successfully", user: userCreate });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = { home, register };
