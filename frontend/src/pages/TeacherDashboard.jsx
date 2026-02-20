import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const TeacherDashboard = () => {
  const token = localStorage.getItem("token");

  /* ================= COURSE STATES ================= */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pptUrl, setPptUrl] = useState("");
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);

  /* ================= EXAM STATES ================= */
  const [examTitle, setExamTitle] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState([]);
  const [exams, setExams] = useState([]);
  const [editExamId, setEditExamId] = useState(null);

  /* ================= FETCH DATA ================= */
  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCourses(res.data);
  };

  const fetchExams = async () => {
    const res = await axios.get("http://localhost:5000/api/exams", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExams(res.data);
  };

  useEffect(() => {
    fetchCourses();
    fetchExams();
  }, []);

  /* ================= COURSE FUNCTIONS ================= */

  const handleCourseSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      title,
      description,
      videoUrl,
      pdfUrl,
      pptUrl,
    };

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/courses/${editId}`,
        courseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/courses",
        courseData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    resetCourseForm();
    fetchCourses();
  };

  const handleCourseDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/courses/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCourses();
  };

  const handleCourseEdit = (course) => {
    setTitle(course.title);
    setDescription(course.description);
    setVideoUrl(course.videoUrl || "");
    setPdfUrl(course.pdfUrl || "");
    setPptUrl(course.pptUrl || "");
    setEditId(course._id);
    window.scrollTo(0, 0);
  };

  const resetCourseForm = () => {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setPdfUrl("");
    setPptUrl("");
  };

  /* ================= EXAM FUNCTIONS ================= */

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleExamSubmit = async () => {
    if (!examTitle || questions.length === 0) {
      alert("Add exam title and at least one question");
      return;
    }

    const examData = {
      title: examTitle,
      description: examDescription,
      duration,
      questions,
    };

    if (editExamId) {
      await axios.put(
        `http://localhost:5000/api/exams/${editExamId}`,
        examData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditExamId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/exams",
        examData,
        { headers: { Authorization: `Bearer ${token}` },
      });
    }

    resetExamForm();
    fetchExams();
  };

  const handleExamEdit = (exam) => {
    setExamTitle(exam.title);
    setExamDescription(exam.description);
    setDuration(exam.duration);
    setQuestions(exam.questions);
    setEditExamId(exam._id);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const handleExamDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/exams/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchExams();
  };

  const resetExamForm = () => {
    setExamTitle("");
    setExamDescription("");
    setDuration(30);
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-[#001f2f] text-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          <h1 className="text-3xl font-bold mb-10">
            Teacher Dashboard 👩‍🏫
          </h1>

          {/* ================= COURSE SECTION ================= */}

          <div className="bg-[#012a3a] p-8 rounded-xl mb-12 max-w-xl">
            <h2 className="text-2xl mb-6">
              {editId ? "Edit Course" : "Create New Course"}
            </h2>

            <form onSubmit={handleCourseSubmit}>
              <input
                type="text"
                placeholder="Course Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-4 p-3 bg-transparent border-b border-gray-400"
                required
              />

              <textarea
                placeholder="Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-4 p-3 bg-transparent border-b border-gray-400"
                required
              />

              <input
                type="text"
                placeholder="YouTube Playlist URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full mb-4 p-3 bg-transparent border-b border-gray-400"
              />

              <input
                type="text"
                placeholder="PDF URL"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                className="w-full mb-4 p-3 bg-transparent border-b border-gray-400"
              />

              <input
                type="text"
                placeholder="PPT URL"
                value={pptUrl}
                onChange={(e) => setPptUrl(e.target.value)}
                className="w-full mb-6 p-3 bg-transparent border-b border-gray-400"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-cyan-500 px-6 py-2 rounded-lg"
                >
                  {editId ? "Update Course" : "Create Course"}
                </button>

                {editId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      resetCourseForm();
                    }}
                    className="bg-gray-500 px-6 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ================= COURSE LIST ================= */}

          <h2 className="text-2xl mb-6">Your Courses</h2>

          <div className="grid grid-cols-3 gap-6 mb-16">
            {courses.map((course) => (
              <div key={course._id} className="bg-[#012a3a] p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4">{course.description}</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleCourseEdit(course)}
                    className="bg-yellow-500 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleCourseDelete(course._id)}
                    className="bg-red-500 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ================= EXAM CREATION ================= */}

          <div className="bg-[#012a3a] p-8 rounded-xl mb-12 max-w-2xl">
            <h2 className="text-2xl mb-6">
              {editExamId ? "Edit Exam" : "Create Exam"}
            </h2>

            <input
              type="text"
              placeholder="Exam Title"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full mb-4 p-3 bg-transparent border-b border-gray-400"
            />

            <textarea
              placeholder="Exam Description"
              value={examDescription}
              onChange={(e) => setExamDescription(e.target.value)}
              className="w-full mb-4 p-3 bg-transparent border-b border-gray-400"
            />

            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full mb-6 p-3 bg-transparent border-b border-gray-400"
            />

            <button
              onClick={addQuestion}
              className="bg-green-500 px-4 py-2 rounded-lg mb-6"
            >
              Add Question
            </button>

            {questions.map((q, index) => (
              <div key={index} className="mb-6 p-4 bg-[#001f2f] rounded-lg">
                <input
                  type="text"
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(index, "question", e.target.value)
                  }
                  className="w-full mb-3 p-2 bg-transparent border-b border-gray-400"
                />

                {q.options.map((opt, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) =>
                      updateOption(index, i, e.target.value)
                    }
                    className="w-full mb-2 p-2 bg-transparent border-b border-gray-400"
                  />
                ))}

                <select
                  value={q.correctAnswer}
                  onChange={(e) =>
                    updateQuestion(index, "correctAnswer", Number(e.target.value))
                  }
                  className="mt-2 p-2 bg-[#012a3a]"
                >
                  <option value={0}>Correct Option 1</option>
                  <option value={1}>Correct Option 2</option>
                  <option value={2}>Correct Option 3</option>
                  <option value={3}>Correct Option 4</option>
                </select>
              </div>
            ))}

            <div className="flex gap-4">
              <button
                onClick={handleExamSubmit}
                className="bg-cyan-500 px-6 py-2 rounded-lg"
              >
                {editExamId ? "Update Exam" : "Create Exam"}
              </button>

              {editExamId && (
                <button
                  onClick={() => {
                    setEditExamId(null);
                    resetExamForm();
                  }}
                  className="bg-gray-500 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* ================= YOUR EXAMS ================= */}

          <h2 className="text-2xl mb-6 text-green-400">Your Exams</h2>

          <div className="grid grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div key={exam._id} className="bg-[#012a3a] p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
                <p className="text-gray-400 mb-2">{exam.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {exam.duration} mins | {exam.questions.length} Questions
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleExamEdit(exam)}
                    className="bg-yellow-500 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleExamDelete(exam._id)}
                    className="bg-red-500 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
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