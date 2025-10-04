const express = require("express")
const {addSponsor,getAllSponsors,deleteSponsor} = require("../controllers/sponsor")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

/**
 * @swagger
 * tags:
 *   name: Sponsors
 *   description: Sponsor management endpoints
 */

/**
 * @swagger
 * /api/v1/sponsor:
 *   get:
 *     summary: Get all sponsors
 *     description: Retrieve a list of all sponsors (Admin only)
 *     tags: [Sponsors]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of sponsors per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Filter by sponsor status
 *     responses:
 *       200:
 *         description: List of sponsors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 sponsors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       companyName:
 *                         type: string
 *                       contactPerson:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       logo:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a sponsor
 *     description: Remove a sponsor from the system (Admin only)
 *     tags: [Sponsors]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sponsor ID to delete
 *     responses:
 *       200:
 *         description: Sponsor deleted successfully
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
 *                   example: Sponsor deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Sponsor not found
 *       500:
 *         description: Server error
 */
router.route('/').get(adminAuth,getAllSponsors).delete(adminAuth,deleteSponsor)

/**
 * @swagger
 * /api/v1/sponsor/{id}:
 *   post:
 *     summary: Add a sponsor
 *     description: Add or update sponsor information
 *     tags: [Sponsors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sponsor ID or identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - contactPerson
 *               - email
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: ABC Corporation
 *               contactPerson:
 *                 type: string
 *                 example: John Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: contact@abccorp.com
 *               phone:
 *                 type: string
 *                 example: +213555123456
 *               website:
 *                 type: string
 *                 example: https://www.abccorp.com
 *               logo:
 *                 type: string
 *                 example: https://example.com/logo.png
 *               sponsorshipType:
 *                 type: string
 *                 example: Gold
 *               amount:
 *                 type: number
 *                 example: 50000
 *               description:
 *                 type: string
 *                 example: Long-term partnership sponsor
 *     responses:
 *       201:
 *         description: Sponsor added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 sponsor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     companyName:
 *                       type: string
 *                     contactPerson:
 *                       type: string
 *                     email:
 *                       type: string
 *                     status:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Server error
 */
router.route('/:id').post(/*adminAuth,*/addSponsor)

module.exports = router