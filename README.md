# Kraf Hibiscus Business Management System

A web-based business management system for Kraf Hibiscus.  

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

## Database Schema
Module 1: Order & Customer Management
The database schema for each module is defined below.

| Module | Table | Fields |
|--------|-------|--------|
| **Module 1: Order & Customer** | `Customer` | customer_ID (PK), full_name, email, password_hash, phone_number, delivery_address, account_status (ENUM), created_at, updated_at |
| | `Admin` | admin_ID (PK), full_name, email, phone_number, password_hash, role (ENUM: Admin, SuperAdmin), created_at |
| | `Login_LOG` | log_ID (PK), user_ID, user_type (ENUM: Customer, Admin), login_at, ip_address, status (ENUM: Success, Fail) |
| | `Account_Audit_LOG` | audit_ID (PK), admin_ID (FK), customer_ID (FK), action_type (ENUM: StatusUpdate, ProfileUpdate, Terminate), action_at, notes |
| | `Product` | product_ID (PK), product_name, description, unit_price, stock_quantity, status (ENUM: Available, Outofstock, Discontinued) |
| | `Cart` | cart_ID (PK), customer_ID (FK), created_at, updated_at |
| | `Cart_Item` | cart_item_ID (PK), cart_ID (FK), product_ID (FK), quantity, subtotal |
| | `Order_record` | order_ID (PK), customer_ID (FK), order_date, total_amount, order_status (ENUM: Pending Payment, Awaiting Shipping, Shipped, Delivered, Completed, Cancelled), cancellation_reason, cancelled_at |
| | `Order_Item` | order_item_ID (PK), order_ID (FK), product_ID (FK), quantity, unit_price, subtotal |
| | `Payment_record` | payment_ID (PK), order_ID (FK), customer_ID (FK), payment_method (ENUM: Online Banking, Credit Card, Debit Card, E-Wallet), payment_status (ENUM: Processing, Verified, Failed, Flagged), payment_date, transaction_reference |
| | `Payment_verification` | verification_ID (PK), payment_ID (FK), admin_ID (FK), verification_status (ENUM: Verified, Flagged), flag_reason, verified_at |
| | `Payment_receipt` | receipt_ID (PK), payment_ID (FK), order_ID (FK), issued_at, total_amount, receipt_data |
| | `Shipment` | shipment_ID (PK), order_ID (FK), tracking_number, carrier, current_status (ENUM: Processing, Shipped, Delivered), delivery_address, estimated_delivery, actual_delivery |
| | `Delivery_status_LOG` | status_log_ID (PK), shipment_ID (FK), admin_ID (FK), status_value (ENUM: Processing, Shipped, Delivered), notes, updated_at |
| | `Order_confirmation` | confirmation_ID (PK), order_ID (FK), customer_ID (FK), confirmed_at, confirmation_note |
| **Module 2: Inventory** | ` adminProfile ` |  accountEmail (PK), password |
| | ` Product ` |  productID (PK), productName, category, stock, price, status (ENUM: in stock, low stock, out of stock)   |
| | ` productDetails ` |   productID, productName, category, stock, price, statusStock (ENUM), stockListing (ENUM), productDesc, createdDate, lastUpdated  |
| |  ` newProduct  ` ` editProduct  ` ` deleteProduct `  | productID, productName, category, stock, price, status (ENUM), productDesc  |
| | ` Materials ` |  materialID (PK), materialName, category, quantity, source, status (ENUM) |
| | ` newMaterials  ` | materialName, unit, category, quantity, source, supplier, remarks |
| | ` materialsDetail ` | materialsID, materialName, unit, category, quantity, lastUpdated, supplier, remarks, source, storageLocation  |
| | ` stockIn ` | materialsID, materialName, quantityAdded, stockDateAdded, source, remarks  |
| | ` stockOut ` | materialsID, materialName, quantityDeducted, stockDateDeducted, usedFor, remarks  |
| | ` inventoryHistory ` | TXNID (PK), materialsID, materialName, date, category, quantityChange, type (ENUM), unit, sourceOrUsedFor, recordedBy, remarks  |
| | ` summaryReport ` | reportType (ENUM), startDate, endDate  |
| | ` 	supplier ` | supplierID (PK), supplierName (PK), contactNumber, email, suppliedMaterials, status (ENUM)  |
| | ` supplierDetails ` | supplierID, supplierName, contactNumber, email, suppliedMaterials, status (ENUM), address, remarks, createdDate |
| | ` editSupplier ` | supplierID, supplierName, contactNumber, email, suppliedMaterials, status (ENUM), address, remarks   |
| | ` newSupplier ` | supplierName, contactNumber, email, suppliedMaterials, status (ENUM), address  |
| **Module 3: Staff & Task** | `admin` | admin_id (PK), admin_name, email, role, password_hash, status, created_at |
|  | `staff` | staff_id (PK), admin_id (FK), staff_name, email, contact_number, role, joining_date, status, availability_status, remarks, created_at, updated_at |
|  | `staff_status_log` | status_log_id (PK), staff_id (FK), admin_id (FK), previous_status, new_status, reason, updated_at |
|  | `task` | task_id (PK), admin_id (FK), staff_id (FK), task_title, task_description, task_category, priority, target_quantity, unit, due_date, assigned_date, status, progress_percentage, progress_remarks, created_at, updated_at |
|  | `task_progress_log` | progress_log_id (PK), task_id (FK), admin_id (FK), previous_status, new_status, progress_percentage, completed_quantity, progress_remarks, updated_date, created_at |
|  | `contribution_record` | contribution_id (PK), task_id (FK), staff_id (FK), contribution_type, completion_date, quality_outcome, contribution_details, admin_remarks, recorded_by (FK), recorded_date, review_status, created_at |
|  | `contribution_review` | review_id (PK), contribution_id (FK), reviewed_by (FK), review_date, review_decision, review_notes, created_at |
| **Module 4: Financial & Report** | `Admin` |  admin_id (PK), full_name, email, password_hash, role, phone, status, created_at |
| | `financial_records` | record_id (PK), type, amount, category, description, reference_id, reference_type, recorded_by (FK → admins), recorded_date, receipt_image, notes, created_at, created_at |
| | `order_payments` | payment_id (PK), order_id (FK) , status, payment_date, payment_amount, payment_method, created_at |
| | `community_activities` | activity_id (PK), name, date, collected_quantity, collected_weight_kg, contributor_count, outcome_description, carbon_saved_kg, recorded_by (FK), created_at, updated_at  |
| | `reports` | report_id (PK), customer_id, total_amount, order_status, order_date |
