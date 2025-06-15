import React, { useState, useEffect } from 'react';
import appointmentService from '../main.service'

const AppointmentForm = ({ onSubmit, onCancel, doctors }) => {
    const [formData, setFormData] = useState({
        patient_name: '',
        doctor: '',
        date: '',
        time_slot: '',
        status: "Scheduled",
    });

    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
    const [errors, setErrors] = useState({});

    // Get available time slots when doctor and date are selected
    useEffect(() => {
        if (formData.doctor && formData.date) {
            setLoadingTimeSlots(true);
            appointmentService.getAvailableTimeSlots(formData.doctor, formData.date)
                .then(slots => {
                    setAvailableTimeSlots(slots);
                    // Clear selected time if it's no longer available
                    if (formData.time_slot && !slots.includes(formData.time_slot)) {
                        setFormData(prev => ({ ...prev, time_slot: '' }));
                    }
                })
                .finally(() => setLoadingTimeSlots(false));
        }
    }, [formData.doctor, formData.date]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.patient_name.trim()) newErrors.patient_name = 'Patient name is required';
        if (!formData.doctor) newErrors.doctor = 'Please select a doctor';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time_slot) newErrors.time_slot = 'Please select a time slot';
        // Check if selected date is in the past
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            newErrors.date = 'Please select a future date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                await onSubmit({
                    ...formData,
                    doctor: parseInt(formData.doctor)
                });
            } catch (error) {
                if (error.message.includes('no longer available')) {
                    setErrors({ time_slot: 'This time slot is no longer available. Please select another time.' });
                    // Refresh available slots
                    if (formData.doctor && formData.date) {
                        const slots = await appointmentService.getAvailableTimeSlots(formData.doctor, formData.date);
                        setAvailableTimeSlots(slots);
                    }
                }
            }
        }
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate());
        return tomorrow.toISOString().split('T')[0];
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            <span className="me-2">📅</span>
                            Book New Appointment
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label">Patient Name *</label>
                                <input
                                    type="text"
                                    name="patient_name"
                                    className={`form-control ${errors.patient_name ? 'is-invalid' : ''}`}
                                    value={formData.patient_name}
                                    onChange={handleChange}
                                    placeholder="Enter patient name"
                                />
                                {errors.patient_name && <div className="invalid-feedback">{errors.patient_name}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Select Doctor *</label>
                                <select
                                    name="doctor"
                                    className={`form-select ${errors.doctor ? 'is-invalid' : ''}`}
                                    value={formData.doctor}
                                    onChange={handleChange}
                                >
                                    <option value="">Choose a doctor...</option>
                                    {doctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name} - {doctor.specialty}
                                        </option>
                                    ))}
                                </select>
                                {errors.doctor && <div className="invalid-feedback">{errors.doctor}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Appointment Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                    value={formData.date}
                                    onChange={handleChange}
                                    min={getTomorrowDate()}
                                />
                                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                            </div>

                            <div className="col-12">
                                <label className="form-label">Available Time Slots *</label>
                                {!formData.doctor || !formData.date ? (
                                    <div className="alert alert-info">
                                        <span className="me-2">ℹ️</span>
                                        Please select a doctor and date first to see available time slots.
                                    </div>
                                ) : loadingTimeSlots ? (
                                    <div className="d-flex align-items-center">
                                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                        <span>Loading available time slots...</span>
                                    </div>
                                ) : availableTimeSlots.length === 0 ? (
                                    <div className="alert alert-warning">
                                        <span className="me-2">⚠️</span>
                                        No available time slots for the selected doctor and date. Please choose a different date.
                                    </div>
                                ) : (
                                    <select
                                        name="time_slot"
                                        className={`form-select ${errors.time_slot ? 'is-invalid' : ''}`}
                                        value={formData.time_slot}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select time slot...</option>
                                        {availableTimeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                )}
                                {errors.time_slot && <div className="invalid-feedback">{errors.time_slot}</div>}
                            </div>

  
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={!formData.doctor || !formData.date || availableTimeSlots.length === 0}
                        >
                            <span className="me-1">✅</span>
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentForm;