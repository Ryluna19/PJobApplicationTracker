# 📋 Job Application Tracker

> 🚀 A full-stack web application for tracking job applications through the entire hiring pipeline — from application to interview, offer, or rejection.

Built as a **portfolio project** to demonstrate practical full-stack development skills with React, Node.js, PostgreSQL, and JWT authentication.

---

## 🎬 Demo

<img width="1146" height="959" alt="Animação" src="https://github.com/user-attachments/assets/49d24103-cbca-46ec-ad00-bc068e6ae3dc" />


> 📌 Recommended: 10–20 seconds showing full flow (login → dashboard → create job → update status)

---

## ⚡ 10-Second Overview

- Full-stack app (React + Node.js + PostgreSQL)
- JWT authentication system
- Job application tracking system
- Full CRUD operations
- User-specific dashboard
- Search & filtering system

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes

### 📊 Job Tracking
- Create, read, update, delete applications
- Track status:
  `Applied → Interview → Offer → Rejected`
- Search by company
- Filter by status
- Personal dashboard per user

### 🧠 UX
- Simple and clean interface
- Fast interactions
- Organized dashboard for quick access

---

## 🛠 Tech Stack

### Frontend
- React 18
- Vite
- JavaScript (ES6+)
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database
- PostgreSQL (relational schema)

---

## 🧩 Architecture
- RESTful API design
- Clean separation (routes / controllers / middleware)
- Authentication middleware (JWT)

---

## 📸 Screenshots

### Login
<img width="1126" height="592" alt="image" src="https://github.com/user-attachments/assets/f254413c-2aec-4055-88a9-bf57eb20a8cb" />

### Dashboard
<img width="962" height="740" alt="image2" src="https://github.com/user-attachments/assets/d042f5d4-6dbc-4840-bb3c-02588c6ac39e" />

### Job List
<img width="1006" height="710" alt="image3" src="https://github.com/user-attachments/assets/f8a8e7a1-1e47-4480-b5d3-75685f94c89c" />

---

## 🎯 What This Project Demonstrates

This project simulates a real-world full-stack application and demonstrates:

- Full-stack development (React + Node.js)
- REST API design and integration
- Authentication & authorization (JWT)
- Relational database modeling (PostgreSQL)
- CRUD lifecycle in real application context
- Clean project structure and organization

---

## 🚧 Future Improvements

- Mobile responsive UI
- Data visualization dashboard (charts)
- Email notifications for status updates
- Production deployment
- User profile system
- Notes/comments per job
- Testing (unit & integration)

---

## 🧰 Setup

### Prerequisites
- Node.js 16+
- PostgreSQL
- npm

---

### 1. Clone repo

```bash
git clone https://github.com/Ryluna19/PJobApplicationTracker.git
cd PJobApplicationTracker

Backend
cd backend
npm install

Create .env:

DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=jobtracker
DB_PORT=5432

JWT_SECRET=your_secret
PORT=5000

Run:

npm run dev

3. Frontend
cd frontend
npm install
npm run dev

```
👨‍💻 Author

Ryan Santos

GitHub: Ryluna19
Full-Stack Developer (React, Node.js, PostgreSQL)
Seeking internship / junior developer opportunities
📌 Note

This is a portfolio project built for learning purposes. Production-ready improvements would include validation, testing, rate limiting, and CI/CD.


