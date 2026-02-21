// FILE: frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import CoursesPage from "./pages/CoursesPage";
import CourseDetail from "./pages/CourseDetail";
import ExamsPage from "./pages/ExamsPage";
import ExamPage from "./pages/ExamPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/student-dashboard"
          element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>}
        />

        <Route
          path="/teacher-dashboard"
          element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>}
        />

        <Route
          path="/courses"
          element={<ProtectedRoute><CoursesPage /></ProtectedRoute>}
        />

        <Route
          path="/course/:id"
          element={<ProtectedRoute><CourseDetail /></ProtectedRoute>}
        />

        <Route
          path="/exams"
          element={<ProtectedRoute><ExamsPage /></ProtectedRoute>}
        />

        <Route
          path="/exam/:id"
          element={<ProtectedRoute><ExamPage /></ProtectedRoute>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;