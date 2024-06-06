const express = require("express");
const router = express();
// const { home, register } = require("../controllers/auth-controller.js");
const authControllers = require("../controllers/auth-controller.js");
const signupSchema = require("../validators/auth-validator.js");
const validate = require("../middlewares/validate-middleware.js");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(authControllers.login);

module.exports = router;
