const Donation = require("../models/donations")
const {StatusCodes} = require("http-status-codes")
const Stock = require("../models/stocks")

const getAllDonations = async(req,res)=>{
    
    try {
        const donations = await Donation.find({})
        res.status(StatusCodes.OK).json(donations)     
    } catch (error) {
        res.send({error:error})      
    }
}
const getDonation = async(req,res)=>{
    
    try {
        const {id:DonationId} = req.params
        const donation = await Donation.findOne({_id: DonationId})
        res.status(200).json({Donation:donation})
    } catch (error) {
        res.send({error:error})       
    }
}

const giveDonation = async (req, res) => {
    try {
        console.log(req.body);
      const donation = await Donation.create(req.body);
      console.log('mchat');
      res.status(201).json({ msg: "merci pour votre donation" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteDonation = async(req,res)=>{
    try {
        const {id:DonationId} = req.params
        const donation = await Donation.findOneAndDelete({_id: DonationId})
        res.status(200).json({msg:`Donation deleted`})
    } catch (error) {
        res.send({error:error})       
    } 
}

module.exports = {
    giveDonation,
    getAllDonations,
    getDonation,
    deleteDonation,
}