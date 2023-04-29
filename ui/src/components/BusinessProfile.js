// BusinessProfile.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// Import the WaitlistForm component
import WaitlistForm from "./WaitlistForm";

const BusinessProfile = ({ business, onDelete }) => {
  // State to manage the visibility of the WaitlistForm modal
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  return (
    <div className="container">
      <div className="business-profile">
        <h2>
          {business.name} -{" "}
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
        </h2>
        <label>Description</label>
        <p>{business.description}</p>
        <label>Location</label>
        <p>{business.location}</p>
        <label>Address</label>
        <p>{business.address}</p>
        <label>Contact Email</label>
        <p>{business.contactEmail}</p>
        <label>Contact Phone</label>
        <p>{business.contactPhone}</p>
        <label>Hours</label>
        <p>{business.hours}</p>
        <label>Services</label>
        <ul>
          {business.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
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
    </div>
  );
};

export default BusinessProfile;
