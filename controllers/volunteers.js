const {StatusCodes} = require("http-status-codes")
const BadRequestError = require("../errors")
const Volunteer = require("../models/volunteers")
const VolunteerWaitList = require("../models/volunteersWaitList")
const volunteers = require("../models/volunteers")

const addVolunter = async (req,res)=> {
    const {id:volunteerId} = req.params
    const volunteer = await VolunteerWaitList.findOne({_id:volunteerId})

    if(!volunteer){
        throw new BadRequestError("volunteer doesn't exist")
    }
    try {
        
        await Volunteer.create({name:volunteer.name,familyName:volunteer.familyName,email:volunteer.email,phoneNumber:volunteer.phoneNumber,town:volunteer.town,situation:volunteer.situation,dateOfBirth:volunteer.dateOfBirth, genre:volunteer.genre,description:volunteer.description})
    
        await VolunteerWaitList.findOneAndDelete({ _id: volunteerId })
        //sendEmail(req.body.email,req.body.name,req.body.gender)
        res.status(StatusCodes.CREATED).json({message:'volunteer ajouter'})   

    } catch (error) {
        res.status(500).json({error:'ghalta'}) 
    }  
}

const getAllVolunteers = async (req,res) => {
    try {
        const volunteers = await Volunteer.find({}); // the var should be equqle to the one on the db 
        res.status(200).json(volunteers)
    } catch (error) {
        res.status(500).json({error}) 
    }
}


const deleteVolunteer = async(req,res)=>{
    try{
        const {id:volunteerId} = req.params
        const volunteer = await volunteers.findOneAndDelete({_id:volunteerId})
        if(!volunteer){
            throw new BadRequestError("volunteer doesn't exist")
        }
        res.status(200).json({msg:"volunteer deleted"})
    }catch(error){
        res.status(500).json({er:error})
    }
}


module.exports = {addVolunter,getAllVolunteers,deleteVolunteer}