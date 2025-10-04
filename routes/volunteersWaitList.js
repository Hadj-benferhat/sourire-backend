const express = require("express")
const {
    becomeVolunter,
    getAllVolunteersWaitList,
    deleteVolunteerWaitList
} = require("../controllers/volunteersWaitList")

const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

/**
 * @swagger
 * tags:
 *   name: Volunteers Waitlist
 *   description: Volunteer application waitlist management endpoints
 */

/**
 * @swagger
 * /api/v1/volunteersWaitList:
 *   post:
 *     summary: Apply to become a volunteer
 *     description: Submit an application to become a volunteer and be added to the waitlist
 *     tags: [Volunteers Waitlist]
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
 *                 example: Weekends and evenings
 *               motivation:
 *                 type: string
 *                 example: I want to contribute to helping people in need in my community
 *               experience:
 *                 type: string
 *                 example: 2 years of volunteering experience with local NGOs
 *               areasOfInterest:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Education, Healthcare, Community Events]
 *     responses:
 *       201:
 *         description: Volunteer application submitted successfully
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
 *     summary: Get all volunteer applications
 *     description: Retrieve a list of all volunteer applications in the waitlist
 *     tags: [Volunteers Waitlist]
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
 *         description: List of volunteer applications retrieved successfully
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
 *       500:
 *         description: Server error
 */
router.route('/').post(becomeVolunter).get(/*adminAuth,*/getAllVolunteersWaitList)

/**
 * @swagger
 * /api/v1/volunteersWaitList/{id}:
 *   delete:
 *     summary: Delete a volunteer application
 *     description: Remove a volunteer application from the waitlist (Admin only)
 *     tags: [Volunteers Waitlist]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The volunteer application ID
 *     responses:
 *       200:
 *         description: Volunteer application deleted successfully
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
 *                   example: Volunteer application deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Volunteer application not found
 *       500:
 *         description: Server error
 */
router.route('/:id').delete(adminAuth,deleteVolunteerWaitList)

module.exports = router