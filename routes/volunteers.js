const express = require("express")
const {addVolunter,getAllVolunteers,deleteVolunteer} = require("../controllers/volunteers")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

/**
 * @swagger
 * tags:
 *   name: Volunteers
 *   description: Volunteer management endpoints
 */

/**
 * @swagger
 * /api/v1/volunteers:
 *   get:
 *     summary: Get all volunteers
 *     description: Retrieve a list of all volunteers (Admin only)
 *     tags: [Volunteers]
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
 *         description: Number of volunteers per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Filter by volunteer status
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
 *         description: List of volunteers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 volunteers:
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
 *                       skills:
 *                         type: array
 *                         items:
 *                           type: string
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
router.route('/').get(adminAuth,getAllVolunteers)

/**
 * @swagger
 * /api/v1/volunteers/{id}:
 *   post:
 *     summary: Add a volunteer
 *     description: Add or register a volunteer in the system
 *     tags: [Volunteers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The volunteer ID or identifier
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
 *                 example: Teacher
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Teaching, Event Organization, First Aid]
 *               availability:
 *                 type: string
 *                 example: Weekends
 *               motivation:
 *                 type: string
 *                 example: I want to help the community
 *               experience:
 *                 type: string
 *                 example: 2 years volunteering experience
 *     responses:
 *       201:
 *         description: Volunteer added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 volunteer:
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
 *                       example: active
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input or missing required fields
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a volunteer
 *     description: Remove a volunteer from the system (Admin only)
 *     tags: [Volunteers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The volunteer ID
 *     responses:
 *       200:
 *         description: Volunteer deleted successfully
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
 *                   example: Volunteer deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Volunteer not found
 *       500:
 *         description: Server error
 */
router.route('/:id').post(/*adminAuth,*/addVolunter).delete(adminAuth,deleteVolunteer)

module.exports = router