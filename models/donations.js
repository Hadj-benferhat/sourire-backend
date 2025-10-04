const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema({
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
        required:[true,`please provide a family name`]
    },
    email:{
        type: String,
        required:[true,`please provide an email`],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    contact:{
        type: String,
        required:[true,`please provide a number`],
    },
    quantite:{
        type: Number,
    },
    typeDonation:{
        type: String,
        required:[true,`please provide a town`]
    },
    confirmee:{
        type: Boolean,
        default:false
    },

})

module.exports = mongoose.model("Donation",donationSchema)