import React, { useContext, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";


const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });

      if (response.status === 200) {
        const { token } = response.data;

        // Store the token
        localStorage.setItem("token", token);
        // If the login is successful, set isLoggedIn to true
        setIsLoggedIn(true);
        // Redirect to the dashboard
        navigate("/dashboard");
        // Perform further actions after a successful login, e.g., redirecting to the user dashboard
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </div>
          <div className="form-group">
            <Link to="/register" className="register-link">
              Don't have an account? Register here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
