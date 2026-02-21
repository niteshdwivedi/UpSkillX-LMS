// FILE: backend/routes/examRoutes.js

const express = require("express");
const router = express.Router();

const Exam = require("../models/Exam"); // ✅ ADD THIS

const {
  createExam,
  getExams,
  getExamById,
} = require("../controllers/examController");

const { protect, teacherOnly } = require("../middleware/authMiddleware");

// CREATE EXAM
router.post("/", protect, teacherOnly, createExam);

// GET ALL EXAMS
router.get("/", protect, getExams);

// GET SINGLE EXAM
router.get("/:id", protect, getExamById);

// SUBMIT EXAM
router.post("/:id/submit", protect, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    exam.attempts.push({
      user: req.user.id,
      score: req.body.score,
      total: req.body.total,
    });

    await exam.save();

    res.json({ message: "Attempt saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving attempt" });
  }
});

module.exports = router;