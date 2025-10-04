const express = require("express")
const {
    getAllWilayas,
    getAllDonTypes,
    getAllSituations
} = require("../controllers/data")

const router = express.Router()

router.route('/wilaya').get(getAllWilayas)
router.route('/situations').get(getAllSituations)
router.route('/donType').get(getAllDonTypes)

module.exports = router