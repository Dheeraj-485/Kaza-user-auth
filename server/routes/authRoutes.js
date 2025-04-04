const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.put("/profile", verifyToken, authController.updateProfile);

module.exports = router;
