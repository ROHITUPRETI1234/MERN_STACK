const Contact = require("../models/contact-model.js");
const User = require("../models/user-model.js");
const getAllUsers = async (_, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length == 0) {
      res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (_, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length == 0) {
      res.status(404).json({ message: "No contacts found" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllContacts };
