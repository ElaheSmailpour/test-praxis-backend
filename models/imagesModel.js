const mongoose = require("mongoose");
const { Schema } = mongoose;

const imagesSchema = new Schema(
    {

       img:String,
       title:String
    
    }



);

module.exports = mongoose.model("imagesHome", imagesSchema);