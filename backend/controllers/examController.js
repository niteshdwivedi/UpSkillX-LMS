const Exam = require("../models/Exam");

// CREATE EXAM (Teacher)
exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EXAMS
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE EXAM
exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};