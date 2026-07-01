-- ============================================================
-- Kraf Hibiscus Business Management System
-- Module 3: Staff and Task Management
-- Sample Data
-- Team Member: Wu Yuqi
-- File: sql/staff_task/sample_data.sql
-- ============================================================

USE kraf_hibiscus_staff_task;

-- ============================================================
-- 1. Admin Sample Data
-- ============================================================
INSERT INTO admin
(admin_id, admin_name, email, role, password_hash, status)
VALUES
('ADM-001', 'Admin User', 'admin@krafhibiscus.com', 'Administrator', 'hashed_password_demo', 'active');

-- ============================================================
-- 2. Staff Sample Data
-- ============================================================
INSERT INTO staff
(staff_id, admin_id, staff_name, email, contact_number, role, joining_date, status, availability_status, remarks)
VALUES
('STF-001', 'ADM-001', 'Siti Aminah', 'siti.aminah@krafhibiscus.com', '+60 12-345 6789', 'Production Lead', '2025-01-15', 'active', 'busy', 'Experienced in handmade crafts'),
('STF-002', 'ADM-001', 'Ahmad Faiz', 'ahmad.faiz@krafhibiscus.com', '+60 12-222 3344', 'Quality Control', '2025-02-01', 'active', 'available', 'Handles quality checking'),
('STF-003', 'ADM-001', 'Lim Mei Ling', 'lim.meiling@krafhibiscus.com', '+60 12-333 4455', 'Designer', '2025-02-20', 'active', 'available', 'Creative design specialist'),
('STF-004', 'ADM-001', 'Kumar Rajesh', 'kumar.rajesh@krafhibiscus.com', '+60 12-444 5566', 'Packaging Staff', '2025-03-10', 'active', 'busy', 'Responsible for packaging'),
('STF-005', 'ADM-001', 'Nurul Huda', 'nurul.huda@krafhibiscus.com', '+60 12-555 6677', 'Production Staff', '2025-03-25', 'inactive', 'unavailable', 'Inactive staff record'),
('STF-006', 'ADM-001', 'Chen Wei', 'chen.wei@krafhibiscus.com', '+60 12-666 7788', 'Inventory Manager', '2025-04-05', 'active', 'available', 'Handles inventory updates');

-- ============================================================
-- 3. Staff Status Log Sample Data
-- ============================================================
INSERT INTO staff_status_log
(status_log_id, staff_id, admin_id, previous_status, new_status, reason)
VALUES
('SSL-001', 'STF-005', 'ADM-001', 'active', 'inactive', 'Staff is no longer available for new task assignment');

-- ============================================================
-- 4. Task Sample Data
-- ============================================================
INSERT INTO task
(task_id, admin_id, staff_id, task_title, task_description, task_category, priority, target_quantity, unit, due_date, assigned_date, status, progress_percentage, progress_remarks)
VALUES
('TSK-001', 'ADM-001', 'STF-001', 'Prepare 50 scrunchies for bulk order', 'Create 50 floral scrunchies using recycled fabric from Community Batch #12', 'Product Making', 'high', 50, 'pcs', '2026-06-10', '2026-05-16', 'in_progress', 50, 'Completed 30 out of 50 scrunchies'),
('TSK-002', 'ADM-001', 'STF-002', 'Quality check new bag collection', 'Inspect new handmade bag collection before release', 'Quality Check', 'medium', 20, 'pcs', '2026-06-05', '2026-05-17', 'assigned', 0, NULL),
('TSK-003', 'ADM-001', 'STF-003', 'Design new summer collection patterns', 'Create new design patterns for summer collection', 'Design Work', 'medium', 5, 'sets', '2026-05-28', '2026-05-10', 'completed', 100, 'All 5 designs completed and approved'),
('TSK-004', 'ADM-001', NULL, 'Sort recycled fabric donations', 'Sort collected recycled fabric by type and condition', 'Sorting', 'low', 30, 'kg', '2026-06-08', NULL, 'pending', 0, NULL),
('TSK-005', 'ADM-001', 'STF-004', 'Pack completed orders for shipping', 'Prepare completed customer orders for delivery', 'Packaging', 'high', 10, 'orders', '2026-06-04', '2026-05-18', 'in_progress', 50, 'Packed 7 out of 10 orders'),
('TSK-006', 'ADM-001', 'STF-006', 'Update inventory records', 'Update product and material inventory records', 'Inventory Update', 'medium', 1, 'record set', '2026-05-24', '2026-05-12', 'completed', 100, 'All inventory records updated'),
('TSK-007', 'ADM-001', 'STF-001', 'Train new production staff', 'Train new staff on product making process', 'Training', 'medium', 1, 'session', '2026-05-18', '2026-05-11', 'completed', 100, 'Training completed successfully');

-- ============================================================
-- 5. Task Progress Log Sample Data
-- ============================================================
INSERT INTO task_progress_log
(progress_log_id, task_id, admin_id, previous_status, new_status, progress_percentage, completed_quantity, progress_remarks, updated_date)
VALUES
('TPL-001', 'TSK-001', 'ADM-001', 'assigned', 'in_progress', 50, 30, 'Completed 30 out of 50 scrunchies', '2026-05-21'),
('TPL-002', 'TSK-005', 'ADM-001', 'assigned', 'in_progress', 50, 7, 'Packed 7 out of 10 orders', '2026-05-22'),
('TPL-003', 'TSK-003', 'ADM-001', 'in_progress', 'completed', 100, 5, 'All 5 designs completed and approved', '2026-05-20'),
('TPL-004', 'TSK-006', 'ADM-001', 'in_progress', 'completed', 100, 1, 'All inventory records updated', '2026-05-21'),
('TPL-005', 'TSK-007', 'ADM-001', 'in_progress', 'completed', 100, 1, 'Training completed successfully', '2026-05-18');

-- ============================================================
-- 6. Contribution Record Sample Data
-- ============================================================
INSERT INTO contribution_record
(contribution_id, task_id, staff_id, contribution_type, completion_date, quality_outcome, contribution_details, admin_remarks, recorded_by, recorded_date, review_status)
VALUES
('CNT-001', 'TSK-003', 'STF-003', 'Design Work', '2026-05-20', 'All 5 designs completed and approved for production use.', 'Created 5 unique summer pattern designs including hibiscus, tropical leaves, and ocean wave themes. All designs approved for production.', 'Excellent creativity and timely delivery.', 'ADM-001', '2026-05-20', 'reviewed'),
('CNT-002', 'TSK-006', 'STF-006', 'Inventory Update', '2026-05-21', 'Inventory records updated successfully.', 'Updated product and material inventory records for the current month.', 'Accurate and completed on time.', 'ADM-001', '2026-05-21', 'reviewed'),
('CNT-003', 'TSK-007', 'STF-001', 'Training', '2026-05-18', 'Training session completed successfully.', 'Conducted basic production training for new production staff.', 'Pending review by admin.', 'ADM-001', '2026-05-18', 'pending_review');

-- ============================================================
-- 7. Contribution Review Sample Data
-- ============================================================
INSERT INTO contribution_review
(review_id, contribution_id, reviewed_by, review_date, review_decision, review_notes)
VALUES
('CRV-001', 'CNT-001', 'ADM-001', '2026-05-20', 'reviewed', 'Excellent creativity and timely delivery.'),
('CRV-002', 'CNT-002', 'ADM-001', '2026-05-21', 'reviewed', 'Inventory update was completed accurately.');
