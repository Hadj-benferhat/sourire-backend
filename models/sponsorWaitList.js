

const mongoose = require("mongoose")

const sponsorWaitListSchema = new mongoose.Schema({
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
        
    },
   phoneNumber:{
        type: String,
        required:[true,`please provide a number`],
    },
    town:{
        type: String,
        required:[true,`please provide a town`]
    },
    sponsoringTime:{
        type: String,
        required:[true,`please provide us the duration of your sponsoring`]
    },
    description:{
        type: String,
    },

})

module.exports = mongoose.model("SponsorWaitList",sponsorWaitListSchema)
