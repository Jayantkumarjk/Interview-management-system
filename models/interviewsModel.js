const mongoose = require("mongoose");

const interviewSchema = mongoose.Schema({
    interview:{
        type:String,
        required:true
    },
    student:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    result:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Interview",interviewSchema);