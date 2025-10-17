# ♻️ Smart Waste Management System

### Module: Waste Collection Request & Admin Approval

**Frontend:** React.js | **Backend:** Node.js (Express) | **Database:** MongoDB

---

## 📘 Overview

This module handles the **creation, management, and approval of waste collection requests** within the Smart Waste Management System.

Users (households or businesses) can create **waste pickup requests**, view their status, and receive notifications once an admin approves or assigns a driver.  
Admins can **view, approve, and assign requests** to waste collection staff, ensuring optimized scheduling and transparent workflows.

---

## 🖥️ Frontend (React.js)

### 🏗️ Tech Stack

- **React.js (Vite or CRA)**
- **Axios** for API calls
- **React Router** for navigation
- **Redux Toolkit / Context API** for state management
- **TailwindCSS / Material UI** for styling
- **React Toastify** for alerts & notifications

---

### 📂 Folder Structure (Frontend)

```
:.
│   App.css
│   App.jsx
│   index.css
│   index.js
│   setupTests.js
│
├───api
│       wiseWasteAPI.js
│
├───assets
│   └───images
│           background.jpg
│
├───components
│       AdminNav.jsx
│       AdminStats.jsx
│       Button.jsx
│       DashboardMapSection.jsx
│       FilterButtons.jsx
│       Footer.jsx
│       InputField.jsx
│       Map.jsx
│       Navbar.jsx
│       RejectModal.jsx
│       userMap.jsx
│       UserNav.jsx
│       WasteRequestDetails.jsx
│       WasteRequestsTable.jsx
│
├───constants
│       strings.js
│
├───context
│       AuthContext.js
│
├───layouts
│       MainLayout.js
│
├───pages
│   │   UserLogin.jsx
│   │   UserRegister.jsx
│   │
│   ├───admin
│   │   │   AddPlaceForm.jsx
│   │   │   AdminHomePage.jsx
│   │   │   AdminRecycleIntegration.jsx
│   │   │   DriverAssignPage.jsx
│   │   │
│   │   └───__tests__
│   │           AdminHomePage.test.jsx
│   │
│   └───user
│       │   AboutPage.jsx
│       │   BulkWaste.jsx
│       │   ContactUs.jsx
│       │   CreateWasteRequest.jsx
│       │   HomePage.jsx
│       │   SortingGuidelines.jsx
│       │   WasteRequestConfirmation.jsx
│       │
│       └───profile
│               Membership.jsx
│               ProfilePage.jsx
│               Recycling.jsx
│               UserNotification.jsx
│               WasteHistory.jsx
│
├───router
│       AppRouter.jsx
│
├───services
│       authService.js
│
└───util
        customStyles.js
        location.js

```

---

### 🧩 Key Components

#### 1. `WasteRequestForm.jsx`

Handles user-side waste collection request creation.  
**Features:**

- Form inputs: waste type, volume, preferred date/time
- POST request to `/api/waste-requests/create`
- Displays success/error toast notifications
- Auto-refreshes user’s request list

#### 2. `WasteRequestList.jsx`

Displays all requests created by the logged-in user.  
**Features:**

- Fetches requests via `GET /api/waste-requests/user/:userId`
- Shows status (`Pending`, `Approved`, `Collected`)
- Provides filtering and sorting options

#### 3. `AdminApprovalPanel.jsx`

Used by admins to manage and approve incoming requests.  
**Features:**

- Fetches all pending requests via `/api/admin/all-waste-requests`
- Approve & assign driver → `/api/waste-requests/assign-driver`
- Status automatically updates in user’s dashboard via notification API

---

### ⚙️ Sample API Integration (Frontend Example)

```javascript
// src/api/wasteRequests.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Add Auth Token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const createWasteRequest = (data) => API.post("/waste-requests/create", data);

export const getUserRequests = (userId) => API.get(`/waste-requests/user/${userId}`);

export const getAllRequestsForAdmin = () => API.get("/admin/all-waste-requests");

export const assignDriver = (data) => API.post("/waste-requests/assign-driver", data);
```

---

## ⚙️ Backend (Node.js + Express)

### 📘 Overview

