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

# 🚀 How to Run the Project Locally

Follow the steps below to set up and run the project locally.

## Prerequisites

Make sure the following dependencies are installed on your system:

- Node.js
- npm
- MongoDB

You can verify Node.js and npm installation using:

```bash
node -v
npm -v
```

MongoDB must be running locally on the default MongoDB port.

The project uses the following local MongoDB database:

```text
mongodb://localhost:27017/pulseseal
```

---

## 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd <PROJECT_FOLDER_NAME>
```

The project contains separate frontend and backend applications:

```text
project/
├── frontend/
└── backend/
```

---

## 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory.

You can copy the provided `.env.example` file:

```bash
cp .env.example .env
```

The backend environment variables should contain:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pulseseal
JWT_SECRET=change-me
JWT_EXPIRES_IN=7d
ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@pulseseal.com
ADMIN_PASSWORD=Admin@123
```

> For production environments, replace the default JWT secret and admin credentials with secure values.

---

## 3. Start MongoDB

Make sure MongoDB is running before starting the backend.

If MongoDB is installed using Homebrew on macOS, run:

```bash
brew services start mongodb-community
```

Alternatively, start your local MongoDB service using your system-specific MongoDB setup.

The backend connects to:

```text
mongodb://localhost:27017/pulseseal
```

---

## 4. Seed the Database

The project includes a seed script that creates the initial admin account and default pricing plans.

From the `backend` directory, run:

```bash
npm run seed
```

The seed script will:

- Connect to MongoDB
- Create the initial admin user if it does not already exist
- Insert the default PulseSeal pricing plans

Default admin credentials are based on the backend environment variables:

```text
Email: admin@pulseseal.com
Password: Admin@123
```

If you change `ADMIN_EMAIL` or `ADMIN_PASSWORD` in the `.env` file, use the updated credentials to log in.

---

## 5. Run the Backend Server

For development mode:

```bash
npm run dev
```

Or run the backend normally:

```bash
npm start
```

The backend server will run at:

```text
http://localhost:5000
```

You can verify that the backend is running by opening:

```text
http://localhost:5000/health
```

Expected response:

```json
{
  "success": true,
  "message": "Backend is running"
}
```

---

## 6. Frontend Setup

Open a new terminal window.

Navigate to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Create a `.env.local` file inside the `frontend` directory.

You can copy the provided `.env.example` file:

```bash
cp .env.example .env.local
```

The frontend environment variable should contain:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

This variable connects the Next.js frontend to the Express backend.

---

## 7. Run the Frontend

From the `frontend` directory, run:

```bash
npm run dev
```

The frontend application will run at:

```text
http://localhost:3000
```

Open the URL in your browser to access the PulseSeal landing page.

---

## 8. Access the Admin Dashboard

Open the login page from the application and use the seeded admin credentials:

```text
Email: admin@pulseseal.com
Password: Admin@123
```

After successful login, the admin is redirected to the Pricing Management Dashboard.

The admin can:

- Create pricing plans
- View pricing plans
- Update existing pricing plans
- Delete pricing plans

Changes made from the Admin Dashboard are stored in MongoDB and are reflected on the landing page when the latest pricing data is fetched from the backend API.

---

## 9. Production Build

To create a production build of the frontend, navigate to the `frontend` directory and run:

```bash
npm run build
```

After the build completes successfully, start the production server using:

```bash
npm start
```

The Next.js production application will run on:

```text
http://localhost:3000
```

For the backend, navigate to the `backend` directory and run:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

## Local Development Services

| Service | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Backend API | `http://localhost:5000` |
| Backend Health Check | `http://localhost:5000/health` |
| MongoDB | `mongodb://localhost:27017/pulseseal` |

---

## Local Setup Summary

Run the backend:

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Run the frontend in a separate terminal:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Then open:

```text
http://localhost:3000
``` ye dekh shi hai kya

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
