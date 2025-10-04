const express = require("express")
const {becomeMember,getAllMembersWaitList} = require("../controllers/members")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

router.route('/').post(becomeMember).get(adminAuth,getAllMembersWaitList)

module.exports = router
