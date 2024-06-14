const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware.js");
const adminMiddleware = require("../middlewares/admin-middleware.js");
const router = express.Router();

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

module.exports = router;
