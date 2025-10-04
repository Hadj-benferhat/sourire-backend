const express = require("express")
const {becomeSponsor,getAllSponsorsWaitList,deleteSponsorWaitList} = require("../controllers/sponsorWaitList")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

router.route('/').post(becomeSponsor).get(/*adminAuth,*/getAllSponsorsWaitList).delete(/*adminAuth,*/deleteSponsorWaitList)

module.exports = router
