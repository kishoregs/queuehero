// BusinessProfile.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import WaitlistForm from "./WaitlistForm";
import "./BusinessProfile.css";
import UpdateWaitlist from "./UpdateWaitlist";
import Waitlist from "./Waitlist";

const BusinessProfile = ({ business, onDelete }) => {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  return (
    <div className="business-profile">
      <div className="top">
        <h3>Manage Existing Business Profiles</h3>
        <Link
          className="link-button create-new-link"
          to="/create-business-profile"
        >
          Create New
        </Link>
      </div>

      <div className="container">
        <div className="business-info">
          <div className="buttons">
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
            <button
              className="delete-button"
              onClick={() => onDelete(business._id)}
            >
              Delete Business
            </button>
            <Link className="edit-button" to={`/edit-business/${business._id}`}>
              Edit Business
            </Link>
          </div>
          <h3>
            Business - {business.name}
            {showWaitlistForm && (
              <div className="waitlist-form-modal">
                <WaitlistForm businessId={business._id} />
                <button onClick={() => setShowWaitlistForm(false)}>
                  Close
                </button>
              </div>
            )}
          </h3>
          <div className="business-details">
            <div className="contact-info">
              <p>
                <div className="info-container">
                  <label>Description</label>

                  {business.description}
                </div>
              </p>

              <p>
                <div className="info-container">
                  <label>Location</label>
                  {business.location}
                </div>
              </p>
              <p>
                <div className="info-container">
                  <label>Address</label>
                  {business.address}
                </div>
              </p>
              <p>
                <div className="info-container">
                  <label>Email</label>
                  {business.contactEmail}
                </div>
              </p>
              <p>
                <div className="info-container">
                  <label>Contact Phone</label>
                  {business.contactPhone}
                </div>
              </p>
              <p>
                <div className="info-container">
                  <label>Hours</label>
                  {business.hours}
                </div>
              </p>
              <p>
                <div className="info-container">
                  <label>Services</label>
                  <ul>
                    {business.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              </p>
            </div>
          </div>
          <div className="reviews-ratings">
            {/* ... Reviews and ratings section */}
          </div>
          {/* Add Waitlist component here */}
          <Waitlist businessId={business._id} />
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
