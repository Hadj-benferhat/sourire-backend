const {ajouterStock,getAllStocks,updateStock} = require("../controllers/stocks")
const {adminAuth} = require("../middleware/authentication")
const express = require("express")
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: Inventory and stock management endpoints
 */

/**
 * @swagger
 * /api/v1/stock/{id}:
 *   post:
 *     summary: Add stock item
 *     description: Add a new item to the stock inventory (Admin only)
 *     tags: [Stock]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The stock item ID or identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemName
 *               - quantity
 *               - category
 *             properties:
 *               itemName:
 *                 type: string
 *                 example: Medical Supplies
 *               quantity:
 *                 type: integer
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: Healthcare
 *               unit:
 *                 type: string
 *                 example: boxes
 *               description:
 *                 type: string
 *                 example: First aid kits and medical supplies
 *               supplier:
 *                 type: string
 *                 example: ABC Medical Supplies
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-12-31
 *               location:
 *                 type: string
 *                 example: Warehouse A, Section 3
 *               minStockLevel:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Stock item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 stock:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     itemName:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     category:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input or missing required fields
 *       401:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Server error
 *   patch:
 *     summary: Update stock item
 *     description: Update an existing stock item's information (Admin only)
 *     tags: [Stock]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The stock item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               category:
 *                 type: string
 *               unit:
 *                 type: string
 *               description:
 *                 type: string
 *               supplier:
 *                 type: string
 *               expiryDate:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               minStockLevel:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [available, low-stock, out-of-stock, expired]
 *     responses:
 *       200:
 *         description: Stock item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 stock:
 *                   type: object
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Stock item not found
 *       500:
 *         description: Server error
 */
router.route("/:id").post(adminAuth,ajouterStock).patch(adminAuth,updateStock)

/**
 * @swagger
 * /api/v1/stock:
 *   get:
 *     summary: Get all stock items
 *     description: Retrieve a list of all items in the stock inventory (Admin only)
 *     tags: [Stock]
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
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [available, low-stock, out-of-stock, expired]
 *         description: Filter by stock status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by item name
 *     responses:
 *       200:
 *         description: List of stock items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 stocks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       itemName:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                       category:
 *                         type: string
 *                       unit:
 *                         type: string
 *                       status:
 *                         type: string
 *                       expiryDate:
 *                         type: string
 *                         format: date
 *                       location:
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
router.route("/").get(adminAuth,getAllStocks)


module.exports = router