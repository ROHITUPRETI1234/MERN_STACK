const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const authControllers = require("../controllers/auth-controller.js");
const {
  signupSchema,
  loginSchema,
} = require("../validators/auth-validator.js");
const validate = require("../middlewares/validate-middleware.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

/// Create rate limit middleware
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: "Too many requests from this IP, please try again later",
// });

//  Apply rate limiting to all routes
// router.use(apiLimiter);

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  message: "Too many attempts. Try again later",
  handler: (_, res) => {
    res.status(429).json({
      message:
        "Too many registration attempts from this IP, please try again later",
    });
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
  message: "Too many attempts. Try again later",
  handler: (_, res /*next*/) => {
    res.status(429).json({
      message: "Too many login attempts from this IP, please try again later",
    });
  },
});

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(registerLimiter, validate(signupSchema), authControllers.register);
router
  .route("/login")
  .post(loginLimiter, validate(loginSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;
