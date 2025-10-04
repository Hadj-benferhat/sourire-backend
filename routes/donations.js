const {
    giveDonation,
    getAllDonations,
    getDonation,
    deleteDonation
} = require("../controllers/donations")
const {adminAuth} = require("../middleware/authentication")

const express = require("express")
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: Donation management endpoints
 */

/**
 * @swagger
 * /api/v1/donation:
 *   post:
 *     summary: Make a donation
 *     description: Submit a new donation to the system
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - donorName
 *               - donationType
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1000
 *               donorName:
 *                 type: string
 *                 example: John Doe
 *               donorEmail:
 *                 type: string
 *                 format: email
 *                 example: donor@example.com
 *               donorPhone:
 *                 type: string
 *                 example: +213555123456
 *               donationType:
 *                 type: string
 *                 example: Money
 *               message:
 *                 type: string
 *                 example: Happy to help
 *               wilaya:
 *                 type: string
 *                 example: Alger
 *     responses:
 *       201:
 *         description: Donation submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 donation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     donorName:
 *                       type: string
 *                     donationType:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all donations
 *     description: Retrieve a list of all donations (Admin only)
 *     tags: [Donations]
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
 *         description: Number of donations per page
 *       - in: query
 *         name: donationType
 *         schema:
 *           type: string
 *         description: Filter by donation type
 *     responses:
 *       200:
 *         description: List of donations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 donations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       donorName:
 *                         type: string
 *                       donationType:
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
 */
router.route("/").post(giveDonation).get(adminAuth,getAllDonations)

/**
 * @swagger
 * /api/v1/donation/{id}:
 *   get:
 *     summary: Get a single donation
 *     description: Retrieve details of a specific donation by ID (Admin only)
 *     tags: [Donations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The donation ID
 *     responses:
 *       200:
 *         description: Donation details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 donation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     donorName:
 *                       type: string
 *                     donorEmail:
 *                       type: string
 *                     donorPhone:
 *                       type: string
 *                     donationType:
 *                       type: string
 *                     message:
 *                       type: string
 *                     wilaya:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Donation not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a donation
 *     description: Remove a donation from the system (Admin only)
 *     tags: [Donations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The donation ID
 *     responses:
 *       200:
 *         description: Donation deleted successfully
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
 *                   example: Donation deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Donation not found
 *       500:
 *         description: Server error
 */
router.route("/:id").get(adminAuth,getDonation).delete(adminAuth,deleteDonation)

module.exports = router