const express = require("express")
const {becomeSponsor,getAllSponsorsWaitList,deleteSponsorWaitList} = require("../controllers/sponsorWaitList")
const router = express.Router()
const {adminAuth} = require("../middleware/authentication")

/**
 * @swagger
 * tags:
 *   name: Sponsors Waitlist
 *   description: Sponsor application waitlist management endpoints
 */

/**
 * @swagger
 * /api/v1/sponsorWaitList:
 *   post:
 *     summary: Apply to become a sponsor
 *     description: Submit an application to become a sponsor and be added to the waitlist
 *     tags: [Sponsors Waitlist]
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
 *               - phone
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
 *               companyAddress:
 *                 type: string
 *                 example: 123 Business Street, Alger
 *               wilaya:
 *                 type: string
 *                 example: Alger
 *               sponsorshipType:
 *                 type: string
 *                 enum: [Bronze, Silver, Gold, Platinum]
 *                 example: Gold
 *               proposedAmount:
 *                 type: number
 *                 example: 50000
 *               message:
 *                 type: string
 *                 example: We are interested in supporting your organization's mission
 *               companySize:
 *                 type: string
 *                 example: 50-200 employees
 *               industry:
 *                 type: string
 *                 example: Technology
 *     responses:
 *       201:
 *         description: Sponsorship application submitted successfully
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
 *                       example: pending
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input or missing required fields
 *       409:
 *         description: Company already exists in waitlist
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all sponsor applications
 *     description: Retrieve a list of all sponsor applications in the waitlist (Admin only)
 *     tags: [Sponsors Waitlist]
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
 *         name: sponsorshipType
 *         schema:
 *           type: string
 *           enum: [Bronze, Silver, Gold, Platinum]
 *         description: Filter by sponsorship type
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by company name or contact person
 *     responses:
 *       200:
 *         description: List of sponsor applications retrieved successfully
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
 *                       sponsorshipType:
 *                         type: string
 *                       proposedAmount:
 *                         type: number
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a sponsor application
 *     description: Remove a sponsor application from the waitlist (Admin only)
 *     tags: [Sponsors Waitlist]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The sponsor application ID to delete
 *     responses:
 *       200:
 *         description: Sponsor application deleted successfully
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
 *                   example: Sponsor application deleted successfully
 *       404:
 *         description: Sponsor application not found
 *       500:
 *         description: Server error
 */
router.route('/').post(becomeSponsor).get(/*adminAuth,*/getAllSponsorsWaitList).delete(/*adminAuth,*/deleteSponsorWaitList)

module.exports = router