-- ============================================================
-- Kraf Hibiscus Business Management System
-- Module 3: Staff and Task Management
-- Schema Version: 1.0
-- Team Member: Wu Yuqi
-- File: sql/staff_task/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS kraf_hibiscus_staff_task;
USE kraf_hibiscus_staff_task;

-- ============================================================
-- 1. Admin Table
-- Purpose: Stores admin information for recording actions.
-- Note: In final group integration, this table can be shared.
-- ============================================================
CREATE TABLE IF NOT EXISTS admin (
    admin_id VARCHAR(10) PRIMARY KEY,
    admin_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. Staff Table
-- Purpose: Stores staff details and availability information.
-- ============================================================
CREATE TABLE IF NOT EXISTS staff (
    staff_id VARCHAR(10) PRIMARY KEY,
    admin_id VARCHAR(10) NOT NULL,
    staff_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contact_number VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    joining_date DATE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    availability_status ENUM('available', 'busy', 'unavailable') DEFAULT 'available',
    remarks TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ============================================================
-- 3. Staff Status Log Table
-- Purpose: Records staff status changes.
-- ============================================================
CREATE TABLE IF NOT EXISTS staff_status_log (
    status_log_id VARCHAR(10) PRIMARY KEY,
    staff_id VARCHAR(10) NOT NULL,
    admin_id VARCHAR(10) NOT NULL,
    previous_status ENUM('active', 'inactive') NOT NULL,
    new_status ENUM('active', 'inactive') NOT NULL,
    reason TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ============================================================
-- 4. Task Table
-- Purpose: Stores task information and assignment details.
-- ============================================================
CREATE TABLE IF NOT EXISTS task (
    task_id VARCHAR(10) PRIMARY KEY,
    admin_id VARCHAR(10) NOT NULL,
    staff_id VARCHAR(10),
    task_title VARCHAR(150) NOT NULL,
    task_description TEXT,
    task_category VARCHAR(50) NOT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    target_quantity INT DEFAULT 0,
    unit VARCHAR(20),
    due_date DATE NOT NULL,
    assigned_date DATE,
    status ENUM('pending', 'assigned', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    progress_percentage INT DEFAULT 0,
    progress_remarks TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    CHECK (target_quantity >= 0)
);

-- ============================================================
-- 5. Task Progress Log Table
-- Purpose: Stores progress update history for tasks.
-- ============================================================
CREATE TABLE IF NOT EXISTS task_progress_log (
    progress_log_id VARCHAR(10) PRIMARY KEY,
    task_id VARCHAR(10) NOT NULL,
    admin_id VARCHAR(10) NOT NULL,
    previous_status ENUM('pending', 'assigned', 'in_progress', 'completed', 'cancelled') NOT NULL,
    new_status ENUM('pending', 'assigned', 'in_progress', 'completed', 'cancelled') NOT NULL,
    progress_percentage INT DEFAULT 0,
    completed_quantity INT DEFAULT 0,
    progress_remarks TEXT,
    updated_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (task_id) REFERENCES task(task_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    CHECK (completed_quantity >= 0)
);

-- ============================================================
-- 6. Contribution Record Table
-- Purpose: Stores staff contribution records after task completion.
-- ============================================================
CREATE TABLE IF NOT EXISTS contribution_record (
    contribution_id VARCHAR(10) PRIMARY KEY,
    task_id VARCHAR(10) NOT NULL,
    staff_id VARCHAR(10) NOT NULL,
    contribution_type VARCHAR(50) NOT NULL,
    completion_date DATE NOT NULL,
    quality_outcome TEXT,
    contribution_details TEXT NOT NULL,
    admin_remarks TEXT,
    recorded_by VARCHAR(10) NOT NULL,
    recorded_date DATE NOT NULL,
    review_status ENUM('pending_review', 'reviewed', 'needs_follow_up') DEFAULT 'pending_review',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (task_id) REFERENCES task(task_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (recorded_by) REFERENCES admin(admin_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ============================================================
-- 7. Contribution Review Table
-- Purpose: Stores review decision and review notes for contributions.
-- ============================================================
CREATE TABLE IF NOT EXISTS contribution_review (
    review_id VARCHAR(10) PRIMARY KEY,
    contribution_id VARCHAR(10) NOT NULL,
    reviewed_by VARCHAR(10) NOT NULL,
    review_date DATE NOT NULL,
    review_decision ENUM('reviewed', 'needs_follow_up') NOT NULL,
    review_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (contribution_id) REFERENCES contribution_record(contribution_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (reviewed_by) REFERENCES admin(admin_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
