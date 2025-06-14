import React from 'react';


const FilterBar = ({ filters, onFilterChange, onClearFilters, doctors }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row align-items-end">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <label className="form-label">
                            <span className="me-1">👨‍⚕️</span>
                            Filter by Doctor
                        </label>
                        <select
                            className="form-select"
                            value={filters.doctor}
                            onChange={(e) => onFilterChange('doctor', e.target.value)}
                        >
                            <option value="">All Doctors</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                </option>))}
                        </select>
                    </div>

                    <div className="col-md-4 mb-3 mb-md-0">
                        <label className="form-label">
                            <span className="me-1">📅</span>
                            Filter by Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            value={filters.date}
                            onChange={(e) => onFilterChange('date', e.target.value)}
                        />
                    </div>

                    <div className="col-md-4">
                        {(filters.doctor || filters.date) && (
                            <button
                                className="btn btn-outline-secondary"
                                onClick={onClearFilters}
                            >
                                <span className="me-1">✖️</span>
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FilterBar;