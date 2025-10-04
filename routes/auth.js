const {login,logout,forgotPassword,resetPassword} = require("../controllers/auth")
const express = require("express")
const router = express.Router()

router.post('/login', login)
router.get('/logout',logout)
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword',resetPassword)

module.exports = router