const mongoose=require("mongoose")

const terminSchema=new mongoose.Schema({
    time: String,
    date: String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userPraxis"
    }
  


})
const model=mongoose.model("termin",terminSchema)

module.exports=model