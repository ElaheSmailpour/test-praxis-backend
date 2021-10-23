
const express = require('express')

const router = express.Router()

const {getBehandlungen,getTermin,getTerminBestätigung } = require("../controller/terminController")

router.route("/").get(getTermin)
router.route("/behandlungen").get(getBehandlungen)

router.route("/bestätigung/:phone").get(getTerminBestätigung)


module.exports = router