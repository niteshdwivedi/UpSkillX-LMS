import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ExamPage = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/exams/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setExam(res.data);
      setTimeLeft(res.data.duration * 60);
    };

    fetchExam();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    let correct = 0;

    exam.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });

    setScore(correct);
  };

  if (!exam) return <div>Loading...</div>;

  return (
    <div className="p-10 text-white bg-[#001f2f] min-h-screen">

      <h1 className="text-3xl mb-4">{exam.title}</h1>

      <p className="mb-4">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>

      {exam.questions.map((q, index) => (
        <div key={index} className="mb-6 bg-[#012a3a] p-6 rounded-xl">

          <h2 className="mb-3">{q.question}</h2>

          {q.options.map((opt, i) => (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  onChange={() =>
                    setAnswers({ ...answers, [index]: i })
                  }
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-cyan-500 px-6 py-2 rounded-lg"
      >
        Submit Exam
      </button>

      {score !== null && (
        <h2 className="mt-6 text-2xl">
          Your Score: {score} / {exam.questions.length}
        </h2>
      )}

    </div>
  );
};

export default ExamPage;