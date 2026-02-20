const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");

const { protect, teacherOnly } = require("../middleware/authMiddleware");

router.post("/", protect, teacherOnly, createCourse);
router.get("/", protect, getCourses);
router.delete("/:id", protect, teacherOnly, deleteCourse);
router.put("/:id", protect, teacherOnly, updateCourse);

module.exports = router;