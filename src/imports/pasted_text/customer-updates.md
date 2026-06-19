Part 2 Modification: Customer Register + My Profile + My Orders

Please update ONLY the customer-side pages related to Register, My Profile, and My Orders. Do not redesign the whole website. Keep the existing cream and pink visual style, rounded cards, soft shadows, elegant headings, and current navigation design. Keep the website name/logo area consistent with the current design.

1. Customer Register Page

Improve the existing customer registration form.

Add one new required field:

* Address *

The register form should include these fields:

* Full Name *
* Email *
* Phone Number *
* Address *
* Password *
* Confirm Password *

Use a clean two-column layout on desktop where suitable, but keep it readable and not too crowded. The Address field can be a larger textarea or full-width input.

Add simple validation messages for basic prototype:

* If required fields are empty, show “Please complete all required fields.”
* If password and confirm password do not match, show “Passwords do not match.”
* If registration is successful, show a green success toast: “Account registered successfully.”

After successful registration, route the user to the Login page or Customer Profile page.

Keep the button:

* Register

Keep the link:

* Already have an account? Login here

2. Customer My Profile Page

Create a new customer page called “My Profile”.

Add “My Profile” to the top customer navigation bar, placed near “My Orders” and before “Login” if the user is not treated as logged in. If the prototype uses a logged-in customer state, show “My Profile” and “My Orders” clearly in the top navigation.

The My Profile page must allow the customer to view and edit their own personal details.

Page content:
Title: My Profile
Subtitle: View and update your personal information.

Use a profile card with these fields:

* Customer ID: CUST-001
* Full Name: Sarah Ahmad
* Email: [sarah.ahmad@example.com](mailto:sarah.ahmad@example.com)
* Phone Number: +60 12-345 6789
* Address: Kabin Kraf Hibiscus, Jalan PI 4/14, Taman Pulai Indah, 81300 Skudai, Johor, Malaysia
* Account Status: Active

Add two buttons:

* Edit Profile
* Save Changes

Interaction requirements:

* When clicking “Edit Profile”, change the profile information into editable input fields.
* The customer can edit Full Name, Phone Number, Address, and Email.
* Customer ID and Account Status should stay read-only.
* When clicking “Save Changes”, show a green success toast: “Profile updated successfully.”
* Add a Cancel button while editing to return to view mode without saving.

Add basic validation:

* Required fields cannot be empty.
* Email must look like a valid email.
* Phone number cannot be empty.
* Address cannot be empty.

3. Customer My Orders Page

Improve the existing My Orders page so customers can clearly view order status, view order details, view receipt, and cancel an order with a reason.

The My Orders page should show a table or card list with these columns:

* Order ID
* Order Date
* Total Amount
* Payment Status
* Order Status
* Actions

Use sample records:

1. Order ID: ORD-1780305433166
   Order Date: 2026/06/01
   Total Amount: RM 30.00
   Payment Status: Pending
   Order Status: Processing

2. Order ID: ORD-1002
   Order Date: 2026/05/20
   Total Amount: RM 28.00
   Payment Status: Verified
   Order Status: Shipped

3. Order ID: ORD-1003
   Order Date: 2026/05/19
   Total Amount: RM 65.00
   Payment Status: Verified
   Order Status: Delivered

Actions for each order:

* View
* Receipt
* Cancel

Rules:

* Show Cancel button only for orders with status Processing or Pending.
* Do not show Cancel button for Shipped, Delivered, or Cancelled orders.
* Receipt button should open a receipt page or receipt modal.
* View button should open order details page or modal.

4. Order Details Modal/Page

When the customer clicks “View”, show a detailed order view.

Include:

* Order ID
* Order Date
* Payment Status
* Order Status
* Delivery Option
* Payment Method
* Customer Name
* Phone Number
* Delivery Address
* Order Items
* Quantity
* Item Price
* Total Amount

Use sample item:

* Floral Scrunchie Set
* Quantity: 2
* Price: RM 15.00
* Total: RM 30.00

Add buttons:

* Close
* View Receipt
* Cancel Order, only if the order is still Processing or Pending

5. Receipt Page or Receipt Modal

Create a receipt view for customer orders.

Title: Order Receipt

Receipt should include:

* Receipt No: RCP-001
* Order ID
* Payment Date
* Customer Name
* Payment Method
* Payment Status
* Items Purchased
* Quantity
* Unit Price
* Total Amount

Add a clean receipt-style layout that looks printable.

Buttons:

* Download Receipt
* Back to My Orders

For prototype, Download Receipt can show a success toast:
“Receipt download started.”

6. Cancel Order with Reason

When the customer clicks “Cancel”, open a confirmation modal.

Modal title:
Cancel Order?

Text:
Please provide a reason for cancelling this order. This helps the admin understand the cancellation request.

Fields:

* Cancellation Reason * textarea

Add buttons:

* Keep Order
* Submit Cancellation

Validation:

* If the reason is empty, show “Please enter a cancellation reason.”

After submitting:

* Change the order status to Cancelled.
* Show red or orange status badge “Cancelled”.
* Show a green success toast: “Order cancellation request submitted.”
* Hide the Cancel button after cancellation.
* Keep the View and Receipt buttons.

7. Navigation and Routing

Make sure all customer navigation buttons work properly:

* Home links to homepage
* Products links to product listing
* About links to About page
* Community Recycling links to Community Recycling page
* Contact links to Contact page
* My Orders links to My Orders page
* My Profile links to My Profile page
* Login links to Login page
* Cart icon links to Shopping Cart page
* Shop Now links to Products page

Do not leave “Page Not Found” for these customer pages.

8. Design Style Requirements

Keep everything consistent with the existing Kraf Hibiscus website style:

* Cream background
* Soft pink primary buttons
* Rounded white cards
* Light beige borders
* Green badges for successful/active/verified status
* Orange badges for pending/processing status
* Red badges for cancelled/rejected status
* Elegant serif headings
* Clean readable body font
* Professional spacing and alignment

Do not remove existing customer product, cart, checkout, payment, and order success pages. Only improve and connect the Register, My Profile, and My Orders related pages.
