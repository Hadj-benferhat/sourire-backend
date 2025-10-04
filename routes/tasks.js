const express = require("express");

const {adminAuth,auth} = require("../middleware/authentication")

const router = express.Router();

const {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
} = require("../controllers/tasks");

router.route('/').get(getAllTasks).post(createTask)

router.route("/:id").get(getTask).patch(auth,updateTask).delete(deleteTask);

module.exports = router

