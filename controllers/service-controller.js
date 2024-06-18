const uploadOnCloudinary = require("../utils/Cloudinary.js");

const Service = require("../models/service-model");

const serviceData = async (req, res, next) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ message: "Service Page data not found" });
      return;
    }
    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};

const postServiceData = async (req, res, next) => {
  try {
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const imgResponse = await uploadOnCloudinary(imageUrl);

    if (!imgResponse) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    // Assuming you have other fields like service, description, price, provider in req.body
    const { service, description, price, provider } = req.body;

    // Validate other required fields
    if (!service || !description || !price || !provider) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save data to database
    const data = await Service.create({
      service,
      description,
      price,
      provider,
      imageUrl: imgResponse.url,
    });

    return res
      .status(201)
      .json({ message: "Service Data added Successfully", data });
  } catch (error) {
    next(error);
  }
};

const deleteServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedData = await Service.deleteOne({ _id: id });
    if (!deletedData) {
      res.status(404).json({ message: "Service Data does not exist" });
    }
    res.status(200).json({ message: " Service Data Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const getServiceDetails = await Service.findOne({ _id: id });
    if (!getServiceDetails) {
      res
        .status(404)
        .json({ message: "This particular service does not exist" });
    }
    res.status(200).json({ getServiceDetails });
  } catch (error) {
    next(error);
  }
};

// const updateServiceById = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const updateServiceData = req.body;
//     const updatedData = await Service.updateOne(
//       { _id: id },
//       { $set: updateServiceData },
//       { new: true }
//     );

//     if (!updatedData) {
//       res
//         .status(404)
//         .json({ message: "This particular service does not exist" });
//     }
//     res.status(200).json({ updatedData });
//   } catch (error) {
//     next(error);
//   }
// };

const updateServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateServiceData = req.body;

    // Ensure that only valid fields are updated
    const allowedUpdates = ["provider", "service", "price", "description"];

    // Check if all updates are valid
    const isValidOperation = Object.keys(updateServiceData).every((key) =>
      allowedUpdates.includes(key)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    // Check if there's an image file in the form data
    let imageUrl = null;
    if (req.file) {
      const imageResult = await uploadOnCloudinary(req.file.path);
      imageUrl = imageResult.secure_url;
    }

    // Merge imageUrl into updateServiceData if it exists
    if (imageUrl) {
      updateServiceData.imageUrl = imageUrl;
    }

    // Perform the update operation
    const updatedData = await Service.findByIdAndUpdate(id, updateServiceData, {
      new: true,
    });

    if (!updatedData) {
      return res
        .status(404)
        .json({ message: "This particular service does not exist" });
    }

    res.status(200).json({ updatedData });
  } catch (error) {
    next(error);
  }
};

module.exports = updateServiceById;

module.exports = {
  serviceData,
  postServiceData,
  deleteServiceById,
  getServiceById,
  updateServiceById,
};
