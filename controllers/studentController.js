const Student = require("../models/studentModel");


const insertStudent = async(req,res)=>{
    try{
        const student = new Student({
            name:req.body.name,
            college:req.body.college,
            status:req.body.status,
            dsa:req.body.status,
            webd:req.body.webd,
            react:req.body.react
        });
        const studentData = await student.save()
        const userData = await Student.find({});


        res.render('students',{users:userData});
    }catch(error){
        console.log(error);
    }
}

module.exports = {insertStudent}