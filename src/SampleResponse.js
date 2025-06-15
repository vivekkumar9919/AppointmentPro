const sampleResponse = {
    createAppointmentResponse: {
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
        timeSlots: [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
    ],

}

module.exports = sampleResponse