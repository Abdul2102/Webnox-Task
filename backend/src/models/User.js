const mongoose = require("mongoose");
const {v4} = require("uuid");

const UserSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    username: {
        type: String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
});

module.exports = mongoose.model("User", UserSchema);