const nodemailer = require("nodemailer");
const sendMail = async(options)=>{
    try{
const transport = nodemailer.createTransport({

    service:process.env.SMPT_SERVICE,
    host: "smtp.gmail.com",
    requireTLS:"yes",
    port:587,
    secure:true,
    
    auth:{
        user: process.env.SMPT_MAIL,
       pass: process.env.SMPT_PASSWORD,
    },
})
 const mailoptions = {
    from: process.env.SMPT_MAIL,
    to: "kranjeet0829@gmail.com",
    subject:options.subject,
    text:options.message,
 }
 await transport.sendMail(mailoptions);
}catch(error){
    console.error(error);
}
}
 module.exports = sendMail;