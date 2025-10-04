const express = require("express");

const {adminAuth} = require("../middleware/authentication")

const router = express.Router();

const {
    getAllFAQs,
    getFAQ,
    updateFAQ,
    deleteFAQ,
    createFAQ
} = require("../controllers/faq");

router.route('/').get(getAllFAQs).post(adminAuth,createFAQ)

router.route("/:id").get(getFAQ).patch(adminAuth,updateFAQ).delete(adminAuth,deleteFAQ);

module.exports = router 