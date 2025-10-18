# ☁️ Kumo — Project Management Backend API

**Version:** 1.0.0  
**Type:** RESTful API for Collaborative Project Management  
**Tech Focus:** Secure, Scalable, Role-Based Backend

---

## 🚀 Overview

**Kumo** is a backend API for team-based project management. It provides endpoints for handling users, projects, tasks, subtasks, and notes — all secured with JWT authentication and role-based access control.

Built to support modern, scalable collaboration systems.

---

## 👥 User Roles

| Role | Description |
|------|--------------|
| **Admin** | Full access — manage projects, members, tasks, and notes |
| **Project Admin** | Manage tasks and subtasks within assigned projects |
| **Member** | View and update tasks or subtasks assigned to them |

---

## 🔑 Core Features

- **Authentication:** JWT-based login, registration, email verification, password reset  
- **Projects:** Create, view, update, and delete projects  
- **Members:** Invite users, assign roles, manage team access  
- **Tasks:** Create and manage tasks with statuses and attachments  
- **Subtasks:** Add, update, and track task subtasks  
- **Notes:** Project-level notes (Admin only)  
- **Health Check:** `/api/v1/healthcheck/` endpoint for monitoring  

---

## 🧩 API Routes

### Auth — `/api/v1/auth/`
- Register, Login, Verify Email, Refresh Tokens, Password Management

### Projects — `/api/v1/projects/`
- CRUD for projects, member management

### Tasks — `/api/v1/tasks/`
- CRUD for tasks and subtasks

### Notes — `/api/v1/notes/`
- CRUD for project notes

### Health — `/api/v1/healthcheck/`
- API health status

---

## 🛡️ Security

- JWT Authentication + Refresh Tokens  
- Role-Based Authorization Middleware  
- Email Verification & Secure Password Reset  
- Multer for Safe File Uploads  
- CORS & Input Validation Enabled  

---

## 📂 File Management

- Multiple file attachments for tasks  
- Secure upload to `/public/images`  
- Metadata tracking (URL, type, size)  

---

## ✅ Success Criteria

- Complete Role-Based Access Control  
- Secure User Authentication  
- Full Project & Task Lifecycle Support  
- Scalable and Documented REST API  

---

### 🧠 Inspiration

> **Kumo (雲)** — *“The cloud that connects and moves together”*, symbolizing teamwork and collaboration.

---
