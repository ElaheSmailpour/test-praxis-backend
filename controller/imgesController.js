const imgModel = require('../models/imagesModel');



exports.getImages = async(req, res, next) => {
  
	const imageFind= await imgModel.find()
    const randomImg=Math.floor(Math.random()* imageFind.length)
    res.send(imageFind[randomImg])
}
