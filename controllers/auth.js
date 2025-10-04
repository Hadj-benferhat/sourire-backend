const {StatusCodes} = require("http-status-codes")
const {BadRequestError, UnauthenticatedError} = require("../errors")
const User = require("../models/User")
const {sendConfimationEmail} = require('./sendEmail')

const login = async (req,res)=> {
    const {userName,password} = req.body
    if (!userName || !password) {
        throw new BadRequestError('Please provide usename and password')
    }

    const user = await User.findOne({userName})
    if (!user) {
        throw new UnauthenticatedError("user doesn't exist")      
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')//
    }

    const token = user.createJWT()

    res.status(StatusCodes.OK)
       .json({user:{firstName: user.firstName, lastName : user.lastName},token})
   
} 
 
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const forgotPassword = async(req,res)=>{
    
    const min = 100000;
    const max = 999999;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    
    const user = await User.findOne({email:req.body.email})
    if(!user){
        throw new UnauthenticatedError('Invalid email')
    }
    sendConfimationEmail(user.email,code)
    user.confirmationCode = code
    user.save()
    res.send({msg:`confirmation code sent`})
    
}

const resetPassword = async(req,res)=>{

    const user = await User.findOne({confirmationCode:req.body.code})
    if(!user){
        throw new UnauthenticatedError('Invalid code')
    }else{
        const newPwd = req.body.newPassword
        if(!newPwd){
            throw new BadRequestError("please provide a password")
        }
        user.password = newPwd
        user.save()
        user.confirmationCode = null
        res.send({msg:"password reset succesfuly"})
    }
}

module.exports = {
    login,logout,forgotPassword,resetPassword
}