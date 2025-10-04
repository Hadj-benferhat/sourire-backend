const {
    giveDonation,
    getAllDonations,
    getDonation,
    deleteDonation
} = require("../controllers/donations")
const {adminAuth} = require("../middleware/authentication")

const express = require("express")
const router = express.Router()

router.route("/").post(giveDonation).get(adminAuth,getAllDonations)
router.route("/:id").get(adminAuth,getDonation).delete(adminAuth,deleteDonation)

module.exports = router 