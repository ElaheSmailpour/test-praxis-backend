
const express = require('express')

const router = express.Router()

const {getBehandlungen,getTermin,getTerminBestätigung,buchen ,getTerminList} = require("../controller/terminController")

router.route("/").get(getTermin)
router.route("/terminList/:phone").get(getTerminList)
router.route("/behandlungen").get(getBehandlungen)
router.route('/verfyPhone/:phone').get(getTerminBestätigung)
router.route('/verfyPhone/:phone/:code').post(buchen)
module.exports = router