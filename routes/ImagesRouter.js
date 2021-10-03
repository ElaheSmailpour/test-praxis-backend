

const express = require('express')

const router = express.Router()

const { getImages } = require("../controller/imgesController")
router.route('/').get(getImages)




module.exports = router