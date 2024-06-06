require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router.js");
const contactRoute = require("./router/contact-router.js");
const connectDB = require("./Database/DB.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
app.use(express.json()); //middleware for json payload

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
