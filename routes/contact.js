const {sendContactEmail}= require("../controllers/contact")
const express = require("express")
const router = express.Router()

router.route('/').post(sendContactEmail);

module.exports = router 