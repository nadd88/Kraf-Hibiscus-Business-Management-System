Continue the same Kraf Hibiscus Business Management System admin dashboard design.

Now design the complete Staff and Task Management Subsystem screens. This subsystem is used by Admin only. Staff members do not log in to the system. Admin manages staff records, tasks, task assignments, task progress, task completion, and staff contribution records.

Use the same admin dashboard layout:
- Left sidebar
- Top header
- Main content area
- Cream and soft pink theme
- White rounded cards
- Soft shadows
- Dusty rose action buttons
- Status badges
- Clean tables and forms

Create the following screens:

1. Staff List Page
Purpose: Admin views and manages staff records.
Page title: “Staff Management”
Subtitle: “Manage staff information, status, and related records.”
Components:
- Search bar: “Search by staff name or role”
- Filter by Status: All, Active, Inactive
- Filter by Role
- Button: “+ Add Staff”
- Staff table columns:
  Staff ID
  Staff Name
  Contact Number
  Role
  Joining Date
  Status
  Actions
- Status badges:
  Active = soft green badge
  Inactive = grey or light pink badge
- Action buttons:
  View
  Edit
  Deactivate

Button interactions:
- + Add Staff goes to Add Staff Record Form
- View goes to Staff Details Page
- Edit goes to Update Staff Information Form
- Deactivate opens Deactivate Staff Confirmation Popup

2. Add Staff Record Form
Purpose: UC026 Add Staff Record.
Page title: “Add Staff Record”
Components:
- Staff Name input, required
- Contact Number input, required
- Role input or dropdown, required
- Joining Date date picker
- Status dropdown: Active, Inactive
- Remarks textarea
- Save Staff Record button
- Cancel button

Button interactions:
- Save Staff Record shows success message and goes back to Staff List Page
- Cancel goes back to Staff List Page

Validation messages:
- Please fill in required information.
- Contact number format is invalid.
- Staff record already exists.

3. Staff Details Page
Purpose: View full staff information.
Page title: “Staff Details”
Components:
- Staff profile summary card
- Staff Name
- Contact Number
- Role
- Joining Date
- Status
- Remarks
- Recent Assigned Tasks section
- Contribution Summary section
Buttons:
- Edit Staff
- Deactivate Staff
- Back to Staff List

Button interactions:
- Edit Staff goes to Update Staff Information Form
- Deactivate Staff opens Deactivate Staff Confirmation Popup
- Back goes to Staff List Page

4. Update Staff Information Form
Purpose: UC028 Update Staff Information.
Page title: “Update Staff Information”
Components:
- Pre-filled Staff Name input
- Pre-filled Contact Number input
- Role dropdown
- Joining Date
- Status dropdown
- Remarks textarea
- Save Changes button
- Cancel button

Button interactions:
- Save Changes shows success message and goes back to Staff Details Page or Staff List Page
- Cancel goes back to Staff Details Page

5. Deactivate Staff Confirmation Popup
Purpose: UC029 Deactivate Staff Record.
Popup title: “Deactivate Staff Record?”
Text:
“This staff member will be marked as inactive and cannot be assigned new tasks. Existing task and contribution records will remain in the system.”
Components:
- Staff name preview
- Cancel button
- Confirm Deactivate button

Button interactions:
- Cancel closes popup
- Confirm Deactivate updates staff status to Inactive and returns to Staff List Page

6. Task List Page
Purpose: Admin views and manages task records.
Page title: “Task Management”
Subtitle: “Create, assign, monitor, and complete internal tasks.”
Components:
- Search bar: “Search by task title”
- Status filter: All, Pending, Assigned, In Progress, Completed, Cancelled
- Assigned staff filter
- Due date filter
- Button: “+ Create Task”
- Task table columns:
  Task ID
  Task Title
  Assigned Staff
  Due Date
  Status
  Progress
  Actions
- Status badges:
  Pending
  Assigned
  In Progress
  Completed
  Cancelled
- Action buttons:
  View
  Assign
  Update Progress
  Confirm Completion

Button interactions:
- + Create Task goes to Create Task Form
- View goes to Task Details Page
- Assign goes to Assign Task Form
- Update Progress goes to Update Task Progress Form
- Confirm Completion opens Confirm Task Completion Popup

