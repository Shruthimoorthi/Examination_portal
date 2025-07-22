import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [exams, setExams] = useState([]);
  const [submissions, setSubmissions] = useState([]); // Added state for submissions

  useEffect(() => {
    // Fetch all users
    axios
      .get("https://examinationportal-production.up.railway.app/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));

    // Fetch all exams
    axios
      .get("https://examinationportal-production.up.railway.app/api/exams")
      .then((res) => setExams(res.data))
      .catch((err) => console.error("Error fetching exams:", err));

    // Fetch all submissions (exam attempts)
    axios
      .get("https://examinationportal-production.up.railway.app/api/submissions") // Ensure this endpoint exists and returns the necessary submission data
      .then((res) => setSubmissions(res.data))
      .catch((err) => console.error("Error fetching submissions:", err));
  }, []);

  const students = users.filter((user) => user.role === "student");
  const teachers = users.filter((user) => user.role === "teacher");

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Admin Dashboard</h2>

      <div style={styles.section}>
        <h3>👨‍🎓 Students</h3>
        {students.length > 0 ? (
          students.map((student, index) => {
            // Filter submissions for this student
            const studentSubmissions = submissions.filter(
              (submission) => submission.studentEmail === student.email
            );
            return (
              <div key={index} style={styles.card}>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Exams Taken:</strong> {studentSubmissions.length}</p>
                <p><strong>Retests Taken:</strong> {studentSubmissions.filter(sub => sub.retest).length}</p>
                <p><strong>Marks Scored:</strong></p>
                <ul>
                  {studentSubmissions.map((submission) => (
                    <li key={submission.id}>
                 {submission.examTitle}: {submission.score} / {submission.total} - {new Date(submission.submittedAt).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        ) : (
          <p>No students found.</p>
        )}
      </div>

      <div style={styles.section}>
        <h3>👩‍🏫 Teachers</h3>
        {teachers.length > 0 ? (
          teachers.map((teacher, index) => {
            const teacherExams = exams.filter(
              (exam) => exam.createdBy === teacher.email
            );
            return (
              <div key={index} style={styles.card}>
                <p><strong>Name:</strong> {teacher.name}</p>
                <p><strong>Email:</strong> {teacher.email}</p>
                <p><strong>Exams Created:</strong></p>
                {teacherExams.length > 0 ? (
                  <ul>
                    {teacherExams.map((exam) => (
                      <li key={exam.id}>
                        {exam.title} - {new Date(exam.createdAt).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No exams created</p>
                )}
              </div>
            );
          })
        ) : (
          <p>No teachers found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "30px",
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginBottom: "40px",
  },
  card: {
    backgroundColor: "#f0f4f8",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
};

export default AdminPage;
