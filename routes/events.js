const {getAllEvents,getEvent,createEvent,deleteEvent,updateEvent,uploadImage} = require("../controllers/events")
const express = require("express")
const router = express.Router()

const {adminAuth,auth} = require("../middleware/authentication")

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve a list of all events
 *     tags: [Events]
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
 *         description: Number of events per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [upcoming, past, ongoing]
 *         description: Filter events by status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search events by title or description
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       location:
 *                         type: string
 *                       image:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new event
 *     description: Add a new event to the system (Admin only)
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Charity Fundraiser 2025
 *               description:
 *                 type: string
 *                 example: Annual charity event to raise funds for education
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-12-15T10:00:00Z
 *               location:
 *                 type: string
 *                 example: Alger, Algeria
 *               wilaya:
 *                 type: string
 *                 example: Alger
 *               image:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               organizer:
 *                 type: string
 *                 example: Organization Name
 *               maxParticipants:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     location:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Server error
 */
router.route("/").get(/*auth,*/getAllEvents).post(/*adminAuth,*/createEvent)

/**
 * @swagger
 * /api/v1/events/{id}:
 *   get:
 *     summary: Get a single event
 *     description: Retrieve details of a specific event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *                     location:
 *                       type: string
 *                     wilaya:
 *                       type: string
 *                     image:
 *                       type: string
 *                     organizer:
 *                       type: string
 *                     maxParticipants:
 *                       type: integer
 *                     currentParticipants:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Update an event
 *     description: Update an existing event's information (Admin only)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               wilaya:
 *                 type: string
 *               image:
 *                 type: string
 *               organizer:
 *                 type: string
 *               maxParticipants:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 event:
 *                   type: object
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete an event
 *     description: Remove an event from the system (Admin only)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
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
 *                   example: Event deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */
router.route("/:id").get(/*auth,*/getEvent).delete(/*adminAuth,*/deleteEvent).patch(/*adminAuth,*/updateEvent)

/**
 * @swagger
 * /api/v1/events/uploads:
 *   post:
 *     summary: Upload event image
 *     description: Upload an image file for an event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 imageUrl:
 *                   type: string
 *                   example: https://cloudinary.com/image.jpg
 *       400:
 *         description: Invalid file or missing image
 *       500:
 *         description: Server error during upload
 */
router.route("/uploads").post(uploadImage)

module.exports = router