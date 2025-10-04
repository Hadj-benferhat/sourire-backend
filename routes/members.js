const express = require("express")
const {becomeMember,getAllMembersWaitList} = require("../controllers/members")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

/**
 * @swagger
 * tags:
 *   name: Members Waitlist
 *   description: Member registration waitlist management endpoints
 */

/**
 * @swagger
 * /api/v1/membersWaitList:
 *   post:
 *     summary: Apply for membership
 *     description: Submit an application to join the organization and be added to the waitlist
 *     tags: [Members Waitlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Ahmed
 *               lastName:
 *                 type: string
 *                 example: Benali
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ahmed.benali@example.com
 *               phone:
 *                 type: string
 *                 example: +213555123456
 *               wilaya:
 *                 type: string
 *                 example: Oran
 *               address:
 *                 type: string
 *                 example: Rue de la Liberté, Oran
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1995-05-15
 *               occupation:
 *                 type: string
 *                 example: Engineer
 *               motivation:
 *                 type: string
 *                 example: I want to contribute to helping people in need
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Teaching, Fundraising, Event Management]
 *     responses:
 *       201:
 *         description: Membership application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 member:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     status:
 *                       type: string
 *                       example: pending
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input or missing required fields
 *       409:
 *         description: Email already exists in waitlist
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all members waitlist
 *     description: Retrieve a list of all membership applications in the waitlist (Admin only)
 *     tags: [Members Waitlist]
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
 *         description: Number of applications per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Filter by application status
 *       - in: query
 *         name: wilaya
 *         schema:
 *           type: string
 *         description: Filter by wilaya
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *     responses:
 *       200:
 *         description: List of membership applications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       wilaya:
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
router.route('/').post(becomeMember).get(adminAuth,getAllMembersWaitList)

module.exports = router