// BusinessProfile.js
import React from "react";
import { Link } from "react-router-dom";

const BusinessProfile = ({ business, onDelete }) => {
  return (
    <div className="container">
      <div className="business-profile">
        <h2>{business.name}</h2>
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
