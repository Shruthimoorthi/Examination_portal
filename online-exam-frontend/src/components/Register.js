import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/register", user, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Success:", response.data);
      alert("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        alert(`Registration Failed: ${error.response.data.message || "Try again."}`);
      } else {
        console.error("Error:", error.message);
        alert("Registration Failed! Server not responding.");
      }
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.content}>
        <main style={styles.main}>
          <h1 style={styles.h1}>Online Examination System</h1>
          <h2 style={styles.h2}>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" style={styles.button}>Register</button>
          </form>
        </main>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    margin: 0,
    padding: 0,
    backgroundImage: "url('https://i.abcnewsfe.com/a/58a35e3a-b15c-46f4-8bb3-a71ccf9809d0/ca-schools-3-rf-gty-bb-230906_1694023890660_hpMain.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    height: "100vh",
    paddingLeft: "50px",
  },
  content: {
    width: "50%",
    padding: "30px",
    display: "flex",
    justifyContent: "flex-start",
  },
  main: {
    maxWidth: "500px",
    background: "#1d075c",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  h1: {
    margin: "0 0 10px",
  },
  h2: {
    marginBottom: "20px",
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    color: "#1d075c",
    backgroundColor: "white",
    border: "none",
    padding: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Register;
