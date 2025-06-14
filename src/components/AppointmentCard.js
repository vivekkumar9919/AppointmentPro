import React from 'react';


const AppointmentCard = ({ appointment }) => {
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-success';
            case 'pending': return 'bg-warning';
            case 'cancelled': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">{appointment.patient_name}</h5>
                    <span className={`badge ${getStatusBadgeClass(appointment.status)}`}>
                        {appointment.status}
                    </span>
                </div>

                <div className="row text-muted">
                    <div className="col-md-6 mb-2">
                        <div className="d-flex align-items-center mb-1">
                            <span className="me-2">👨‍⚕️</span>
                            <span>{appointment.doctor_name}</span>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                            <span className="me-2">📅</span>
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex align-items-center mb-1">
                            <span className="me-2">🕐</span>
                            <span>{appointment.time_slot}</span>
                        </div>
                        {/* <div className="d-flex align-items-center mb-1">
                <span className="me-2">📞</span>
                <span>{appointment.phone}</span>
              </div> */}
                    </div>
                </div>

                {/* <div className="d-flex align-items-center mt-2">
            <span className="me-2">📧</span>
            <span className="text-muted">{appointment.email}</span>
          </div> */}
            </div>
        </div>
    );
};


export default AppointmentCard;