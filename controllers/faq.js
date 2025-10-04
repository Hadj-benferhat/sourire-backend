const FAQ = require('../models/faq')
const {BadRequestError} = require("../errors")

const createFAQ = async (req,res) => {
      
    try {
        const faq = await FAQ.create(req.body)
        res.status(201).json({ msg:"FAQ created"});
    } catch (error) {
        res.status(500).json({msg:error})     
    } 
}

const getAllFAQs = async (req,res) => {
    try {
        const faqs = await FAQ.find({});
        res.status(200).json(faqs)
    } catch (error) {
        res.status(500).json({error})    
    }
}

const getFAQ = async (req,res) => {  
    try {
        const { id: FAQId } = req.params 
        const faq = await FAQ.findOne({_id:FAQId})
        if(!faq) {
            throw new BadRequestError("FAQ isn;t created")
        }
        res.status(200).json({ faq })
    } catch (error) {
        res.status(500).json({error})   
    } 
}


const updateFAQ = async (req,res) => {
    try {
        
        const {id : FAQId} = req.params;
        const faq = await FAQ.findOneAndUpdate({_id:FAQId},req.body,{
            new:true, runValidators:true,
        })      
        if (!faq) {
            throw new BadRequestError("FAQ isn;t created")
        }
        res.status(200).json({msg:"FAQ updated"});
    } catch (error) {
        res.status(500).json({error})
        
    }
}


const deleteFAQ = async (req,res) => {
    try {
        const {id: FAQId } = req.params;
    
        const faq = await FAQ.findOneAndDelete({ _id: FAQId })
        if(!faq){
            throw new BadRequestError("FAQ isn't created")
        }
        res.status(200).json({faq})
        
    } catch (error) { 
        res.status(500).json({error})
        
    } 
}


module.exports = {
    getAllFAQs,
    getFAQ,
    updateFAQ,
    deleteFAQ,
    createFAQ
}