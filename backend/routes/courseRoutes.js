// FILE: backend/routes/courseRoutes.js

const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const upload = require("../middleware/upload");

// 🔥 IMPORTANT FIX
const { protect, teacherOnly } = require("../middleware/authMiddleware");

// ================= CREATE COURSE =================
router.post(
  "/",
  protect,
  teacherOnly,
  upload.single("video"),
  async (req, res) => {
    try {
      let videoUrl = "";
      let videoType = "youtube";

      if (req.file) {
        videoUrl = req.file.path;
        videoType = "upload";
      } else {
        videoUrl = req.body.videoUrl;
        videoType = req.body.videoType || "youtube";
      }

      const course = new Course({
        title: req.body.title,
        description: req.body.description,
        videoUrl,
        videoType,
        createdBy: req.user.id,
      });

      await course.save();

      res.status(201).json(course);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating course" });
    }
  }
);

// ================= GET ALL COURSES =================
router.get("/", protect, async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// ================= GET SINGLE COURSE =================
router.get("/:id", protect, async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

// LIKE / UNLIKE COURSE
router.put("/:id/like", protect, async (req, res) => {
  const course = await Course.findById(req.params.id);

  const userId = req.user.id;

  if (course.likes.includes(userId)) {
    course.likes = course.likes.filter(
      (id) => id.toString() !== userId
    );
  } else {
    course.likes.push(userId);
  }

  await course.save();
  res.json(course.likes.length);
});

// ADD COMMENT
router.post("/:id/comment", protect, async (req, res) => {
  const course = await Course.findById(req.params.id);

  course.comments.push({
    user: req.user.id,
    text: req.body.text,
  });

  await course.save();

  res.json(course.comments);
});

module.exports = router;