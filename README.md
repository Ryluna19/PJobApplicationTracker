Job Application Tracker

A full-stack application for tracking job applications throughout the hiring process.

Built with React, Node.js, Express, PostgreSQL, and JWT authentication.

Features
User registration and login
JWT authentication
Password hashing with bcrypt
Create, read, update and delete job applications
Application status tracking
Search jobs by company name
Filter jobs by status
Dashboard with application statistics
PostgreSQL database integration
Protected routes using authentication middleware
Persistent login session
Tech Stack
Frontend
React
Vite
CSS
Backend
Node.js
Express.js
JWT (JSON Web Tokens)
bcrypt
Database
PostgreSQL
Application Status Flow

Each application can be tracked through the following stages:

Applied
Interview
Offer
Rejected
Project Structure
job-application-tracker
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── database
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
Database
Users
Field	Type
id	SERIAL
name	VARCHAR
email	VARCHAR
password	TEXT
Jobs
Field	Type
id	SERIAL
company	VARCHAR
role	VARCHAR
status	VARCHAR
application_date	DATE
user_id	INTEGER
Installation
Clone repository
git clone https://github.com/your-username/job-application-tracker.git
Backend
cd backend

npm install

npm run dev
Frontend
cd frontend

npm install

npm run dev
Environment Variables

Create a .env file inside the backend folder:

DB_USER=your_user
DB_HOST=localhost
DB_NAME=jobtracker
DB_PASSWORD=your_password
DB_PORT=5432

JWT_SECRET=your_secret_key
Future Improvements
Deployment
User profile page
Responsive mobile layout
Better dashboard visualizations
Email notifications
Screenshots
Login

<img width="1126" height="592" alt="image" src="https://github.com/user-attachments/assets/a8ff5a2d-bf89-4e82-9b16-a57d8ad14e69" />

Dashboard

<img width="962" height="740" alt="image2" src="https://github.com/user-attachments/assets/a18c7ae4-3695-4508-acc4-c5b972a3c38c" />

Job List

<img width="1006" height="710" alt="image3" src="https://github.com/user-attachments/assets/72a86f9d-952c-41bb-88f4-7142753f8bc5" />

Author

Ryan Santos

Computer Systems Analysis Student

Full Stack Development • Node.js • React • PostgreSQL
