# 📋 Job Application Tracker

> A full-stack CRUD application for tracking job applications. Built as a **portfolio project** to demonstrate full-stack development skills.

[![React](https://img.shields.io/badge/React-18+-blue?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-336791?logo=postgresql)](https://www.postgresql.org)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Application Status Flow](#application-status-flow)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Learning Outcomes](#learning-outcomes)
- [Author](#author)

## 🎯 Overview

This is a **simple CRUD portfolio project** designed to showcase:
- Full-stack web development with React and Node.js
- User authentication and authorization
- Database design and integration
- RESTful API development
- Frontend-backend communication

The application allows users to create an account, log in securely, and manage their job applications throughout the hiring process.

## ✨ Features

- **Authentication**
  - User registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Persistent login sessions

- **CRUD Operations**
  - Create job applications
  - Read/view all applications
  - Update application details
  - Delete applications

- **Application Management**
  - Track application status (Applied → Interview → Offer → Rejected)
  - Search jobs by company name
  - Filter jobs by status
  - View dashboard with application statistics

- **Security**
  - Protected routes using authentication middleware
  - Secure password storage
  - JWT token validation

## 🛠 Tech Stack

### Frontend
- **React** 18+ - UI library
- **Vite** - Build tool and dev server
- **CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT (JSON Web Tokens)** - Authentication
- **bcrypt** - Password hashing

### Database
- **PostgreSQL** - Relational database

## 📊 Application Status Flow

Each job application progresses through these stages:

```
Applied → Interview → Offer → Rejected
```

Users can update the status of each application at any time.

## 📁 Project Structure

```
job-application-tracker/
│
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── services/        # API service calls
│   │   ├── App.jsx          # Main App component
│   │   └── App.css          # Global styles
│   │
│   └── package.json
│
├── backend/                  # Node.js/Express server
│   ├── controllers/         # Request handlers
│   ├── database/            # Database configuration
│   ├── middleware/          # Custom middleware (auth, etc.)
│   ├── models/              # Database models/queries
│   ├── routes/              # API route definitions
│   ├── server.js            # Server entry point
│   │
│   └── package.json
│
└── README.md
```

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** v16 or higher ([download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **PostgreSQL** 12 or higher ([download](https://www.postgresql.org/download/))
- **Git** for cloning the repository

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ryluna19/PJobApplicationTracker.git
cd PJobApplicationTracker
```

### 2. Database Setup

Create a PostgreSQL database:

```bash
createdb jobtracker
```

Create the tables by running these SQL commands (connect to your database first):

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Jobs table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  company VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,
  application_date DATE NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
# Database Configuration
DB_USER=your_postgres_user
DB_HOST=localhost
DB_NAME=jobtracker
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_secret_key_here

# Server Port
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another available port)

## 🎮 Running the Application

**Option 1: Run both servers separately**

Terminal 1 (Backend):
```bash
cd backend && npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend && npm run dev
```

## 🗄 Database Schema

### Users Table

| Field | Type | Constraints |
|-------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | UNIQUE, NOT NULL |
| password | TEXT | NOT NULL |

### Jobs Table

| Field | Type | Constraints |
|-------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| company | VARCHAR(100) | NOT NULL |
| role | VARCHAR(100) | NOT NULL |
| status | VARCHAR(50) | NOT NULL |
| application_date | DATE | NOT NULL |
| user_id | INTEGER | FOREIGN KEY → users(id) |

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Jobs (Protected Routes)
- `GET /api/jobs` - Get all user's job applications
- `POST /api/jobs` - Create a new job application
- `PUT /api/jobs/:id` - Update a job application
- `DELETE /api/jobs/:id` - Delete a job application
- `GET /api/jobs/search?company=name` - Search by company

## 📸 Screenshots

### Login Page
<img width="1126" height="592" alt="Login Screenshot" src="https://github.com/user-attachments/assets/a8ff5a2d-bf89-4e82-9b16-a57d8ad14e69" />

### Dashboard
<img width="962" height="740" alt="Dashboard Screenshot" src="https://github.com/user-attachments/assets/a18c7ae4-3695-4508-acc4-c5b972a3c38c" />

### Job List
<img width="1006" height="710" alt="Job List Screenshot" src="https://github.com/user-attachments/assets/72a86f9d-952c-41bb-88f4-7142753f8bc5" />

## 🎓 Learning Outcomes

This project demonstrates:

✅ **Frontend Development** - React components, state management, form handling  
✅ **Backend Development** - Express.js API, middleware, authentication  
✅ **Database Design** - PostgreSQL schema, relationships, queries  
✅ **Security** - JWT tokens, password hashing, protected routes  
✅ **Full-Stack Integration** - Client-server communication, REST APIs  
✅ **Development Workflow** - Git version control, environment configuration

## 🚧 Future Enhancements

- Responsive mobile layout
- Better dashboard visualizations with charts
- Email notifications for application updates
- Deployment to production (Heroku/AWS)
- User profile page
- Application notes/comments
- Interview date scheduling
- Export applications to CSV

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Ryan Santos**

- 🎓 Computer Systems Analysis Student
- 💼 Full Stack Development | Node.js | React | PostgreSQL
- 📧 [GitHub](https://github.com/Ryluna19)

---

**Note:** This is a portfolio/learning project. For production use, additional features like rate limiting, input validation, error handling improvements, and comprehensive testing would be recommended.
