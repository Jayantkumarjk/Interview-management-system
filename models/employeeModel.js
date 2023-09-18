const mongoose = require("mongoose");
const validator = require("validator");

const empSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("Email is not valid");
            }
        }
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    token:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model("Employee",empSchema);