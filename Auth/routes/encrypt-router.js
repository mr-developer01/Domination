const express = require("express")
const router = express.Router()
const { encryptController } = require("../controllers/encrypt-controller");

router.post("/", encryptController)

module.exports = router;