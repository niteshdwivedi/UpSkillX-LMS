// FILE: frontend/src/pages/CourseDetail.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getEmbedUrl } from "../utils/youtubeHelpers";

const CourseDetail = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // ================= FETCH COURSE =================
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCourse(res.data);
        setLikesCount(res.data.likes?.length || 0);
        setComments(res.data.comments || []);
      } catch (error) {
        console.log("Error loading course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  // ================= LIKE SYSTEM =================
  const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/courses/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLikesCount(res.data);
      setLiked(!liked);
    } catch (error) {
      console.log("Like error:", error);
    }
  };

  // ================= COMMENT SYSTEM =================
  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/courses/${id}/comment`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setComments(res.data);
      setNewComment("");
    } catch (error) {
      console.log("Comment error:", error);
    }
  };

  if (!course) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#001f2f] text-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          {/* ================= VIDEO PLAYER ================= */}
          <div className="aspect-video mb-6">

            {course.videoType === "upload" ? (
              <video
                controls
                className="w-full rounded-xl"
                src={`http://localhost:5000/${course.videoUrl}`}
              />
            ) : (
              <iframe
                className="w-full h-full rounded-xl"
                src={getEmbedUrl(course.videoUrl)}
                title="Video"
                allowFullScreen
              ></iframe>
            )}

          </div>

          {/* ================= TITLE ================= */}
          <h1 className="text-2xl font-bold mb-4">
            {course.title}
          </h1>

          {/* ================= LIKE BUTTON ================= */}
          <button
            onClick={handleLike}
            className={`text-2xl mb-6 ${
              liked ? "text-red-500" : "text-gray-400"
            }`}
          >
            ❤️ {likesCount}
          </button>

          {/* ================= DESCRIPTION ================= */}
          <p className="text-gray-400 mb-8">
            {course.description}
          </p>

          {/* ================= COMMENT SECTION ================= */}
          <div className="bg-[#012a3a] p-6 rounded-xl">

            <h2 className="text-xl mb-4">Comments</h2>

            {/* Add Comment */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 p-3 bg-[#001f2f] rounded-lg outline-none"
              />

              <button
                onClick={handleComment}
                className="bg-cyan-500 px-6 py-2 rounded-lg"
              >
                Post
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.length === 0 && (
                <p className="text-gray-500">
                  No comments yet.
                </p>
              )}

              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-[#001f2f] p-3 rounded-lg"
                >
                  {comment.text}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;