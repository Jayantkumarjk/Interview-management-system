const jwt = require("jsonwebtoken");
const config = require("../config/config");
const verifyToken = async(req,resp,next) => {
    const token = req.body.token || req.query.token || req.cookies["token"] || req.headers["authorization"];
    console.log(token);

    if(!token){
         return resp.status(200).redirect('/login'); 
    }
    try{
        const decode = jwt.verify(token,config.secret_jwt);
        req.user = decode;

    }catch(error){
        return resp.status(400).send("Invalid token")
    }
    return next();
}
module.exports = verifyToken;

module.exports={verifyToken}