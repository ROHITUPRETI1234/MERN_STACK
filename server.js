const express = require("express");
const app = express();
const router = require("./router/auth-router.js");
const connectDB = require("./Database/DB.js");
app.use(express.json());
app.use("/api/auth", router);

const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
