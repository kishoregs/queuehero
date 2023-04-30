// BusinessProfile.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import WaitlistForm from "./WaitlistForm";
import UpdateWaitlist from "./UpdateWaitlist";
import Waitlist from "./Waitlist";

const BusinessProfile = ({ business, onDelete }) => {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  return (
    <div className="container">
      <div className="business-info">
        <h2>
          {business.name} -{" "}
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
          {showWaitlistForm && (
            <div className="waitlist-form-modal">
              <WaitlistForm businessId={business._id} />
              <button onClick={() => setShowWaitlistForm(false)}>Close</button>
            </div>
          )}
        </h2>
        <div>
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
      </div>
      {/* Add Waitlist component here */}
      <Waitlist businessId={business._id} />
    </div>
  );
};

export default BusinessProfile;
