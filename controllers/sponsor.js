const {StatusCodes} = require("http-status-codes")
const {BadRequestError} = require("../errors")
const Sponsor = require("../models/sponsor")
const SponsorWaitList = require("../models/sponsorWaitList")
const jwt = require("jsonwebtoken")



const addSponsor = async (req,res)=> {
    const {id:sponsorId} = req.params
    const sponsor = await SponsorWaitList.findOne({_id:sponsorId})

    if(!sponsor){
        throw new BadRequestError("sponsor doesn't exist")
    }
    try {
        
        await Sponsor.create({name:sponsor.name,familyName:sponsor.familyName,email:sponsor.email,phoneNumber:sponsor.phoneNumber,town:sponsor.town,sponsoringTime:sponsor.sponsoringTime,description:sponsor.description})
    
        await SponsorWaitList.findOneAndDelete({ _id: sponsorId })
        //sendEmail(req.body.email,req.body.name,req.body.gender)
        res.status(StatusCodes.CREATED).json({message:'spoonsor ajouter'})   

    } catch (error) {
        res.status(500).json({error:'ghalta'}) 
    }  
}

const getAllSponsors = async (req,res) => {
    try {
        const sponsors = await Sponsor.find({}); // the var should be equqle to the one on the db 
        res.status(200).json(sponsors)
    } catch (error) {
        res.status(500).json({error}) 
    }
}

const deleteSponsor = async(req,res)=>{
    try{
        const {id:sponsorId} = req.params
        const sponsor = await Sponsor.findOneAndDelete({_id:sponsorId})
        if(!sponsor){
            throw new BadRequestError("sponsor doesn't exist")
        }
        res.status(200).json({msg:"sponsor deleted"})
    }catch(error){
        res.status(500).json({er:error})
    }
}

module.exports = {addSponsor,getAllSponsors,deleteSponsor}