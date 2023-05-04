import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import api from "../api";
import "./Dashboard.css";

import BusinessList from "../components/BusinessList";

const Dashboard = () => {
  const user = localStorage.getItem("user");



  const searchBusinesses = async (location) => {
    try {
      if (!location) location = "";
      const response = await api.get(`/businesses/search?location=${location}`);

      return response.data;
    } catch (error) {
      console.error("Error searching businesses:", error);
    }
  };
  const [businesses, setBusinesses] = useState([]);
  const handleSearch = async (searchTerm) => {
    try {
      const data = await searchBusinesses(searchTerm);
      setBusinesses(data.businesses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <main>
        <h2>Welcome {user} !</h2>
        <SearchBar onSearch={handleSearch} />
        <BusinessList businesses={businesses} />
        <div className="content-grid">
          <section className="benefits">
            <h2>Features</h2>
            <ul>
              <li>Real-time waitlist updates</li>
              <li>Online check-in</li>
              <li>Location-based search</li>
              <li>Time-slot selection</li>
              <li>Notifications and reminders</li>
              <li>Customer reviews and ratings</li>
            </ul>
          </section>
          <section className="benefits">
            <h2>Benefits</h2>
            <ul>
              <li>Save time by joining waitlists remotely</li>
              <li>Find the nearest service providers</li>
              <li>Make informed choices based on reviews and ratings</li>
              <li>Businesses can manage waitlists efficiently</li>
              <li>Improve customer satisfaction and experience</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
