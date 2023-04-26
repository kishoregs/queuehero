import React, { useState, useEffect } from "react";
import api from "../api"; // Import your configured Axios instance
import { useParams } from "react-router-dom";

const BusinessProfile = ({ match }) => {
  const [business, setBusiness] = useState(null);
  const { id } = useParams(); // Destructure the `id` parameter from the useParams hook

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const response = await api.get(`/businesses/${id}`);
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business profile:", error);
        // Handle error, e.g., show an error message
      }
    };

    fetchBusinessProfile();
  }, [id]);

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{business.name}</h1>
      <p>{business.description}</p>
      <p>Hours of operation: {business.hours}</p>
      <p>Services offered: {business.services.join(", ")}</p>
      <p>Pricing: {business.pricing}</p>
      <p>Contact: {business.contact}</p>
      {/* Display additional business information as needed */}
    </div>
  );
};

export default BusinessProfile;
