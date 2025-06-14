import React, { useState, useEffect } from 'react';
import appointmentService from './main.service';
import StatsCards from './components/StatsCard';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import config from './config';

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    doctor: '',
    date: new Date().toISOString().split("T")[0],
  });

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const pageSize = config.DEFAULT_PAGE_SIZE || 10;

  // Initial load and reload on filter/page change
  useEffect(() => {
    loadData({ ...filters, page, page_size: pageSize });
  }, [filters, page]);

  const loadData = async (params = {}) => {
    setLoading(true);
    try {
      const [appointmentsData, doctorsData] = await Promise.all([
        appointmentService.getAppointments(params),
        appointmentService.getDoctors()
      ]);
      console.log("appointmentsData and doctorsData", { appointmentsData, doctorsData, params });
      setAppointments(appointmentsData.results);
      setPagination(appointmentsData.pages || {});
      setDoctors(doctorsData.results);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    setPage(1); // reset page when filter changes
  };

  const handleClearFilters = () => {
    const clearedFilters = { doctor: '', date: '' };
    setFilters(clearedFilters);
    setPage(1);
  };

  //Pagination navigation handlers
  const handleNextPage = () => {
    if (pagination.has_next) {
      setPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleCreateAppointment = async (appointmentData) => {
    try {
      await appointmentService.createAppointment(appointmentData);
      loadData({ ...filters, page, page_size: pageSize });
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

        {/* Pass pagination handlers and data to child */}
        <AppointmentList
          appointments={appointments}
          loading={loading}
          page={page}
          pagination={pagination}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
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