const express = require("express")
const {needHelp,getAllNeededHelps} = require("../controllers/in-need")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

/**
 * @swagger
 * tags:
 *   name: Help Requests
 *   description: Help request management endpoints for people in need
 */

/**
 * @swagger
 * /api/v1/helps:
 *   post:
 *     summary: Submit a help request
 *     description: Submit a request for help or assistance
 *     tags: [Help Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - situation
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmed Benali
 *               phone:
 *                 type: string
 *                 example: +213555123456
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ahmed@example.com
 *               wilaya:
 *                 type: string
 *                 example: Oran
 *               address:
 *                 type: string
 *                 example: Rue de la Liberté, Oran
 *               situation:
 *                 type: string
 *                 example: Medical emergency
 *               description:
 *                 type: string
 *                 example: Need urgent medical assistance for family member
 *               urgency:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *                 example: high
 *     responses:
 *       201:
 *         description: Help request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 helpRequest:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     situation:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: pending
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all help requests
 *     description: Retrieve a list of all help requests (Admin only)
 *     tags: [Help Requests]
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
 *         description: Number of help requests per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in-progress, resolved, rejected]
 *         description: Filter by request status
 *       - in: query
 *         name: urgency
 *         schema:
 *           type: string
 *           enum: [low, medium, high, urgent]
 *         description: Filter by urgency level
 *       - in: query
 *         name: wilaya
 *         schema:
 *           type: string
 *         description: Filter by wilaya
 *     responses:
 *       200:
 *         description: List of help requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 helpRequests:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       wilaya:
 *                         type: string
 *                       situation:
 *                         type: string
 *                       urgency:
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
 */
router.route('/').post(needHelp).get(adminAuth,getAllNeededHelps)

module.exports = router