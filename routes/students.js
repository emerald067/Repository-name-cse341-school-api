const express = require("express");
const Student = require("../models/student");
const { requiresAuth } = require("express-openid-connect");

const router = express.Router();

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     security:
 *       - auth0: []
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of students
 *       500:
 *         description: Failed to get students
 */
router.get("/", requiresAuth(), async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: "Failed to get students" });
    }
});


/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student's MongoDB ID
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 *       500:
 *         description: Failed to get student
 */
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: "Failed to get student" });
    }
});


/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
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
 *               - dateOfBirth
 *               - gender
 *               - classId
 *               - address
 *               - enrollmentDate
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: "08012345678"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2008-05-15"
 *               gender:
 *                 type: string
 *                 example: Male
 *               classId:
 *                 type: string
 *                 example: JSS2-A
 *               address:
 *                 type: string
 *                 example: Port Harcourt, Nigeria
 *               enrollmentDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-01"
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();

        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student's MongoDB ID
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
 *               - dateOfBirth
 *               - gender
 *               - classId
 *               - address
 *               - enrollmentDate
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.updated@example.com
 *               phone:
 *                 type: string
 *                 example: "08012345678"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "2008-05-15"
 *               gender:
 *                 type: string
 *                 example: Male
 *               classId:
 *                 type: string
 *                 example: JSS2-A
 *               address:
 *                 type: string
 *                 example: Port Harcourt, Nigeria
 *               enrollmentDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-01"
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Student not found
 */
router.put("/:id", async (req, res) => {
    try {
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "phone",
            "dateOfBirth",
            "gender",
            "classId",
            "address",
            "enrollmentDate"
        ];

        const missingFields = requiredFields.filter(
            (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "Missing required fields",
                missingFields: missingFields
            });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student's MongoDB ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Failed to delete student
 */
router.delete("/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(deletedStudent);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete student" });
    }
});

module.exports = router;