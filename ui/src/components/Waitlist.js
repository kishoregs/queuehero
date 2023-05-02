// Waitlist.js
import React, { useState, useEffect } from "react";
import api from "../api";
import "./Waitlist.css";

const Waitlist = ({ businessId }) => {
  const [waitlist, setWaitlist] = useState([]);

  useEffect(() => {
    fetchWaitlist();
    
  },[]);

  const fetchWaitlist = async () => {
    const response = await api.get(`/businesses/${businessId}/waitlist`);
    setWaitlist(response.data);

  };

  const handleWaitTimeChange = async (userId, waitTime) => {
    await api.put(`/businesses/${businessId}/waitlist/${userId}`, { waitTime });
    fetchWaitlist();
  };

  return (waitlist && waitlist.length > 0 &&
    <div className="waitlist-container">
      <h3>Waitlist</h3>
      <table className="waitlist">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Wait Time</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody className="waitlist-customer">
          {waitlist.map((entry) => (
            <tr key={entry.customerId._id} >
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.waitTime} min</td>
              <td>
                <input
                  type="number"
                  className="update-wait-time-input"
                  defaultValue={entry.waitTime}
                  onChange={(e) =>
                    handleWaitTimeChange(entry.customerId._id, e.target.value)
                  }
                />
                min
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Waitlist;
