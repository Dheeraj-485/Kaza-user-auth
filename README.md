# Kaza User Authentication

## Overview
Kaza User Authentication is a robust authentication system built using **Node.js**, **Express**, **PostgreSQL**, and **JWT authentication**. It includes user registration, login, and profile management with secure password hashing and token-based authentication.

## Features
- User Signup with validation
- User Login with JWT-based authentication
- Profile update (email/password update only)
- Secure password hashing using bcrypt
- Token verification middleware

## Technologies Used
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **Bcrypt**
- **Joi (Input validation)**
- **Dotenv** for environment variables

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Dheeraj-485/Kaza-user-auth.git
cd server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and configure it with the following:
```env
PORT=3000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

### 4. Set up PostgreSQL Database
Ensure you have a running PostgreSQL instance and update the `DATABASE_URL` in the `.env` file. Then, create the users table by running:
```bash
node server.js
```

### 5. Start the Server
```bash
npm start
```
The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### 1. User Signup
**Endpoint:** `POST https://kaza-user-auth.onrender.com/api/auth/signup`
**Request Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "User registered successfully."
}
```

### 2. User Login
**Endpoint:** `POST https://kaza-user-auth.onrender.com/api/auth/login`
**Request Body:**
```json
{
  "usernameOrEmail": "testuser",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "Login successful.",
  "token": "your_jwt_token"
}
```

### 3. Update Profile (Authenticated)
**Endpoint:** `PUT https://kaza-user-auth.onrender.com/api/auth/profile`
**Headers:** `Authorization: Bearer <JWT_TOKEN>`
**Request Body:**
```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```
**Response:**
```json
{
  "message": "Profile updated successfully."
}
```

## Middleware
### `verifyToken`
This middleware verifies JWT tokens for protected routes.

## Running in Production
- Use a process manager like `pm2` to keep the server running.
- Ensure environment variables are properly configured.
- Use a secure database connection.


---
Developed by [Dheeraj] 

