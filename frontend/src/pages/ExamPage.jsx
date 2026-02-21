// FILE: frontend/src/pages/ExamPage.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ExamPage = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  // ================= FETCH EXAM =================
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/exams/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setExam(res.data);
      } catch (error) {
        console.log("Error loading exam:", error);
      }
    };

    fetchExam();
  }, [id]);

  if (!exam) return <div className="text-white p-10">Loading...</div>;

  // ================= SELECT ANSWER =================
  const handleSelect = (qIndex, optionIndex) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  // ================= SUBMIT EXAM =================
  const handleSubmit = async () => {
    let correct = 0;

    exam.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });

    try {
      await axios.post(
        `http://localhost:5000/api/exams/${id}/submit`,
        {
          score: correct,
          total: exam.questions.length,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setScore(correct);
    } catch (error) {
      console.log("Error saving attempt:", error);
    }
  };

  // ================= RESULT SCREEN =================
  if (score !== null) {
    return (
      <div className="min-h-screen bg-[#001f2f] text-white">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-10">
            <h1 className="text-3xl mb-4">Result 🎉</h1>
            <p>
              Your Score: {score} / {exam.questions.length}
            </p>

            <button
              onClick={() => {
                setScore(null);
                setAnswers([]);
              }}
              className="mt-6 bg-cyan-500 px-6 py-2 rounded"
            >
              Retake Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= EXAM SCREEN =================
  return (
    <div className="min-h-screen bg-[#001f2f] text-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-10">

          <h1 className="text-2xl mb-6">{exam.title}</h1>

          {exam.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="mb-6 bg-[#012a3a] p-4 rounded-xl"
            >
              <p className="mb-4">{q.question}</p>

              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(qIndex, i)}
                  className={`block w-full text-left px-4 py-2 mb-2 rounded ${
                    answers[qIndex] === i
                      ? "bg-cyan-500"
                      : "bg-[#001f2f]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-green-500 px-6 py-2 rounded"
          >
            Submit Exam
          </button>

        </div>
      </div>
    </div>
  );
};

export default ExamPage;