const express = require("express")
const {addVolunter,getAllVolunteers,deleteVolunteer} = require("../controllers/volunteers")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

router.route('/').get(adminAuth,getAllVolunteers)
router.route('/:id').post(/*adminAuth,*/addVolunter).delete(adminAuth,deleteVolunteer)

module.exports = router
