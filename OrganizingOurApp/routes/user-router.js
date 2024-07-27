const express = require("express")
const router = express.Router()
const {userController} = require("../controllers/user-controller")
const logedinMiddleware = require("../middlewares/isLogedin");

router.get("/", logedinMiddleware, userController)

module.exports = router;