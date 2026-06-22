# 📋 Job Application Tracker

A full-stack web application that helps users organize and track job applications throughout the hiring process — from application to interview, offer, or rejection.

Built as a portfolio project to demonstrate practical full-stack development skills with React, Node.js, Express, PostgreSQL, JWT authentication, backend validation, automated testing, and REST APIs.

---

## 🎬 Demo

![App Demo](./assets/demo.gif)

---

## ⚡ 10-Second Overview

* Full-stack application built with React, Node.js, Express, and PostgreSQL
* JWT authentication with protected API routes
* Complete CRUD for job applications
* Dashboard with application statistics and interview rate
* Clickable status cards for quick filtering
* Search by company or role
* Status updates directly from each application card
* Backend validation for users, jobs, dates, and statuses
* Automated backend tests with 100% coverage
* Responsive dark-themed interface

---

## ✨ Features

* User registration and login flow
* JWT-based authentication
* Protected dashboard and API routes
* Create, read, update, and delete job applications
* Search applications by company or role
* Filter applications by status
* Dashboard statistics
* Visual feedback for success and error messages
* Responsive dark-themed interface
* Database schema and demo data scripts
* Automated backend tests with Vitest and Supertest

### 🔐 Authentication

* User registration
* User login
* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* Persistent login using localStorage
* Invalid, expired, malformed, and missing token handling

### 📊 Job Tracking

* Create job applications

* View saved applications

* Update application status

* Delete applications

* Track application status:

  Applied → Interview → Offer → Rejected

* Users can only access, update, and delete their own applications

### 📈 Dashboard

* Total applications count
* Applications by status
* Interview rate calculation
* Clickable dashboard cards to filter applications quickly
* Visual overview of the current application pipeline

### 🔎 Search and Filters

* Search applications by company
* Search applications by role
* Filter applications by status
* View how many applications are currently displayed
* Quickly clear active filters

### 🛡 Backend Validation and Security

* Required field validation
* E-mail format validation
* Minimum password length validation
* Company and role length validation
* Valid application status validation
* Valid date validation
* PostgreSQL constraints for users and job applications
* JWT authentication middleware
* User ownership validation for update and delete operations
* Clear API responses for validation and database errors

### 🎨 User Interface

* Dark theme layout
* Responsive application cards
* Status badges
* Visual status indicators
* Success and error messages
* Confirmation before deleting applications
* Mobile-friendly layout

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* JWT
* bcrypt
* dotenv

### Database

* PostgreSQL
* pg
* pgcrypto

### Testing

* Vitest
* Supertest
* V8 Coverage Provider

---

## 🧩 Architecture Overview

```
Frontend - React
        ↓
REST API - Node.js + Express
        ↓
Authentication and Validation Middleware
        ↓
PostgreSQL Database
```

The project follows a full-stack architecture with separated frontend and backend folders.

The frontend communicates with a REST API. The backend validates requests, authenticates users with JWT, restricts access to user-owned job applications, and communicates with PostgreSQL.

---

## 📸 Screenshots

### Login Page

![Login Screenshot](./assets/login.png)

### Dashboard

![Dashboard Screenshot](./assets/dashboard.png)

### Job Applications

![Job Applications Screenshot](./assets/jobs.png)

---

## 📁 Project Structure

```
PJobApplicationTracker/
│
├── assets/
│   ├── demo.gif
│   ├── login.png
│   ├── dashboard.png
│   └── jobs.png
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── JobForm.jsx
│   │   │   └── JobList.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
├── backend/
│   ├── database/
│   │   ├── db.js
│   │   ├── schema.sql
│   │   └── seed.sql
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validateAuth.js
│   │   └── validateJob.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   │
│   ├── tests/
│   │   ├── app.test.mjs
│   │   ├── authRoutes.test.mjs
│   │   └── jobRoutes.test.mjs
│   │
│   ├── app.js
│   ├── server.js
│   ├── vitest.config.mjs
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 📋 Prerequisites

Before running this project, make sure you have installed:

* Node.js 20 or newer
* npm
* PostgreSQL
* Git

---

## 🚀 Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/Ryluna19/PJobApplicationTracker.git
cd PJobApplicationTracker
```

---

### 2. Create the database

Create a PostgreSQL database named:

```
job_application_tracker
```

You can create it through pgAdmin or by running:

```
CREATE DATABASE job_application_tracker;
```

---

### 3. Create tables and demo data

Open the Query Tool in pgAdmin while connected to the job_application_tracker database.

Run the files below in this order:

```
backend/database/schema.sql
```

Then run:

```
backend/database/seed.sql
```

The schema file creates:

* users table
* jobs table
* foreign key relationship
* database constraints
* status validation
* index for user job searches

