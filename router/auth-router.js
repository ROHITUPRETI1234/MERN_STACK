const express = require("express");
const router = express();
// const { home, register } = require("../controllers/auth-controller.js");
const authControllers = require("../controllers/auth-controller.js");

router.route("/").get(authControllers.home);
router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);

module.exports = router;
