import React, { useState } from "react";
import api from "../api";
import "./WaitlistForm.css";

const WaitlistForm = ({ businessId }) => {
  const [customerId, setCustomerId] = useState("");
  const [waitTime, setWaitTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/businesses/${businessId}/waitlist`, {
        customerId,
        waitTime,
      });
      setCustomerId("");
      setWaitTime("");
      alert("Customer added to the waitlist successfully");
    } catch (error) {
      console.error("Error adding customer to the waitlist", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="waitlist-form">
      <div className="input-group">
        <label htmlFor="customerId">Customer ID:</label>
        <input
          id="customerId"
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="waitTime">Wait Time (in minutes):</label>
        <input
          id="waitTime"
          type="number"
          value={waitTime}
          onChange={(e) => setWaitTime(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-button">
        Add to Waitlist
      </button>
    </form>
  );
};

export default WaitlistForm;
