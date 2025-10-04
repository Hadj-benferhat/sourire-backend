

const mongoose = require("mongoose")

const volunteerSchema = new mongoose.Schema({
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
    situation:{
        type: String,
        required:[true,`please provide a town`]
    },
    dateOfBirth:{
        type: String,
        required:[true,`please provide a date of birth`]
    },
    genre:{
        type: String,
        required:[true,`please provide your gender`]
    },
    description:{
        type: String,
    },

})

module.exports = mongoose.model("Volunteer",volunteerSchema)
