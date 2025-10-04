const express = require("express")
const {needHelp,getAllNeededHelps} = require("../controllers/in-need")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

router.route('/').post(needHelp).get(adminAuth,getAllNeededHelps)

module.exports = router
