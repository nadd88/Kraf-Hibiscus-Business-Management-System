-- ============================================================
-- Kraf Hibiscus Business Management System
-- Module 4: Financial Tracking and Reporting
-- Schema Version: 1.0
-- Team Member: Bao YiLin
-- File: sql/financial/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS kraf_hibiscus;
USE kraf_hibiscus;

-- ============================================================
-- 1. Admin Table
-- ============================================================
CREATE TABLE IF NOT EXISTS Admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin') DEFAULT 'admin',
    phone VARCHAR(20),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. Financial Record Table
-- ============================================================
CREATE TABLE IF NOT EXISTS financial_records (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    category VARCHAR(50) NOT NULL,
    description TEXT,
    reference_id INT,
    reference_type ENUM('order', 'staff', 'other') DEFAULT 'other',
    recorded_by INT NOT NULL,
    recorded_date DATE NOT NULL,
    receipt_image VARCHAR(255),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recorded_by) REFERENCES Admin(admin_id) ON DELETE CASCADE
);

-- ============================================================
-- 3. Order Payment Table
-- ============================================================
CREATE TABLE IF NOT EXISTS order_payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    status ENUM('paid', 'unpaid', 'partial') NOT NULL DEFAULT 'unpaid',
    payment_date DATE,
    payment_amount DECIMAL(10,2) NOT NULL CHECK (payment_amount >= 0),
    payment_method VARCHAR(30),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 4. Community Activity Table
-- ============================================================
CREATE TABLE IF NOT EXISTS community_activities (
    activity_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    collected_quantity INT DEFAULT 0,
    collected_weight_kg DECIMAL(8,2) DEFAULT 0.00,
    contributor_count INT DEFAULT 0,
    outcome_description TEXT,
    carbon_saved_kg DECIMAL(8,2) DEFAULT 0.00,
    recorded_by INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recorded_by) REFERENCES Admin(admin_id) ON DELETE CASCADE
);

-- ============================================================
-- 5. Report Table
-- ============================================================
CREATE TABLE IF NOT EXISTS reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('monthly', 'financial', 'order', 'inventory', 'community', 'staff') NOT NULL,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    generated_by INT NOT NULL,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    file_path VARCHAR(255),
    data_snapshot JSON,
    FOREIGN KEY (generated_by) REFERENCES Admin(admin_id) ON DELETE CASCADE
);
