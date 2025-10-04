const express = require("express")
const {addSponsor,getAllSponsors,deleteSponsor} = require("../controllers/sponsor")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

router.route('/').get(adminAuth,getAllSponsors).delete(adminAuth,deleteSponsor)
router.route('/:id').post(/*adminAuth,*/addSponsor)

module.exports = router
