import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-[#012a3a] min-h-[calc(100vh-72px)] text-white p-6 border-r border-cyan-500/20">

      <h2 className="text-xl font-bold mb-8 text-cyan-400">
        Student Panel
      </h2>

      <ul className="space-y-5">
        <li
          onClick={() => navigate("/student")}
          className="hover:text-cyan-400 cursor-pointer"
        >
          Dashboard
        </li>

        <li
          onClick={() => navigate("/courses")}
          className="hover:text-cyan-400 cursor-pointer"
        >
          Courses
        </li>

        <li
          onClick={() => navigate("/exams")}
          className="hover:text-cyan-400 cursor-pointer"
        >
          Exams
        </li>

        <li
          onClick={() => navigate("/notes")}
          className="hover:text-cyan-400 cursor-pointer"
        >
          Notes
        </li>

        <li
          onClick={() => navigate("/profile")}
          className="hover:text-cyan-400 cursor-pointer"
        >
          Profile
        </li>
      </ul>

    </div>
  );
};

export default Sidebar;