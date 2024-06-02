const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.status(200).send("Full Stack Again");
});

router.route("/").get((req, res) => {
  res.status(200).send("Full Stack Again");
});
module.exports = router;
