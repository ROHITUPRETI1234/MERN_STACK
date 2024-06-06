const Contact = require("../models/contact-model.js");

const contactForm = async (req, res, next) => {
  try {
    const response = req.body;
    console.log(req.body);
    await Contact.create(response);
    return res
      .status(201)
      .json({ msg: "Form is filled successfully(msg sended)" });
  } catch (error) {
    const message = "Failed to save contact form data.";
    const err = { status: 500, message, extraDetails: error.message };
    next(err);
  }
};

module.exports = contactForm;
