const Comment = require('../models/comment')
const {BadRequestError} = require("../errors")

const createComment = async (req,res) => {
    try {
        const comment = await Comment.create(req.body)
        res.status(201).json({ msg:"comment created"});
    } catch (error) {
        res.status(500).json({msg:error})     
    } 
}

const getAllComments = async (req,res) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({error})    
    }
}


module.exports = { createComment, getAllComments }