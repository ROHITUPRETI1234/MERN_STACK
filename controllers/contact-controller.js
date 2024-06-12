const Contact = require("../models/contact-model.js");

const contactForm = async (req, res, next) => {
  try {
    const { username, email, message } = req.body;

    // const contactExist = await Contact.findOne({ email });
    // if (contactExist) {
    //   return res
    //     .status(400)
    //     .json({ message: "Contact with this email already exists" });
    // }
    await Contact.create({
      username,
      email,
      message,
    });
    return res
      .status(201)
      .json({ message: "Form is filled successfully (message sent)" });
  } catch (error) {
    const message = "Failed to save contact form data.";
    const err = { status: 500, message, extraDetails: error.message };
    next(err);
  }
};

module.exports = contactForm;
