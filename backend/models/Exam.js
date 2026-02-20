const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
});

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    duration: Number, // in minutes
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);