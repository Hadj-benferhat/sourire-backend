const {StatusCodes} = require("http-status-codes")
const BadRequestError = require("../errors")
const SponsorWaitList = require("../models/sponsorWaitList")



const becomeSponsor = async (req,res)=> {

    if(!req.body.phoneNumber){
        throw new BadRequestError("please provide a phone number")
    }
    try {
        const sponsorWaitList = await SponsorWaitList.create({...req.body})
        res.status(StatusCodes.CREATED).send("demande envoyer")   
    } catch (error) {
        res.status(500).json({error}) 
    }  
}

const getAllSponsorsWaitList = async (req,res) => {
    try {
        const sponsorsWaitList = await SponsorWaitList.find({}); // the var should be equqle to the one on the db 
        res.status(200).json(sponsorsWaitList)
    } catch (error) {
        res.status(500).json({error}) 
    }
}

const deleteSponsorWaitList = async(req,res)=>{
    const {id:sponsorId} = req.params
    try {
        const sponsor = await SponsorWaitList.findOneAndDelete({_id:sponsorId})
        if(!sponsor){
            throw new BadRequestError("sponsor doesn't exist")
        }
        res.status(200).json({msg:"sponsor deleted"})
        
    } catch (error) {
        res.status(500).json({error:error})
        
    }
}

module.exports = {becomeSponsor,getAllSponsorsWaitList,deleteSponsorWaitList}