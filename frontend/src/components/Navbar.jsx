import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="w-full bg-[#012a3a] border-b border-cyan-500/20">
      <div className="flex justify-between items-center px-8 py-4">

        {/* LOGO LEFT */}
        <img
          src={logo}
          alt="UpSkillX Logo"
          className="h-12 w-auto"
        />

        {/* LOGOUT RIGHT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;