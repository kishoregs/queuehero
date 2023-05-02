import React, { useState } from "react";
import api from "../api";
import "./WaitlistForm.css";

const WaitlistForm = ({ businessId }) => {
  const [customerId, setCustomerId] = useState("");
  const [name, setCustomerName] = useState("");
  const [email, setCustomerEmail] = useState("");
  const [waitTime, setWaitTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/businesses/${businessId}/waitlist`, {
        customerId,
        name,
        email,
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
    <form onSubmit={handleSubmit} className="waitlist-form-container">
      <div className="form-input-group">
        <label htmlFor="customerId">Customer ID:</label>
        <input
          id="customerId"
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>
      <div className="form-input-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="form-input-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </div>
      <div className="form-input-group">
        <label htmlFor="waitTime">Wait Time (in minutes):</label>
        <input
          id="waitTime"
          type="number"
          value={waitTime}
          onChange={(e) => setWaitTime(e.target.value)}
        />
      </div>
      <button type="submit" className="waitlist-form-submit">
        Add to Waitlist
      </button>
    </form>
  );
};

export default WaitlistForm;
