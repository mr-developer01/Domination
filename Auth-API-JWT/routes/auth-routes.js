const express = require("express");
const router = express.Router();
const {registerUser, loginUser, logoutUser, userProfile} = require("../controllers/auth-controllers")

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", userProfile);

module.exports = router;