The seed file creates a demo account and example job applications.

---

### 4. Backend setup

Go to the backend folder:

```
cd backend
npm install
```

Create a .env file inside the backend folder:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=job_application_tracker
DB_PASSWORD=your_postgres_password
DB_PORT=5433

JWT_SECRET=your_long_random_secret
PORT=3000
```

Use the PostgreSQL port configured on your own computer. PostgreSQL commonly uses port 5432, but this project may use 5433 depending on your local installation.

Generate a secure JWT secret with:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run the backend server:

```
npm run dev
```

The backend will run on:

```
http://localhost:3000
```

---

### 5. Frontend setup

Open another terminal and go to the frontend folder:

```
cd frontend
npm install
```

Run the frontend:

```
npm run dev
```

The frontend will normally run on:

```
http://localhost:5173
```

---

## 👤 Demo Account

After running the seed.sql file, use this account to access the application:

```
E-mail: demo@jobtracker.local
Password: demo12345
```

The password is stored in PostgreSQL as a bcrypt hash, not as plain text.

The demo account includes four example applications with all available statuses:

* Applied
* Interview
* Offer
* Rejected

---

## 🧪 Automated Tests

The backend test suite uses Vitest and Supertest.

Tests use a fake PostgreSQL pool, which means they do not access, modify, or delete information from your real database.

Inside the backend folder, run all tests once:

```
npm test
```

Run tests in watch mode:

```
npm run test:watch
```

Generate a coverage report:

```
npm run coverage
```

The current backend suite covers:

* API status route
* User registration
* User login
* JWT generation and validation
* Missing, malformed, and invalid tokens
* User validation
* Job validation
* Job CRUD operations
* Job ownership protection
* Database error handling
* Invalid IDs, statuses, and dates

Current backend test coverage:

* Statements: 100%
* Branches: 100%
* Functions: 100%
* Lines: 100%

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint  | Description                                |
| ------ | --------- | ------------------------------------------ |
| POST   | /register | Register a new user                        |
| POST   | /login    | Authenticate a user and return a JWT token |

### Job Applications

| Method | Endpoint  | Description                                  |
| ------ | --------- | -------------------------------------------- |
| GET    | /jobs     | Get applications from the authenticated user |
| POST   | /jobs     | Create a new job application                 |
| PUT    | /jobs/:id | Update an application status                 |
| DELETE | /jobs/:id | Delete an application                        |

---

## 🗄 Database Schema

### Users Table

| Field    | Type         | Description          |
| -------- | ------------ | -------------------- |
| id       | SERIAL       | Primary key          |
| name     | VARCHAR(100) | User name            |
| email    | VARCHAR(255) | Unique user e-mail   |
| password | VARCHAR(255) | bcrypt password hash |

### Jobs Table

| Field            | Type         | Description         |
| ---------------- | ------------ | ------------------- |
| id               | SERIAL       | Primary key         |
| company          | VARCHAR(100) | Company name        |
| role             | VARCHAR(100) | Job role            |
| status           | VARCHAR(20)  | Application status  |
| application_date | DATE         | Date of application |
| user_id          | INTEGER      | Related user ID     |

---

## 🎯 What This Project Demonstrates

This project was built to demonstrate core skills required for entry-level full-stack development roles:

* React component structure
* State management with hooks
* Form handling
* Frontend and backend integration
* REST API development
* Authentication with JWT
* Password hashing with bcrypt
* PostgreSQL relational database usage
* Database constraints and indexes
* Protected routes
* User ownership validation
* CRUD operations
* Backend validation
* Automated testing with Vitest and Supertest
* Error handling
* Test coverage analysis
* Git and GitHub workflow
* Basic UX improvements

---

## 🚧 Future Improvements

* Pagination for large job lists
* CSV export for applications
* Dashboard charts
* Password recovery flow
* Rate limiting for authentication routes
* GitHub Actions workflow for automated test execution
* Environment-specific frontend API configuration
* Deployment with managed database hosting

---

## 👨‍💻 Author

**Ryan Santos**

* GitHub: [Ryluna19](https://github.com/Ryluna19)
* LinkedIn: [Ryan Bulhões Santos](https://www.linkedin.com/in/ryan-bulhoes-santos-560b25225/)
* Full-Stack Development: React, Node.js, Express, PostgreSQL, and REST APIs
* Seeking internship and junior developer opportunities

---

## 📌 Note

This is a portfolio project built for learning and demonstration purposes.

For production use, improvements such as e-mail verification, password recovery, rate limiting, role-based permissions, environment-specific configuration, monitoring, deployment infrastructure, and CI pipelines would be recommended.
