const  mongoose  = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Jwt = require("jsonwebtoken")
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter the name "],
        maxLength:[30, "Your name should not more than 30 character"],
        minLength:[4, "your name should not less than 4 character"],

    },
    email:{
        type:String,
        required:[true,"Enter your Email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter your valid Email "],


    },
    password:{
        type:"String",
        required:[true,"Please Enter your password"],
        minLength:[8,"password should have greater than 8 characters."],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
   role:{
    type:String,
    default:"user",
   },
   resetPasswordToken :String,
   resetPasswordExpire: Date,
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
  this.password = await bcrypt.hash(this.password, 10);
})
// JWT TOKEN 
userSchema.methods.getJWTToken = function(){
    return Jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}
// comapre password for 

userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}

// Generating password reset token
userSchema.methods.getResetPasswordToken = function(){
  //generating token
    const  resettoken = crypto.randomBytes(32).toString("hex")
    // hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resettoken).digest("hex")
  this.resetPasswordExpire = Date.now() + 15*60*1000;
  return resettoken;
};
module.exports = new mongoose.model("User",userSchema);