Please update the existing Kraf Hibiscus Business Management System prototype. Keep the current cream and pink visual style, typography, soft card layout, rounded corners, sidebar style, and overall UI design. Do not redesign the whole website from scratch. Improve and complete the missing pages, broken routes, buttons, forms, and prototype flows listed below.

Project context:
This is a web-based business management system for Kraf Hibiscus. The system supports customer ordering and admin business management. The direct users are Customer and Admin. Staff members do not log in directly; Admin manages staff information, tasks, and contribution records.

Important business information to update everywhere:
Business name: Kraf Hibiscus
Brand/logo name: HIBISCRAFT
Slogan: Fabrik Lama, Nafas Baharu
Address: Kabin Kraf Hibiscus, Jalan PI 4/14, Taman Pulai Indah, 81300 Skudai, Johor, Malaysia
Order and inquiry contacts:
+60 13-754 8950 (Puan Fhairna)
+60 19-734 3239 (Puan Sheila)

Please replace all fake contact details with the real information above. Remove fake information such as:
Kuala Lumpur address
[info@krafhibiscus.com](mailto:info@krafhibiscus.com)
[hello@krafhibiscus.com](mailto:hello@krafhibiscus.com)
+60 12-345 6789

Use the real address and phone numbers in:
Homepage footer
Contact page
Admin login page if contact information appears there
Receipt page
Order confirmation page
Customer payment page
Any contact information card

Logo instruction:
Use the uploaded HIBISCRAFT logo if available. Place it in the top-left area of the customer website header and admin login page. If the image cannot be inserted automatically, create a clean logo placeholder using the text “HIBISCRAFT” with the subtitle “Timeless & Handmade”. Keep it elegant and consistent with the cream and pink theme. The logo should not look too large or stretched.

========================
CUSTOMER SIDE IMPROVEMENTS
==========================

1. Customer Homepage
   Keep the current homepage structure, but improve the hero section.

Hero title:
Handmade Products from Recycled Fabrics

Add small tagline above or below the title:
Fabrik Lama, Nafas Baharu

Keep the main description:
Kraf Hibiscus transforms recycled fabrics into handmade items while supporting community-based sustainability activities.

Keep the two hero buttons:
Shop Handmade Products
Learn About Recycling

Replace the four small square cards on the right side of the hero section with more meaningful business cards:

1. Handmade Products
   Text: Scrunchies, bags, purses, and fabric crafts made from recycled fabrics.
2. Recycled Fabric Collection
   Text: Old fabrics are collected and reused to reduce textile waste.
3. Community Craft Work
   Text: Supports local handmade craft activities and community participation.
4. Order Online
   Text: Customers can browse products, add items to cart, and place orders online.

Make these cards look more professional. Use consistent icons and equal spacing. Avoid using random unrelated icons.

2. Customer Top Navigation
   The customer top navigation should include:
   Home
   Products
   About
   Community Recycling
   Contact
   My Orders
   My Profile
   Login
   Shop Now
   Cart icon with item count

“My Orders” must appear clearly in the top navigation, not only in the footer.
“My Profile” should be available after customer login or as a prototype menu item.
The cart icon should remain on the right side.

3. Customer Registration Form
   Update the customer register form.
   The form must include:
   Full Name
   Email
   Phone Number
   Address
   Password
   Confirm Password

Address must be a required field.
Keep the same card style and cream/pink theme.
Add basic validation messages for missing required fields.
After successful registration, show a success toast:
“Account registered successfully.”

4. Customer Login and Profile
   Create a “My Profile” page for customers.
   This page should allow customer to view and edit personal details.

Customer Profile page fields:
Customer ID
Full Name
Email
Phone Number
Address
Account Status

Add buttons:
Edit Profile
Save Changes
Cancel

When Edit Profile is clicked, allow editing:
Full Name
Email
Phone Number
Address

Add a password section:
Current Password
New Password
Confirm New Password

After Save Changes, show success toast:
“Profile updated successfully.”

5. Product Listing Page
   Keep the existing product listing page and filters, but improve interaction.

