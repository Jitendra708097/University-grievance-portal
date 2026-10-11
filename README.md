# University Grievance Portal

A full-stack grievance management system built for a university environment, allowing students to submit complaints and administrators to track, review, and update their status.

This project is structured as a React frontend and an Express + MongoDB backend, with Redis support, JWT-based authentication, and Cloudinary for evidence uploads.

## Features

- Student registration and login
- Secure authentication with JWT and cookies
- Role-based access control for Student, DeptAdmin, and SuperAdmin
- Submit grievances with issue details and supporting evidence
- View grievances submitted by the logged-in student
- Admin dashboard to view and manage all grievances
- Update grievance status by department/admin users
- Rate limiting to prevent repetitive submissions
- File upload support for grievance evidence
- CORS, Helmet, and security middleware for the backend

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Redis
- Cloudinary
- JWT
- bcryptjs
- Helmet
- CORS

## Project Structure

```bash
University-grievance-portal/
├── client/                 # React frontend
│   ├── src/                # UI source code and components
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/                 # Express backend
│   ├── config/             # DB, Redis, Cloudinary configs
│   ├── controllers/        # Auth and grievance logic
│   ├── middleware/         # Auth, upload, rate limiting
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── server.js           # App bootstrap
│   ├── package.json
│   └── .gitignore
├── .gitignore
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm or yarn installed
- MongoDB running locally or a MongoDB connection URI
- Redis running locally or a Redis connection URI
- Cloudinary account credentials

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Jitendra708097/University-grievance-portal.git
cd University-grievance-portal
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

## Run the Application

### Start the backend

```bash
cd server
node server.js
```

The backend server runs on the port defined in your `.env` file, typically `http://localhost:5000`.

### Start the frontend

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

## API Overview

### Authentication
- `POST /api/auth/register` - Register a new student
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout authenticated user

### Grievances
- `POST /api/grievances` - Create a grievance (Student only)
- `GET /api/grievances/my` - Get grievances submitted by the logged-in student
- `GET /api/grievances/admin/all` - View all grievances (DeptAdmin and SuperAdmin)
- `PUT /api/grievances/:id/status` - Update grievance status

## Role-Based Access

The application supports the following user roles:

- Student
- DeptAdmin
- SuperAdmin

Access to sensitive routes is restricted using middleware and authorization checks.

## Notes

This project is a mini-project aimed at digitizing the grievance redressal process in a university environment. It demonstrates a practical implementation of authentication, role management, file uploads, and administrative workflow handling.

## License

This project is licensed under the ISC License.

## Author

Jitendra

## Contributing

Contributions, bug reports, and feature requests are welcome. Feel free to open an issue or submit a pull request.
