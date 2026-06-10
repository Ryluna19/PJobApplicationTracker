# 📋 Job Application Tracker

🚀 A full-stack web application for tracking job applications through the entire hiring pipeline — from application to interview, offer, or rejection.

Built as a **portfolio project** to demonstrate practical full-stack development skills with React, Node.js, PostgreSQL, and JWT authentication.

---

## 🎬 Demo

<img width="1146" height="959" alt="Animação" src="https://github.com/user-attachments/assets/49d24103-cbca-46ec-ad00-bc068e6ae3dc" />


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
<img width="768" height="563" alt="image" src="https://github.com/user-attachments/assets/e4bc7a3f-3189-4da3-938b-e263dbe71f7c" />

### Dashboard
<img width="922" height="655" alt="image2" src="https://github.com/user-attachments/assets/b783c1c3-bb42-4420-80a3-7160e87ed25a" />

### Job List
<img width="949" height="786" alt="image3" src="https://github.com/user-attachments/assets/3e17f864-4d29-49f9-9d65-8abb3a39ca7e" />

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


