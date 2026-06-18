# Kraf Hibiscus Business Management System

## Project Overview

Kraf Hibiscus Business Management System is a web-based system designed for Kraf Hibiscus to manage daily business operations more efficiently. The system supports both customer-side functions and admin-side management functions, including product browsing, order placement, payment verification, inventory management, staff management, task management, staff contribution records, financial records, community activities, and report generation.

This project is developed as part of Application Development Project I. The current version focuses on system design, user interface prototype, data design, and preparation for future implementation.

## Project Name

Kraf Hibiscus Business Management System

## Website / Prototype Name

Kraf Hibiscus

## Main Users

1. Customer
2. Admin

## Customer Features

* Register and login
* View homepage
* Browse product catalog
* View product details
* Add products to cart
* Checkout order
* Upload payment confirmation
* View order history
* View order details and receipt
* Cancel order with reason
* Manage customer profile
* Contact Kraf Hibiscus

## Admin Features

* Admin dashboard
* Order management
* Customer management
* Payment verification
* Product inventory management
* Material inventory management
* Supplier management
* Staff management
* Task management
* Staff contribution management
* Financial records management
* Community activities management
* Report generation
* Admin profile and settings
* Notification panel

## My Module: 5.0 Staff and Task Management

This section focuses on the admin-side staff and task management functions. It includes three main modules:

### 5.1 Staff Management Module

The Staff Management Module allows the admin to add, view, update, and deactivate staff records. It keeps important staff information such as staff name, contact number, email address, role, joining date, status, availability status, and remarks. Inactive staff cannot be assigned new tasks, but their previous task and contribution records remain in the system.

Related use cases:

* UC026 Add Staff Record
* UC027 View Staff List
* UC028 Update Staff Information
* UC029 Deactivate Staff Record

### 5.2 Task Management Module

The Task Management Module allows the admin to create tasks, assign tasks to active staff, update task progress, and confirm task completion. It stores task details such as task title, task description, task category, priority, target quantity, due date, assigned staff, task status, progress percentage, and progress remarks. When a task is completed, the system can generate a staff contribution record.

Related use cases:

* UC030 Create Task
* UC031 Assign Task
* UC032 View Task List
* UC033 Update Task Progress
* UC034 Confirm Task Completion

### 5.3 Staff Contribution Management Module

The Staff Contribution Management Module records and reviews staff contributions after task completion. It stores contribution details such as completed task, staff name, contribution type, completion date, quality outcome, contribution details, admin remarks, review status, review notes, and reviewer information. This helps the admin track staff performance and contribution history.

Related use cases:

* UC035 Record Staff Contribution
* UC036 Review Contribution Records

## Figma Prototype Link

Add Figma prototype link here:

[Paste Figma Link Here]

## Video Demonstration Link

Add video demonstration link here:

[Paste Video Link Here]

## GitHub Repository Link

Add GitHub repository link here:

[Paste GitHub Link Here]

## Current Project Status

The current project status is prototype and design preparation. The system interface has been designed using Figma. The next stage is to convert the design into a working web application by developing the frontend, backend, database, and deployment setup.

## Suggested Future Development Tools

The following tools may be used for future implementation:

* Frontend: HTML, CSS, JavaScript, React, or Next.js
* Backend: Node.js, Express.js, PHP Laravel, or similar backend framework
* Database: MySQL or PostgreSQL
* Version Control: GitHub
* Design Tool: Figma
* Deployment: Hostinger, VPS, or cloud hosting
* Testing Tool: Postman

## Repository Structure

The repository structure will be updated during the development stage.

```text
Kraf-Hibiscus-Business-Management-System/
│
├── README.md
├── frontend/
│   ├── customer/
│   └── admin/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── database/
│   └── schema.sql
│
└── documentation/
    ├── progress-report-2.pdf
    ├── progress-report-3.pdf
    └── user-manual.pdf
```

## Team Members

Add team member names here:

* Wu Yuqi
* Bao Yilin
* Nada Mohammad Ibrahim Ali
* Nawseedah

## Notes

This repository is prepared for Progress Report 3 submission. It will be used to store project documentation, README file, source code, and future development progress.
