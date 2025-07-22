import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherPage = () => {
  const [examTitle, setExamTitle] = useState("");
  const [question, setQuestion] = useState({
    text: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });
  const [questions, setQuestions] = useState([]);
  const [myExams, setMyExams] = useState([]);
  const [view, setView] = useState("create"); // "create" or "manage"

  useEffect(() => {
    const teacherEmail = localStorage.getItem("email");
    axios
      .get("http://localhost:8080/api/exams")
      .then((res) => {
        const examsCreatedByMe = res.data.filter(
          (exam) => exam.createdBy === teacherEmail
        );
        setMyExams(examsCreatedByMe);
      })
      .catch((err) => console.error("Error fetching exams:", err));
  }, []);

  const handleQuestionChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleAddQuestion = () => {
    if (
      question.text &&
      question.optionA &&
      question.optionB &&
      question.optionC &&
      question.optionD &&
      question.correctAnswer
    ) {
      setQuestions([...questions, question]);
      setQuestion({
        text: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
      });
    } else {
      alert("Please fill in all question fields.");
    }
  };

  const handleCreateExam = async () => {
    if (!examTitle || questions.length === 0) {
      alert("Please enter a title and at least one question.");
      return;
    }

    const examData = {
      title: examTitle,
      questions: questions,
      createdBy: localStorage.getItem("email"),
    };
    console.log("Creating Exam with:", examData);
    try {
      await axios.post("http://localhost:8080/api/exams", examData);
      alert("Exam created successfully!");
      setExamTitle("");
      setQuestions([]);

      // Refresh exams
      const res = await axios.get("http://localhost:8080/api/exams");
      const teacherEmail = localStorage.getItem("email");
      const updatedExams = res.data.filter(
        (exam) => exam.createdBy === teacherEmail
      );
      setMyExams(updatedExams);
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("Failed to create exam.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>📝<br />Online Examination</h2>
        <nav style={styles.nav}>
          <button style={styles.navItem} onClick={() => setView("create")}>➕ Create Exam</button>
          <button style={styles.navItem} onClick={() => setView("manage")}>📋 Manage Exams</button>
          <button style={styles.navItem} onClick={() => (window.location.href = "/")}>🚪 Logout</button>
        </nav>
      </div>

      <div style={styles.content}>
        {view === "create" && (
          <>
            <h2 style={styles.heading}>Create Exam</h2>

            <div style={styles.formGroup}>
              <label>Exam Title</label>
              <input
                type="text"
                style={styles.input}
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
              />
            </div>

            <h4>Add Question</h4>
            <input
              type="text"
              style={styles.input}
              name="text"
              placeholder="Question"
              value={question.text}
              onChange={handleQuestionChange}
            />
            <input
              type="text"
              style={styles.input}
              name="optionA"
              placeholder="Option A"
              value={question.optionA}
              onChange={handleQuestionChange}
            />
            <input
              type="text"
              style={styles.input}
              name="optionB"
              placeholder="Option B"
              value={question.optionB}
              onChange={handleQuestionChange}
            />
            <input
              type="text"
              style={styles.input}
              name="optionC"
              placeholder="Option C"
              value={question.optionC}
              onChange={handleQuestionChange}
            />
            <input
              type="text"
              style={styles.input}
              name="optionD"
              placeholder="Option D"
              value={question.optionD}
              onChange={handleQuestionChange}
            />
            <input
              type="text"
              style={styles.input}
              name="correctAnswer"
              placeholder="Correct Option (A/B/C/D)"
              value={question.correctAnswer}
              onChange={handleQuestionChange}
            />

            <button style={styles.buttonSecondary} onClick={handleAddQuestion}>
              ➕ Add Question
            </button>

            <button style={styles.buttonPrimary} onClick={handleCreateExam}>
              ✅ Create Exam
            </button>

            <hr />
            <h5>Questions Added:</h5>
            <ul>
              {questions.map((q, idx) => (
                <li key={idx}>
                  {q.text} (Correct: {q.correctAnswer})
                </li>
              ))}
            </ul>
          </>
        )}

        {view === "manage" && (
          <>
            <h3>📋 Manage Exams</h3>
            {myExams.length > 0 ? (
              myExams.map((exam, idx) => (
                <div key={idx} style={styles.examCard}>
                  <h4>{exam.title}</h4>
                  <p><strong>Created At:</strong> {new Date(exam.createdAt).toLocaleString()}</p>
                  <p><strong>Created By:</strong> {exam.createdBy}</p>
                  <p><strong>Questions:</strong></p>
                  <ul>
                    {exam.questions.map((q, qIdx) => (
                      <li key={qIdx}>
                        <p><strong>Q{qIdx + 1}: {q.text}</strong></p>
                        <ul>
                          <li>A: {q.optionA}</li>
                          <li>B: {q.optionB}</li>
                          <li>C: {q.optionC}</li>
                          <li>D: {q.optionD}</li>
                          <li><strong>Correct:</strong> {q.correctAnswer}</li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No exams found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    margin: 0,
    fontFamily: "Segoe UI, sans-serif",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "40px",
    lineHeight: "1.4",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    alignItems: "center",
  },
  navItem: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    padding: "10px 20px",
    borderRadius: "8px",
    transition: "background 0.3s",
    width: "100%",
    textAlign: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#f8f9fa",
    overflowY: "auto",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  buttonPrimary: {
    marginTop: "15px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px",
  },
  buttonSecondary: {
    marginTop: "15px",
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px",
  },
  examCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
};

export default TeacherPage;
