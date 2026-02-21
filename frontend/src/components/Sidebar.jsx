// FILE: frontend/src/components/Sidebar.jsx

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="w-64 bg-[#012a3a] min-h-screen text-white p-6">
      <h2 className="text-xl font-bold mb-8 text-cyan-400">
        {role === "teacher" ? "Teacher Panel" : "Student Panel"}
      </h2>

      <ul className="space-y-4">

        <li
          onClick={() =>
            role === "teacher"
              ? navigate("/teacher-dashboard")
              : navigate("/student-dashboard")
          }
          className="cursor-pointer hover:text-cyan-400"
        >
          Dashboard
        </li>

        <li
          onClick={() => navigate("/courses")}
          className="cursor-pointer hover:text-cyan-400"
        >
          Courses
        </li>

        {role === "student" && (
          <li
            onClick={() => navigate("/exams")}
            className="cursor-pointer hover:text-cyan-400"
          >
            Exams
          </li>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;