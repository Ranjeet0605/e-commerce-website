const ErrorHandler = require("../utils/userhandling");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/usermodel");
exports.isAuthticateUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHandler("please Login to access this resource "),401)
    }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await userSchema.findById(decodeData.id)
  next();
})

exports.authoriseRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403))
        }
        next();
    }
}