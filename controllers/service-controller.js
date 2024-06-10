const Service = require("../models/service-model");

const serviceData = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ msg: "Service data not found" });
      return;
    }
    res.status(200).json({ msg: "service found", data: response });
  } catch (error) {
    console.log(`error from the server ${error}`);
  }
};
module.exports = serviceData;
