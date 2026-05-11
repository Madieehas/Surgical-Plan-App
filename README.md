# 🏥 Surgical Plan Management System

A fullstack web application for managing surgical appointments. It provides role‑based access for **Doctors** and **Patients**, allowing for secure appointment booking and availability management.

## 🚀 Live Demo (Status Update)

> **⚠️ Note on Deployment:** The application is fully functional when run locally. The deployed instances are currently experiencing configuration issues. A working version of the app is demonstrated in the submission video.

| Service | Link | Status |
| :--- | :--- | :--- |
| Frontend (Vercel) | [surgical-plan-app.vercel.app](https://surgical-plan-app.vercel.app/) | ⚠️ Deployed (older version) |
| Backend API (Render) | [surgical-plan-app-2.onrender.com](https://surgical-plan-app-2.onrender.com) | now shows app APR running :) |

## 🧠 Project Overview

This project was developed as a fullstack solution to streamline the process of planning and managing surgical appointments.

### Core Functionality:

*   **User Authentication:** Secure login and registration for both Doctors and Patients.
*   **Role-Based Dashboards:** Separate, customized interfaces for each user type.
*   **Appointment Management:** Patients can book, view, and manage appointments with available doctors.
*   **Availability Control:** Doctors can set their status to "Available" or "Busy" in real-time.

## ⚙️ Tech Stack

This project leverages a modern, three-tier architecture.

**Frontend:**
*   React.js (Create React App)
*   React Router for navigation
*   Axios for API calls

**Backend:**
*   Node.js with Express.js
*   JSON Web Tokens (JWT) for authentication
*   bcrypt for password hashing

**Database:**
*   PostgreSQL
*   Sequelize ORM

## 👥 User Roles & Workflows

The system is built around two distinct user roles, each with a specific set of actions.

### 🩺 Doctor Workflow
1.  **Login:** Access the system using a registered doctor account.
2.  **Dashboard View:** See an overview of upcoming appointments.
3.  **Manage Availability:** Toggle a switch to change status between "Available" and "Busy". This update is instantly reflected for all patients.
4.  **View Appointments:** See a detailed list of appointments booked with them.

### 🧑‍🤝‍🧑 Patient Workflow
1.  **Login:** Access the system using a registered patient account.
2.  **Dashboard View:** See a list of doctors currently marked as "Available".
3.  **Book an Appointment:** Select an available doctor and choose a preferred date/time for a consultation.
4.  **My Appointments:** View a list of their upcoming and past appointments.

## 🔐 Authentication & Advanced Features

The project includes two key advanced features as required:
1.  **Authentication & Authorization:** JWT-based authentication ensures secure access. Role-based middleware protects API routes, preventing unauthorized access (e.g., a patient cannot access a doctor's dashboard).
2.  **Real-time Availability:** When a doctor toggles their status, the change is instantly communicated to all patients, providing a dynamic and responsive user experience.

## 🗄️ Database Schema

The data is modeled across three main tables in the PostgreSQL database.

| Table | Description | Key Columns |
| :--- | :--- | :--- |
| **Users** | Stores all user account information. | `id` (PK), `email`, `password_hash`, `role` |
| **SurgicalPlans** | Stores all appointment records. | `id` (PK), `doctor_id` (FK), `patient_id` (FK), `date`, `status` |
| **Availabilities** | Tracks the real-time availability of doctors. | `id` (PK), `doctor_id` (FK), `is_available` |

## 📡 API Endpoints Summary

The backend follows RESTful conventions and requires a valid JWT for all protected routes (all routes except `/api/auth/register` and `/api/auth/login`).

**Auth Routes**
*   `POST /api/auth/register` - Create a new user account (role: 'doctor' or 'patient').
*   `POST /api/auth/login` - Authenticate a user and receive a JWT.

**Surgical Plan Routes**
*   `GET /api/plans` - Retrieve appointments (filtered by the authenticated user's role).
*   `POST /api/plans` - Create a new appointment.
*   `PUT /api/plans/:id` - Update an appointment's status (e.g., doctor preference, date).
*   `DELETE /api/plans/:id` - Cancel/delete an appointment.

**Doctor Availability Routes**
*   `GET /api/doctors/availability` - Get the availability status of all doctors.
*   `PUT /api/doctors/availability` - Toggle the 'is_available' status for the authenticated doctor.

*Example HTTP Responses: `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `500 Server Error`.*

## 💻 How to Run the Project Locally

This is the recommended way to see the full, functional application.

### Prerequisites
*   Node.js (v16 or later)
*   npm or yarn
*   PostgreSQL installed and running locally

### Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Madieehas/Surgical-Plan-App.git
    cd Surgical-Plan-App
    ```

2.  **Set up and run the Backend**
    ```bash
    cd backend
    npm install
    ```
    *   Create a `.env` file in the `backend` folder with the following variables:
        ```env
        PORT=5000
        DB_URL=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE_NAME
        JWT_SECRET=your_super_strong_secret_key
        ```
    *   Start the server:
        ```bash
        node server.js
        ```
        *You should see output: `Database Synced`, `DB Connected Successfully`, `Server running on port 5000`.*

3.  **Set up and run the Frontend** (Open a new terminal)
    ```bash
    cd frontend
    npm install
    ```
    *   Create a `.env` file in the `frontend` folder:
        ```env
        REACT_APP_API_URL=http://localhost:5000
        ```
    *   Start the React app:
        ```bash
        npm start
        ```
    *   The application will automatically open in your browser at `http://localhost:3000`.

## 🐛 Deployment Troubleshooting & Fixes

The deployment issues were documented to show a complete understanding of the deployment process.

**Backend (Render)**
*   **Error:** `Error: Cannot find module '/opt/render/project/src/backend/server.js'`
*   **Root Cause:** The `Root Directory` in the Render service configuration was likely set incorrectly, or the build step didn't copy the `backend` folder structure as expected.
*   **Attempted Fixes:**
    1.  Changed the Render service's **Root Directory** from `backend` to `.` (the root of the repo).
    2.  Set the **Build Command** to `cd backend && npm install`.
    3.  Set the **Start Command** to `node backend/server.js`.

**Frontend (Vercel)**
*   **Issue:** The live site shows an older version of the login page.
*   **Root Cause:** This is often a caching issue, where either the Vercel build cache or the CDN cache is serving a previous deployment.
*   **Attempted Fixes:**
    1.  **Cleared the Build Cache:** In the Vercel project dashboard, went to a deployment, clicked the three dots, and selected **"Redeploy"**, ensuring the option **"Use existing Build Cache"** was unchecked[reference:1].
    2.  **Purged the CDN Cache:** In the Vercel project **Settings** > **Caches**, clicked **"Purge CDN Cache"** to force a refresh of the globally cached content[reference:2].

## 📚 Documentation Included

Per the assignment requirements, the following documentation is provided:

*   [x] Project title and description
*   [x] Features implemented (including advanced features)
*   [x] Complete tech stack
*   [x] Setup instructions for local development
*   [x] Summary of API endpoints
*   [x] How to run the project locally
*   [x] Links to deployed project (with status notes)
*   [x] Database schema explanation

## 👩‍💻 Author

Madieehas - [GitHub Profile](https://github.com/Madieehas)
Assignment 3 - Fullstack Development
html link - file:///C:/Users/MadihahBINTIHASHIM/Downloads/Surgical%20Plan%20System%20%E2%80%93%20Fullstack%20Project.html


## 📦 Repository Links

*   **Source Code:** [https://github.com/Madieehas/Surgical-Plan-App](https://github.com/Madieehas/Surgical-Plan-App)

---

