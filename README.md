# 💼 Money-Mediia – Employee Management System

A full-stack Employee Management Software built using the MERN stack for internal team management at Money Mediia.

1. Add Email Feature And Telegram
2. Give Website to track 
3. Give Android APP and Desktop App 
4. Give IOS App Also 
5. Also Bio metric Scan
6. We provide full instalmnent and each and everything. 
---

## 🚀 Features

- 🔐 JWT Authentication (Role-based access)
- 👥 Add / Edit / Delete Employees
- 🏢 Department Management
- 📋 Employee Details View
- 🖼 Profile Image Upload (Multer)
- 🔎 Search Employees
- 📊 Data Table Integration
- 🔒 Protected Admin Routes

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- React Data Table Component

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)
- Bcrypt (Password Hashing)

---

## 📂 Project Structure

Money-Mediia/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ └── components/
│
└── README.md

## ✅ Current Implemented Functionalities (Code-Accurate)

### Authentication & Access Control
- User login with JWT token generation.
- Token verification endpoint for persistent sessions.
- Protected frontend routes using auth context.
- Role-based UI access for `admin` and `employee` dashboards.

### Admin Functionalities
- Department management:
  - Add department
  - Edit department
  - Delete department
  - List/search departments
- Employee management:
  - Add employee with profile image upload
  - List/search employees
  - View employee profile
  - Edit employee details
- Salary management:
  - Assign salary records by department and employee
  - View salary history
- Leave management:
  - View all leave requests in table
  - View leave request details
  - Approve/Reject flow integrated in UI (backend route method needs alignment)

### Employee Functionalities
- View own profile details.
- Apply for leave.
- View personal leave history.
- View personal salary history.
- Change password from settings.

### Backend Modules
- REST APIs for:
  - Auth
  - Departments
  - Employees
  - Salary
  - Leave
  - Settings (password change)
- MongoDB models:
  - User
  - Employee
  - Department
  - Salary
  - Leave

### File Upload Support
- Employee profile image upload via Multer.
- Static serving of uploaded files from backend.

### Current Limitations / In Progress
- Some dashboard cards use static values (not live DB aggregates yet).
- Unauthorized route page is referenced but not fully defined in frontend routes.
- API base URL is hardcoded to localhost in frontend.
- Employee delete feature is not implemented in employee module.
- Automated tests are not yet added.


---
