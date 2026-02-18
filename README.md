# Architecture Office Management System

## Overview

The Architecture Office Management System is a full-stack web application designed to streamline the daily operations of an architecture and construction office.

It allows teams to manage projects, track expenses, organize client information, and control user access through role-based permissions.

## Features

- 🔐 JWT-based authentication and authorization
- 👥 Role-based access control (Admin, Staff)
- 📁 Project management (create, update, delete, assign users)
- 🧾 Client management
- 💰 Office expense tracking
- 📊 Project-related expense tracking
- 📎 Document upload and management

## Technologies Used

### 🎨 Frontend

- React – Single Page Application (SPA)

- React Router – Client-side routing

- Axios – HTTP requests to backend API

- UI Library – (Tailwind CSS, flowbite-react)

### ⚙️ Backend

- NestJS – Scalable Node.js framework

- TypeScript – Strongly typed JavaScript

- TypeORM – ORM for database interaction

- Class Validator & DTOs – Input validation and data integrity

- JWT (JSON Web Token) – Authentication and authorization

### 🗄️ Database

- PostgreSQL – Relational database

### 🔐 Authentication & Security

- JWT-based authentication

- Role-based access control (RBAC)

- Guards & middleware (NestJS)

### 🧪 Development & Tools

- Git & GitHub – Version control

- Postman / Thunder Client – API testing

## Architecture

The system follows a **client-server architecture**:

- **Frontend:** React SPA communicating via REST API
- **Backend:** NestJS REST API with modular structure
- **Database:** Relational database managed with ORM
- **Authentication:** JWT tokens with role validation

## Project Structure

```txt
/
├── backend/        # NestJS backend (API, services, database access)
├── frontend/       # React frontend (pages, components, UI)
├── docs/           # Database diagram, screenshots
│   ├── database-diagram.png
│   └── screenshots/
└── README.md


## Screenshots

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Project Management

![Projects](docs/screenshots/projects.png)

## Security

The system implements several security best practices:

- JWT authentication
- Role-based authorization
- Secure error handling (NotFound instead of Forbidden in sensitive cases)
- Input validation with DTOs

## Author

**Joaquin Aquino**

- Computer Engineering Student
- Pamukkale University
```
