# Frontend Developer Task – Posts Dashboard

This project is a full-stack web application built as part of the Frontend
Developer Intern assignment.

The application focuses on frontend development using React, while integrating
with a basic backend built using Node.js and Express.

---

## Tech Stack

Frontend:
- React.js
- SCSS

Backend:
- Node.js
- Express.js
- MongoDB

Authentication & Security:
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes and APIs

---

## Features

- User Registration and Login
- JWT-based Authentication
- Protected Dashboard (accessible only after login)
- CRUD operations on Posts (Sample Entity)
- User-specific data handling
- Logout functionality
- Responsive UI

---

## Sample Entity

**Posts**

Each post represents a content item created by the authenticated user.
The application supports creating, reading, updating, and deleting posts
through a secure dashboard.

---

## Dashboard Overview

The dashboard displays:
- Authenticated user access
- Post management section (Create / View / Delete Posts)
- Secure logout option

---

## Backend APIs

- POST /api/auth/register – User registration
- POST /api/auth/login – User login
- GET /api/posts – Fetch user posts
- POST /api/posts – Create a new post
- DELETE /api/posts/:id – Delete a post

All protected routes require a valid JWT token.

---

## Scalability & Future Improvements

- Modular frontend components for easy scaling
- Separated backend routes, models, and middleware
- Can be extended with refresh tokens
- Role-based access control can be added
- Frontend-backend integration can be optimized for production

---

## Note

This project was aligned specifically to meet the requirements of the
Frontend Developer Task, using Posts as the sample entity for demonstrating
CRUD operations and dashboard functionality.
