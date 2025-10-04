const {StatusCodes} = require("http-status-codes")
const {BadRequestError} = require("../errors")
const Help = require("../models/in-need")

const needHelp = async (req,res)=> {
    if(!req.body.contact){
        throw new BadRequestError("please provide a phone number")
    } 
    try {
        const help = await Help.create(req.body)
        res.status(StatusCodes.CREATED).json({msg:`demande envoyer`})        
    } catch (error) {
        res.status(500).json({error}) 
    }  
}

const getAllNeededHelps = async (req,res) => {
    try {
        const helps = await Help.find({traite:false}); 
        res.status(200).json(helps)
    } catch (error) {
        res.status(500).json({error}) 
    }
}

module.exports = {needHelp,getAllNeededHelps}
