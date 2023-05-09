// ManageBusinessProfiles.js
import React, { useState, useEffect, useContext } from "react";

import BusinessProfile from "./BusinessProfile";
import BusinessForm from "./BusinessForm";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

import "./ManageBusinessProfiles.css";

const ManageBusinessProfiles = () => {
  const { user } = useContext(AuthContext); // Access the user object from the context

  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await api.get(`/businesses?ownerId=${user._id}`);
      setBusinesses(response.data);
    } catch (error) {
      console.error("Error fetching owned businesses:", error);
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
      const confirmed = window.confirm(
        "Are you sure you want to delete this business?"
      );
      if (confirmed) {
        await api.delete(`/businesses/${businessId}`);
        fetchBusinesses();
      }
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
       
      </div>
    </div>
  );
};

export default ManageBusinessProfiles;
