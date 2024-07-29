const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
} = require("../controllers/auth-controllers");

const {protect} = require("../middlewares/protect")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", protect, userProfile);

module.exports = router;
