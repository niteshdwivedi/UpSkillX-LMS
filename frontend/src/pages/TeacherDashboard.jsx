// FILE: frontend/src/pages/TeacherDashboard.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getThumbnail } from "../utils/youtubeHelpers";

const TeacherDashboard = () => {
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (videoFile) {
      formData.append("video", videoFile);
      formData.append("videoType", "upload");
    } else {
      formData.append("videoUrl", videoUrl);
      formData.append("videoType", "youtube");
    }

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/courses/${editId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/courses",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setTitle("");
    setDescription("");
    setVideoUrl("");
    setVideoFile(null);
    setEditId(null);

    fetchCourses();
  };

  return (
    <div className="min-h-screen bg-[#001f2f] text-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">

          <h1 className="text-3xl mb-6">Teacher Dashboard 👩‍🏫</h1>

          <form onSubmit={handleSubmit} className="bg-[#012a3a] p-6 rounded-xl mb-10">

            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-3 bg-transparent border-b"
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-4 p-3 bg-transparent border-b"
              required
            />

            <input
              type="text"
              placeholder="YouTube Video / Playlist URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full mb-4 p-3 bg-transparent border-b"
            />

            <div className="mb-4">
              <label className="block mb-2">OR Upload Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            </div>

            <button className="bg-cyan-500 px-6 py-2 rounded-lg">
              {editId ? "Update Course" : "Create Course"}
            </button>
          </form>

          <h2 className="text-2xl mb-6">Your Courses</h2>

          <div className="grid grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-[#012a3a] rounded-xl overflow-hidden">

                {course.videoType === "youtube" && (
                  <img
                    src={getThumbnail(course.videoUrl)}
                    className="w-full h-48 object-cover"
                    alt="thumb"
                  />
                )}

                <div className="p-4">
                  <h3 className="text-lg text-cyan-400">{course.title}</h3>
                  <p className="text-gray-400 text-sm">{course.description}</p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;