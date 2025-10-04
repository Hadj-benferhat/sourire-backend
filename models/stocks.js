const mongoose = require("mongoose")

const stockSchema = new mongoose.Schema({
    typeDonation:{
        type: String,
        //required:[true,`please provide a name`]
    },
    quantite:{
        type: Number,
        //required:[true,`please provide a family name`]
    },
})

module.exports = mongoose.model("Stock",stockSchema)