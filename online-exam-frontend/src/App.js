import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import StudentPage from "./components/StudentPage";
import TeacherPage from "./components/TeacherPage";
import AdminPage from "./components/AdminPage";

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 className="mt-3 text-center">Online Examination System</h1>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
