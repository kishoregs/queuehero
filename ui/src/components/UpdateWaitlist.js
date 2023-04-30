import React from "react";
import "./UpdateWaitlist.css";

const UpdateWaitlist = () => {
  return (
    <div className="update-waitlist-container">
      <h2>Update Waitlist</h2>
      <form>
        <label htmlFor="wait-time">New Wait Time:</label>
        <input type="number" id="wait-time" name="wait-time" />
        <button type="submit" className="update-waitlist-button">
          Update Wait Time
        </button>
      </form>
    </div>
  );
};

export default UpdateWaitlist;
