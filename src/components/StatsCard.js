import React from 'react';
import StatCard from './common/StatCards';

const StatsCards = ({ appointments }) => {
    // console.log("appointments data in StatsCards", { appointments })
    const totalAppointments = appointments?.length || 0;
    const completedAppointments = appointments.filter(apt => apt.status === 'Completed')?.length || 0;
    const scheduledAppointments = appointments.filter(apt => apt.status === 'Scheduled')?.length || 0;

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
            count: completedAppointments,
            label: 'Completed',
        },
        {
            bgColor: 'bg-warning',
            emoji: '⏳',
            count: scheduledAppointments,
            label: 'Scheduled',
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
