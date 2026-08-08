# Authentication API

A backend Authentication API for handling user registration, login, logout, and authentication.

This project is built using **Node.js Native HTTP Module** without using backend frameworks such as Express.js.

Docker and Docker Compose are used to containerize and run the Node.js application.

## Features

* User registration
* User login
* User logout

## Authentication & Security

* Password hashing using `bcryptjs`
* JSON Web Token (JWT) based authentication
* JWT tokens expire after 1 hour
* Middleware for JWT token verification
* Protected endpoints using Bearer Token authentication
* Passwords are never stored in plain text

## Tech Stack

* Node.js v24
* Native HTTP Module (`node:http`)
* MySQL
* Docker
* Docker Compose

## Libraries

* `mysql2` — Connects the Node.js application to MySQL
* `bcryptjs` — Handles password hashing and password comparison
* `jsonwebtoken` — Creates and verifies JWT tokens
* `dotenv` — Manages environment variables

## Development & Testing Tools

* Docker Desktop — Runs the Node.js application in a container
* Docker Compose — Manages the application container
* `nodemon` — Automatically restarts the server during local development
* Postman — Tests API endpoints
* Git & GitHub — Version control and repository management

## Docker Architecture

The current Docker setup containerizes the Node.js application, while the MySQL database is still running on the local development environment.

```text
┌─────────────────────────────────┐
│          Docker Compose         │
│                                 │
│  ┌───────────────────────────┐  │
│  │         auth-app          │  │
│  │         Node.js           │  │
│  │         Port 3000         │  │
│  └─────────────┬─────────────┘  │
└────────────────┼────────────────┘
                 │
                 │ Database Connection
                 ▼
        MySQL Local Environment
```

Docker Compose is currently used to build and run the Node.js application container.

The MySQL database is not containerized yet and is still running in the local development environment.

## Installation & Configuration

### Prerequisites

Make sure the following tools are installed:

* Git
* Node.js v24
* npm
* Docker Desktop
* MySQL
* Postman

Make sure Docker Desktop and MySQL are running before starting the application.

### 1. Clone the Repository

```bash
git clone <authentication-jwt>
```

### 2. Navigate to the Project Directory

```bash
cd <Authentication-API>
```

### 3. Install Dependencies

For local development, install the project dependencies:

```bash
npm install
```

> Dependencies are also installed automatically when the Docker image is built.

### 4. Configure MySQL

Create a MySQL database named:

```sql
CREATE DATABASE authentication;
```

Select the database:

```sql
USE authentication;
```

Create the `users` table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(55) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  confirm_password VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Configure Environment Variables

Create a `.env` file in the project root directory:

```env
PORT=3000

DB_HOST=<your-mysql-host>
DB_USER=<your-mysql-username>
DB_PASSWORD=<your-mysql-password>
DB_NAME=authentication

JWT_SECRET=<your-jwt-secret>
```

Configure the database variables according to your local MySQL setup.

### 6. Run with Docker Compose

Build the Docker image and start the application container:

```bash
docker compose up --build
```

To run the container in detached mode:

```bash
docker compose up -d --build
```

The API will be available at:

```text
http://localhost:3000
```

### 7. Check the Container

```bash
docker compose ps
```

You can also use:

```bash
docker ps
```

### 8. Stop the Container

```bash
docker compose down
```

## Running Without Docker

The application can also be run directly using Node.js during local development.

Make sure MySQL is running locally, then configure the `.env` file.

Run the application in development mode:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

## API Endpoints

Base URL:

```text
http://localhost:3000
```

### 1. Register User

**Endpoint**

```http
POST /api/auth/register
```

**Request Body**

```json
{
  "full_name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
```

**Successful Response**

Status Code: `201 Created`

```json
{
  "message": "Registration successful. Please log in!"
}
```

### 2. Login User

**Endpoint**

```http
POST /api/auth/login
```

**Request Body**

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Successful Response**

Status Code: `200 OK`

```json
{
  "message": "Login successful, Welcome",
  "data": {
    "token": "<jwt-token>",
    "user": {
      "id_user": 1,
      "full_name": "John Doe",
      "email": "johndoe@example.com"
    }
  }
}
```

Save the JWT token returned from the login process and use it for endpoints that require authentication.

### 3. Logout User

**Endpoint**

```http
POST /api/auth/logout
```

This endpoint requires a valid JWT token.

**Request Header**

```http
Authorization: Bearer <jwt-token>
```

**Successful Response**

Status Code: `200 OK`

```json
{
  "message": "Logout successful!"
}
```

## Authentication Flow

```text
User Registration
       ↓
Validate registration data
       ↓
Hash password using bcryptjs
       ↓
Store user data in MySQL
       ↓
User Login
       ↓
input email and password
       ↓
Generate JWT token
       ↓
Return JWT token to client
       ↓
Client sends token through Authorization Header
       ↓
Middleware verifies JWT token
       ↓
Client can access protected endpoints
```

## Project Structure

```text
.
├── src/
│   ├── config/
│   │   └── dbConfig.js
│   ├── controllers/
│   │   └── authControllers.js
│   ├── helpers/
│   │   └── dotenv.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── repository/
│   │   └── users.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── services/
│   │   └── authServices.js
│   └── validations/
│       └── authValidation.js
├── .gitignore
├── .env
├── Dockerfile
├── docker-compose.yml
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Docker Commands

### Build the Image

```bash
docker compose build
```

### Start the Application

```bash
docker compose up
```

### Start in Detached Mode

```bash
docker compose up -d
```

### Rebuild and Start

```bash
docker compose up --build
```

### View Running Containers

```bash
docker compose ps
```

### View Logs

```bash
docker compose logs
```

To view logs from the `auth-app` service:

```bash
docker compose logs auth-app
```

### Stop the Application

```bash
docker compose down
```

## Notes

* JWT tokens expire after 1 hour.
* Passwords are stored as hashes and are never stored in plain text.
* The logout endpoint requires a valid JWT token.
* The application uses Node.js Native HTTP Module instead of a backend framework such as Express.js.
* Docker Compose is currently used to containerize the Node.js application.
* MySQL is currently running outside Docker in the local development environment.
* Environment variables are used to manage application and database configuration.
* The project was developed and tested using Node.js v24.

## Future Improvements

Potential improvements for future development:

* Add refresh token support
* Add forgot password functionality
* Add email verification
* Add role-based authorization
