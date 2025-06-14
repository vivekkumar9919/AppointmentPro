import React from 'react';
import AppointmentCard from './AppointmentCard';

const AppointmentList = ({ appointments, loading, page, pagination, onNextPage, onPreviousPage }) => {
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
        <div className="container mt-4">
            {appointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}

            <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                    className="btn btn-outline-primary"
                    onClick={onPreviousPage}
                    disabled={page === 1}
                >
                    ← Previous
                </button>

                <span>Page {pagination.pageNumber || page}</span>

                <button
                    className="btn btn-outline-primary"
                    onClick={onNextPage}
                    disabled={!pagination.has_next}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default AppointmentList;
