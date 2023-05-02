// ManageBusinessProfiles.js
import React, { useState, useEffect } from "react";


import BusinessProfile from "./BusinessProfile";
import BusinessForm from "./BusinessForm";
import api from "../api";
import "./ManageBusinessProfiles.css";

const ManageBusinessProfiles = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await api.get("/businesses");
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  const handleCreate = async (businessData) => {
    try {
      await api.post("/businesses", businessData);
      fetchBusinesses();
      setResetForm(true); // Trigger form reset after successful creation
    } catch (error) {
      console.error("Error creating business:", error);
    }
  };

  

  const handleUpdate = async (businessData) => {
    try {
      await api.put(`/businesses/${selectedBusiness._id}`, businessData);
      setSelectedBusiness(null);
      fetchBusinesses();
    }catch (error) {
      console.error("Error updating business:", error);
    }
  };

  const handleDelete = async (businessId) => {
    try {
      await api.delete(`/businesses/${businessId}`);
      fetchBusinesses();
    } catch (error) {
      console.error("Error deleting business:", error);
    }
  };

  return (
    <div className="manage-businesses">
      <div className="profiles-and-form">
        <div className="profiles">
          {businesses.map((business) => (
            <BusinessProfile
              key={business._id}
              business={business}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
        <br></br>
        <div className="form">
          {selectedBusiness ? (
            <div>
              <h3>Update Business Profile</h3>
              <BusinessForm
                onSubmit={handleUpdate}
                business={selectedBusiness}
              />
            </div>
          ) : (
            <div>
              <h2 className="business-form-container">Create New Business Profile</h2>
              <BusinessForm onSubmit={handleCreate} resetForm={resetForm} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBusinessProfiles;
