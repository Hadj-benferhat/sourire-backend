const express = require("express")
const {
    getAllWilayas,
    getAllDonTypes,
    getAllSituations
} = require("../controllers/data")

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Static data and reference information endpoints
 */

/**
 * @swagger
 * /api/v1/data/wilaya:
 *   get:
 *     summary: Get all wilayas
 *     description: Retrieve a list of all Algerian wilayas (provinces)
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of wilayas retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 wilayas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       code:
 *                         type: string
 *                         example: "16"
 *                       name:
 *                         type: string
 *                         example: Alger
 *       500:
 *         description: Server error
 */
router.route('/wilaya').get(getAllWilayas)

/**
 * @swagger
 * /api/v1/data/situations:
 *   get:
 *     summary: Get all situations
 *     description: Retrieve a list of all available situation types
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of situations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 situations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: Emergency
 *                       description:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.route('/situations').get(getAllSituations)

/**
 * @swagger
 * /api/v1/data/donType:
 *   get:
 *     summary: Get all donation types
 *     description: Retrieve a list of all available donation types
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: List of donation types retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 donTypes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: Money
 *                       description:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.route('/donType').get(getAllDonTypes)

module.exports = router