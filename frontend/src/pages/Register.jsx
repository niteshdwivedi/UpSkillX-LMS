import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import googleIcon from "../assets/google.svg";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f2f] to-[#002b36] flex items-center justify-center">

      {/* FIXED CARD */}
      <div className="w-[1000px] min-h-[650px] bg-[#012a3a] shadow-[0_0_60px_#00ffff40] rounded-2xl flex overflow-hidden">

        {/* LEFT SIDE */}
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-10 text-white flex flex-col"
        >
          <img src={logo} alt="UpSkillX Logo" className="w-32 mb-6" />

          <h2 className="text-4xl font-bold mb-6">Sign Up</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full mb-5 p-3 bg-transparent border-b border-gray-400 focus:outline-none focus:border-cyan-400 text-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-5 p-3 bg-transparent border-b border-gray-400 focus:outline-none focus:border-cyan-400 text-lg"
          />

          {/* Password */}
          <div className="relative mb-5">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 bg-transparent border-b border-gray-400 focus:outline-none focus:border-cyan-400 text-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-2 text-sm text-cyan-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <select
            name="role"
            onChange={handleChange}
            className="w-full mb-5 p-3 bg-[#012a3a] border border-gray-400 rounded-lg focus:outline-none focus:border-cyan-400"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-full font-semibold text-lg transition duration-300">
            Register
          </button>

          {/* Google Button */}
          <button
            type="button"
            onClick={() => alert("Google Signup coming soon 🚀")}
            className="w-full mt-4 border border-white py-3 rounded-full hover:bg-white hover:text-black transition duration-300 flex items-center justify-center gap-2"
          >
            <img src={googleIcon} alt="google" className="w-5 h-5" />
            Sign up with Google
          </button>

          <p className="mt-5 text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-cyan-400 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>

        {/* RIGHT SIDE */}
        <div className="w-1/2 bg-gradient-to-br from-cyan-500 to-teal-400 flex flex-col items-center justify-center text-white p-10">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Join UpSkillX 🚀
          </h1>

          <p className="text-center text-lg">
            Start your journey with{" "}
            <span className="font-extrabold text-red-500 text-xl">
              UpSkillX
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
