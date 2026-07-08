# 🔐 D-Auth

A modern full-stack authentication system built using the MERN stack. D-Auth provides secure user authentication with JWT, password encryption, protected routes, and password recovery functionality. The project follows a simple architecture that is easy to understand and extend.

---

## 📌 Features

### Authentication
- User Registration
- User Login
- Secure Logout
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt
- Password Reset (Token-based)
- Role-based User Model (User/Admin)

### User Management
- User Profile
- Avatar Support
- Channel Name
- Subscriber Count
- User Roles

### Security
- JWT Token Authentication
- Password Encryption
- Protected API Routes
- Environment Variable Configuration
- CORS Protection
- Helmet Security Middleware

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- dotenv

---

## 📂 Project Structure

```
D-Auth/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── assets/
│   │   └── App.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.ts
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/D-Auth.git
cd D-Auth
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

DTUBE_CONSTELLATION_Conspiracy_SECRET=your_jwt_secret
```

Run Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Authentication Flow

```
User Registers
        │
        ▼
Password Encrypted (bcrypt)
        │
        ▼
Stored in MongoDB
        │
        ▼
User Login
        │
        ▼
JWT Generated
        │
        ▼
Stored on Client
        │
        ▼
Protected Routes Verified
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| POST | /api/auth/forgot-password | Forgot Password |
| POST | /api/auth/reset-password | Reset Password |

---

### User

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/users/profile | Get User Profile |
| PUT | /api/users/profile | Update Profile |

---

## 🔒 Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- Protected Routes
- Environment Variables
- MongoDB Atlas
- Helmet Middleware
- CORS Configuration

---

## 🧪 Testing

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

## 📷 Screenshots

Add screenshots of:

- Login Page
- Register Page
- Home Page
- User Profile
- Protected Route
- Successful Login

---

## 🎯 Future Improvements

- Email Verification
- Two-Factor Authentication (2FA)
- Google OAuth
- GitHub OAuth
- Refresh Tokens
- User Activity Logs
- Profile Image Upload
- Account Settings
- Admin Dashboard

---

## 👨‍💻 Author

**Gopichand V S**

GitHub: https://github.com/gopichand99796

---

## 📜 License

This project is created for educational and learning purposes.
