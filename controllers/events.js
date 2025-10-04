const {StatusCodes} = require("http-status-codes")
const {BadRequestError, UnauthenticatedError} = require("../errors")
const Event = require("../models/events")
const fs = require('fs');
const cloudinary = require('cloudinary').v2

const folderPath = './tmp'

const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(
          req.files.image.tempFilePath,
          {
            use_filename: true,
            folder: 'event-images',
          }
        );  
        fs.rmSync(folderPath,{recursive:true})
        res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });          
    } catch (error) {
        res.send({error:error})        
    }
};

const createEvent = async(req,res)=>{

    try {
        const event = await Event.create(req.body)
        res.status(201).json({ msg:"event created"});       
    } catch (error) {
        res.send({error:error})  
    }
}
const getAllEvents = async(req,res)=>{

    try {
        const events = await Event.find({})
        res.status(StatusCodes.OK).json(events)
    } catch (error) {
        res.send({error:error})      
    }
}
//
const getEvent = async(req,res)=>{

    try {
        const {id:eventId} = req.params
        const event = await Event.findOne({_id: eventId})
        res.status(200).json({event:event})
    } catch (error) {
        res.send({error:error})       
    }
}

const deleteEvent = async(req,res)=>{

    try {
        const {id:eventId} = req.params
        const event = await Event.findOneAndDelete({_id: eventId})
        res.status(200).json({msg:`event deleted`})
    } catch (error) {
        res.send({error:error})       
    } 
}

const updateEvent = async(req,res)=>{

    try {
        const {id:eventId} = req.params
        const event = await Event.findOneAndUpdate({_id: eventId},req.body,{
            new:true, runValidators:true,
        })
        res.status(200).json({msg:`event updated`})
    } catch (error) {
        res.send({error:error})       
    }  
}

module.exports = {
    createEvent,
    getAllEvents,
    getEvent,
    deleteEvent,
    updateEvent,
    uploadImage
}