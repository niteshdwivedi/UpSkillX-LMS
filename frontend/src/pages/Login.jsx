import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import googleIcon from "../assets/google.svg";


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.placeholder.toLowerCase()]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      alert("Login Successful 🚀");

      if (res.data.user.role === "student") {
        navigate("/student-dashboard");
      } else if (res.data.user.role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/admin-dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f2f] to-[#002b36] flex items-center justify-center">

      <div className="w-[1000px] h-[550px] bg-[#012a3a] shadow-[0_0_60px_#00ffff40] rounded-2xl flex overflow-hidden">

        {/* LEFT SIDE */}
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-14 text-white flex flex-col justify-center"
        >
          <img src={logo} alt="UpSkillX Logo" className="w-36 mb-8" />

          <h2 className="text-4xl font-bold mb-10">Login</h2>

          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-8 p-3 bg-transparent border-b border-gray-400 focus:outline-none focus:border-cyan-400 text-lg"
          />

          <div className="relative mb-8">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 bg-transparent border-b border-gray-400 focus:outline-none focus:border-cyan-400 text-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-2 text-sm text-cyan-400 hover:text-cyan-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-full font-semibold text-lg transition duration-300">
            Login
          </button>

          <button
  type="button"
  onClick={() => alert("Google Login coming soon 🚀")}
  className="w-full mt-5 border border-white py-3 rounded-full hover:bg-white hover:text-black transition duration-300 flex items-center justify-center gap-2"
>
  <img src={googleIcon} alt="google" className="w-5 h-5" />

  Login with Google
</button>


          <p className="mt-6 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-cyan-400 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </form>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-gradient-to-br from-cyan-500 to-teal-400 flex flex-col items-center justify-center text-white p-10">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Welcome Back!
          </h1>

          <p className="text-center text-lg">
            Continue learning and upskill yourself with{" "}
            <span className="font-extrabold text-red-500 text-xl">
              UpSkillX 🚀
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
