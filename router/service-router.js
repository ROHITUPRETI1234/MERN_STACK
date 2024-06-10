const express = require("express");
const serviceData = require("../controllers/service-controller");
const router = express.Router();

router.route("/service").get(serviceData);

module.exports = router;
