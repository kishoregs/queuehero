import React, { useContext, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext); // Access the user object from the context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", {
        name,
        phone,
        email,
        password,
      });

      if (response.status === 201) {
        const { token, user } = response.data;

        // Store the token
        localStorage.setItem("token", token);

        // If the login is successful, set isLoggedIn to true
        setIsLoggedIn(true);
        setUser(user);

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
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Phone</label>
            <input
              type="tel"
              placeholder="Your Phone Number"
              id="phone"
              name="name"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              placeholder="Your Email"
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
              placeholder="Your Password"
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
