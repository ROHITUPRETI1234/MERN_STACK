const express = require("express");
const router = express();
const contactForm = require("../controllers/contact-controller.js");
const contactValidationSchema = require("../validators/contact-validator.js");
const validate = require("../middlewares/validate-middleware.js");
const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1,
  message: "Too many contact attempts from this IP, please try again later",
  handler: (_, res) => {
    res.status(429).json({
      message: "Too many contact attempts from this IP, please try again later",
    });
  },
});

router
  .route("/contact")
  .post(contactLimiter, validate(contactValidationSchema), contactForm);

module.exports = router;
