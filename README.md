# Kraf Hibiscus Business Management System

A web-based business management system for Kraf Hibiscus.  
This repository is prepared for Progress Report 3 submission.

## Project Links

| Item | Link |
|---|---|
| Figma Prototype | [Figma Prototype](https://wool-caper-77320215.figma.site/) |
| Video Demonstration | [Video Demonstration](PASTE_VIDEO_LINK_HERE) |
| Trello Board | [Trello Board](https://trello.com/b/IyTL2LHu/blazemanagement-system-of-kraf-hibiscus) |

---

## Team Members and Module Index

| Sprint | Team Member | Subsystem / Module | Frontend | Backend | Database |
|---|---|---|---|---|---|
| 1 | Nada Mohammad Ibrahim Ali | Customer Interface and Order Management | [Customer Pages](src/app/pages) | Not included in Progress 3 | Not included in Progress 3 |
| 1 | Nawseedah | Inventory Management | [Inventory Admin Pages](src/app/pages/admin) | Not included in Progress 3 | Not included in Progress 3 |
| 1 | Wu Yuqi | Staff and Task Management | [Staff and Task Pages](src/app/pages/admin) | Not included in Progress 3 | Not included in Progress 3 |
| 1 | Bao Yilin | Financial Tracking and Reporting | [Financial and Report Pages](src/app/pages/admin) | Not included in Progress 3 | Not included in Progress 3 |

---

## Module Details

| Team Member | Module | Frontend Script |
|---|---|---|
| 1. Nada Mohammad Ibrahim Ali | Customer Interface and Order Management | Screens:<br>• [HomePage.tsx](src/app/pages/HomePage.tsx)<br>• [ProductsPage.tsx](src/app/pages/ProductsPage.tsx)<br>• [ProductDetailPage.tsx](src/app/pages/ProductDetailPage.tsx)<br>• [CartPage.tsx](src/app/pages/CartPage.tsx)<br>• [CheckoutPage.tsx](src/app/pages/CheckoutPage.tsx)<br>• [PaymentPage.tsx](src/app/pages/PaymentPage.tsx)<br>• [MyOrdersPage.tsx](src/app/pages/MyOrdersPage.tsx)<br>• [MyProfilePage.tsx](src/app/pages/MyProfilePage.tsx)<br>• [ContactPage.tsx](src/app/pages/ContactPage.tsx)<br>• [LoginPage.tsx](src/app/pages/LoginPage.tsx)<br>• [RegisterPage.tsx](src/app/pages/RegisterPage.tsx)<br>• [AdminLoginPage.tsx](src/app/pages/admin/AdminLoginPage.tsx) |
| 2. Nawseedah | Inventory Management | Screens:<br>• [InventoryPage.tsx](src/app/pages/admin/InventoryPage.tsx)<br>• [MaterialInventoryPage.tsx](src/app/pages/admin/MaterialInventoryPage.tsx)<br>• [AddInventoryPage.tsx](src/app/pages/admin/AddInventoryPage.tsx)<br>• [SupplierListPage.tsx](src/app/pages/admin/SupplierListPage.tsx)<br>• [AddSupplierPage.tsx](src/app/pages/admin/AddSupplierPage.tsx)<br>• [AdminDashboardPage.tsx](src/app/pages/admin/AdminDashboardPage.tsx) |
| 3. Wu Yuqi | Staff and Task Management | Screens:<br>• [StaffListPage.tsx](src/app/pages/admin/StaffListPage.tsx)<br>• [AddStaffPage.tsx](src/app/pages/admin/AddStaffPage.tsx)<br>• [EditStaffPage.tsx](src/app/pages/admin/EditStaffPage.tsx)<br>• [StaffDetailsPage.tsx](src/app/pages/admin/StaffDetailsPage.tsx)<br>• [TaskListPage.tsx](src/app/pages/admin/TaskListPage.tsx)<br>• [CreateTaskPage.tsx](src/app/pages/admin/CreateTaskPage.tsx)<br>• [AssignTaskPage.tsx](src/app/pages/admin/AssignTaskPage.tsx)<br>• [TaskDetailsPage.tsx](src/app/pages/admin/TaskDetailsPage.tsx)<br>• [UpdateTaskProgressPage.tsx](src/app/pages/admin/UpdateTaskProgressPage.tsx)<br>• [ContributionListPage.tsx](src/app/pages/admin/ContributionListPage.tsx)<br>• [RecordContributionPage.tsx](src/app/pages/admin/RecordContributionPage.tsx)<br>• [ContributionDetailsPage.tsx](src/app/pages/admin/ContributionDetailsPage.tsx) |
| 4. Bao Yilin | Financial Tracking and Reporting | Screens:<br>• [FinancialRecordsPage.tsx](src/app/pages/admin/FinancialRecordsPage.tsx)<br>• [RecordIncomePage.tsx](src/app/pages/admin/RecordIncomePage.tsx)<br>• [RecordExpensePage.tsx](src/app/pages/admin/RecordExpensePage.tsx)<br>• [ReportsPage.tsx](src/app/pages/admin/ReportsPage.tsx)<br>• [PaymentListPage.tsx](src/app/pages/admin/PaymentListPage.tsx) |

---

## Current Status

The current version focuses on the frontend high-fidelity prototype, GitHub documentation, and project management preparation for Progress Report 3. Backend and database implementation are not included in this progress stage.

## Database Schema
Module 1: Order & Customer Management
The database schema for each module is defined below.

| Module | Table | Fields |
|--------|-------|--------|
| **Module 1: Order & Customer** | `customers` | customer_id (PK), name, email, phone, address, registration_date, status, created_at |
| | `orders` | order_id (PK), customer_id (FK), order_date, total_amount, status, payment_status, notes |
| **Module 2: Inventory** | `products` | product_id (PK), name, description, category, price, stock_quantity, unit, reorder_level, created_at |
| | `materials` | material_id (PK), name, category, supplier, stock_quantity, unit, reorder_level, created_at |
| | `suppliers` | supplier_id (PK), name, contact_person, phone, email, address, created_at |
| **Module 3: Staff & Task** | `staff` | staff_id (PK), name, email, phone, position, department, hire_date, status, created_at |
| | `tasks` | task_id (PK), title, description, assigned_to (FK), assigned_by (FK), priority, status, due_date, created_at |
| | `contributions` | contribution_id (PK), staff_id (FK), task_id (FK), contribution_date, hours, description |
| **Module 4: Financial & Report** | `admins` | admin_id (PK), full_name, email, password_hash, role, phone, status, created_at |
| | `financial_records` | record_id (PK), type, amount, category, description, reference_id, reference_type, recorded_by (FK), recorded_date, receipt_image, notes, created_at |
| | `order_payments` | payment_id (PK), order_id (FK), financial_record_id (FK), status, payment_date, payment_amount, payment_method, transaction_id, notes |
| | `community_activities` | activity_id (PK), name, date, collected_quantity, collected_weight_kg, contributor_count, outcome_description, carbon_saved_kg, recorded_by (FK), created_at |
| | `reports` | report_id (PK), type, name, start_date, end_date, generated_by (FK), generated_at, file_path, data_snapshot |
