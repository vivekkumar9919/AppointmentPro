import { callApi } from './Utility/apiClient';
import { API_URLS } from './url';
import sampleResponse from './SampleResponse';

// Toggle between mock and real API data:
// true  => use mock data (development mode)
// false => use actual backend API (production mode)
const isDev = false;

const appointmentService = {

    // get Appointments list
    async getAppointments(params = {}) {
        if (isDev) {
            return Promise.resolve(sampleResponse.getAppointmentsResponse);
        }

        return callApi({
            url: API_URLS.GET_APPOINTMENTS,
            method: 'GET',
            params
        });
    },

     // get Doctors list
    async getDoctors() {
        if (isDev) {
            return Promise.resolve(sampleResponse.getDoctorsResponse);
        }
        return callApi({
            url: API_URLS.GET_DOCTORS,
            method: 'GET',
        });
    },

    getTimeSlots() {
        return Promise.resolve(sampleResponse.timeSlots);
    },

    // Get Available Time Slots
    getAvailableTimeSlots(doctorId, date, appointments) {
        const bookedSlots = appointments
            .filter(apt => apt.doctor === parseInt(doctorId) && apt.date === date)
            .map(apt => apt.time_slot);

        const availableSlots = sampleResponse.timeSlots.filter(slot => !bookedSlots.includes(slot));
        console.log("getAvailableTimeSlots -------", {availableSlots, bookedSlots});
        return Promise.resolve(availableSlots);
    },

    // create Appointment
    async createAppointment(appointment){
        if(isDev){
            return Promise.resolve(sampleResponse.createAppointmentResponse);
        }
        return callApi({
            url: API_URLS.CREATEAPPOINTMENT,
            method: 'POST',
            body:appointment
        });
    },

};

export default appointmentService;