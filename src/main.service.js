import { callApi } from './Utility/apiClient';


const isDev = true;

const appointmentService = {
    doctors: [
        { id: 1, name: "Dr. Smith", specialty: "Cardiology" },
        { id: 2, name: "Dr. Johnson", specialty: "Dermatology" },
        { id: 3, name: "Dr. Brown", specialty: "Neurology" },
        { id: 4, name: "Dr. Davis", specialty: "Pediatrics" }
    ],

    timeSlots: [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
    ],

    appointments: [
        {
            id: 1,
            patientName: "John Doe",
            doctorId: 1,
            doctorName: "Dr. Smith",
            date: "2025-06-15",
            time: "09:00",
            phone: "+1234567890",
            email: "john@example.com",
            status: "confirmed"
        },
        {
            id: 2,
            patientName: "Jane Wilson",
            doctorId: 2,
            doctorName: "Dr. Johnson",
            date: "2025-06-15",
            time: "10:30",
            phone: "+1234567891",
            email: "jane@example.com",
            status: "pending"
        },
        {
            id: 3,
            patientName: "Mike Brown",
            doctorId: 1,
            doctorName: "Dr. Smith",
            date: "2025-06-16",
            time: "14:00",
            phone: "+1234567892",
            email: "mike@example.com",
            status: "confirmed"
        }
    ],

    async getAppointments() {
        if (isDev) {
            return Promise.resolve(this.appointments);
        }

        return callApi({
            url: 'https://api.example.com/appointments',
            method: 'GET',
        });
    },

    async getDoctors() {
        if (isDev) {
            return Promise.resolve(this.doctors);
        }
        return callApi({
            url: 'https://api.example.com/appointments',
            method: 'GET',
        });
    },

    getTimeSlots() {
        return Promise.resolve(this.timeSlots);
    },

    getAvailableTimeSlots(doctorId, date) {
        const bookedSlots = this.appointments
            .filter(apt => apt.doctorId === parseInt(doctorId) && apt.date === date)
            .map(apt => apt.time);

        const availableSlots = this.timeSlots.filter(slot => !bookedSlots.includes(slot));
        return Promise.resolve(availableSlots);
    },

    createAppointment(appointment) {
        // Check if slot is still available
        const isSlotTaken = this.appointments.some(apt =>
            apt.doctorId === appointment.doctorId &&
            apt.date === appointment.date &&
            apt.time === appointment.time
        );

        if (isSlotTaken) {
            return Promise.reject(new Error('Time slot is no longer available'));
        }

        const doctor = this.doctors.find(d => d.id === appointment.doctorId);
        const newAppointment = {
            ...appointment,
            id: this.appointments.length + 1,
            doctorName: doctor.name,
            status: "pending"
        };

        this.appointments.push(newAppointment);
        return Promise.resolve(newAppointment);
    }
};

export default appointmentService;