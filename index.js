const express = require("express");
const app = express();
const mongoose = require("mongoose");
const employee_route = require("./routers/employeeRouter");
mongoose.connect("mongodb://127.0.0.1:27017/company_database")
port = 1000


app.use('/',employee_route)


app.listen(port,()=>{
    console.log(`server is connected to ${port} port`)
})