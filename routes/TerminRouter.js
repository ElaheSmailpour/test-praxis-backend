
const express = require('express')

const router = express.Router()

const {getBehandlungen } = require("../controller/terminController")

  
router.route("/behandlungen").get(getBehandlungen)



module.exports = router