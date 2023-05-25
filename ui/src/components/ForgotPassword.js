import React, { useState } from "react";
import api from "../api";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your forgot-password API endpoint
      const response = await api.post("/user/forgot-password", { email });

      if (response.status === 200) {
        alert(
          "If an account with that email exists, we have sent an email with password reset instructions."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div className="form-group">
          <Link to="/login" className="login-link">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
