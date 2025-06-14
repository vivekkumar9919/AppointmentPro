import React from 'react';

const StatCard = ({ bgColor, emoji, count, label }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className={`card ${bgColor} text-white`}>
        <div className="card-body text-center">
          <div className="display-6">{emoji}</div>
          <h5 className="card-title">{count}</h5>
          <p className="card-text">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;