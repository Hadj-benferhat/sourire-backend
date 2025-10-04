const mongoose = require("mongoose")

const helpSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:[true,`please provide a name`]
    },
    lastName:{
        type: String,
        required:[true,`please provide a family name`]
    },
    address:{
        type: String,
        required:[true,`please provide an adress`]
    },
    email:{
        type: String,
        //required:[true,`please provide an email`],
        //match:[],
        //unique: true
    },
    contact:{
        type: String,
        required:[true,`please provide a number`],
    },
    donNeeded:{
        type: String,
        required:[true,`please provide the type needed of donation`]//
    },
    situation:{
        type: String,
        required:[true,`please provide a situation`]
    },
    traite:{
        type: Boolean,
        default:false
    },
})

module.exports = mongoose.model("Help",helpSchema)