const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    message:{
        text:{type:String,required:true},
    },
    users:Array,

    sender:{
        type:mongoose.Schema.Types>objectID,
        ref:"Users",
        required:true,
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("MessageSchema");