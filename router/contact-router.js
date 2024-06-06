const express = require("express");
const router = express();
const contactForm = require("../controllers/contact-controller.js");
const contactValidationSchema = require("../validators/contact-validator.js");
const validate = require("../middlewares/validate-middleware.js");

router.route("/contact").post(validate(contactValidationSchema), contactForm);

module.exports = router;
