const Contact = require("../models/contact-model.js");
const User = require("../models/user-model.js");
const getAllUsers = async (_, res, next) => {
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

const getAllContacts = async (_, res, next) => {
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

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await User.findOne({ _id: id }, { password: 0 });

    if (!response) {
      return res.status(404).json({ message: "User does not exit" });
    }

    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};

// const updateUserById = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const { username, email, phone } = req.body;

//     const updatedData = await User.updateOne(
//       { _id: id },
//       {
//         $set: updatedUserData,
//       }
//     );
//     if (!updatedData) {
//       return res.status(404).json({ message: "User does not exit" });
//     }
//     return res.status(200).json(updatedData);
//   } catch (error) {
//     next(error);
//   }
// };

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { username, email, phone } = req.body;

    // Validate input data
    if (!username || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find and update the user
    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        $set: { username, email, phone },
      },
      { new: true } // Return the updated document
    );

    if (!updatedData) {
      return res.status(404).json({ message: "User does not exist" });
    }

    return res.status(200).json({ updatedData });
  } catch (error) {
    next(error);
  }
};

const deleteContactDetailsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedData = await Contact.deleteOne({ _id: id });
    if (!deletedData) {
      res
        .status(404)
        .json({ message: "This particular contact does not exist" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const getContactDetails = await Contact.findOne({ _id: id });
    if (!getContactDetails) {
      res
        .status(404)
        .json({ message: "This particular contact does not exist" });
    }
    res.status(200).json({ getContactDetails });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateContactData = req.body;
    const updatedData = await Contact.updateOne(
      { _id: id },
      { $set: updateContactData },
      {
        new: true,
      }
    );

    if (!updatedData) {
      res
        .status(404)
        .json({ message: "This particular contact does not exist" });
    }
    res.status(200).json({ updatedData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactDetailsById,
  getContactById,
  updateContactById,
};
