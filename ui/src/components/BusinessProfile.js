// BusinessProfile.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./SearchBar.css";

import "./BusinessProfile.css";

// Import the WaitlistForm component
import WaitlistForm from "./WaitlistForm";
import UpdateWaitlist from "./UpdateWaitlist";

const BusinessProfile = ({ business, onDelete }) => {
  // State to manage the visibility of the WaitlistForm modal
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  return (
    <div className="container business-profile-container">
      <div className="business-info">
        <h2>{business.name}</h2>
        <div className="contact-info">
          <p>
            <label>Description</label>

            {business.description}
          </p>
          <p>
            <label>Location</label>
            {business.location}
          </p>
          <p>
            <label>Address</label>
            {business.address}
          </p>
          <p>
            <label>Email</label>
            {business.contactEmail}
          </p>
          <p>
            <label>Contact Phone</label>
            {business.contactPhone}
          </p>
          <p>
            <label>Hours</label>
            {business.hours}
          </p>
          <p>
            <label>Services</label>
            <ul>
              {business.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </p>
          <div className="reviews-ratings">
            {/* ... Reviews and ratings section */}
          </div>
        </div>
        <div className="buttons">
          <button
            className="delete-button"
            onClick={() => onDelete(business._id)}
          >
            Delete
          </button>
          <Link className="edit-button" to={`/edit-business/${business._id}`}>
            Edit
          </Link>
        </div>
      </div>
      <div className="waitlist-update">
        {/* Join Waitlist Button or Login/Register Message */}
        {true ? (
          <button
            className="join-waitlist-button"
            onClick={() => setShowWaitlistForm(true)}
          >
            Join Waitlist
          </button>
        ) : (
          <p>Please log in or register to join the waitlist</p>
        )}
        {/* WaitlistForm Modal */}
        {showWaitlistForm && (
          <div className="waitlist-form-modal">
            <WaitlistForm businessId={business._id} />
            <button onClick={() => setShowWaitlistForm(false)}>Close</button>
          </div>
        )}
        <UpdateWaitlist />
      </div>
    </div>
  );
};

export default BusinessProfile;
