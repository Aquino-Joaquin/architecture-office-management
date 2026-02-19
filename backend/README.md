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

## 🔌 API Overview

### 🔐 Auth

- POST /auth/login → login user and receive JWT token
- POST /auth/register → register new user (admin only)

---

### 👤 Clients (Admin only)

- GET /clients → list all clients
- GET /clients/:id → get client by id
- POST /clients → create new client
- PATCH /clients/:id → update client
- DELETE /clients/:id → delete client

---

### 📄 Documents (JWT required)

- GET /documents/projects/:id → list documents of a project (project members)
- GET /documents/:id → get document by id (project members)
- POST /documents → upload document (admin or project members)
- DELETE /documents/:id → delete document (admin or project members)

---

### 💰 Expense Types (Admin only)

- GET /expense-types → list expense types
- GET /expense-types/:id → get expense type by id
- POST /expense-types → create expense type
- PATCH /expense-types/:id → update expense type
- DELETE /expense-types/:id → delete expense type

---

### 💰 Expenses

- GET /expenses → list all expenses (admin or staff)
- GET /expenses/projects/:id → list expenses of a project (admin or staff)
- GET /expenses/:id → get expense by id (admin only)
- POST /expenses → create expense (admin only)
- PATCH /expenses/:id → update expense (admin only)
- DELETE /expenses/:id → delete expense (admin only)

---

### 📊 Milestones

- GET /milestones/projects/:id → list milestones of a project (authenticated)
- GET /milestones/:id → get milestone by id (authenticated)
- POST /milestones → create milestone (admin only)
- PATCH /milestones/:id → update milestone (admin only)
- DELETE /milestones/:id → delete milestone (admin only)

---

### 📁 Projects

- GET /projects → list projects of the user (admin or staff)
- GET /projects/:id → get project by id (admin or staff)
- POST /projects → create project (admin only)
- PATCH /projects/:id → update project (admin or staff)
- DELETE /projects/:id → delete project (admin only)

---

### ✅ Tasks

- GET /tasks/milestones/:id → list tasks of a milestone (authenticated)
- GET /tasks/users → list tasks assigned to current user (authenticated)
- POST /tasks → create task (admin only)
- PATCH /tasks/:id → update task (authenticated, owner or permitted user)
- DELETE /tasks/:id → delete task (admin only)

---

### 👥 Users (Admin only)

- GET /users → list all users
- GET /users/projects/:id → list users assigned to a project
- GET /users/:id → get user by id
- PATCH /users/:id → update user
- DELETE /users/:id → delete user
