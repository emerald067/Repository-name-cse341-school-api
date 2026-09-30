const express = require("express");
const Class = require("../models/class");
const { requiresAuth } = require("express-openid-connect");

const router = express.Router();

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     security:
 *       - auth0: []
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: A list of classes
 *       500:
 *         description: Failed to get classes
 */
router.get("/", requiresAuth(), async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ error: "Failed to get classes" });
    }
});


/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class MongoDB ID
 *     responses:
 *       200:
 *         description: Class found
 *       404:
 *         description: Class not found
 *       500:
 *         description: Failed to get class
 */
router.get("/:id", async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id);

        if (!classItem) {
            return res.status(404).json({ error: "Class not found" });
        }

        res.status(200).json(classItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to get class" });
    }
});


/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - gradeLevel
 *               - section
 *               - teacherName
 *               - room
 *               - academicYear
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: JSS2 A
 *               gradeLevel:
 *                 type: string
 *                 example: JSS2
 *               section:
 *                 type: string
 *                 example: A
 *               teacherName:
 *                 type: string
 *                 example: Mrs. Williams
 *               room:
 *                 type: string
 *                 example: Room 12
 *               academicYear:
 *                 type: string
 *                 example: 2026-2027
 *               capacity:
 *                 type: integer
 *                 example: 35
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", async (req, res) => {
    try {
        const newClass = new Class(req.body);
        const savedClass = await newClass.save();

        res.status(201).json(savedClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Update a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - gradeLevel
 *               - section
 *               - teacherName
 *               - room
 *               - academicYear
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 example: JSS2 A
 *               gradeLevel:
 *                 type: string
 *                 example: JSS2
 *               section:
 *                 type: string
 *                 example: A
 *               teacherName:
 *                 type: string
 *                 example: Mr. Williams
 *               room:
 *                 type: string
 *                 example: Room 12
 *               academicYear:
 *                 type: string
 *                 example: 2026-2027
 *               capacity:
 *                 type: integer
 *                 example: 35
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Class not found
 */
router.put("/:id", async (req, res) => {
    try {
        const requiredFields = [
            "name",
            "gradeLevel",
            "section",
            "teacherName",
            "room",
            "academicYear",
            "capacity"
        ];

        const missingFields = requiredFields.filter(
            (field) => req.body[field] === undefined ||
                       req.body[field] === null ||
                       req.body[field] === ""
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "Missing required fields",
                missingFields: missingFields
            });
        }

        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The class MongoDB ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 *       500:
 *         description: Failed to delete class
 */
router.delete("/:id", async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);

        if (!deletedClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        res.status(200).json(deletedClass);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete class" });
    }
});

module.exports = router;