# ⚙️ Backend – NestJS API

This directory contains the backend of the project, developed using **NestJS**.  
It provides a RESTful API for managing projects, clients, users,milestones,tasks, expenses and documents, with secure authentication and role-based authorization.

---

## ✨ Features

- 🔐 JWT-based authentication
- 👥 Role-based authorization (Admin, Staff)
- 👤 User management
- 📁 Project management
- 🧾 Client management
- 💰 Office and project expenses tracking
- 📎 Document management
- 🔒 Protected endpoints with guards and validation

---

## 🛠️ Technology Stack

- **NestJS** – Backend framework
- **TypeScript** – Typed JavaScript
- **TypeORM** – Database ORM
- **PostgreSQL** – Relational database
- **JWT** – Authentication system
- **class-validator & DTOs** – Request validation

---

## 📁 Structure (simplified)

```txt
src/
├── auth/            # Authentication & authorization
├── users/           # Users module
├── projects/        # Projects module
├── clients/         # Clients module
├── expenses/        # Expenses module
├── documents/       # Document module
├── expenses-types/  # Expenses-types module
├── milestones/      # Milestones module
├── tasks/           # Tasks module
└── main.ts
```

## 🚀 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file based on `.env.example`

### 3. Run the server:

```bash
npm run start:dev
```

---

## 🔐 Security

- JWT authentication with protected routes
- Role-based access control using NestJS guards
- DTO validation for all incoming requests
- Secure error handling to avoid information leakage
