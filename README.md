# 🏥 AppointmentPro

This project is a responsive and modular React-based dashboard for managing doctor appointments. It offers a clean user interface for interacting with appointment data through filtering, form submissions, and pagination. The architecture is designed to support both mock and live API modes, making it suitable for development, testing, and integration phases. With a clear file structure and reusable components, the dashboard is built for scalability and ease of maintenance.


---

## 🚀 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/vivekkumar9919/AppointmentPro
cd AppointmentPro
```

### 2. Install Dependencies

```
npm install
```

### 3. Start the Development Server

```
npm start
```

---

## 🗂️ Project Structure

```plaintext
src/
│
├── components/                
│   ├── common/                // Commonly used components
│   │   ├── StatCards.js       // Dashboard summary cards
│   │   └── ToastMessage.js    // Reusable Bootstrap toast component
│   ├── Header.js              // App header with create button
│   ├── FilterBar.js           // Date and doctor filters
│   ├── AppointmentForm.js     // Appointment creation modal/form
│   └── AppointmentList.js     // Displays paginated list of appointments
│
├── SampleResponse.js          // Static JSON responses (for dev mode)
├── main.service.js            // Central API service (includes the isDev flag)
├── url.js                     // API endpoint constants
├── Utility/
│   └── apiClient.js           // HTTP client (Axios) setup and configuration
│
├── config.js                  // Configuration values such as DEFAULT_PAGE_SIZE
├── App.js                     // Root app component
└── index.js                   // React DOM mount entry point
```

----
## ✨ Features

- **Filter Appointments:**  
  Filter the appointment list by **doctor** and **date** using a clean filter bar.

- **Pagination:**  
  Seamlessly navigate between pages of appointment data using **Previous** and **Next** buttons.

- **Create Appointments:**  
  Use a modal form to create new appointments quickly and efficiently.

- **Toast Notifications:**  
  Show **success** or **error** messages using a reusable Bootstrap toast component.

- **Dev/Production Toggle:**  
  Easily switch between mock data and real API calls using a flag (`isDev`) in `src/main.service.js`:
  
  ```
  const isDev = true; // Set to false to use live API
  ```

---


---

## 🧪 Future Enhancements

- **Appointment Editing and Deletion**  
  Add support for modifying and removing existing appointments.

- **Authentication and Role-based Access**  
  Protect routes and allow role-specific access to dashboard features.

- **Advanced Filtering and Sorting**  
  Enable filtering by appointment status, time slot, and allow sorting by date or name.

- **More Granular Error Handling**  
  Display more descriptive and context-aware error messages in UI.

---

## 🔧 Tech Stack

- **React** for UI
- **Bootstrap** for styling and responsive components
- **fetch** (via `apiClient.js`) for API communication
- **Modular Structure** for scalable and clean codebase

---
