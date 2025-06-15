import { callApi } from './Utility/apiClient';
import { API_URLS } from './url';

const isDev = false;

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
            "id": 1,
            "doctor_name": "Dr. Vivek",
            "patient_name": "Shivam",
            "date": "2025-06-14",
            "time_slot": "10:00 AM",
            "status": "Scheduled",
            "doctor": 1
        },
        {
            "id": 2,
            "doctor_name": "Dr. Akhil",
            "patient_name": "Aryan",
            "date": "2025-06-14",
            "time_slot": "11:30 AM",
            "status": "Completed",
            "doctor": 2
        }
    ],

    getAppointmentsResponse: {
        "results": [
            {
                "id": 2,
                "doctor_name": "Dr. Akhil",
                "patient_name": "Aryan",
                "date": "2025-06-14",
                "time_slot": "11:30 AM",
                "status": "Completed",
                "doctor": 2
            },
            {
                "id": 1,
                "doctor_name": "Dr. Vivek",
                "patient_name": "Shivam",
                "date": "2025-06-14",
                "time_slot": "10:00 AM",
                "status": "Scheduled",
                "doctor": 1
            }
        ],
        "pages": {
            "total_count": 2,
            "has_next": false,
            "previous": null,
            "pageNumber": 1,
            "page_size": 2
        }
    },
    getDoctorsResponse: {
        "results": [
            {
                "id": 2,
                "name": "Dr. Akhil",
                "specialization": "Dermatology"
            },
            {
                "id": 1,
                "name": "Dr. Vivek",
                "specialization": "Cardiology"
            }
        ],
        "pages": {
            "total_count": 2,
            "has_next": false,
            "previous": null,
            "pageNumber": 1,
            "page_size": 10
        }
    },
    createAppointmentResponse:{
        "status_code": 201,
        "message": "Appointment created successfully",
        "error": null,
        "data": {
            "id": 6,
            "doctor_name": "Dr. Vivek",
            "patient_name": "Rakesh 2",
            "date": "2025-06-15",
            "time_slot": "1:30:00",
            "status": "Scheduled",
            "doctor": 1
        }
    },

    async getAppointments(params = {}) {
        if (isDev) {
            return Promise.resolve(this.getAppointmentsResponse);
        }

        return callApi({
            url: API_URLS.GET_APPOINTMENTS,
            method: 'GET',
            params
        });
    },

    async getDoctors() {
        if (isDev) {
            return Promise.resolve(this.getDoctorsResponse);
        }
        return callApi({
            url: API_URLS.GET_DOCTORS,
            method: 'GET',
        });
    },

    getTimeSlots() {
        return Promise.resolve(this.timeSlots);
    },

    getAvailableTimeSlots(doctorId, date) {
        const bookedSlots = this.appointments
            .filter(apt => apt.doctorId === parseInt(doctorId) && apt.date === date)
            .map(apt => apt.time_slot);

        const availableSlots = this.timeSlots.filter(slot => !bookedSlots.includes(slot));
        return Promise.resolve(availableSlots);
    },

    async createAppointment(appointment){
        if(isDev){
            return Promise.resolve(this.createAppointmentResponse);
        }
        return callApi({
            url: API_URLS.CREATEAPPOINTMENT,
            method: 'POST',
            body:appointment
        });
    }
};

export default appointmentService;