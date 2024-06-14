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

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await User.deleteOne({ _id: id });

    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById };
