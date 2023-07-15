const { errorMonitor } = require("nodemailer/lib/xoauth2");
const {ErrorHandler} = require("../utils/userhandling");
module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";
    

 // wrong Mongodb id error 
 if(err.name === "CastError"){
    const message = `Resource not found. Invalid:${err.path}`;
    err = new ErrorHandler(message,400);
 }

 // Mongoose duplicate key erro
  if(err.code===11000){
   const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
   err = new ErrorHandler(message, 400)
  }

  // wrong jwt error
  if(err.code === "JsonWebTokenError"){
   const message = `Json web token is invalid, try again`;
   err = new ErrorHandler(message, 400)
  }


  // jwt expire errr
  
  if(err.code === "TokenExpiredError"){
   const message = `Json web token is expire, try again`;
   err = new ErrorHandler(message, 400)
  }
 res.status(err.statusCode).json({
    success:false,
    message: err.message,
 });
}