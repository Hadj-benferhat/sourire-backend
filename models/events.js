const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    nomEvent:{
        type: String,
        required: true
    },
    descriptionEvent:{
        type: String,
        required: true
    },
    typeEvent:{
        type: String,
        required: true
    },
    
    image:{
        type: String,
    },
    dateEvent:{
        type: String,
        default: function() {
            return new Date().toISOString()
        }
    },
    listeDesBesoins:{
        type: String,
    }
})

module.exports = mongoose.model("Event",eventSchema)