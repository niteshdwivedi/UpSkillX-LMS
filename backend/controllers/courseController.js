const Course = require("../models/Course");

// 🔥 CREATE COURSE
exports.createCourse = async (req, res) => {
  try {
    const { title, description, videoUrl, pdfUrl, pptUrl } = req.body;

    const course = await Course.create({
      title,
      description,
      videoUrl,
      pdfUrl,
      pptUrl,
    });

    res.status(201).json(course);

  } catch (error) {
    console.log("CREATE COURSE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// 🔥 GET ALL COURSES
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔥 UPDATE COURSE
exports.updateCourse = async (req, res) => {
  try {
    const { title, description, videoUrl, pdfUrl, pptUrl } = req.body;

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, videoUrl, pdfUrl, pptUrl },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);

  } catch (error) {
    console.log("UPDATE COURSE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// 🔥 DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};