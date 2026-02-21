// FILE: backend/models/Exam.js

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

    // ✅ ADD ATTEMPTS HERE (INSIDE SCHEMA)
    attempts: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        score: Number,
        total: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);