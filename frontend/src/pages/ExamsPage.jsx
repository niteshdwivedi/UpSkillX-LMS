// FILE: frontend/src/pages/ExamsPage.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/exams",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setExams(res.data);
    };

    fetchExams();
  }, []);

  return (
    <div className="min-h-screen bg-[#001f2f] text-white p-10">
      <h1 className="text-3xl mb-6">Available Exams</h1>

      <div className="grid grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam._id}
            onClick={() => navigate(`/exam/${exam._id}`)}
            className="bg-[#012a3a] p-6 rounded-xl cursor-pointer"
          >
            <h2>{exam.title}</h2>
            <p>{exam.duration} minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamsPage;