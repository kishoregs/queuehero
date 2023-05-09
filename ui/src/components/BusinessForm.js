// BusinessForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessForm.css";

const initialFormData = {
  name: "",
  description: "",
  location: "",
  address: "",
  contactEmail: "",
  contactPhone: "",
  hours: "",
  services: [],
};



const BusinessForm = ({ onSubmit, business, resetForm}) => {

 
  const [formData, setFormData] = useState(initialFormData);


  useEffect(() => {
    if (business) {
      setFormData(business);
    } else {
      setFormData(initialFormData);
    }
  }, [business]);

  useEffect(() => {
    if (resetForm) {
      setFormData(initialFormData);
    }
  }, [resetForm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
   
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="business-form-container">
      <form className="business-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label htmlFor="contactEmail">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          id="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
        />

        <label htmlFor="contactPhone">Contact Phone</label>
        <input
          type="tel"
          name="contactPhone"
          id="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
        />

        <label htmlFor="hours">Hours</label>
        <input
          type="text"
          name="hours"
          id="hours"
          value={formData.hours}
          onChange={handleChange}
        />

        <label htmlFor="services">Services</label>
        <input
          type="text"
          name="services"
          id="services"
          value={formData.services.join(", ")}
          onChange={(e) =>
            setFormData({ ...formData, services: e.target.value.split(", ") })
          }
        />

        <div className="form-buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {business ? "Update" : "Create"} Business Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;
