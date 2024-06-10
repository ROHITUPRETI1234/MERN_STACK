const express = require("express");
const router = express();
// const { home, register } = require("../controllers/auth-controller.js");
const authControllers = require("../controllers/auth-controller.js");
const {
  signupSchema,
  loginSchema,
} = require("../validators/auth-validator.js");
const validate = require("../middlewares/validate-middleware.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;
