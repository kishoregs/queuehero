// ManageBusinessProfiles.js
import React, { useState, useEffect } from "react";
import BusinessProfile from "./BusinessProfile";
import BusinessForm from "./BusinessForm";
import api from "../api";

const ManageBusinessProfiles = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

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
    } catch (error) {
      console.error("Error creating business:", error);
    }
  };

  const handleUpdate = async (businessData) => {
    try {
      await api.put(`/businesses/${selectedBusiness._id}`, businessData);
      setSelectedBusiness(null);
      fetchBusinesses();
    } catch (error) {
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
      <h1>Manage Business Profiles</h1>
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
              <h2>Update Business Profile</h2>
              <BusinessForm
                onSubmit={handleUpdate}
                business={selectedBusiness}
              />
            </div>
          ) : (
            <div>
              <h2>Create New Business Profile</h2>
              <BusinessForm onSubmit={handleCreate} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBusinessProfiles;
