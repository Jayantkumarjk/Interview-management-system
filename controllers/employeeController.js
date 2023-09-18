const Employee = require("../models/employeeModel");
const Interview = require("../models/interviewsModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const config = require("../config/config")
const Student = require("../models/studentModel");
const exceljs = require("exceljs");

//create JWT token
const create_token = async(id) => {
    try{
        const token = await jwt.sign({_id:id}, config.secret_jwt);
        return token;
    }catch(error){
        console.log(error.message);
    }
}

// Hash Password
const securePassword = async(password)=>{
    try{
        const hashPassword = await bcrypt.hash(password,10);   
        return hashPassword;
    }catch(error){
        console.log(error.message)
    }
}

//Load sign up page
const loadSignUpForm = async(req,res)=>{
    try{
        res.status(200).render('signup')
    }catch(error){
        console.log(error.message)
    }   
}

//Insert the employee details
const insertEmployee = async(req,res)=>{
    try{
        const hashedPassword = await securePassword(req.body.password);
        const employee = new Employee({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:hashedPassword
        })
        const employeeData = await Employee.findOne({email:req.body.email});
        if(employeeData){
            res.render('signup',{message:"Email already exist"})
        }else{
            const employee_data = await employee.save();
            console.log(employee_data)
            res.render('signup',{message:"Registration completed"})
        }

    }catch(error){
        console.log(error.message);
    }
}

// Load the login page
const loadLoginPage = async(req,res)=>{
    try{
        res.status(200).render('login')
    }catch(error){
        console.log(error.message);
    }
}

// Verify the login details
const loginVerification = async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const employeeData = await Employee.findOne({email:email});
        if(employeeData){
            const matchPassword = await bcrypt.compare(password,employeeData.password);
            if(matchPassword){
               const token = await create_token(employeeData._id)
               const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
               }
               res.cookie("token",token,options).render('home')  
            }else{
                res.status(200).render('login',{message:"Email or Password is not correct"})
            }

        }else{
            res.status(200).render('login',{messge:"Email or Password is not correct"})
        }
    }catch(error){
        console.log(error.message)
    }
}

//Load student list Page
const loadStudentsPage = async(req,res)=>{
    try{
        const userData = await Student.find({});


        res.render('students',{users:userData});
    
    }catch(error){
        console.log(error.message)
    }
}

//Load Interview list page
const loadInterviewsPage = async(req,res)=>{
    try{
        res.status(200).render('interviews');
    }catch(error){
        console.log(error.message)
    }
}

// Insert the interview details
const insertInterviews = async(req,res)=>{
    try{
        const interviewdetail = new Interview({
            interview:req.body.interview,
            student:req.body.student,
            date:req.body.date,
            result:req.body.result
        })

        const interviewData = await interviewdetail.save();
        res.render('interviews',{message:"submitted"})

    }catch(error){
        console.log(error.message)
    }
}

// Export the student details
const exportUsers = async(req,res)=>{
    try{
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet("My User");

        worksheet.columns = [
            {header:"S no.", key:"s_no"},
            {header:"Name", key:"name"},
            {header:"College", key:"college"},
            {header:"Application Status", key:"status"},
            {header:"DSA Score", key:"dsa"},
            {header:"WebD Score", key:"webd"},
            {header:"React Score", key:"react"},

        ];
        let counter = 1;

        const userData = await Student.find({});
        userData.forEach((user) => {
            user.s_no = counter;

            worksheet.addRow(user);

            counter++;
        });

        worksheet.getRow(1).eachCell((cell)=> {
            cell.font = {bold:true};
        })
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
        );
        res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);
        return workbook.xlsx.write(res).then(()=>{
            res.status(200);
        })


    }catch(error){
        console.log(error.message);
    }
}






module.exports = {
    loadSignUpForm,
    insertEmployee,
    loadLoginPage,
    loginVerification,
    loadStudentsPage,
    loadInterviewsPage,
    insertInterviews,
    exportUsers
    
}