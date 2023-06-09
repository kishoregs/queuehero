import React, { useState, useEffect } from "react";
import api from "../api";
import "./Waitlist.css";

const Waitlist = ({ businessId }) => {
  const [waitlist, setWaitlist] = useState([]);

  const fetchWaitlist = async () => {
    const response = await api.get(`/businesses/${businessId}/waitlist`);
    setWaitlist(response.data);
  };

  useEffect(() => {
    fetchWaitlist();

    const shouldPollWaitlist =
      process.env.REACT_APP_POLL_WAITLIST_UPDATE === "true";

    if (shouldPollWaitlist) {
      const intervalId = setInterval(fetchWaitlist, 5000); // fetch every 5 seconds

      // Cleanup interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [businessId]);

  const handleWaitTimeChange = async (userId, waitTime) => {
    await api.put(`/businesses/${businessId}/waitlist/${userId}`, { waitTime });
    fetchWaitlist();
  };

  const handleRemoveCustomer = async (userId) => {
    let req = `/businesses/${businessId}/unjoin-waitlist?customerId=${userId}`;
    await api.delete(req);
    fetchWaitlist();
  };

  return (
    waitlist &&
    waitlist.length > 0 && (
      <div className="waitlist-container">
        <div className="waitlist-header">
          <h3 className="waitlist-title">Waitlist</h3>
          <p className="waitlist-count">Total Customers: {waitlist.length}</p>
        </div>
        <table className="waitlist">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Wait Time</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="waitlist-customer">
            {waitlist.map((entry) => (
              <tr key={entry.customerId}>
                <td>{entry.name}</td>
                <td>{entry.phone}</td>
                <td>{entry.email}</td>
                <td>{entry.waitTime} min</td>
                <td>
                  <input
                    type="number"
                    className="update-wait-time-input"
                    defaultValue={entry.waitTime}
                    onChange={(e) =>
                      handleWaitTimeChange(entry.customerId, e.target.value)
                    }
                  />
                  min
                </td>
                <td>
                  <button
                    className="remove-customer-button"
                    onClick={() => handleRemoveCustomer(entry.customerId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Waitlist;
