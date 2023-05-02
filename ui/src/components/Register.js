import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";


const Register = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", { email, password, name });

      if (response.status === 201) {
        alert("Registration successful! You can now log in.");
        const { token } = response.data;

        // Store the token
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        // Redirect to the dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        alert("User already exists. Please use a different email.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="form-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Register
            </button>
          </div>
          <div className="form-group">
            <Link to="/login" className="login-link">
              Already have an account? Login here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
