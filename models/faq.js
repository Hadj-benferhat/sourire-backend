const mongoose = require("mongoose")

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true,"plese provide a question"] ,
    },
    answer: {
        type: String,
        required: [true,"plese provide an answer"],
    },
})

module.exports = mongoose.model("FAQ",faqSchema);