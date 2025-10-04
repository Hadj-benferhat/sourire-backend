const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const memberSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:[true,`please provide a name`]
    },
    lastName:{
        type: String,
        required:[true,`please provide a family name`]
    },
    
    situationActuelle:{
        type: String,
        required:[true,`please provide a situation`]
    },
    email:{
        type: String,
        required:[true,`please provide an email`],
        //match:[],
        unique: true
    },
    contact:{
        type: String,
        required:[true,`please provide a number`],
    },
    birthday:{
        type: String,
        required:[true,`please provide a date of birth`],
        //match:[]
    },
    gender:{
        type: String,
        required:[true,`please provide a gender`]
    },
    ville:{
        type: String,
        //required:[true,`please provide a town`]
    },
    codePostal:{
        type: Number,
        required:[true,`please provide a postcode`]
    },
    motivation:{
        type: String,
        required:[true,`please provide a motivation`],
        //minlength: 150
    },
    connaitre:{
        type: String,
       // required:[true,`please provide a motivation`],
    },
    role:{
        type: String,
        default:"Basic",
        //required:true
    },
})

module.exports = mongoose.model("Member",memberSchema)