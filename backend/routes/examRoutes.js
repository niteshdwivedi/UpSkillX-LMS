const express = require("express");
const router = express.Router();
const { createExam, getExams, getExamById } = require("../controllers/examController");
const { protect, teacherOnly } = require("../middleware/authMiddleware");

router.post("/", protect, teacherOnly, createExam);
router.get("/", protect, getExams);
router.get("/:id", protect, getExamById);

module.exports = router;