const {StatusCodes} = require("http-status-codes")
const BadRequestError = require("../errors")
const Member = require("../models/members")
const {sendEmail} = require("./sendEmail")

const becomeMember = async (req,res)=> {
    if(!req.body.contact){
        throw new BadRequestError("please provide a phone number")
    }
    
    try {
        const member = await Member.create(req.body)
        // sendEmail(req.body.email,req.body.firstName + req.body.lastName,req.body.gender)
        sendEmail(req.body.email,req.body.firstName, req.body.lastName,req.body.gender)
        res.status(StatusCodes.CREATED).send("demande envoyer")
    } catch (error) {
        res.status(500).json({error}) 
    }  
}

const getAllMembersWaitList = async (req,res) => {
    try {
        const membersWaitList = await Member.find({}); // the var should be equqle to the one on the db 
        res.status(200).json(membersWaitList)
    } catch (error) {
        res.status(500).json({error}) 
    }
}

module.exports = {becomeMember,getAllMembersWaitList}