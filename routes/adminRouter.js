
const auth=require("../middleware/auth")
const express = require('express')

const router = express.Router()

const { getTermin,removeHour,makeFreeHour } = require("../controller/adminController")
router.route('/gettermin').get(auth,getTermin)
router.post('/removeHour',auth,removeHour)
router.post('/makeFreeHour',auth,makeFreeHour)


module.exports = router