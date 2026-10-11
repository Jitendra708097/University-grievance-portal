# 🎓 University Grievance Portal

> A comprehensive full-stack application for streamlined grievance management in educational institutions. Built with modern web technologies and best practices for scalability, security, and user experience.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/Jitendra708097/University-grievance-portal)
[![License](https://img.shields.io/badge/License-ISC-green)](#license)
[![Node.js](https://img.shields.io/badge/Node.js->=14.0-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)

---

## 📋 Overview

The **University Grievance Portal** is a mini-project developed for HRIT University to digitize and automate the grievance redressal process. It provides students with an intuitive interface to submit complaints while giving administrative staff powerful tools to track, review, and resolve issues efficiently.

### Key Highlights
✅ **Role-Based Access Control** - Student, Department Admin, and Super Admin roles  
✅ **Secure Authentication** - JWT tokens with cookie-based sessions  
✅ **File Upload Support** - Evidence submission via Cloudinary integration  
✅ **Rate Limiting** - Prevents spam and ensures system stability  
✅ **Real-Time Caching** - Redis integration for improved performance  
✅ **Security-First Design** - Helmet middleware and CORS protection  

---

## 🛠️ Tech Stack

### Frontend
```
React 19.2          - UI Library
Vite 7.2            - Fast build tool & dev server
React Router 7.9    - Client-side routing
Redux Toolkit 2.10  - State management
Tailwind CSS 4.1    - Utility-first CSS framework
Axios 1.13          - HTTP client
React Hook Form 7.66 - Form management
React Hot Toast 2.6 - Toast notifications
```

### Backend
```
Node.js & Express 5.1  - Server runtime & framework
MongoDB & Mongoose 8.20 - Database & ODM
Redis 5.9              - Caching & session store
Cloudinary 1.41        - Cloud file storage
JWT 9.0.2              - Authentication tokens
bcryptjs 3.0.3         - Password hashing
Helmet 8.1             - Security headers
express-rate-limit 8.2 - Rate limiting middleware
```

---

## ✨ Features

### 👨‍🎓 Student Dashboard
- 📝 Register and create an account with secure authentication
- 🔐 Login with email and password
- 📤 Submit grievances with detailed descriptions and supporting evidence
- 📊 View personal grievance submissions with real-time status updates
- 📱 Responsive mobile-friendly interface

### 👨‍💼 Admin Panel
- 📋 View all grievances submitted by students
- 🔍 Filter and search grievances by status, student, or date
- ✏️ Update grievance status (Pending → In Progress → Resolved)
- 📎 Review attached evidence for investigation
- 🎯 Department-level and super-admin controls

### 🔐 Security & Performance
- Token-based authentication with JWT
- Password encryption using bcryptjs
- Rate limiting on grievance submissions
- Redis caching for frequently accessed data
- CORS protection and security headers with Helmet
- Input validation and sanitization

---

## 📁 Project Architecture

```
University-grievance-portal/
│
├── 📂 client/                          # React Frontend
│   ├── src/
│   │   ├── components/                 # Reusable UI components
│   │   ├── pages/                      # Page-level components
│   │   ├── redux/                      # Redux slices & store
│   │   ├── hooks/                      # Custom React hooks
│   │   └── utils/                      # Helper functions
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── 📂 server/                          # Express Backend
│   ├── config/
│   │   ├── db.js                       # MongoDB connection
│   │   ├── redis.js                    # Redis client setup
│   │   └── cloudinary.js               # Cloudinary configuration
│   ├── controllers/
│   │   ├── authController.js           # Auth logic (register, login, logout)
│   │   └── grievanceController.js      # Grievance CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js           # JWT verification & authorization
│   │   ├── uploadMiddleware.js         # File upload handling
│   │   └── rateLimiter.js              # Rate limiting
│   ├── models/
│   │   ├── User.js                     # User schema
│   │   └── Grievance.js                # Grievance schema
│   ├── routes/
│   │   ├── authRoutes.js               # Auth endpoints
│   │   └── grievanceRoutes.js          # Grievance endpoints
│   ├── server.js                       # Express app setup
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v14.0 or higher
- **npm** or **yarn**
- **MongoDB** (local or cloud URI)
- **Redis** (local or cloud URI)
- **Cloudinary** account (for image hosting)

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Jitendra708097/University-grievance-portal.git
cd University-grievance-portal
```

#### 2️⃣ Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/grievance_db

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Redis
REDIS_URL=redis://localhost:6379

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Client
CLIENT_URL=http://localhost:5173
```

#### 3️⃣ Setup Frontend
```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory (if needed):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Running the Application

#### Start Backend Server
```bash
cd server
node server.js
```
✅ Backend runs on: `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd client
npm run dev
```
✅ Frontend runs on: `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register new student | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `POST` | `/api/auth/logout` | User logout | ✅ |

### Grievance Routes
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `POST` | `/api/grievances` | Create grievance | Student |
| `GET` | `/api/grievances/my` | Get my grievances | Student |
| `GET` | `/api/grievances/admin/all` | Get all grievances | Admin |
| `PUT` | `/api/grievances/:id/status` | Update grievance status | Admin |

---

## 👥 User Roles & Permissions

### 🎓 Student
- Register and log in
- Submit grievances with evidence
- View their own grievances and status
- Cannot access admin features

### 👔 Department Admin (DeptAdmin)
- View all grievances
- Update grievance status
- Review evidence
- Manage department-level issues

### 🏛️ Super Admin
- Full system access
- Manage all grievances
- User management capabilities
- System oversight

---

## 🔒 Security Features

✔️ **JWT Authentication** - Stateless, secure token-based auth  
✔️ **Password Hashing** - bcryptjs for secure password storage  
✔️ **Rate Limiting** - Prevents abuse and spam  
✔️ **CORS Protection** - Restricted cross-origin requests  
✔️ **Helmet Security** - HTTP security headers  
✔️ **Input Validation** - Server-side validation on all inputs  
✔️ **Secure Cookies** - HttpOnly, SameSite protection  

---

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['Student', 'DeptAdmin', 'SuperAdmin'],
  department: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Grievance Model
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: User),
  title: String,
  description: String,
  category: String,
  evidence: {
    url: String,
    publicId: String
  },
  status: Enum ['Pending', 'In Progress', 'Resolved'],
  priority: Enum ['Low', 'Medium', 'High'],
  remarks: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Future Enhancements

- [ ] Email notifications for status updates
- [ ] Advanced analytics dashboard
- [ ] Automated acknowledgment emails
- [ ] Escalation workflow
- [ ] Two-factor authentication (2FA)
- [ ] Mobile app (React Native)
- [ ] AI-powered grievance categorization
- [ ] Real-time notifications with WebSockets
- [ ] Unit and integration tests
- [ ] Docker containerization

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 👤 Author

**Jitendra Kumar**
- GitHub: [@Jitendra708097](https://github.com/Jitendra708097)
- Email: jitendrasharma708097@gmail.com

---

## 🙏 Acknowledgments

- HRIT University for the opportunity to develop this project
- The open-source community for incredible libraries and tools
- All contributors and supporters

---

## 📞 Support

If you encounter any issues or have questions, please:
- Open an issue on GitHub
- Contact the author directly
- Check existing documentation

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star! ⭐**

Made with ❤️ by Jitendra

</div>
