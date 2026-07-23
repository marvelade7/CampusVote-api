# CampusVote API Server

Welcome to the backend for **CampusVote**! This API powers the voting and election platform, providing authentication, election management, and candidate applications. This documentation is written to help frontend developers easily integrate with the backend.

## Tech Stack
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt for password hashing

## Prerequisites
To run this backend locally, you will need:
- [Node.js](https://nodejs.org/) installed
- A running instance of MongoDB (or a MongoDB Atlas URI)

## Getting Started

1. **Install Dependencies**
   Navigate to the `server` directory and install the necessary npm packages:
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the `server` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_secret_key>
   ```

3. **Run the Server**
   Start the application by running:
   ```bash
   node index.js
   ```
   *The server should now be running on `http://localhost:<PORT>` (e.g., `http://localhost:5000`).*

## API Base URL
All API requests should be prefixed with the base URL:
```
http://localhost:5000/api
```

*(Note: Ensure you replace `5000` with the actual PORT configured in your `.env` file).*

---

## API Endpoints

Currently, the following endpoints are exposed for the **Users** resource. 

### 1. User Signup
Registers a new student user.

- **Endpoint:** `/users/signup`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "password": "password123",
      "confirmPassword": "password123",
      "matricNumber": "12345678",
      "faculty": "Engineering",
      "department": "Computer Science",
      "level": 400,
      "termsAccepted": true
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
      "token": "eyJhbGciOiJIUzI1NiIsIn...",
      "user": {
          "email": "johndoe@example.com",
          "firstName": "John",
          "lastName": "Doe",
          "department": "Computer Science",
          "faculty": "Engineering",
          "level": 400,
          "profilePicture": null,
          "role": "student"
      }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: "Passwords do not match", "You must accept the terms and conditions", or "User already exist".
  - `500 Internal Server Error`

### 2. User Login
Authenticates an existing user and returns a token. You can log in using either the `email` or `matricNumber` as the `identifier`.

- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
      "identifier": "johndoe@example.com", 
      "password": "password123"
  }
  ```
  *(Note: `identifier` can also be the user's `matricNumber`)*
- **Success Response (200 OK):**
  ```json
  {
      "token": "eyJhbGciOiJIUzI1NiIsIn...",
      "user": {
          "email": "johndoe@example.com",
          "firstName": "John",
          "lastName": "Doe",
          "department": "Computer Science",
          "faculty": "Engineering",
          "level": 400,
          "profilePicture": null,
          "role": "student"
      }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: "User not found" or "Incorrect login details".
  - `500 Internal Server Error`

---

## Models Overview

To give you an idea of the backend's data structure, here are the main entities (schemas) defined in the database:

1. **User**: Represents users of the system (roles: `student`, `admin`). Contains details like name, email, matric number, faculty, department, level, etc.
2. **Election**: Represents an election event (status: `upcoming`, `ongoing`, `completed`). Contains title, description, dates, allowed voters, and participating candidates.
3. **Candidate**: Represents a user running for a specific position in an election. Contains details like manifesto, position, votes count, etc.
4. **ContestApplication**: Used when a student applies to become a candidate. Tracks status (`pending`, `approved`, `rejected`) and the motivation statement.

*As development continues, more API routes (for elections, candidate applications, profiles, etc.) will become available.*
