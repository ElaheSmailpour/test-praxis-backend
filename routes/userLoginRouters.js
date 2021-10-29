const express = require("express")
const router = express.Router()
const auth=require("../middleware/auth")
const { signup,userLogin } = require("../controller/userController")
router.post("/signup",auth, signup)
router.post("/login",auth,userLogin)

module.exports = router