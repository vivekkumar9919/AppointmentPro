import React from 'react';

const Header = ({ onCreateClick }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand mb-0 h1">
          <span className="me-2">📅</span>
          AppointmentPro
        </span>
        <button
          className="btn btn-light ms-auto"
          onClick={onCreateClick}
        >
          <span className="me-1">➕</span>
          New Appointment
        </button>
      </div>
    </nav>
  );


export default Header;