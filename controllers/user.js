
const {StatusCodes} = require("http-status-codes")
const User = require("../models/User")
const Member = require("../models/members")
const SMS = require("./SMS")
const {sendAcceptenceEmail,sendSuppressionEmail} = require("./sendEmail")
const { BadRequestError } = require("../errors")

const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find({},{password:0})
        res.status(200).json(users)
    } catch (error) {
        console.log(error)      
    }
}
const getUser = async (req,res)=>{
    try {
        const {id: userId } = req.params;
    
        const user = await User.findOne({ _id: userId },{password:0})
        if(!user){
            throw new BadRequestError("user doesn't exist")
        }
        res.status(200).json({user})
        
    } catch (error) { 
        res.status(500).json({error})
        
    } 
}

const createUser = async (req,res)=>{
    try {
        const name = req.body.lastName + req.body.fisrtName;
        const user = await User.create(req.body) 
        const member = await Member.findOneAndDelete({ email: req.body.email })
        res.status(StatusCodes.CREATED).json({msg:"utilisateur creer avec succees"})
        sendAcceptenceEmail(req.body.email,req.body.firstName, req.body.lastName,req.body.userName,req.body.password,/*req.body.gender*/)
        //SMS(req.body.phoneNumber,req.body.name,req.body.email);
        
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req,res)=>{
    try {
        const {id : userId} = req.params
        const user = await User.findOneAndUpdate({_id:userId},req.body,{
            new:true, runValidators:true,
        }).select("-password")
        
        if (!user) {
            throw new BadRequestError("user doesn't exist")
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({error})      
    }
}

const updateUserPassword = async(req,res)=>{
    const {id : userId} = req.params
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values');
    }

    const user = await User.findOne({ userName: userId })

    const isPasswordCorrect = await user.comparePassword(oldPassword)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')//
    }
    user.password = newPassword;

    await user.save()
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
}


const deleteUser = async (req,res)=>{
    try {
        const {id: userId } = req.params;
    
        const user = await User.findOneAndDelete({ _id: userId })
        if(!user){
            throw new BadRequestError("user doesn't exist")
        }
         sendSuppressionEmail(user.email,user.firstName , user.lastName /*,user.gender*/)
        res.status(200).send("user deleted")        
    } catch (error) { 
        res.status(500).json({error})     
    } 
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    updateUserPassword,
    createUser,
    deleteUser
}