const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Service = require("../models/service-model.js"); // Adjust the path based on your project structure

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload function to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("File Path is missing LocalFilePath");
      return null;
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log(
      `Image/File/Video is uploaded to Cloudinary with public ID ${response.public_id} Cloudinary url:${response.url}`
    );

    // Delete local file after successful upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // Handle errors
    fs.unlinkSync(localFilePath); // Delete local file on error as well
    console.log("Error while Uploading: ", error);
    return null;
  }
};
module.exports = uploadOnCloudinary;
