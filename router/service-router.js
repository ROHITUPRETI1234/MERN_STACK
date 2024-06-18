const express = require("express");
const {
  serviceData,
  postServiceData,
  deleteServiceById,
  updateServiceById,
  getServiceById,
} = require("../controllers/service-controller");
const router = express.Router();
const upload = require("../middlewares/multer-middleware.js");
const authMiddleware = require("../middlewares/auth-middleware.js");
const adminMiddleware = require("../middlewares/admin-middleware.js");



router.route("/service").get(serviceData);
router.route("/service/upload").post(
  authMiddleware,
  adminMiddleware,
  // validate(serviceSchema),
  upload.single("imageUrl"),
  postServiceData
);
router
  .route("/service/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteServiceById);

router
  .route("/service/:id")
  .get(authMiddleware, adminMiddleware, getServiceById);
router.route("/service/update/:id").patch(
  authMiddleware,
  adminMiddleware,
  // validate(serviceSchema),
  upload.single("imageUrl"),
  updateServiceById
);

module.exports = router;
