const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware.js");
const adminMiddleware = require("../middlewares/admin-middleware.js");
const validate = require("../middlewares/validate-middleware.js");
const { adminUpdateSchema } = require("../validators/adminUpdate-validator.js");
const contactValidationSchema = require("../validators/contact-validator.js");
const router = express.Router();

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
router;
router
  .route("/users/update/:id")
  .patch(
    authMiddleware,
    adminMiddleware,
    validate(adminUpdateSchema),
    adminController.updateUserById
  );

router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router
  .route("/contacts/delete/:id")
  .delete(
    authMiddleware,
    adminMiddleware,
    adminController.deleteContactDetailsById
  );
router
  .route("/contacts/:id")
  .get(authMiddleware, adminMiddleware, adminController.getContactById);
router
  .route("/contacts/update/:id")
  .patch(
    authMiddleware,
    adminMiddleware,
    validate(contactValidationSchema),
    adminController.updateContactById
  );

module.exports = router;
