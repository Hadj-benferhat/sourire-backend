

const { number } = require("joi")
const mongoose = require("mongoose")

const sponsorSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,`please provide a name`]
    },
    familyName:{
        type: String,
        required:[true,`please provide a family name`]
    },
    email:{
        type: String,
        unique: true
    },
    phoneNumber:{
        type: String,
        required:[true,`please provide a number`],
        unique: true
    },
    town:{
        type: String,
        required:[true,`please provide a town`]
    },
    quantite:{
        type: Number,
    },
    sponsoringTime:{
        type: String,
        required:[true,`please provide your gender`]
    },
    description:{
        type: String,
    },
})

module.exports = mongoose.model("Sponsor",sponsorSchema)
