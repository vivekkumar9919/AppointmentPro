import React from 'react';
import StatCard from './common/StatCards';

const StatsCards = ({ appointments }) => {
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed').length;
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length;

  const stats = [
    {
      bgColor: 'bg-primary',
      emoji: '📋',
      count: totalAppointments,
      label: 'Total Appointments',
    },
    {
      bgColor: 'bg-success',
      emoji: '✅',
      count: confirmedAppointments,
      label: 'Confirmed',
    },
    {
      bgColor: 'bg-warning',
      emoji: '⏳',
      count: pendingAppointments,
      label: 'Pending',
    },
  ];

  return (
    <div className="row mb-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          bgColor={stat.bgColor}
          emoji={stat.emoji}
          count={stat.count}
          label={stat.label}
        />
      ))}
    </div>
  );
};

export default StatsCards;
