# ERP Fourrière
### Municipal Vehicle Impound Management System

**ERP Fourrière** is a web-based management system designed to digitize and simplify the daily operations of municipal vehicle impound facilities (*Fourrière Municipale*).

The application aims to centralize vehicle registration, impound records, document management, fee calculation, payment tracking, and vehicle release operations in one organized platform.

## 1. Project Objectives

- Replace manual paperwork with digital records.
- Improve the tracking of impounded vehicles.
- Organize administrative and financial operations.
- Facilitate communication between authorized staff.
- Maintain searchable records and historical data.
- Improve data accuracy, security, and operational efficiency.

## 2. Main Features

### Vehicle Management
- Register impounded vehicles.
- Record vehicle registration details.
- Store vehicle information and impound details.
- Track vehicle status throughout the process.

### Document Management
- Upload and manage vehicle-related documents.
- Organize supporting administrative files.
- Allow authorized staff to review documents.

### Fee Management
- Configure towing and daily storage fees.
- Calculate applicable charges.
- Manage fee rules according to vehicle categories.

### Payment and Release Management
- Track payment status.
- Validate payments.
- Manage vehicle release procedures.
- Preserve completed operations in the history.

### Search and History
- Search vehicle records.
- Access archived information.
- Review previous operations and transactions.

### User and Role Management
The system is designed to support role-based access for:
- **Technician (Administrator)**
- **Impound Manager**
- **Impound Agent**
- **Cashier**

Access to administrative functions should be restricted according to user permissions.

## 3. Technology

The project is designed around the following technologies:

- **HTML5** – Application structure.
- **CSS3** – Interface styling.
- **JavaScript** – Application functionality.
- **Node.js** – Backend runtime.
- **PostgreSQL** – Relational database for centralized data storage.

## 4. Project Structure

```text
ERP-Fourriere/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

*The actual repository structure may differ depending on the current project version.*

## 5. Installation and Setup

### Requirements
- Node.js LTS
- PostgreSQL
- npm
- A modern web browser

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file using `.env.example` as a reference.

Configure the database connection and application secrets before starting the server.

### Start the application

```bash
npm start
```

Open the application using the local address configured by the server.

## 6. Database and Security

The official deployment is intended to use a centralized PostgreSQL database.

Security requirements include:

- Password hashing.
- Secure authentication and session management.
- Role-based authorization.
- Protected document storage.
- Input validation.
- Restricted access to sensitive records.
- Regular database backups.
- Secure environment variable management.

**Important:** Do not commit passwords, API keys, database credentials, private documents, or `.env` files to GitHub.

## 7. Deployment

The application can be prepared for deployment on a Node.js-compatible hosting platform such as Render.

A production deployment requires:
- A running Node.js backend.
- A configured PostgreSQL database.
- Correct environment variables.
- HTTPS.
- Tested authentication and authorization.
- A backup strategy.

## 8. Data Policy

The production database should start without demonstration records.

All vehicle, citizen, payment, and administrative records should be entered through authorized application workflows.

## 9. Project Status

**Development and deployment preparation.**

Features, integrations, security controls, and production readiness must be verified against the deployed version before official operational use.

## 10. License

All rights reserved unless a license is explicitly added to this repository.

---

**ERP Fourrière — Digitalizing Municipal Impound Management.**
