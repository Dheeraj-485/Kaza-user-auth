# Kaza-user-auth
Tech stack used:- Nodejs,Expressjs,PostgreSQL



Here’s a ready-to-use README.md file for your Kaza User Auth API project, perfect for GitHub:

markdown
Copy
Edit
# 🔐 Kaza User Auth API

A simple Node.js + Express.js authentication API using PostgreSQL for user signup, login, and profile update.

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Auth & Security**: bcrypt, JWT
- **Environment Config**: dotenv

---

## 📂 Project Structure

kaza-user-auth/ ├── controllers/ │ └── userController.js ├── db/ │ └── index.js ├── middlewares/ │ └── authMiddleware.js ├── routes/ │ └── userRoutes.js ├── .env ├── server.js └── README.md

yaml
Copy
Edit

---

## 🧪 API Features

### 1. Signup
- **POST** `/api/signup`
- Request body:
  ```json
  {
    "username": "yourname",
    "email": "your@email.com",
    "password": "yourPassword"
  }
2. Login
POST /api/login

Use either username or email:

json
Copy
Edit
{
  "username": "yourname",
  "password": "yourPassword"
}
3. Profile Update
PUT /api/profile

Requires Bearer Token in Authorization header.

Payload:

json
Copy
Edit
{
  "email": "newemail@example.com",
  "password": "newpassword"
}
🛡️ Security Considerations
Passwords hashed using bcrypt

JWT-based route protection

Validations for duplicate usernames/emails

Proper HTTP status codes and error messages

🛠️ Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/kaza-user-auth.git
cd kaza-user-auth
Install dependencies

bash
Copy
Edit
npm install
Create a PostgreSQL Database

sql
Copy
Edit
CREATE DATABASE user_auth_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);
Set up your .env file

ini
Copy
Edit
PORT=3000
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=user_auth_db
JWT_SECRET=your_jwt_secret
Start the server

bash
Copy
Edit
node server.js
📫 Contact
Have questions or suggestions? Reach out at your-email@example.com

📄 License
MIT License

yaml
Copy
Edit

---

Let me know if you’d like me to add testing instructions, Postman collection, or deployment steps (like Railway, Render, or Docker)!







