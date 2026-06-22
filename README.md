# Audit Logs Dashboard

A full-stack Audit Logs Management System built using React, Node.js, Express, MongoDB, and Mongoose.

The application allows bulk uploading of audit logs, viewing logs through a dashboard, filtering, searching, sorting, pagination, and monitoring log statistics.

---

## Features

### Bulk Upload

- Upload audit logs using a JSON file.
- Supports bulk insertion of thousands of records in a single request.
- Uses MongoDB `insertMany()` for optimized inserts.

### Dashboard

- View uploaded audit logs in a tabular format.
- Responsive and clean UI.

### Search

Search logs by actor email.

Example:

```text
priya.nair@company.com
```

### Filtering

Filter logs by:

- Severity
  - HIGH
  - MEDIUM
  - LOW

- Status
  - Resolved
  - Unresolved

### Sorting

Sort logs by timestamp:

- Latest First
- Oldest First

### Pagination

Server-side pagination for handling large datasets efficiently.

### Dashboard Statistics

Displays:

- Total Logs
- High Risk Logs
- Resolved Logs
- Unresolved Logs

### Sample JSON Download

Users can download a sample JSON file and upload it directly into the system.

---

## Tech Stack

### Frontend

- React
- Axios
- CSS
- React Icons

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

---

## Project Structure

```text
backend
│
├── config
├── controllers
│   └── logController.js
├── models
│   └── Log.js
├── routes
│   └── router.js
├── app.js
├── server.js
└── .env

frontend
│
├── public
│   └── sample-file.json
├── src
│   ├── api
│   ├── pages
│   │   └── Dashboard.jsx
│   ├── routes
│   └── styles
└── .env
```

---

## Database Schema

```javascript
{
  actor: String,
  role: String,
  action: String,
  resource: String,
  resourceType: String,
  ipAddress: String,
  region: String,
  severity: String,
  status: String,
  timestamp: Date
}
```

---

## API Endpoints

### Upload Logs

```http
POST /api/upload
```

Request Body:

```json
[
  {
    "actor": "priya.nair@company.com",
    "role": "admin",
    "action": "DELETE_USER",
    "resource": "/api/users/334",
    "resourceType": "USER",
    "ipAddress": "192.168.1.45",
    "region": "ap-south-1",
    "severity": "HIGH",
    "status": "Unresolved",
    "timestamp": "2025-06-14T08:32:11Z"
  }
]
```

Response:

```json
{
  "success": true,
  "insertedCount": 1
}
```

---

### Get Logs

```http
GET /api/logs
```

Query Parameters:

```text
page
limit
search
severity
status
sortField
sortOrder
```

Example:

```http
GET /api/logs?page=1&limit=10&severity=HIGH
```

---

### Dashboard Statistics

```http
GET /api/dashboard-stats
```

Response:

```json
{
  "totalLogs": 10000,
  "highSeverity": 2500,
  "resolved": 7000,
  "unresolved": 3000
}
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run Backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_SERVER_API=http://localhost:5000/api
```

Run Frontend:

```bash
npm run dev
```

---

## Performance Considerations

- MongoDB indexes added on:
  - timestamp
  - severity
  - status
  - actor

- Server-side:
  - Filtering
  - Searching
  - Sorting
  - Pagination

- Bulk insertion handled using:

```javascript
Log.insertMany(logs);
```

to efficiently process large datasets.

---

## Future Improvements

- Date range filtering
- CSV export
- Authentication and Role Based Access Control
- Real-time log monitoring using WebSockets
- Charts and analytics dashboard
- Log retention policies

---

## Author

Developed as part of a Full Stack Technical Assessment.

Tech Stack:
React • Node.js • Express • MongoDB • Mongoose