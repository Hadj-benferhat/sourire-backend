const {StatusCodes} = require("http-status-codes")
const BadRequestError = require("../errors")
const VolunteerWaitList = require("../models/volunteersWaitList")



const becomeVolunter = async (req,res)=> {

    if(!req.body.phoneNumber){
        throw new BadRequestError("please provide a phone number")
    }
    try {
        const volunteerWaitList = await VolunteerWaitList.create({...req.body})
        res.status(StatusCodes.CREATED).send("demande envoyer")
    } catch (error) {
        res.status(500).json({error}) 
    }  
}

const getAllVolunteersWaitList = async (req,res) => {
    try {
        const volunteersWaitList = await VolunteerWaitList.find({}); 
        res.status(200).json(volunteersWaitList)
    } catch (error) {
        res.status(500).json({error}) 
    }
}

const deleteVolunteerWaitList = async(req,res)=>{
    const {id:volunteerId} = req.params
    try {
        const volunteer = await VolunteerWaitList.findOneAndDelete({_id:volunteerId})
        if(!volunteer){
            throw new BadRequestError("volunteer doesn't exist")
        }
        res.status(200).json({msg:"volunteer deleted"})
        
    } catch (error) {
        res.status(500).json({error:error})     
    }
}

module.exports = {becomeVolunter,getAllVolunteersWaitList,deleteVolunteerWaitList}