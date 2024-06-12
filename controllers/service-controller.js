const Service = require("../models/service-model");

const serviceData = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ message: "Service Page data not found" });
      return;
    }
    res.status(200).json({ data: response });
  } catch (error) {
    console.log(`error from the server ${error}`);
  }
};
module.exports = serviceData;
