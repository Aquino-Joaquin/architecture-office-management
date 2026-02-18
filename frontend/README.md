# 🎨 Frontend – React Application

This directory contains the **frontend of the Architecture Office Management System**, developed using **React, TypeScript, and Flowbite React**.

It provides a modern user interface for managing projects, clients, expenses, and documents, communicating with the NestJS backend via a REST API.

---

## ✨ Features

- 🔐 Authentication (login & protected routes)
- 👥 Role-based UI (Admin / Staff views)
- 📁 Project management interface
- 🧾 Client management interface
- 💰 Expense tracking dashboards
- 📎 Document upload and visualization
- 🌐 Internationalization support (i18n)
- 🎨 Responsive UI with Tailwind CSS + Flowbite components

---

## 🛠️ Technology Stack

- **React** – Frontend library
- **TypeScript** – Strong typing
- **Vite** – Fast build tool
- **React Router** – Client-side routing
- **Axios** – HTTP client
- **Tailwind CSS** – Utility-first styling
- **Flowbite React** – UI components
- **i18next** – Internationalization

---

## 📁 Structure (simplified)

```txt
src/
├── assets/        # Static assets (images, icons)
├── components/    # Reusable UI components
├── helper/        # Helper functions and utilities
├── i18n/          # Translations and language config
├── pages/         # Application pages
├── routes/        # Route definitions and guards
├── types/         # TypeScript types/interfaces
├── main.tsx       # Application entry point
└── style.css      # Global styles
```

## 🚀 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Use the existing environment files:

.env

.env.development

.env.production

Example:

VITE_API_URL=http://localhost:3000

### 3. Run the development server

```bash
npm run dev
```

The app will run on:

http://localhost:5173

## 🔐 Authentication Flow

- User logs in via login form

- Backend returns JWT token

- Token is stored (localStorage/sessionStorage)

- Protected routes validate authentication and role

- Axios automatically attaches token to requests

## 🌍 Internationalization

The project uses i18next for multi-language support.

Translation files are located in:

src/i18n/

## 🎨 UI System

The UI is built using:

Tailwind CSS for layout and styling

Flowbite React for prebuilt components (modals, tables, forms, etc.)

## 🧪 Development Notes

ESLint is configured for code quality

TypeScript ensures type safety across the app

Modular structure for scalability
