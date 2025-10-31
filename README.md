# 🏥 Hospital Management System API Routes

This document describes the REST API endpoints for the Hospital Management System (HMS).  
Each route is organized by module and includes method, path, and description.

---

## 🔐 AUTH MODULE

| Method  | Route            | Description                                            |
| -------- | ---------------- | ------------------------------------------------------ |
| `POST`  | `/auth/register` | Register new user (admin/patient/doctor based on role) |
| `POST`  | `/auth/login`    | Authenticate user and return JWT token                 |
| `POST`  | `/auth/logout`   | Invalidate token or session                            |
| `GET`   | `/auth/profile`  | Get current user profile (JWT required)                |
| `PATCH` | `/auth/profile`  | Update logged-in user’s profile                        |

---

## 👤 USERS MODULE

| Method   | Route        | Description                    |
| -------- | ------------ | ------------------------------ |
| `GET`    | `/users`     | Get all users (admin only)     |
| `GET`    | `/users/:id` | Get user by ID                 |
| `POST`   | `/users`     | Create new user manually       |
| `PATCH`  | `/users/:id` | Update user info               |
| `DELETE` | `/users/:id` | Soft delete or deactivate user |

---

## 🩺 DOCTORS MODULE

| Method   | Route                                | Description                                                                      |
| -------- | ------------------------------------ | -------------------------------------------------------------------------------- |
| `GET`    | `/doctors`                           | Get list of doctors (filter by department, specialty, availability)              |
| `GET`    | `/doctors/:id`                       | Get doctor details                                                               |
| `POST`   | `/doctors`                           | Create new doctor (admin only)                                                   |
| `PATCH`  | `/doctors/:id`                       | Update doctor info                                                               |
| `DELETE` | `/doctors/:id`                       | Remove doctor (admin only)                                                       |
| `GET`    | `/doctors/:id/availability`          | Get doctor’s availability schedule                                               |
| `POST`   | `/doctors/:id/availability`          | Add availability slot                                                            |
| `DELETE` | `/doctors/:id/availability/:availId` | Remove availability slot                                                         |

---

## 🧑‍🤝‍🧑 PATIENTS MODULE

| Method   | Route                        | Description                               |
| -------- | ---------------------------- | ----------------------------------------- |
| `GET`    | `/patients`                  | Get all patients (admin/doctor only)      |
| `GET`    | `/patients/:id`              | Get single patient detail                 |
| `POST`   | `/patients`                  | Register a new patient                    |
| `PATCH`  | `/patients/:id`              | Update patient info                       |
| `DELETE` | `/patients/:id`              | Soft delete or deactivate patient         |
| `GET`    | `/patients/:id/encounters`   | List medical encounters for a patient     |
| `GET`    | `/patients/:id/appointments` | List all patient appointments             |
| `GET`    | `/patients/:id/files`        | List all uploaded files for this patient  |
| `POST`   | `/patients/:id/files`        | Upload new file (lab result, image, etc.) |

---

## 📅 APPOINTMENTS MODULE

| Method   | Route                               | Description                                           |
| -------- | ----------------------------------- | ----------------------------------------------------- |
| `GET`    | `/appointments`                     | Get all appointments (admin/doctor filtered)          |
| `GET`    | `/appointments/:id`                 | Get appointment detail                                |
| `POST`   | `/appointments`                     | Create new appointment (link doctor, patient, time)   |
| `PATCH`  | `/appointments/:id`                 | Update appointment (status or time)                   |
| `DELETE` | `/appointments/:id`                 | Cancel appointment                                    |
| `GET`    | `/doctors/:doctorId/appointments`   | Get appointments for specific doctor                  |
| `GET`    | `/patients/:patientId/appointments` | Get appointments for specific patient                 |
| `GET`    | `/appointments/schedule`            | Get schedule view by doctor or date range             |

---

## 🩻 ENCOUNTERS / MEDICAL RECORDS MODULE

| Method   | Route             | Description                                     |
| -------- | ----------------- | ----------------------------------------------- |
| `GET`    | `/encounters`     | Get all encounters (admin/doctor only)          |
| `GET`    | `/encounters/:id` | Get single encounter record                     |
| `POST`   | `/encounters`     | Create new encounter (doctor inputs visit data) |
| `PATCH`  | `/encounters/:id` | Update notes, diagnoses, or vitals              |
| `DELETE` | `/encounters/:id` | Delete encounter (rarely used)                  |

---

## 💊 PRESCRIPTIONS MODULE

| Method   | Route                | Description                                   |
| -------- | -------------------- | --------------------------------------------- |
| `GET`    | `/prescriptions`     | List prescriptions (filter by patient/doctor) |
| `GET`    | `/prescriptions/:id` | Get prescription detail                       |
| `POST`   | `/prescriptions`     | Create prescription (linked to encounter)     |
| `PATCH`  | `/prescriptions/:id` | Update prescription                           |
| `DELETE` | `/prescriptions/:id` | Delete prescription                           |

---

## 📁 FILES MODULE

| Method   | Route                        | Description                                                 |
| -------- | ---------------------------- | ----------------------------------------------------------- |
| `GET`    | `/files/:ownerType/:ownerId` | Get files attached to a patient, encounter, or prescription |
| `POST`   | `/files/:ownerType/:ownerId` | Upload new file                                             |
| `DELETE` | `/files/:id`                 | Delete file                                                 |
| `GET`    | `/files/:id/download`        | Download file                                               |

---

## 📊 DASHBOARD MODULE

| Method | Route                 | Description                                            |
| -------| ----------------------| ------------------------------------------------------ |
| `GET`  | `/dashboard`          | Get overall system dashboard (admin only)              |
| `GET`  | `/dashboard/stats`    | Get statistics summary (patients, doctors, etc.)       |

---

### 🧱 Notes

- All routes prefixed with `/api` in production (e.g., `/api/auth/login`).
- JWT authentication required for all non-public endpoints.
- Role-based access control (RBAC) applies across modules (Admin, Doctor, Nurse, Patient).
- All `DELETE` operations are **soft deletes** unless explicitly stated.

---

### 📘 Future Modules (Planned)
- **Billing & Finance** – Track payments, invoices, and insurance claims
- **Inventory** – Manage medical supplies and equipment
- **Notifications** – Handle system alerts and appointment reminders

---

_Last updated: October 2025_
