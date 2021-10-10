const mongoose = require("mongoose");
const { Schema } = mongoose;

const behandlungenSchema = new Schema(
    {
       title:String
    }
);

module.exports = mongoose.model("behandlungen", behandlungenSchema);