7. Create Task Form
Purpose: UC030 Create Task.
Page title: “Create Task”
Components:
- Task Title input, required
- Task Description textarea
- Due Date date picker, required
- Priority dropdown: Low, Medium, High
- Initial Status dropdown: Pending, Assigned, In Progress
- Remarks textarea
- Save Task button
- Cancel button

Button interactions:
- Save Task shows success message and goes back to Task List Page
- Cancel goes back to Task List Page

Validation messages:
- Task title is required.
- Due date cannot be earlier than current date.
- Duplicate task record found.

8. Task Details Page
Purpose: View task details.
Page title: “Task Details”
Components:
- Task title
- Task description
- Assigned staff
- Due date
- Task status
- Progress remarks
- Created date
- Last updated date
- Contribution status if completed
Buttons:
- Assign Task
- Update Progress
- Confirm Completion
- Back to Task List

Button interactions:
- Assign Task goes to Assign Task Form
- Update Progress goes to Update Task Progress Form
- Confirm Completion opens Confirm Task Completion Popup
- Back goes to Task List Page

9. Assign Task Form
Purpose: UC031 Assign Task.
Page title: “Assign Task”
Components:
- Selected Task, read-only
- Select Staff dropdown, active staff only
- Assigned Date date picker
- Due Date date picker
- Assignment Remarks textarea
- Assign Task button
- Cancel button

Important:
- Staff dropdown should only show active staff.
- Inactive staff can be greyed out or hidden.
- Show validation message if no staff is selected.

Button interactions:
- Assign Task shows success message and goes back to Task Details Page
- Cancel goes back to Task Details Page

Validation messages:
- Please select a staff member.
- Selected staff is inactive.
- Due date is invalid.
- Task record not found.

10. Update Task Progress Form
Purpose: UC033 Update Task Progress.
Page title: “Update Task Progress”
Components:
- Task Title, read-only
- Current Status, read-only
- New Status dropdown:
  Pending
  Assigned
  In Progress
  Completed
  Cancelled
- Progress Remarks textarea
- Updated Date
- Save Progress Update button
- Cancel button

Button interactions:
- Save Progress Update shows success message and goes back to Task Details Page
- Cancel goes back to Task Details Page

Validation messages:
- Invalid status update.
- No changes made.
- Task record not found.

11. Confirm Task Completion Popup
Purpose: UC034 Confirm Task Completion.
Popup title: “Confirm Task Completion?”
Text:
“Once confirmed, the task status will be updated to Completed and a staff contribution record will be created.”
Components:
- Task Title
- Assigned Staff
- Completion Date
- Contribution Details textarea
- Remarks textarea
- Cancel button
- Confirm Completion button

Button interactions:
- Cancel closes popup
- Confirm Completion updates task status to Completed, creates contribution record, and returns to Task Details Page with success message

12. Contribution Records List Page
Purpose: UC036 Review Contribution Records.
Page title: “Staff Contribution Management”
Subtitle: “Record and review staff contribution after task completion.”
Components:
- Search bar: “Search by staff name or task title”
- Date range filter
- Staff filter
- Button: “+ Record Contribution”
- Contribution table columns:
  Contribution ID
  Staff Name
  Task Title
  Completion Date
  Contribution Details
  Recorded By
  Actions
- Action button:
  View Details

Button interactions:
- + Record Contribution goes to Record Staff Contribution Form
- View Details goes to Contribution Details Page
- Search and filters update table results

13. Record Staff Contribution Form
Purpose: UC035 Record Staff Contribution.
Page title: “Record Staff Contribution”
Components:
- Select Staff dropdown, required
- Select Completed Task dropdown, required
- Completion Date
- Contribution Details textarea, required
- Remarks textarea
- Save Contribution Record button
- Cancel button
- When completed task is selected, show a small task summary:
  Task Title
  Assigned Staff
  Completion Date

Button interactions:
- Save Contribution Record shows success message and goes back to Contribution Records List Page
- Cancel goes back to Contribution Records List Page

Validation messages:
- Required information is missing.
- Completed task record not found.
- Duplicate contribution record exists.

14. Contribution Details Page
Purpose: View contribution record details.
Page title: “Contribution Details”
Components:
- Contribution ID
- Staff Name
- Task Title
- Completion Date
- Contribution Details
- Remarks
- Recorded By
- Created Date
Button:
- Back to Contribution Records

Button interactions:
- Back goes to Contribution Records List Page

Make all pages consistent, detailed, professional, and suitable for a web-based admin dashboard. Include realistic sample data in tables. Use cream and pink theme throughout.