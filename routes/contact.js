const {sendContactEmail}= require("../controllers/contact")
const express = require("express")
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form and messaging endpoints
 */

/**
 * @swagger
 * /api/v1/contactus:
 *   post:
 *     summary: Send contact email
 *     description: Submit a contact form message that will be sent via email
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               subject:
 *                 type: string
 *                 example: Inquiry about services
 *               message:
 *                 type: string
 *                 example: I would like to know more about your services
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *     responses:
 *       200:
 *         description: Contact email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Your message has been sent successfully
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Server error - Failed to send email
 */
router.route('/').post(sendContactEmail);

module.exports = router