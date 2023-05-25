// ResetPassword.js
import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { useParams } from 'react-router-dom';

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await api.post(`/user/reset-password/${token}`, { password });
      if (response.status === 200) {
        alert("Your password has been reset successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2 className="form-title">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
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
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
