////
const express = require("express")
const {
    becomeVolunter,
    getAllVolunteersWaitList,
    deleteVolunteerWaitList
} = require("../controllers/volunteersWaitList")

const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

router.route('/').post(becomeVolunter).get(/*adminAuth,*/getAllVolunteersWaitList)
router.route('/:id').delete(adminAuth,deleteVolunteerWaitList)

module.exports = router
