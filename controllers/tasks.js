//const { findOneAndUpdate } = require("../models/task");

// the only problem is that we should define whether the get the tasks id or name on the {delete update gettask} operations


//AA00BYLCF1

const task = require("../models/tasks");

const createTask = async (req,res) => {
      
    try {
        console.log(req.body);
        const Task = await task.create(req.body)
        res.status(201).json({ msg:"task created"});
    } catch (error) {
        res.status(500).json({msg:error})     
    } 
}

const getAllTasks = async (req,res) => {
    try {
        const tasks = await task.find({}); // the var should be equqle to the one on the db 
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({error})    
    }
}

const getTask = async (req,res) => {  
    try {
        const { id: taskId } = req.params 

        const Task = await task.findOne(taskId)
        if(!Task) {
            return res.status(404).json({msg:`id ${taskId} doesn't existe` })
        }
        res.status(200).json({ Task })
    } catch (error) {
        res.status(500).json({error})
        //res.send(error)      
    } 
}


const updateTask = async (req,res) => {
    try {
        
        //const {id : taskId} = req.params;
        const {id : name} = req.params
        const Task = await task.findOneAndUpdate(name,req.body,{
            new:true, runValidators:true,
        })
        
        if (!Task) {
            return res.status(404).json({msg:`task is isn't correct`})
        }
        res.status(200).json({Task});
    } catch (error) {
        res.status(500).json({error})
        
    }
}


const deleteTask = async (req,res) => {
    try {
        const {id: taskId } = req.params;//

        //const {id,age} = req.params      //recuperer by id
    
        const Task = await task.findOneAndDelete({ _id: taskId })
        if(!Task){
            return res.status(404).json({msg:`task isn't created `})
        }
        res.status(200).json({Task})
        
    } catch (error) { 
        res.status(500).json({error})
        
    } 
}


module.exports = {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
}