The Smart Waste Management backend is a **Node.js + Express REST API** that supports users, admins, and drivers in managing waste collection requests efficiently.  
It integrates:

- JWT-based authentication
- Role-based access control
- QR-code generation for tracking waste requests

---

### 🚀 API Documentation

#### 🔐 Authentication

| Method | Endpoint              | Description                              |
| ------ | --------------------- | ---------------------------------------- |
| POST   | `/api/users/register` | Registers a new user (Admin/User/Driver) |
| POST   | `/api/users/login`    | Logs in and returns a JWT token          |

---

#### 🚮 Waste Requests

| Method | Endpoint                                 | Description                                      |
| ------ | ---------------------------------------- | ------------------------------------------------ |
| POST   | `/api/waste-requests/create`             | Creates a new waste request (User only)          |
| POST   | `/api/waste-requests/assign-driver`      | Assigns a driver to a waste request (Admin only) |
| POST   | `/api/waste-requests/mark-picked-up`     | Marks a request as picked up (Driver only)       |
| GET    | `/api/waste-requests/all-waste-requests` | Gets all waste requests for logged-in user/admin |
| GET    | `/api/waste-requests/user/:userId`       | Gets waste requests created by a specific user   |

---

#### 🧭 Admin

| Method | Endpoint                        | Description                             |
| ------ | ------------------------------- | --------------------------------------- |
| GET    | `/api/admin/all-waste-requests` | Returns all waste requests (Admin only) |

---

#### 🔔 Notifications

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| GET    | `/api/notifications`          | Fetch user notifications  |
| PATCH  | `/api/notifications/:id/read` | Mark notification as read |

---

### 🧪 Testing Documentation

#### 🧩 Test Stack

- **Mocha** – Test runner
- **Chai** – Assertions
- **Supertest** – HTTP integration testing
- **MongoDB Test Instance** – Isolated DB for tests

---

#### 🧰 Test Organization

| File                         | Description                                               |
| ---------------------------- | --------------------------------------------------------- |
| `setup.test.js`              | Global DB connection, cleanup logic                       |
| `userRoutes.test.js`         | User registration, login, and profile tests               |
| `adminRoutes.test.js`        | Admin authorization and data access tests                 |
| `wasteRequestRoutes.test.js` | End-to-end waste request creation, assignment, and pickup |

---

#### 🔧 Running Tests

Set your `.env` file for testing:

```bash
MONGO_URI_TEST=mongodb://localhost:27017/smartwaste_test
JWT_SECRET=your_test_secret
```

Run tests:

```bash
npm test
```

---

#### ✅ Output Example

```
✅ Connected to MongoDB for testing
🧪 User Routes
  ✔ should register a new user
  ✔ should login successfully
🛠 Admin Routes
  ✔ should allow admin to get all waste requests
🚮 Waste Request Routes
  ✔ should create a new waste request
  ✔ should assign a driver
```

---

## 🧭 Workflow Summary

1. **User (Customer):**

   - Fills waste request form (waste type, quantity, preferred date).
   - Request created → `/api/waste-requests/create`.

2. **Admin:**

   - Views pending requests on dashboard.
   - Approves or assigns driver → `/api/waste-requests/assign-driver`.
   - System notifies the user with schedule confirmation.

3. **Driver:**

   - Sees assigned pickups.
   - Marks pickup completed → `/api/waste-requests/mark-picked-up`.

4. **System:**
   - Sends notifications and updates request status.
   - Generates analytics for admin dashboards.

---

## 🔒 Roles and Permissions

| Role       | Capabilities                                         |
| ---------- | ---------------------------------------------------- |
| **User**   | Create, view, and track waste requests               |
| **Admin**  | View all requests, assign drivers, approve schedules |
| **Driver** | View assigned pickups, mark requests as completed    |

---

## 🧠 Future Enhancements

- Real-time socket updates for admin-driver communication.
- Integration with Google Maps API for optimized route tracking.
- Automated QR code scanning for bin identification.
- Push notifications for schedule updates.

---

**Author:** [Your Name]  
**Module:** Waste Collection Request & Admin Approval  
**Tech Stack:** MERN (MongoDB, Express, React, Node.js)  
**Version:** 1.0.0
