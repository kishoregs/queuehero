// EditBusinessProfile.js
import React, { useState, useEffect } from "react";
import BusinessForm from "./BusinessForm";
import api from "../api";
import { useParams } from 'react-router-dom';


const EditBusinessProfile = () => {
  const [business, setBusiness] = useState(null);
  const businessId = useParams().id;

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
    console.log(businessId);
        const response = await api.get(`/businesses/${businessId}`);
       
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };

    fetchBusiness();
  }, [businessId]);

  const handleUpdateBusiness = async (businessData) => {
    try {
      await api.put(`/businesses/${businessId}`, businessData);
      alert("Business profile updated successfully");
    } catch (error) {
      console.error("Error updating business:", error);
      alert("Error updating business profile");
    }
  };

  return (
    <div className="edit-business-profile">
      <h2>Edit Business Profile</h2>
      {business ? (
        <BusinessForm onSubmit={handleUpdateBusiness} business={business} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditBusinessProfile;
