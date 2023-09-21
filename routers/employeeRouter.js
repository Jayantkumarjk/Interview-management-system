const express = require("express")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { loadSignUpForm, insertEmployee, loadLoginPage, loginVerification, loadStudentsPage, loadInterviewsPage, insertInterviews, exportUsers, forgetLoad, forgetPasswordLoad, forgetVerify, resetPassword,  } = require("../controllers/employeeController");

const auth = require("../middleware/auth");
const { insertStudent } = require("../controllers/studentController");

const employee_route = express();

employee_route.use(bodyParser.json());
employee_route.use(bodyParser.urlencoded({extended:true}));
employee_route.use(cookieParser());

employee_route.set('view engine', 'ejs');
employee_route.set('views', "./views/employee")

employee_route.get('/',loadSignUpForm);
employee_route.get('/signup',loadSignUpForm);

employee_route.post("/signup",insertEmployee);

employee_route.get('/login',loadLoginPage);

employee_route.post('/login',loginVerification)

employee_route.get('/students',auth.verifyToken,loadStudentsPage);
employee_route.post('/students',insertStudent)


employee_route.get('/forget',forgetLoad)
employee_route.post('/forget',forgetVerify)
employee_route.get('/forget-password',forgetPasswordLoad)
employee_route.post('/forget-password',resetPassword)




employee_route.get("/interviews",auth.verifyToken,loadInterviewsPage);
employee_route.post('/interviews',insertInterviews);


employee_route.get('/exportuser',auth.verifyToken,exportUsers)







module.exports = employee_route

