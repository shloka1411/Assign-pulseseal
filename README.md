# PulseSeal Dynamic Pricing Management System

A full-stack pricing management system built with Next.js, React, Node.js, Express.js, and MongoDB that demonstrates complete frontend-backend communication using REST APIs.

The project replaces static pricing cards with dynamically rendered data fetched from the backend and provides an **Admin Dashboard** where administrators can manage pricing plans through complete CRUD (Create, Read, Update, Delete) operations. Any changes made by the administrator are automatically reflected on the public landing page.

---

# 📌 Project Overview

This project demonstrates a complete full-stack implementation of a dynamic pricing management system for the PulseSeal platform.

Instead of hardcoding pricing plans inside the frontend, the application fetches pricing data from the backend through REST APIs. The backend serves pricing data in JSON format, allowing the frontend to render pricing cards dynamically.

The project also includes an **Admin Dashboard** where administrators can:

- Create Pricing Plans
- View Pricing Plans
- Update Existing Plans
- Delete Pricing Plans

All CRUD operations are handled through backend APIs, ensuring that the public landing page always displays the latest pricing information.

---

# 🎯 Assignment Objective

The objective of this assignment was to demonstrate a complete understanding of frontend-backend communication by:

- Converting static pricing cards into dynamic components.
- Fetching pricing plans from backend APIs.
- Implementing complete CRUD operations.
- Creating an Admin Dashboard for pricing management.
- Demonstrating scalable application architecture.
- Keeping frontend independent from backend implementation.

---

# ✨ Features

## Landing Page

- Dynamic Pricing Cards
- Backend API Integration
- GET API Requests
- Dynamic Rendering using `map()`
- Automatic UI Updates
- Loading State
- Error Handling
- Responsive UI

---

## Admin Dashboard

- View All Pricing Plans
- Create New Pricing Plans
- Update Existing Pricing Plans
- Delete Pricing Plans
- Complete CRUD Functionality
- Backend Validation
- Real-time Data Synchronization

---

## Backend

- REST API Architecture
- JSON Responses
- Modular Route Structure
- Controller-Based Architecture
- MongoDB Integration
- Secure Environment Variables

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios / Fetch API
- Redux Toolkit
- NextAuth
- Framer Motion
- Material UI
- Radix UI

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- dotenv
- CORS

---

# 📁 Folder Structure

```text
project/

├── frontend/
│
│   ├── src/
│   │
│   ├── app/
│   ├── components/
│   ├── assets/
│   ├── features/
│   ├── lib/
│   └── store/
│
│   ├── public/
│   ├── package.json
│   └── .env.local
│
└── backend/
    │
    ├── src/
    │
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── models/
    ├── config/
    ├── services/
    └── index.js

    ├── package.json
    └── .env
```

---

# ⚙️ Project Workflow

```text
User

        │
        ▼

Landing Page

        │
        ▼

Frontend

        │
        ▼

GET /api/pricing

        │
        ▼

Backend API

        │
        ▼

MongoDB

        │
        ▼

Pricing Data

        │
        ▼

JSON Response

        │
        ▼

Frontend

        │
        ▼

Dynamic Pricing Cards
```

---

# 👨‍💼 Admin Dashboard Workflow

```text
Administrator

        │
        ▼

Admin Dashboard

        │
        ▼

Create / Update / Delete Plan

        │
        ▼

POST / PUT / DELETE API

        │
        ▼

Backend

        │
        ▼

MongoDB

        │
        ▼

Updated Pricing Data

        │
        ▼

Landing Page

        │
        ▼

Latest Pricing Cards
```

---

# 🔌 API Flow

## GET

Fetch all pricing plans.

```http
GET /api/pricing
```

Purpose:

Retrieve pricing plans for the landing page.

---

## POST

Create a new pricing plan.

```http
POST /api/pricing
```

Purpose:

Admin creates a new pricing plan.

---

## PUT

Update an existing pricing plan.

```http
PUT /api/pricing/:id
```

Purpose:

Modify an existing pricing plan.

---

## DELETE

Delete a pricing plan.

```http
DELETE /api/pricing/:id
```

Purpose:

Remove a pricing plan.

---

# 📤 Sample API Response

```json
[
  {
    "id": 1,
    "name": "HRMS",
    "price": 900,
    "features": [
      "Attendance",
      "Leave Management"
    ]
  },
  {
    "id": 2,
    "name": "TMS",
    "price": 2400
  },
  {
    "id": 3,
    "name": "Combined",
    "price": 3000
  }
]
```

---

# 🔄 Frontend Rendering

After receiving the response:

1. API Response is received.
2. JSON is parsed.
3. Data is stored in state.
4. Pricing cards are rendered using `map()`.
5. If backend returns additional pricing plans, the UI automatically updates without modifying the frontend code.

---

# 🖥 Backend Explanation

The backend follows a REST API architecture.

It is responsible for:

- Receiving client requests
- Validating incoming data
- Processing CRUD operations
- Communicating with MongoDB
- Returning JSON responses

Currently, the backend can be configured to return hardcoded JSON data for demonstration purposes or fetch data directly from MongoDB.

This architecture allows the frontend to remain unchanged even if the data source changes in the future.

---

# 🤖 AI Assistance

This project was developed with the assistance of **GitHub Copilot** inside **Visual Studio Code**.

GitHub Copilot was used as an AI coding assistant for:

- Code suggestions
- Debugging assistance
- API implementation guidance
- Improving development productivity

The overall project architecture, business logic, frontend-backend communication, API integration, and implementation decisions were completed by the developer.

Built with using Next.js, React, Node.js, Express.js and MongoDB.
