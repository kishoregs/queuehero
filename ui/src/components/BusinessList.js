import React from "react";
import "./BusinessList.css";
import JoinWaitlistButton from "./JoinWaitlistButton";

const BusinessList = ({ businesses }) => {
  console.log(businesses);
  return (
    <div className="business-list">
      {businesses.map((business) => (
        <div key={business._id} className="business-card">
          <h3>{business.name}</h3>
          <p>{business.address}</p>
          <JoinWaitlistButton businessId={business._id} alreadyJoined={business.isJoined} />
          {business.waitTime && (
            <p>Estimated wait time: {business.waitTime} minutes</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default BusinessList;
