# School Management Backend

A Node.js/Express backend for the school management system with user authentication and JWT middleware.

## Features

- User registration with password hashing using bcryptjs
- User login with JWT token generation
- JWT middleware for route protection
- MySQL database integration with Sequelize ORM
- CORS enabled for frontend integration
- Comprehensive Swagger API documentation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=5000

# Environment
NODE_ENV=development
```

3. Set up your MySQL database and create a database named `school_management`

4. Run the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Documentation

The API documentation is available at: **http://localhost:5000/docs**

This interactive Swagger documentation includes:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Example requests and responses
- Try-it-out functionality

## Testing the API

For a complete testing guide, see [TESTING_GUIDE.md](./TESTING_GUIDE.md)

### Quick Test Flow:

1. **Register a user** using `/api/register`
2. **Login** using `/api/login` to get a JWT token
3. **Authorize** in Swagger UI with your token
4. **Test protected routes** like `/api/users`, `/api/students`, etc.

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. Register a new user using `/api/register`
2. Login using `/api/login` to get a JWT token
3. Include the token in the Authorization header: `Bearer <your_token>`

## API Endpoints

### Authentication Endpoints

#### POST /api/register
Register a new user (no authentication required).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rawPassword": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully!",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /api/login
Login with existing user credentials (no authentication required).

**Request Body:**
```json
{
  "email": "john@example.com",
  "rawPassword": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Protected Endpoints (JWT Authentication Required)

#### GET /api/users
Get all users (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "message": "Users retrieved successfully",
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1,
  "user": {
    "id": 1,
    "name": "John Doe"
  }
}
```

#### GET /api/users/{id}
Get specific user by ID (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "message": "User retrieved successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "requestingUser": {
    "id": 1,
    "name": "John Doe"
  }
}
```

#### GET /api/users/profile/me
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/protected/profile
Get user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "message": "Access granted to protected route",
  "user": {
    "id": 1,
    "name": "John Doe"
  }
}
```

#### GET /api/protected/dashboard
Get dashboard data (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "message": "Dashboard data retrieved successfully",
  "user": {
    "id": 1,
    "name": "John Doe"
  },
  "dashboard": {
    "totalStudents": 150,
    "totalTeachers": 25,
    "totalCourses": 12
  }
}
```

### School Management Endpoints

#### GET /api/students
Get all students (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "message": "Students retrieved successfully",
  "students": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "grade": "10th",
      "email": "alice@school.com"
    }
  ],
  "total": 5,
  "user": {
    "id": 1,
    "name": "John Doe"
  }
}
```

#### GET /api/teachers
Get all teachers (requires authentication).

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "message": "Teachers retrieved successfully",
  "teachers": [
    {
      "id": 1,
      "name": "Dr. Sarah Miller",
      "subject": "Mathematics",
      "email": "sarah@school.com",
      "experience": "8 years"
    }
  ],
  "total": 5,
  "user": {
    "id": 1,
    "name": "John Doe"
  }
}
```

## Error Responses

### Authentication Errors
```json
{
  "error": "Access denied. No token provided.",
  "message": "Authorization header must start with 'Bearer '"
}
```

```json
{
  "error": "Token expired",
  "message": "Your session has expired. Please login again."
}
```

```json
{
  "error": "Invalid token",
  "message": "The provided token is invalid or malformed."
}
```

### Validation Errors
```json
{
  "error": "User with this email already exists"
}
```

```json
{
  "error": "Invalid credentials"
}
```

## JWT Middleware

The application includes a JWT middleware (`verifyToken`) that:

1. Extracts the token from the Authorization header
2. Verifies the token using the secret key
3. Rejects unauthorized or invalid requests
4. Adds user information to the request object for use in protected routes

## Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Protected routes with middleware
- CORS enabled for frontend integration
- Environment variable configuration
- Input validation and error handling

## File Structure

```
school-management-backend/
├── configs/
│   ├── database.config.js
│   └── swagger.config.js
├── controllers/
│   ├── login.controller.js
│   ├── register.controllers.js
│   ├── students.controller.js
│   └── teachers.controller.js
├── docs/
│   ├── login.docs.js
│   ├── register.docs.js
│   ├── student.docs.js
│   ├── teacher.docs.js
│   └── users.docs.js
├── middlewares/
│   └── verifyToken.js
├── models/
│   ├── index.js
│   ├── user.models.js
│   ├── student.models.js
│   └── teacher.models.js
├── routes/
│   ├── login.routes.js
│   ├── register.routes.js
│   ├── users.routes.js
│   ├── students.routes.js
│   ├── teachers.routes.js
│   └── protected.routes.js
├── server.js
├── package.json
├── README.md
└── TESTING_GUIDE.md
``` 