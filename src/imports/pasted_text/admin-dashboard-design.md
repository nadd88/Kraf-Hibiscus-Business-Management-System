Continue the same Kraf Hibiscus Business Management System admin dashboard design.

Now design the remaining admin subsystem pages for Order and Customer Management, Inventory Management, and Financial Tracking and Reporting. Use the same cream and pink theme, sidebar layout, top header, white cards, soft shadows, clean tables, forms, status badges, and professional spacing.

Create these screens:

A. Order and Customer Management Subsystem

1. Customer List Page
Purpose: Admin views and manages customer accounts.
Components:
- Search customer
- Filter by account status
- Customer table columns:
  Customer ID
  Customer Name
  Email
  Phone Number
  Registration Date
  Status
  Actions
- Actions:
  View
  Edit
  Deactivate

Button interactions:
- View goes to Customer Details Page
- Edit goes to Update Customer Account Page
- Deactivate opens Deactivate Customer Popup

2. Customer Details Page
Components:
- Customer profile summary
- Full name
- Email
- Phone number
- Address
- Account status
- Recent orders
Buttons:
- Edit Customer
- Back to Customer List

3. Order List Page
Purpose: Admin manages customer orders.
Components:
- Search order
- Filter by order status
- Filter by payment status
- Order table columns:
  Order ID
  Customer Name
  Order Date
  Total Amount
  Order Status
  Payment Status
  Actions
- Actions:
  View
  Update Status
  Cancel

Button interactions:
- View goes to Order Details Page
- Update Status opens Update Order Status Popup
- Cancel opens Cancel Order Confirmation Popup

4. Order Details Page
Components:
- Order ID
- Customer details
- Product list
- Quantity
- Subtotal
- Payment status
- Delivery or pickup status
- Order timeline
Buttons:
- Update Order Status
- Verify Payment
- Print Invoice
- Back to Order List

5. Payment List Page
Purpose: Admin manages payment records.
Components:
- Payment ID
- Order ID
- Customer Name
- Payment Method
- Payment Amount
- Payment Date
- Payment Status
- Actions
Actions:
- View
- Verify
- Reject
- View Receipt

6. Payment Verification Page
Components:
- Payment ID
- Order ID
- Customer Name
- Payment proof preview
- Payment amount
- Payment method
- Verify Payment button
- Reject Payment button

7. Delivery Status Page
Purpose: Admin updates order tracking and delivery.
Components:
- Order ID
- Customer Name
- Delivery or Pickup Method
- Current Status
- Last Updated
- Actions
Actions:
- Update Delivery Status
- View Order

B. Inventory Management Subsystem

8. Supplier List Page
Components:
- Search supplier
- Supplier ID
- Supplier Name
- Contact Number
- Email
- Address
- Status
- Actions
Actions:
- Add Supplier
- View
- Edit
- Deactivate

9. Add Supplier Form
Components:
- Supplier Name
- Contact Number
- Email
- Address
- Supplied Materials
- Status
- Save Supplier button
- Cancel button

10. Material Inventory List Page
Purpose: Admin manages recycled fabric and materials.
Components:
- Search material
- Filter by category
- Material ID
- Material Name
- Category
- Quantity
- Unit
- Source
- Stock Status
- Actions
Actions:
- Add Material
- View
- Edit
- Stock In
- Stock Out

11. Add Material Form
Components:
- Material Name
- Category
- Quantity
- Unit
- Source
- Storage Location
- Supplier
- Save Material button
- Cancel button

12. Stock In / Stock Out Form
Components:
- Selected Material
- Transaction Type: Stock In or Stock Out
- Quantity
- Purpose
- Date
- Remarks
- Save Record button
- Cancel button

13. Product Inventory List Page
Purpose: Admin manages finished handmade products.
Components:
- Product ID
- Product Name
- Category
- Selling Price
- Available Quantity
- Stock Status
- Actions
Actions:
- Add Product
- View
- Edit
- Adjust Stock
- Deactivate Product

14. Add Product Form
Components:
- Product Name
- Category
- Product Description
- Selling Price
- Available Quantity
- Product Image upload placeholder
- Save Product button
- Cancel button

15. Low Stock Alert Page
Components:
- Item Name
- Item Type: Material or Product
- Current Quantity
- Minimum Stock Level
- Status
- Suggested Action
Actions:
- Restock
- View Details
- Generate Inventory Report

16. Inventory Movement History Page
Components:
- Transaction ID
- Item Name
- Item Type
- Movement Type: Stock In, Stock Out, Adjustment
- Quantity
- Date
- Updated By
- Remarks

C. Financial Tracking and Reporting Subsystem

17. Financial Records Page
Purpose: Admin views income and expenses.
Components:
- Search transaction
- Filter by type
- Filter by date range
- Filter by payment status
- Buttons:
  Record Income
  Record Expense
- Transaction table columns:
  Transaction ID
  Date
  Type
  Category
  Amount
  Payment Method
  Related Order
  Actions
Actions:
- View
- Edit
- Delete

18. Record Income Form
Components:
- Income Date
- Income Category
- Related Order ID optional
- Amount
- Payment Method
- Description
- Upload Receipt placeholder
- Save Income Record button
- Cancel button

19. Record Expense Form
Components:
- Expense Date
- Expense Category
- Amount
- Payment Method
- Description
- Related Supplier or Inventory Item optional
- Upload Receipt placeholder
- Save Expense Record button
- Cancel button

20. Transaction Details Page
Components:
- Transaction ID
- Date
- Type
- Category
- Amount
- Payment Method
- Description
- Related record
- Receipt preview
- Created by

21. Report Dashboard Page
Purpose: Admin views report summary and generates reports.
Components:
- Revenue summary
- Expense summary
- Profit summary
- Monthly sales chart
- Top selling products
- Recent generated reports
Buttons:
- Generate Sales Report
- Generate Expense Report
- Generate Inventory Report
- Generate Community Report

22. Generate Report Page
Components:
- Report Type dropdown
- Date Range
- Category Filter
- Generate Preview button
- Cancel button

23. Report Preview Page
Components:
- Report title
- Date range
- Summary cards
- Table data
- Chart placeholder
- Generated by
- Generated date
Buttons:
- Export PDF
- Print
- Back

Make all screens visually consistent with the same admin dashboard style. Include realistic sample data, clear navigation, action buttons, status badges, and professional business UI layout.