Product cards must show:
Product image/icon
Product name
Category
Price
Stock availability
View Details button
“+” button for Add to Cart

Replace the small cart icon button on each product card with a clear “+” button.
The “+” button means Add to Cart.
When clicked, show toast:
“Item added to cart.”
Update the header cart count in the prototype flow.

Keep View Details button and connect it to the product detail page.

6. Product Detail Page
   Product detail page should show:
   Product image
   Product name
   Category
   Price
   Description
   Availability
   Quantity selector
   Add to Cart button
   Buy Now button
   Back to Products link

Add to Cart should update cart count and show toast:
“Item added to cart.”
Buy Now should go to Checkout or Payment flow.

7. Cart Page
   Cart page should show:
   Product image
   Product name
   Category
   Price
   Quantity selector
   Subtotal
   Remove item button
   Order Summary
   Subtotal
   Shipping
   Total

Buttons:
Proceed to Checkout
Continue Shopping

If cart is empty, show:
Your cart is empty
Continue Shopping button

8. Checkout Page
   Checkout page should include:
   Delivery Option

* Home Delivery
* Pickup

If Home Delivery is selected, show delivery address section:
Customer Address
Edit Address button

Payment Method:

* Online Transfer
* E-wallet
* Cash on Pickup

Order Summary:
Product items
Subtotal
Shipping
Total

Button:
Continue to Payment

9. Customer Payment Page
   Create a payment page after checkout and before order success.

Payment page must include:
Page title: Payment Confirmation
Order Summary
Selected Payment Method
Mock QR Code area
Payment Instructions
Upload Payment Confirmation PDF field
Submit Payment Confirmation button

The mock QR code can be a square placeholder with the text:
Mock QR Payment

Payment instructions:
Please scan the QR code or complete the selected payment method. Then upload your payment confirmation PDF for admin verification.

Upload field label:
Upload payment confirmation PDF

After submit, show:
Payment Status: Pending Verification
Order Status: Processing

Show success toast:
“Payment confirmation uploaded. Waiting for admin verification.”

10. Order Success Page
    Order success page should show:
    Order Placed Successfully
    Order ID
    Order Date
    Total Amount
    Payment Status
    Order Status
    Order Items

Buttons:
View My Orders
View Receipt
Continue Shopping

If payment is still pending verification, show:
Payment Status: Pending Verification

11. My Orders Page
    My Orders page should show a list/table of customer orders with:
    Order ID
    Order Date
    Total Amount
    Payment Status
    Order Status
    Actions

Actions:
View
View Receipt
Cancel Order

If order is delivered or cancelled, hide or disable Cancel Order.
If order is pending or processing, allow Cancel Order.

12. Customer Order Details
    Create customer order details page or modal.

Show:
Order ID
Order Date
Customer Name
Delivery Address
Order Items
Quantity
Unit Price
Total Amount
Delivery Option
Payment Method
Payment Status
Order Status
Cancellation Reason if cancelled

Buttons:
Back to My Orders
View Receipt
Cancel Order if allowed

13. Customer Cancel Order Flow
    When customer clicks Cancel Order, open a confirmation modal.

Modal title:
Cancel Order?

Message:
Please provide a reason for cancelling this order.

Text area:
Cancellation Reason

Buttons:
Keep Order
Submit Cancellation

If the cancellation reason is empty, show validation:
Cancellation reason is required.

After submitting:
Order Status becomes Cancelled.
Show success toast:
“Order cancelled successfully.”
Show the cancellation reason in order details.

14. Customer Receipt
    Create a receipt page or modal.

Receipt should show:
Receipt ID
Order ID
Customer Name
Customer Phone Number
Customer Address
Order Date
Payment Method
Payment Status
Order Status
Product Items
Quantity
Unit Price
Subtotal
Shipping
Total Amount
Business Name: Kraf Hibiscus
Address: Kabin Kraf Hibiscus, Jalan PI 4/14, Taman Pulai Indah, 81300 Skudai, Johor, Malaysia
Contact: +60 13-754 8950 / +60 19-734 3239

Buttons:
Download Receipt
Back to My Orders

If payment is not verified yet, show:
Receipt Pending Payment Verification

15. Customer About Page
    Keep the current improved About page if already generated.
    Make sure it uses real business context and does not mention fake addresses.
    Keep sections such as:
    Our Story
    Our Mission
    Handmade with Love
    Committed to Sustainability

16. Customer Community Recycling Page
    Keep the improved Community Recycling page if already generated.
    Replace fake collection center address with the real address:
    Kabin Kraf Hibiscus, Jalan PI 4/14, Taman Pulai Indah, 81300 Skudai, Johor, Malaysia

Keep sections:
Community Recycling Program
Recycling Process
How to Donate Fabrics
Materials We Collect
Impact Summary

17. Customer Contact Page
    Update the Contact page with real details.

Contact information:
Phone:
+60 13-754 8950 (Puan Fhairna)
+60 19-734 3239 (Puan Sheila)

Address:
Kabin Kraf Hibiscus, Jalan PI 4/14, Taman Pulai Indah, 81300 Skudai, Johor, Malaysia

Operating Hours:
Monday – Saturday
9:00 AM – 6:00 PM

Keep the Send Message form:
Name
Email
Message
Send Message button

After Send Message, show toast:
“Message sent successfully.”

========================
ADMIN SIDE GLOBAL REQUIREMENTS
==============================

18. Admin Layout
    Keep the existing Admin layout:
    Left sidebar
    Top search bar
    Notification bell
    Admin User profile
    Cream background
    Pink primary buttons
    Green success badges
    Orange warning badges
    Red danger buttons
    Rounded cards and tables

Sidebar should include:
Dashboard
Orders
Customers
Payments
Product Inventory
Material Inventory
Suppliers
Staff Management
Task Management
Staff Contribution
Financial Records
Community Activities
Settings
Logout

Do not duplicate sidebar items.
If scrolling is needed, keep the sidebar clean and readable.

19. Fix Page Not Found Problem
    Remove Page Not Found from normal module buttons and actions.
    No important button should lead to Page Not Found.

The following actions must connect to a page, modal, toast, or basic prototype state:
Admin Orders view/edit/cancel
Customer view/edit/deactivate
Payments view/verify/reject
Product Inventory view/edit/delete/add product
Material Inventory view/stock in/stock out/add material
Suppliers view/edit/deactivate/add supplier
Staff Management view/edit/deactivate/add staff
Task Management view/assign/update/complete/create task
Staff Contribution view/record contribution
Financial Records view/record income/record expense/view/delete/generate report
Generate Report
Notification bell
Admin User profile
Settings
Logout

20. Admin Search and Filter Basic Version
    Make all search bars and filters work at least as a basic prototype interaction.

If full filtering is too complex, use a basic version:

* Search input visually accepts typing.
* After search, show a filtered result state or toast:
  “Showing results for: [search keyword]”
* Filter dropdown visually changes selected option.
* Table can show fewer mock rows based on selected filter.
* If no result, show:
  “No matching records found.”

Search and filter should not appear completely non-functional.

21. Admin Notification Bell
    When clicking the notification bell, open a dropdown panel.

Dropdown title:
Notifications

Mock notifications:

1. Low stock alert: Crossbody Bag has only 3 units left.
2. Payment pending: PAY-003 is waiting for verification.
3. Task update: TSK-001 progress was updated.
4. New order received: ORD-1005.

At the bottom:
View All Notifications

Clicking View All Notifications can open a simple Notifications page with the same list.

22. Admin User Profile Dropdown
    When clicking Admin User, open a dropdown menu.

Menu items:
View Admin Profile
Account Settings
Logout

View Admin Profile opens Admin Profile page or modal.
Account Settings opens Settings page.
Logout returns to Admin Login page.

23. Admin Profile Page
    Create a simple Admin Profile page showing:
    Admin Name: Admin User
    Role: Administrator
    Email: [admin@krafhibiscus.local](mailto:admin@krafhibiscus.local)
    Phone Number
    Status: Active

Buttons:
Edit Profile
Back to Dashboard

24. Settings Page
    The Settings page should not show “coming soon”.
    Create a basic settings page with:
    System Settings
    Business Information
    Notification Settings
    Account Settings

Business Information section:
Business Name
Address
Contact Numbers
Operating Hours

Buttons:
Save Settings
Cancel

Save button shows toast:
“Settings updated successfully.”

========================
ADMIN DASHBOARD
===============

25. Admin Dashboard
    Keep dashboard summary cards:
    Total Orders
    Pending Orders
    Low Stock Items
    Active Staff
    Ongoing Tasks
    Monthly Revenue

Keep sections:
Recent Orders
Quick Actions
Task Progress
Inventory Alert

Quick Actions should include:
Add Product
Create Task
Add Staff
Record Payment
Generate Report

Each quick action must connect to the correct page:
Add Product → Add Product page
Create Task → Create Task page
Add Staff → Add Staff Record page
Record Payment → Payment Management or Record Income page
Generate Report → Generate Report page

========================
ADMIN ORDERS AND CUSTOMERS
==========================

26. Admin Orders Page
    The Orders page should show:
    Order ID
    Customer
    Email
    Date
    Total
    Payment Status
    Order Status
    Actions

Actions:
View
Edit
Cancel/Delete

The eye icon must open Admin Order Details page.
The edit icon must open Edit Order Status page.
The cancel/delete icon must open Cancel Order confirmation modal.

Do not use only notification toast for view or edit.

27. Admin Order Details Page
    Create a full Admin Order Details page.

Show:
Order ID
Customer Name
Email
Phone Number
Address
Order Date
Product Items
Quantity
Unit Price
Total Amount
Delivery Option
Payment Method
Payment Status
Order Status
Cancellation Reason if cancelled
Admin Remarks if available

Buttons:
Back to Orders
Edit Order Status
View Receipt

28. Admin Edit Order Status Page
    Create a full Edit Order Status page.

Fields:
Order ID
Customer Name
Current Order Status
New Order Status dropdown:
Pending
Processing
Shipped
Delivered
Cancelled

Payment Status dropdown:
Pending Verification
Verified
Rejected

Admin Remarks text area

Buttons:
Save Changes
Cancel

After Save Changes, show toast:
“Order status updated successfully.”

29. Admin Cancel Order Modal
    When Admin clicks cancel/delete order, show modal:
    Cancel Order?

Message:
Are you sure you want to cancel this order? The customer will be notified.

Fields:
Admin Remarks

Buttons:
Keep Order
Cancel Order

After confirm, show toast:
“Order cancelled successfully.”

30. Admin Customer Management Page
    Customer Management page should show:
    Customer ID
    Customer Name
    Email
    Phone Number
    Address or short address
    Registration Date
    Status
    Actions

Actions:
View
Edit
Deactivate

Eye icon opens Customer Details page.
Edit icon opens Edit Customer Details page.
Deactivate icon opens Deactivate Customer modal.

31. Admin Customer Details Page
    Create Customer Details page.

Show:
Customer ID
Full Name
Email
Phone Number
Address
Registration Date
Status

Also show related orders table:
Order ID
Order Date
Total Amount
Payment Status
Order Status
Action View

Buttons:
Edit Customer
Deactivate Customer
Back to Customer List

32. Admin Edit Customer Details Page
    Create Edit Customer Details page.

Fields:
Full Name
Email
Phone Number
Address
Status

Buttons:
Save Changes
Cancel

After saving, show toast:
“Customer details updated successfully.”

33. Admin Deactivate Customer Modal
    Modal title:
    Deactivate Customer Account?

Message:
Are you sure you want to deactivate this customer account? The customer will not be able to place new orders.

Buttons:
Cancel
Deactivate

After confirm, show toast:
“Customer has been deactivated.”

========================
ADMIN PAYMENT MANAGEMENT
========================

34. Payment Management Page
    Payment page should show:
    Payment ID
    Order ID
    Customer Name
    Payment Method
    Payment Amount
    Payment Date
    Payment Status
    Actions

Actions:
View
Verify
Reject

View opens Payment Details page or modal.
Verify opens confirmation modal.
Reject opens Reject Payment modal with reason field.

35. Payment Details Page or Modal
    Show:
    Payment ID
    Order ID
    Customer Name
    Payment Method
    Payment Amount
    Payment Date
    Payment Status
    Uploaded Payment Confirmation PDF placeholder
    Admin Remarks

Buttons:
Verify Payment
Reject Payment
Back to Payments

36. Verify Payment Modal
    Title:
    Verify Payment?

Message:
Are you sure you want to verify this payment?

Buttons:
Cancel
Verify

After verify:
Payment Status becomes Verified.
Show toast:
“Payment verified successfully.”

37. Reject Payment Modal
    Title:
    Reject Payment?

Field:
Rejection Reason

Buttons:
Cancel
Reject Payment

If reason is empty, show validation:
Rejection reason is required.

After reject:
Payment Status becomes Rejected.
Show toast:
“Payment has been rejected.”

========================
ADMIN PRODUCT INVENTORY
=======================

38. Product Inventory Page
    Product Inventory page should show:
    Product ID
    Product Name
    Category
    Stock
    Price
    Status
    Actions

Actions:
View
Edit
Delete

Add Product button should open Add Product page.
View opens Product Details page.
Edit opens Edit Product page.
Delete opens Delete Product confirmation modal.

39. Add Product Page
    Keep existing Add Product page and improve if needed.

Fields:
Product Name
Category
Price
Stock Quantity
Product Description
Product Image placeholder

Buttons:
Add Product
Cancel

After save, show toast:
“Product added successfully.”

40. Product Details Page
    Create Product Details page.

Show:
Product ID
Product Name
Category
Price
Stock Quantity
Status
Description
Created Date
Last Updated

Buttons:
Edit Product
Back to Product Inventory

41. Edit Product Page
    Create Edit Product page.

Fields:
Product Name
Category
Price
Stock Quantity
Status
Product Description

Buttons:
Save Changes
Cancel

After save, show toast:
“Product updated successfully.”

42. Delete Product Modal
    Title:
    Delete Product?

Message:
Are you sure you want to delete this product? This action should only be used if the product was entered incorrectly.

Buttons:
Cancel
Delete Product

After confirm, show toast:
“Product deleted successfully.”

========================
ADMIN MATERIAL INVENTORY
========================

43. Material Inventory Page
    Material Inventory page should show:
    Material ID
    Material Name
    Category
    Quantity
    Source
    Stock Status
    Actions

Actions:
View
Stock In
Stock Out
Edit

Add Material button opens Add Material page.
View opens Material Details page.
Stock In opens Stock In page/modal.
Stock Out opens Stock Out page/modal.
Edit opens Edit Material page.

44. Add Material Page
    Create Add Material page.

Fields:
Material Name
Category
Quantity
Unit
Source
Supplier or Donation Source
Remarks

Buttons:
Save Material
Cancel

After save, show toast:
“Material added successfully.”

45. Material Details Page
    Show:
    Material ID
    Material Name
    Category
    Quantity
    Unit
    Source
    Supplier/Donation Source
    Stock Status
    Remarks
    Last Updated

Buttons:
Edit Material
Stock In
Stock Out
Back to Material Inventory

46. Stock In Page or Modal
    Title:
    Stock In Material

Fields:
Material Name
Current Quantity
Stock In Quantity
Date
Remarks

Buttons:
Save Stock In
Cancel

After save:
Show toast:
“Stock in recorded successfully.”

47. Stock Out Page or Modal
    Title:
    Stock Out Material

Fields:
Material Name
Current Quantity
Stock Out Quantity
Date
Reason
Remarks

Buttons:
Save Stock Out
Cancel

If stock out quantity is greater than current quantity, show validation:
“Stock out quantity cannot exceed current quantity.”

After save:
Show toast:
“Stock out recorded successfully.”

48. Edit Material Page
    Fields:
    Material Name
    Category
    Quantity
    Unit
    Source
    Stock Status
    Remarks

Buttons:
Save Changes
Cancel

After save, show toast:
“Material updated successfully.”

========================
ADMIN SUPPLIER MANAGEMENT
=========================

49. Supplier Management Page
    Supplier page should show:
    Supplier ID
    Supplier Name
    Contact Number
    Email
    Address
    Supplied Materials
    Status
    Actions

Actions:
View
Edit
Deactivate

Add Supplier button opens Add Supplier page.
View opens Supplier Details page.
Edit opens Edit Supplier page.
Deactivate opens Deactivate Supplier modal.

50. Add Supplier Page
    Keep and improve existing Add Supplier page.

Fields:
Supplier Name
Contact Number
Email
Address
Supplied Materials
Status

Buttons:
Save Supplier
Cancel

After save, show toast:
“Supplier added successfully.”

51. Supplier Details Page
    Show:
    Supplier ID
    Supplier Name
    Contact Number
    Email
    Address
    Supplied Materials
    Status
    Related Materials table if possible

Buttons:
Edit Supplier
Deactivate Supplier
Back to Supplier List

52. Edit Supplier Page
    Fields:
    Supplier Name
    Contact Number
    Email
    Address
    Supplied Materials
    Status

Buttons:
Save Changes
Cancel

After save:
Show toast:
“Supplier updated successfully.”

53. Deactivate Supplier Modal
    Title:
    Deactivate Supplier?

Message:
Are you sure you want to deactivate this supplier? No new materials can be purchased from this supplier.

Buttons:
Cancel
Deactivate

After confirm:
Show toast:
“Supplier deactivated successfully.”

========================
ADMIN STAFF MANAGEMENT
======================

54. Staff Management Page
    Keep the existing detailed Staff Management module because it is important.
    Make sure it supports:
    Add Staff Record
    View Staff List
    Update Staff Information
    Deactivate Staff Record

Staff table should show:
Staff ID
Staff Name
Contact Number
Role
Joining Date
Status
Actions

Actions:
View
Edit
Deactivate

55. Add Staff Record Page
    Fields:
    Staff Name
    Contact Number
    Role
    Joining Date
    Status
    Remarks

Buttons:
Save Staff Record
Cancel

After save:
Show toast:
“Staff record added successfully.”

56. Staff Details Page
    Show:
    Staff ID
    Staff Name
    Contact Number
    Role
    Joining Date
    Status
    Remarks
    Recent Assigned Tasks
    Contribution Summary

Buttons:
Edit Staff
Deactivate Staff
Back to Staff List

57. Update Staff Information Page
    Fields:
    Staff Name
    Contact Number
    Role
    Joining Date
    Status
    Remarks

Buttons:
Save Changes
Cancel

After save:
Show toast:
“Staff information updated successfully.”

58. Deactivate Staff Modal
    Title:
    Deactivate Staff Record?

Message:
Are you sure you want to deactivate this staff record? Inactive staff should not be assigned new tasks.

Buttons:
Cancel
Deactivate

After confirm:
Show toast:
“Staff record deactivated successfully.”

========================
ADMIN TASK MANAGEMENT
=====================

59. Task Management Page
    Keep the existing detailed Task Management module.
    It should support:
    Create Task
    Assign Task
    View Task List
    Update Task Progress
    Confirm Task Completion

Task table should show:
Task ID
Task Title
Assigned Staff
Due Date
Status
Progress
Actions

Actions depending on status:
View
Assign
Update
Complete

60. Create Task Page
    Fields:
    Task Title
    Task Description
    Priority
    Due Date
    Status
    Remarks

Buttons:
Create Task
Cancel

After save:
Show toast:
“Task created successfully.”

61. Task Details Page
    Show:
    Task ID
    Task Title
    Task Description
    Assigned Staff
    Due Date
    Created Date
    Assigned Date
    Last Updated
    Status
    Priority
    Progress Remarks

Buttons:
Assign Task if unassigned
Update Progress if assigned or in progress
Confirm Completion if in progress
Back to Task List

62. Assign Task Page
    Fields:
    Select Staff
    Assigned Date
    Due Date
    Assignment Remarks

Selected Task card:
Task ID
Task Title
Priority

Buttons:
Assign Task
Cancel

Validation:
Due date cannot be earlier than assigned date.
Inactive staff cannot be selected.

After save:
Show toast:
“Task assigned successfully.”

63. Update Task Progress Page
    Fields:
    New Status
    Progress Remarks
    Updated Date

Current Task Information card:
Task Title
Assigned Staff
Current Status
Due Date
Previous Progress

Buttons:
Save Progress Update
Cancel

After save:
Show toast:
“Task progress updated successfully.”

64. Confirm Task Completion Modal or Page
    Title:
    Confirm Task Completion?

Message:
Once confirmed, the task status will be updated to Completed and a staff contribution record will be created.

Fields:
Completion Date
Contribution Details
Remarks

Buttons:
Confirm Completion
Cancel

After confirm:
Task Status becomes Completed.
Create a Staff Contribution record.
Show toast:
“Task completed and contribution recorded successfully.”

========================
ADMIN STAFF CONTRIBUTION
========================

65. Staff Contribution Management Page
    Keep the existing detailed Staff Contribution module.
    It should support:
    Record Staff Contribution
    Review Contribution Records

Contribution table should show:
Contribution ID
Staff Name
Task Title
Completion Date
Contribution Details
Recorded By
Actions

Actions:
View

Add button:
Record Contribution

66. Record Contribution Page
    Fields:
    Select Staff
    Select Completed Task
    Completion Date
    Contribution Details
    Remarks

Buttons:
Save Contribution Record
Cancel

After save:
Show toast:
“Contribution record saved successfully.”

67. Contribution Details Page
    Show:
    Contribution ID
    Staff ID
    Staff Name
    Task ID
    Task Title
    Completion Date
    Created Date
    Recorded By
    Contribution Details
    Remarks

Button:
Back to Contribution Records

========================
ADMIN FINANCIAL RECORDS AND REPORTS
===================================

68. Financial Records Page
    Keep existing Financial Records page but improve actions.

Show summary cards:
Total Income
Total Expense
Net Profit

Buttons:
Record Income
Record Expense
Generate Financial Report

Transaction table:
Transaction ID
Date
Type
Category
Amount
Payment Method
Related Order or Supplier/Item
Actions

Actions:
View
Delete

69. Record Income Page
    Fields:
    Income Date
    Income Category
    Related Order ID optional
    Amount
    Payment Method
    Description

Buttons:
Save Income Record
Cancel

After save:
Show toast:
“Income record saved successfully.”

70. Record Expense Page
    Fields:
    Expense Date
    Expense Category
    Amount
    Payment Method
    Related Supplier/Item optional
    Description

Buttons:
Save Expense Record
Cancel

After save:
Show toast:
“Expense record saved successfully.”

71. Financial Transaction Details Page
    Show:
    Transaction ID
    Date
    Type
    Category
    Amount
    Payment Method
    Related Order/Supplier/Item
    Description
    Recorded By

Buttons:
Back to Financial Records

72. Delete Financial Record Modal
    Title:
    Delete Financial Record?

Message:
Are you sure you want to delete this financial record?

Buttons:
Cancel
Delete

After confirm:
Show toast:
“Financial record deleted successfully.”

73. Generate Report Page
    Create a complete Generate Report page.
    This page must be connected from:
    Admin Dashboard Quick Action “Generate Report”
    Financial Records button “Generate Financial Report”

Page title:
Generate Report

Subtitle:
Generate business reports for orders, inventory, staff tasks, contributions, community activities, and financial records.

Fields:
Report Type dropdown:
Order Report
Customer Report
Product Inventory Report
Material Inventory Report
Supplier Report
Staff Task Report
Staff Contribution Report
Financial Report
Community Activity Report

Date Range:
Start Date
End Date

Format:
PDF
Excel

Buttons:
Generate Preview
Export Report
Cancel

When Generate Preview is clicked, show a mock report preview card.

Mock report preview should include:
Report Type
Date Range
Total Records
Generated By: Admin User
Generated Date
Summary Table

For Financial Report preview, show:
Total Income
Total Expense
Net Profit
Number of Transactions

For Staff Task Report preview, show:
Total Tasks
Completed Tasks
In Progress Tasks
Pending Tasks

For Inventory Report preview, show:
Total Items
Low Stock Items
Out of Stock Items

Export Report button should show toast:
“Report exported successfully.”

========================
ADMIN COMMUNITY ACTIVITIES
==========================

74. Community Activities Page
    Do not leave this page as “coming soon”.
    Create a basic Community Activities page.

Show:
Activity ID
Activity Name
Activity Date
Location
Collected Materials
Estimated Quantity
Status
Actions

Example data:
ACT-001 Fabric Collection Drive
ACT-002 Sorting and Preparation Session
ACT-003 Handmade Product Workshop

Buttons:
Add Activity
View
Edit

75. Add Community Activity Page
    Fields:
    Activity Name
    Activity Date
    Location
    Description
    Collected Material Type
    Estimated Quantity
    Status

Buttons:
Save Activity
Cancel

After save:
Show toast:
“Community activity saved successfully.”

76. Community Activity Details Page
    Show:
    Activity ID
    Activity Name
    Date
    Location
    Description
    Collected Materials
    Quantity
    Status
    Remarks

Buttons:
Edit Activity
Back to Community Activities

========================
ROUTING AND PROTOTYPE FLOW
==========================

77. Customer flow routes
    Make sure the following route flow works:
    Home → Products → Product Details → Add to Cart → Cart → Checkout → Payment Confirmation → Order Success → My Orders → Order Details → Receipt

Also:
Register → Login → My Profile
My Orders → Cancel Order modal → Cancelled status
Contact → Send message toast

78. Admin flow routes
    Make sure the following route flow works:
    Admin Login → Admin Dashboard
    Dashboard Quick Action Add Product → Add Product
    Dashboard Quick Action Create Task → Create Task
    Dashboard Quick Action Add Staff → Add Staff Record
    Dashboard Quick Action Record Payment → Payment Management
    Dashboard Quick Action Generate Report → Generate Report

Orders → Order Details
Orders → Edit Order Status
Orders → Cancel Order modal

Customers → Customer Details
Customers → Edit Customer Details
Customers → Deactivate Customer modal

Payments → Payment Details
Payments → Verify Payment modal
Payments → Reject Payment modal

Product Inventory → Product Details
Product Inventory → Edit Product
Product Inventory → Delete Product modal
Product Inventory → Add Product

Material Inventory → Material Details
Material Inventory → Stock In
Material Inventory → Stock Out
Material Inventory → Add Material
Material Inventory → Edit Material

Suppliers → Supplier Details
Suppliers → Edit Supplier
Suppliers → Deactivate Supplier modal
Suppliers → Add Supplier

Staff Management → Staff Details
Staff Management → Update Staff Information
Staff Management → Deactivate Staff modal
Staff Management → Add Staff Record

Task Management → Task Details
Task Management → Assign Task
Task Management → Update Task Progress
Task Management → Confirm Task Completion
Task Management → Create Task

Staff Contribution → Contribution Details
Staff Contribution → Record Contribution

Financial Records → Record Income
Financial Records → Record Expense
Financial Records → Transaction Details
Financial Records → Generate Financial Report

Community Activities → Add Activity
Community Activities → Activity Details
Settings → Settings Page
Notification Bell → Notification Dropdown
Admin User → Profile Dropdown

79. Basic version is acceptable
    For less important modules, a basic version is acceptable. Basic version means:
    A real page exists.
    Buttons route to a page, modal, or toast.
    Tables show realistic mock data.
    Forms have required fields.
    Save buttons show success toast.
    Delete/deactivate buttons show confirmation modal.
    No main action should lead to Page Not Found.

80. Final quality check
    Before finishing, check these:
    No normal button opens Page Not Found.
    No fake contact information remains.
    Customer has My Orders and My Profile in navigation.
    Customer can cancel order with reason.
    Customer can view receipt.
    Customer payment page has mock QR and upload payment confirmation PDF.
    Admin Orders view and edit open real pages.
    Admin can edit customer details.
    Admin Generate Report page exists and is connected.
    Search/filter has at least basic prototype behavior.
    Notification bell opens dropdown.
    Admin User opens dropdown.
    Sidebar has no duplicated items.
    Design remains consistent with cream and pink theme.
