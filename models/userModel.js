const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name: String,
    phone: String,
    password:String,
    email:String,
role:{ type : String, default : "user"}

})
const model=mongoose.model("userPraxis",userSchema)

module.exports=model