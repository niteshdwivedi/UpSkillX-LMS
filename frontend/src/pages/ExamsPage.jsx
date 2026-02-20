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
    <div className="p-10 bg-[#001f2f] min-h-screen text-white">
      <h1 className="text-3xl mb-6">Available Exams</h1>

      <div className="grid grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-[#012a3a] p-6 rounded-xl cursor-pointer"
            onClick={() => navigate(`/exam/${exam._id}`)}
          >
            <h2 className="text-xl">{exam.title}</h2>
            <p>{exam.description}</p>
            <p>Duration: {exam.duration} min</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamsPage;