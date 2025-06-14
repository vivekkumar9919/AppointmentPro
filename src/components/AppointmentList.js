import React from 'react';
import AppointmentCard from './AppointmentCard'


const AppointmentList = ({ appointments, loading }) => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading appointments...</p>
        </div>
      );
    }
  
    if (appointments.length === 0) {
      return (
        <div className="text-center py-5">
          <div className="display-1 mb-3">📅</div>
          <h4>No appointments found</h4>
          <p className="text-muted">Try adjusting your filters or create a new appointment.</p>
        </div>
      );
    }
  
    return (
      <div>
        {appointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    );
  };

  export default AppointmentList;