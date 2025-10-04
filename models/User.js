const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//add a picture for the user

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:[true,`please provide a name`]
    },
    lastName:{
        type: String,
        required:[true,`please provide a family name`]
    },
    userName:{
        type: String,
        required:[true,`please provide a family name`],
        unique: true
    },
    email:{
        type: String,
        required:[true,`please provide an email`],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password:{
        type: String,
        required:[true,`please provide a password`]//
    },
    contact:{
        type: String,
        required:[true,`please provide a number`],
        match: [/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/],
    },
    // dateOfBirth:{
    //     type: String,
    //     // required:[true,`please provide a date of birth`],
    // },
    // gender:{
    //     type: String,
    //     // required:[true,`please provide a gender`]
    // },
    addresse:{
        type: String,
    },
    // motivation:{
    //     type: String,
    //     required:[true,`please provide a motivation`],
    // },
    // hearedOfUs:{
    //     type: String,
    //     required:[true,`please provide a motivation`],
    // },
    confirmationCode:{
        type: Number,
    },
    profilePicture:{
        type: String,
    },
    role:{
        type: String,
        default:"Basic",
    },
})
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

userSchema.methods.createJWT = function(){
    return jwt.sign(
        {userId:this._id,name:this.userName,role:this.role},
        process.env.JWT_SECRET,
        {expiresIn:"30d"},
        )
 }
    
    userSchema.methods.comparePassword = async function(canditatePassword){
        const isMatch = await bcrypt.compare(canditatePassword, this.password)
        return isMatch
    }
    
    module.exports = mongoose.model("User",userSchema)