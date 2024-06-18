require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRoute = require("./router/auth-router.js");
const contactRoute = require("./router/contact-router.js");
const serviceRoute = require("./router/service-router.js");
const adminRoute = require("./router/admin-router.js");
const connectDB = require("./Database/DB.js");
const errorMiddleware = require("./middlewares/error-middleware.js");

const app = express();
const corsOptions = {
  // origin: "http://localhost:5173",
  origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions)); //cors as middleware

app.use(express.json()); //middleware for json payload

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
