// ManageBusinessProfiles.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BusinessForm from "./BusinessForm";
import api from "../api";

import "./ManageBusinessProfiles.css";

const NewBusinessProfile = () => {
  const [resetForm, setResetForm] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (businessData) => {
    try {
      await api.post("/businesses", businessData);

      setResetForm(true); // Trigger form reset after successful creation

      navigate(-1);
    } catch (error) {
      console.error("Error creating business:", error);
    }
  };
  return (
    <div className="manage-businesses">
      <div className="profiles-and-form"></div>
      <div>
        <h3 className="business-form-container">Create New Business Profile</h3>
        <BusinessForm onSubmit={handleCreate} resetForm={resetForm} />
      </div>
    </div>
  );
};

export default NewBusinessProfile;
