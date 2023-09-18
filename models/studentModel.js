const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    dsa:{
        type:String,
        reqired:true
    },
    webd:{
        type:String,
        required:true
    },
    react:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("Student",studentSchema);