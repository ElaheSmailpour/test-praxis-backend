const express = require("express")
const router = express.Router()

const { signup,userLogin } = require("../controller/userController")
router.post("/signup", signup)
router.post("/login",userLogin)

module.exports = router