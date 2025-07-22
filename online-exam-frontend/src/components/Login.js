import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/login", user);
      if (res.data.success) {
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);
        alert("Login Successful!");
        navigate(`/${res.data.role}`);
      } else {
        alert("Invalid Credentials!");
      }
    } catch (error) {
      alert("Login Failed! Try again.");
    }
  };

  return (
    <div style={styles.body}>
      <nav style={styles.nav}>
        <h1>Online Exam System</h1>
        <ul style={styles.navList}>
          <li><a href="/" style={styles.navLink}>Home</a></li>
          <li><a href="/student" style={styles.navLink}>Student</a></li>
          <li><a href="/teacher" style={styles.navLink}>Teacher</a></li>
          <li><a href="/admin" style={styles.navLink}>Admin</a></li>
        </ul>
      </nav>

      <div style={styles.container}>
        <main style={styles.main}>
          <h2>Welcome Back!</h2>
          <p>Login to access your dashboard</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              style={styles.input}
            />

            <button type="submit" style={styles.button}>Login</button>
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
    backgroundImage: "url('https://www.tugraz.at/fileadmin/_processed_/8/e/csm_Back-to-study-by-hd3dsh-AdobeStock_78def58dd9.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    color: "#333",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    color: "white",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontWeight: "600",
  },
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    padding: "20px",
  },
  main: {
    maxWidth: "400px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    color: "#333",
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
    backgroundColor: "green",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Login;
