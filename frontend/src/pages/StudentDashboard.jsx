import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Courses
        const courseRes = await axios.get(
          "http://localhost:5000/api/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(courseRes.data);

        // Fetch Exams
        const examRes = await axios.get(
          "http://localhost:5000/api/exams",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExams(examRes.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#001f2f] text-white">

      {/* NAVBAR */}
      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-8">

          <h1 className="text-3xl font-bold mb-8">
            Welcome Student 🎓
          </h1>

          {/* ================= EXAMS SECTION ================= */}
          <h2 className="text-2xl font-semibold mb-6">
            Available Exams
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="bg-[#012a3a] p-6 rounded-xl shadow-lg hover:scale-[1.02] transition"
              >
                <h3 className="text-xl font-bold mb-2 text-cyan-400">
                  {exam.title}
                </h3>

                <p className="text-gray-400 mb-4">
                  {exam.description}
                </p>

                <p className="text-sm mb-4 text-red-400">
                  Duration: {exam.duration} minutes
                </p>

                <button
                  onClick={() => navigate(`/exam/${exam._id}`)}
                  className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
                >
                  Start Exam
                </button>
              </div>
            ))}
          </div>

          {/* ================= COURSES SECTION ================= */}
          <h2 className="text-2xl font-semibold mb-6">
            My Courses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-[#012a3a] p-6 rounded-xl shadow-lg hover:scale-[1.02] transition"
              >
                {/* TITLE */}
                <h3 className="text-2xl font-bold mb-2 text-cyan-400">
                  {course.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-400 mb-4">
                  {course.description}
                </p>

                {/* VIDEO PREVIEW */}
                {course.videoUrl && (
                  <div className="mb-4">
                    <iframe
                      width="100%"
                      height="180"
                      src={
                        course.videoUrl.includes("playlist")
                          ? `https://www.youtube.com/embed/videoseries?list=${course.videoUrl.split("list=")[1]}`
                          : course.videoUrl.replace("watch?v=", "embed/")
                      }
                      title="Course Video"
                      className="rounded-lg"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                {/* PROGRESS */}
                <div className="mb-4">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-cyan-400 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4">

                  {course.pdfUrl && (
                    <a
                      href={course.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                    >
                      PDF
                    </a>
                  )}

                  {course.pptUrl && (
                    <a
                      href={course.pptUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition text-sm"
                    >
                      PPT
                    </a>
                  )}

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;