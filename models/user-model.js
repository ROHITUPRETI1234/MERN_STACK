const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(), //by default _id is object type that's why converted to String
        email: this.email,
        isAdmin: this.idAdmin,
      },
      process.env.JWT_SECRET_kEY,
      { expiresIn: "1h" }
    ); //60x60 //20d
  } catch (error) {
    console.log(error);
  }
};

//pre is a method which act as a middleware before saving the data into the database
// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  // console.log("pre method",this);
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

//define the model or collection name and it is always save by default in mongoDB in lowercase.
const User = new mongoose.model("User", userSchema);

module.exports = User;
