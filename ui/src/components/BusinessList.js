import React from 'react';
import './BusinessList.css';

const BusinessList = ({ businesses }) => {
  return (
    <div className="business-list">
      {businesses.map((business) => (
        <div key={business._id} className="business-item">
          <h3>{business.name}</h3>
          <p>{business.address}</p>
          {/* Add more information if needed */}
        </div>
      ))}
    </div>
  );
};

export default BusinessList;
