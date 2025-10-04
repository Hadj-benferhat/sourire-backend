const express = require("express");

const {adminAuth} = require("../middleware/authentication")

const router = express.Router();

const {createComment, getAllComments} = require("../controllers/comment");

router.route('/').post(/*adminAuth,*/createComment).get(adminAuth,getAllComments)

module.exports = router 