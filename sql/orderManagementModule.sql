CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- =====================================================
-- CUSTOMER TABLE
-- =====================================================
CREATE TABLE Customer (
    customer_ID INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    delivery_address TEXT,
    account_status ENUM('Active','Suspended','Terminated') DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- ADMIN TABLE
-- =====================================================
CREATE TABLE Admin (
    admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin','SuperAdmin') DEFAULT 'Admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- LOGIN LOG TABLE
-- =====================================================
CREATE TABLE Login_LOG (
    log_ID INT AUTO_INCREMENT PRIMARY KEY,
    user_ID INT NOT NULL,
    user_type ENUM('Customer','Admin') NOT NULL,
    login_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    status ENUM('Success','Fail') NOT NULL
);

-- =====================================================
-- ACCOUNT AUDIT LOG
-- =====================================================
CREATE TABLE Account_Audit_LOG (
    audit_ID INT AUTO_INCREMENT PRIMARY KEY,
    admin_ID INT NOT NULL,
    customer_ID INT NOT NULL,
    action_type ENUM('StatusUpdate','ProfileUpdate','Terminate') NOT NULL,
    action_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,

    FOREIGN KEY (admin_ID)
        REFERENCES Admin(admin_ID),

    FOREIGN KEY (customer_ID)
        REFERENCES Customer(customer_ID)
);

-- =====================================================
-- PRODUCT TABLE
-- =====================================================
CREATE TABLE Product (
    product_ID INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    description TEXT,
    unit_price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    status ENUM('Available','Outofstock','Discontinued')
        DEFAULT 'Available'
);

-- =====================================================
-- CART TABLE
-- =====================================================
CREATE TABLE Cart (
    cart_ID INT AUTO_INCREMENT PRIMARY KEY,
    customer_ID INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_ID)
        REFERENCES Customer(customer_ID)
);

-- =====================================================
-- CART ITEM TABLE
-- =====================================================
CREATE TABLE Cart_Item (
    cart_item_ID INT AUTO_INCREMENT PRIMARY KEY,
    cart_ID INT NOT NULL,
    product_ID INT NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (cart_ID)
        REFERENCES Cart(cart_ID)
        ON DELETE CASCADE,

    FOREIGN KEY (product_ID)
        REFERENCES Product(product_ID)
);

-- =====================================================
-- ORDER RECORD TABLE
-- =====================================================
CREATE TABLE Order_record (
    order_ID INT AUTO_INCREMENT PRIMARY KEY,
    customer_ID INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,

    order_status ENUM(
        'Pending Payment',
        'Awaiting Shipping',
        'Shipped',
        'Delivered',
        'Completed',
        'Cancelled'
    ) DEFAULT 'Pending Payment',

    cancellation_reason TEXT,
    cancelled_at DATETIME,

    FOREIGN KEY (customer_ID)
        REFERENCES Customer(customer_ID)
);

-- =====================================================
-- ORDER ITEM TABLE
-- =====================================================
CREATE TABLE Order_Item (
    order_item_ID INT AUTO_INCREMENT PRIMARY KEY,
    order_ID INT NOT NULL,
    product_ID INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_ID)
        REFERENCES Order_record(order_ID)
        ON DELETE CASCADE,

    FOREIGN KEY (product_ID)
        REFERENCES Product(product_ID)
);

-- =====================================================
-- PAYMENT RECORD TABLE
-- =====================================================
CREATE TABLE Payment_record (
    payment_ID INT AUTO_INCREMENT PRIMARY KEY,
    order_ID INT NOT NULL,
    customer_ID INT NOT NULL,

    payment_method ENUM(
        'Online Banking',
        'Credit Card',
        'Debit Card',
        'E-Wallet'
    ) NOT NULL,

    payment_status ENUM(
        'Processing',
        'Verified',
        'Failed',
        'Flagged'
    ) DEFAULT 'Processing',

    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    transaction_reference VARCHAR(100),

    FOREIGN KEY (order_ID)
        REFERENCES Order_record(order_ID),

    FOREIGN KEY (customer_ID)
        REFERENCES Customer(customer_ID)
);

-- =====================================================
-- PAYMENT VERIFICATION TABLE
-- =====================================================
CREATE TABLE Payment_verification (
    verification_ID INT AUTO_INCREMENT PRIMARY KEY,
    payment_ID INT NOT NULL,
    admin_ID INT NOT NULL,

    verification_status ENUM(
        'Verified',
        'Flagged'
    ) NOT NULL,

    flag_reason TEXT,
    verified_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (payment_ID)
        REFERENCES Payment_record(payment_ID),

    FOREIGN KEY (admin_ID)
        REFERENCES Admin(admin_ID)
);

-- =====================================================
-- PAYMENT RECEIPT TABLE
-- =====================================================
CREATE TABLE Payment_receipt (
    receipt_ID INT AUTO_INCREMENT PRIMARY KEY,
    payment_ID INT NOT NULL,
    order_ID INT NOT NULL,
    issued_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    receipt_data TEXT,

    FOREIGN KEY (payment_ID)
        REFERENCES Payment_record(payment_ID),

    FOREIGN KEY (order_ID)
        REFERENCES Order_record(order_ID)
);

-- =====================================================
-- SHIPMENT TABLE
-- =====================================================
CREATE TABLE Shipment (
    shipment_ID INT AUTO_INCREMENT PRIMARY KEY,
    order_ID INT NOT NULL UNIQUE,

    tracking_number VARCHAR(100) UNIQUE,
    carrier VARCHAR(100),

    current_status ENUM(
        'Processing',
        'Shipped',
        'Delivered'
    ) DEFAULT 'Processing',

    delivery_address TEXT,
    estimated_delivery DATE,
    actual_delivery DATETIME,

    FOREIGN KEY (order_ID)
        REFERENCES Order_record(order_ID)
);

-- =====================================================
-- DELIVERY STATUS LOG
-- =====================================================
CREATE TABLE Delivery_status_LOG (
    status_log_ID INT AUTO_INCREMENT PRIMARY KEY,
    shipment_ID INT NOT NULL,
    admin_ID INT NOT NULL,

    status_value ENUM(
        'Processing',
        'Shipped',
        'Delivered'
    ) NOT NULL,

    notes TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (shipment_ID)
        REFERENCES Shipment(shipment_ID)
        ON DELETE CASCADE,

    FOREIGN KEY (admin_ID)
        REFERENCES Admin(admin_ID)
);

-- =====================================================
-- ORDER CONFIRMATION TABLE
-- =====================================================
CREATE TABLE Order_confirmation (
    confirmation_ID INT AUTO_INCREMENT PRIMARY KEY,
    order_ID INT NOT NULL UNIQUE,
    customer_ID INT NOT NULL,

    confirmed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    confirmation_note TEXT,

    FOREIGN KEY (order_ID)
        REFERENCES Order_record(order_ID),

    FOREIGN KEY (customer_ID)
        REFERENCES Customer(customer_ID)
);
