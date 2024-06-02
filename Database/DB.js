const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/mern_admin";

const connectDB = async () => {
  //    mongoose.connect(URI, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     });
  try {
    await mongoose.connect(URI);
    console.log("DB is connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Use exit code 1 to indicate an error
  }
};

module.exports = connectDB;
