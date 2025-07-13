import React, { useState, useEffect } from "react";
import axios from "axios";
import Certificate from "./Certificate";

const StudentPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [passed, setPassed] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/exams")
      .then((response) => setExams(response.data))
      .catch((error) => console.error("Error fetching exams", error));
  }, []);

  const handleAnswerChange = (e, questionIndex) => {
    setAnswers({ ...answers, [`q${questionIndex}`]: e.target.value });
  };

  const handleStartExam = (exam) => {
    setSelectedExam(exam);
    setAnswers({});
    setScore(null);
    setPassed(false);
    setCertificateData(null);
  };

  const handleSubmitExam = async () => {
    if (!selectedExam) return;
  
    const name = localStorage.getItem("name");
  const email = localStorage.getItem("email"); // ✅ ask for email too
  
    if (!name || !email) {
      alert("You are not logged in properly..");
      return;
    }
  
    const payload = {
      ...answers,
      name: name.trim(),
      email: email.trim(), // ✅ include email in payload
    };
  
    try {
      const response = await axios.post(
        `http://localhost:8080/api/exams/${selectedExam.id}/certificate`,
        payload
      );
      const { score, passed } = response.data;
      setScore(score);
      setPassed(passed);
      if (passed) setCertificateData(response.data);
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Submission failed");
    }
  };
  

  return (
    <>
      <style>{`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f9f9f9;
  }

  .dashboard-body {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .sidebar {
    width: 250px;  /* Fixed width for the sidebar */
    background-color: #1e293b;
    color: white;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;  /* Ensure sidebar stretches full height */
  }

  .sidebar h2 {
    margin-bottom: 40px;
    font-size: 24px;
    text-align: center;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  .sidebar ul li {
    margin: 20px 0;
  }

  .sidebar ul li button {
    background: none;
    border: none;
    color: #e2e8f0;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    padding: 12px;
    text-align: left;
    transition: background 0.2s;
  }

  .sidebar ul li button:hover {
    background-color: #334155;
    border-radius: 6px;
  }

  .content {
    flex: 1;  /* Take up remaining space */
    overflow-y: auto;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center; /* Center cards horizontally */
    max-width: 100%; /* Ensure it doesn’t exceed full width */
  }

  .card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 1000px;
    box-sizing: border-box;
  }

  .exam-list {
    padding: 0;
    list-style: none;
  }

  .exam-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  .btn {
    background: #3b82f6;
    color: white;
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn:hover {
    background: #2563eb;
  }

  .btn-warning {
    background-color: #f97316;
  }

  .btn-warning:hover {
    background-color: #ea580c;
  }

  h2, h3, h4 {
    margin-top: 0;
    color: #1e293b;
  }

  form label {
    display: block;
    margin: 8px 0;
    font-weight: 500;
    cursor: pointer;
  }

  form input[type="radio"] {
    margin-right: 10px;
    transform: scale(1.2);
    cursor: pointer;
  }

  .score-box {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 1px solid #ccc;
  }

  .score-box p {
    margin-top: 10px;
    font-size: 15px;
  }
`}</style>

      <div className="dashboard-body">
        <div className="sidebar">
          <h2>🎓 Student Panel</h2>
          <ul>
            <li><button onClick={() => window.location.reload()}>🔁 Reload Exams</button></li>
            <li><button onClick={() => window.location.href = "/"}>🚪 Logout</button></li>
          </ul>
        </div>

        <div className="content">
          <div className="card">
            <h2>📋 Available Exams</h2>
            <ul className="exam-list">
              {exams.map((exam) => (
                <li key={exam.id}>
                  <span>{exam.title}</span>
                  <button className="btn" onClick={() => handleStartExam(exam)}>Start</button>
                </li>
              ))}
            </ul>
          </div>

          {selectedExam && (
            <div className="card">
              <h3>{selectedExam.title}</h3>
              <form>
                {selectedExam.questions.map((question, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    <p><strong>Q{index + 1}. {question.text}</strong></p>
                    {["A", "B", "C", "D"].map((opt) => (
                      <label key={opt}>
                        <input
                          type="radio"
                          name={`q${index}`}
                          value={opt}
                          checked={answers[`q${index}`] === opt}
                          onChange={(e) => handleAnswerChange(e, index)}
                        />
                        {question[`option${opt}`]}
                      </label>
                    ))}
                  </div>
                ))}
                <button type="button" className="btn" onClick={handleSubmitExam}>
                  ✅ Submit Exam
                </button>
              </form>

              {score !== null && (
                <div className="score-box">
                  <h4>🎯 Your Score: {score} / {selectedExam.questions.length}</h4>
                  {passed ? (
                    <p style={{ color: "green" }}>🎉 Congratulations! You passed the exam.</p>
                  ) : (
                    <p style={{ color: "red" }}>❌ You failed. You can retake the exam.</p>
                  )}
                  {!passed && (
                    <button className="btn btn-warning" onClick={() => handleStartExam(selectedExam)}>
                      🔁 Retake Exam
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {certificateData && (
            <div className="card">
              <Certificate data={certificateData} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentPage;
