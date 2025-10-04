const Stock = require("../models/stocks")
const {BadRequestError} = require("../errors")
const Donation = require("../models/donations")

const ajouterStock = async(req,res)=>{

    const {id:donationId} = req.params
    const donation = await Donation.findOne({_id : donationId })
    const type = donation.typeDonation
    const quantite = donation.quantite
    if (donation.confirmee == true) {
        throw new BadRequestError("cette donation est deja stocker")
    }
    let stock = await Stock.findOne({typeDonation:type})
    if(!stock){
        stock = await Stock.create({typeDonation:type,quantite:quantite})
        donation.confirme = true
        await donation.save()
        res.send({msg:`stock creer`})
    }else{
        //stock = await Stock.findOneAndUpdate()
        stock.quantite = stock.quantite + quantite
        console.log(stock.quantite);
        await stock.save()
        donation.confirme = true
        await donation.save()
        res.send({msg:`stock ajouter`})       
    } 
}

const decrementerQuantite = async(req,res)=>{

    let stock = await Stock.findOne({type:req.body.type})
    if(!stock){
        throw new BadRequestError("stock inexistant!")
         
    }else{
        if(stock.quantite<req.body.quantite){
            throw new BadRequestError("vous n'avez pas assez de stock")
        }
        else{
            if(stock.quantite === req.body.quantite){
                stock = await Stock.findOneAndDelete({type:req.body.type})
                res.send("stock spprimer")
            }else{
                stock.quantite = stock.quantite - req.body.quantite
                await stock.save()
                res.status(201).json({msg:"MAJ du stock avec succes"})
            }
        }
    }  
}

const getAllStocks = async(req,res)=>{

    try {
        const stocks = await Stock.find({})
        if(!stocks){
            res.send(`there is no sotcks`)
        }
        res.status(201).json(stocks)
    } catch (error) {
        res.status(500).json({err:error})      
    }
}

const updateStock = async(req,res)=>{
    const {id:stockId} = req.params

    let stock = await Stock.findByIdAndUpdate({_id:stockId},req.body,{
        new:true, runValidators:true,
    })

    if(!stock){
        throw new BadRequestError("stock inexistant")
    }
    if(stock.quantite == 0){
        stock = await Stock.findOneAndDelete({_id:stockId})
        res.status(201).json({msg:"stock suppriemr"})
    }else{
        res.status(201).json({msg:"stock MAJ"})
    }
    
    
}
const getStock = async(req,res)=>{
    const stock = await Stock.find({type:req.body.type})
    if(!stock){
        res.send(`pas de stock de ${req.body.type}`)
    }
    res.status(201).json({type:stock})
}

module.exports = {
    ajouterStock,
    decrementerQuantite,
    getAllStocks,
    getStock,
    updateStock
}