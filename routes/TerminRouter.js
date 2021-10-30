const auth=require("../middleware/auth")
const express = require('express')
const router = express.Router()

const {getBehandlungen,getTermin,getTerminBestätigung,buchen ,getTerminList,terminRemove,bucheneingelogt} = require("../controller/terminController")

router.get("/",getTermin)
router.route("/terminList").get(auth,getTerminList)
router.route("/terminRemove/:terminId").get(auth,terminRemove)
router.route("/behandlungen").get(getBehandlungen)
router.route('/verfyPhone/:phone').get(getTerminBestätigung)
router.route('/verfyPhone/:phone/:code').post(buchen)
router.route('/buchen').post(auth,bucheneingelogt)
module.exports = router