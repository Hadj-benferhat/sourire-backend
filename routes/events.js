const {getAllEvents,getEvent,createEvent,deleteEvent,updateEvent,uploadImage} = require("../controllers/events")
const express = require("express")
const router = express.Router()

const {adminAuth,auth} = require("../middleware/authentication")

router.route("/").get(/*auth,*/getAllEvents).post(/*adminAuth,*/createEvent)
router.route("/:id").get(/*auth,*/getEvent).delete(/*adminAuth,*/deleteEvent).patch(/*adminAuth,*/updateEvent)
router.route("/uploads").post(uploadImage)

module.exports = router