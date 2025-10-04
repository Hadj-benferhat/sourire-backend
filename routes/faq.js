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

/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: Frequently Asked Questions management endpoints
 */

/**
 * @swagger
 * /api/v1/FAQ:
 *   get:
 *     summary: Get all FAQs
 *     description: Retrieve a list of all frequently asked questions
 *     tags: [FAQ]
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
 *         description: Number of FAQs per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by FAQ category
 *     responses:
 *       200:
 *         description: List of FAQs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 faqs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       question:
 *                         type: string
 *                       answer:
 *                         type: string
 *                       category:
 *                         type: string
 *                       order:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new FAQ
 *     description: Add a new frequently asked question (Admin only)
 *     tags: [FAQ]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 example: How can I make a donation?
 *               answer:
 *                 type: string
 *                 example: You can make a donation through our donation page or contact us directly
 *               category:
 *                 type: string
 *                 example: Donations
 *               order:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 faq:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                     category:
 *                       type: string
 *                     order:
 *                       type: integer
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Server error
 */
router.route('/').get(getAllFAQs).post(adminAuth,createFAQ)

/**
 * @swagger
 * /api/v1/FAQ/{id}:
 *   get:
 *     summary: Get a single FAQ
 *     description: Retrieve details of a specific FAQ by ID
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The FAQ ID
 *     responses:
 *       200:
 *         description: FAQ details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 faq:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                     category:
 *                       type: string
 *                     order:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Update an FAQ
 *     description: Update an existing FAQ's information (Admin only)
 *     tags: [FAQ]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The FAQ ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               category:
 *                 type: string
 *               order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 faq:
 *                   type: object
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete an FAQ
 *     description: Remove an FAQ from the system (Admin only)
 *     tags: [FAQ]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The FAQ ID
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
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
 *                   example: FAQ deleted successfully
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: FAQ not found
 *       500:
 *         description: Server error
 */
router.route("/:id").get(getFAQ).patch(adminAuth,updateFAQ).delete(adminAuth,deleteFAQ);

module.exports = router