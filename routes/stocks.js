const {ajouterStock,getAllStocks,updateStock} = require("../controllers/stocks")
const {adminAuth} = require("../middleware/authentication")
const express = require("express")
const router = express.Router()

router.route("/:id").post(adminAuth,ajouterStock).patch(adminAuth,updateStock)
router.route("/").get(adminAuth,getAllStocks)


module.exports = router