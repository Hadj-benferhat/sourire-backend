const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    message:{
        type: String,
    }
})

module.exports = mongoose.model("Comment",commentSchema)