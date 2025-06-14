import React, { useState, useEffect } from 'react';
import appointmentService from './main.service'
import StatsCards from './components/StatsCard'
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';



// Main App Component
const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    doctor: '',
    date: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [appointments, filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [appointmentsData, doctorsData] = await Promise.all([
        appointmentService.getAppointments(),
        appointmentService.getDoctors()
      ]);
      console.log("appointmentsData and doctorsData" ,  {appointmentsData, doctorsData})
      setAppointments(appointmentsData);
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = appointments;

    if (filters.doctor) {
      filtered = filtered.filter(apt => apt.doctor_name === filters.doctor);
    }

    if (filters.date) {
      filtered = filtered.filter(apt => apt.date === filters.date);
    }

    setFilteredAppointments(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ doctor: '', date: '' });
  };

  const handleCreateAppointment = async (appointmentData) => {
    try {
      const newAppointment = await appointmentService.createAppointment(appointmentData);
      setAppointments(prev => [...prev, newAppointment]);
      setShowForm(false);
    } catch (error) {
      throw error; 
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      
      <Header onCreateClick={() => setShowForm(true)} />
      
      <div className="container py-4">
        <div className="mb-4">
          <h2 className="h3 mb-2">
            <span className="me-2">📊</span>
            Appointments Dashboard
          </h2>
          <p className="text-muted">Manage and view all your appointments in one place.</p>
        </div>
        
        <StatsCards appointments={appointments} />
        
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          doctors={doctors}
        />
        
        <AppointmentList
          appointments={filteredAppointments}
          loading={loading}
        />
      </div>
      
      {showForm && (
        <AppointmentForm
          onSubmit={handleCreateAppointment}
          onCancel={() => setShowForm(false)}
          doctors={doctors}
        />
      )}
      
    </div>
  );
};

export default App;