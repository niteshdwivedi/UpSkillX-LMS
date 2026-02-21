// FILE: frontend/src/pages/StudentDashboard.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getThumbnail } from "../utils/youtubeHelpers";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/courses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCourses(res.data);
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#001f2f] text-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">

          <h1 className="text-3xl mb-8">Student Dashboard 🎓</h1>

          <div className="grid grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                onClick={() => navigate(`/course/${course._id}`)}
                className="bg-[#012a3a] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition"
              >
                {course.videoType === "youtube" && (
                  <img
                    src={getThumbnail(course.videoUrl)}
                    className="w-full h-48 object-cover"
                    alt="thumb"
                  />
                )}

                <div className="p-4">
                  <h3 className="text-lg text-cyan-400">{course.title}</h3>
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