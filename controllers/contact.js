const nodemailer = require("nodemailer")
const {BadRequestError} = require("../errors")


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },

});


const sendContactEmail =  async(req,res)=>{
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_CONTACT_USER,
        subject: `CONTACT-US SUBJECT: ${req.body.subject}`,
        text: `from: ${req.body.firstName} ${req.body.lastName} \nemail: ${req.body.email}\nphone: ${req.body.contact}\n\n\bQUESTION: ${req.body.message} `
    }
  
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            throw new BadRequestError("email couldn't be sent")
        } else {
            res.status(200).json({msg:"email sent successfuly"})
        }
    });
}


module.exports = {sendContactEmail}