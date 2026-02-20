import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/courses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const found = res.data.find((c) => c._id === id);
      setCourse(found);
    };

    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#001f2f] text-white">
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          {course.title}
        </h1>

        {/* Video Section */}
        {course.videoUrl && (
  <div className="mb-8">
    <h2 className="text-xl mb-3">Video Playlist</h2>
    <iframe
      width="800"
      height="450"
      src={
        course.videoUrl.includes("playlist")
          ? `https://www.youtube.com/embed/videoseries?list=${course.videoUrl.split("list=")[1]}`
          : course.videoUrl.replace("watch?v=", "embed/")
      }
      title="Course Video"
      allowFullScreen
      className="rounded-lg"
    ></iframe>
  </div>
)}

        {/* PDF Section */}
        {course.pdfUrl && (
          <div className="mb-6">
            <a
              href={course.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 underline"
            >
              View PDF
            </a>
          </div>
        )}

        {/* PPT Section */}
        {course.pptUrl && (
          <div>
            <a
              href={course.pptUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 underline"
            >
              View PPT
            </a>
          </div>
        )}

      </div>
    </div>
  );
};

export default CourseDetail;