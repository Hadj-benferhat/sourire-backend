const mongoose = require("mongoose");


// we need to add basic validation to make more sense to our code
//for that we should create an object for every data
//add date


//we should add the completed by: user in the model
const taskSchema = new mongoose.Schema({
    nomTache: {
        type: String,
        required: [true,"Veuillez entrer le nom de la tache"]
    },
    etatDeLaTache: {
        type: String,
    },
    typeTache: {
        type: String,
    },
    descriptionTache: {
        type: String,
    },
})


// to use our schema def we need to convert our taskSchema into a 'Model'
// models : are responsible for creating and reading documents 
module.exports = mongoose.model("task",taskSchema);