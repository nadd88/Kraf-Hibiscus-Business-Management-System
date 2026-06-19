export interface Staff {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
  availabilityStatus: 'Available' | 'Busy' | 'Not Available';
  remarks?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category?: string;
  targetQuantity?: number;
  unit?: string;
  assignedStaff?: string;
  assignedStaffId?: string;
  dueDate: string;
  status: 'Pending' | 'Assigned' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High';
  progress?: string;
  createdDate: string;
  updatedDate: string;
  assignedDate?: string;
  completionDate?: string;
  remarks?: string;
}

export interface Contribution {
  id: string;
  staffId: string;
  staffName: string;
  taskId: string;
  taskTitle: string;
  completionDate: string;
  contributionDetails: string;
  contributionType?: string;
  qualityOutcome?: string;
  reviewStatus?: 'Pending Review' | 'Reviewed' | 'Needs Follow-up';
  reviewNotes?: string;
  remarks?: string;
  recordedBy: string;
  createdDate: string;
}

export const mockStaff: Staff[] = [
  {
    id: 'STF-001',
    name: 'Siti Aminah',
    email: 'siti.aminah@krafhibiscus.com',
    contact: '+60 12-345 6789',
    role: 'Production Lead',
    joiningDate: '2025-01-15',
    status: 'Active',
    availabilityStatus: 'Busy',
    remarks: 'Experienced in handmade crafts',
  },
  {
    id: 'STF-002',
    name: 'Ahmad Faiz',
    email: 'ahmad.faiz@krafhibiscus.com',
    contact: '+60 13-456 7890',
    role: 'Quality Control',
    joiningDate: '2025-02-01',
    status: 'Active',
    availabilityStatus: 'Available',
  },
  {
    id: 'STF-003',
    name: 'Lim Mei Ling',
    email: 'lim.meiling@krafhibiscus.com',
    contact: '+60 14-567 8901',
    role: 'Designer',
    joiningDate: '2025-03-10',
    status: 'Active',
    availabilityStatus: 'Available',
    remarks: 'Specializes in floral patterns',
  },
  {
    id: 'STF-004',
    name: 'Kumar Rajesh',
    email: 'kumar.rajesh@krafhibiscus.com',
    contact: '+60 16-678 9012',
    role: 'Packaging Staff',
    joiningDate: '2025-04-20',
    status: 'Active',
    availabilityStatus: 'Busy',
  },
  {
    id: 'STF-005',
    name: 'Nurul Huda',
    email: 'nurul.huda@krafhibiscus.com',
    contact: '+60 17-789 0123',
    role: 'Production Staff',
    joiningDate: '2024-11-05',
    status: 'Inactive',
    availabilityStatus: 'Not Available',
    remarks: 'On extended leave',
  },
  {
    id: 'STF-006',
    name: 'Chen Wei',
    email: 'chen.wei@krafhibiscus.com',
    contact: '+60 18-890 1234',
    role: 'Inventory Manager',
    joiningDate: '2025-01-20',
    status: 'Active',
    availabilityStatus: 'Available',
  },
];

export const mockTasks: Task[] = [
  {
    id: 'TSK-001',
    title: 'Prepare 50 scrunchies for bulk order',
    description: 'Create 50 floral scrunchies using recycled fabric from Community Batch #12',
    category: 'Product Making',
    targetQuantity: 50,
    unit: 'pcs',
    assignedStaff: 'Siti Aminah',
    assignedStaffId: 'STF-001',
    dueDate: '2026-06-10',
    status: 'In Progress',
    priority: 'High',
    progress: 'Completed 30 out of 50 scrunchies',
    createdDate: '2026-05-15',
    updatedDate: '2026-05-21',
    assignedDate: '2026-05-16',
  },
  {
    id: 'TSK-002',
    title: 'Quality check new bag collection',
    description: 'Inspect all crossbody bags from recent production batch',
    category: 'Quality Check',
    assignedStaff: 'Ahmad Faiz',
    assignedStaffId: 'STF-002',
    dueDate: '2026-06-05',
    status: 'Assigned',
    priority: 'Medium',
    createdDate: '2026-05-18',
    updatedDate: '2026-05-18',
    assignedDate: '2026-05-18',
  },
  {
    id: 'TSK-003',
    title: 'Design new summer collection patterns',
    description: 'Create 5 new pattern designs for summer fabric crafts',
    category: 'Design Work',
    targetQuantity: 5,
    unit: 'designs',
    assignedStaff: 'Lim Mei Ling',
    assignedStaffId: 'STF-003',
    dueDate: '2026-05-28',
    status: 'Completed',
    priority: 'Medium',
    progress: 'All 5 designs completed and approved',
    createdDate: '2026-05-10',
    updatedDate: '2026-05-20',
    assignedDate: '2026-05-11',
    completionDate: '2026-05-20',
  },
  {
    id: 'TSK-004',
    title: 'Sort recycled fabric donations',
    description: 'Sort and categorize 100kg of fabric donations received this week',
    category: 'Sorting',
    targetQuantity: 100,
    unit: 'kg',
    dueDate: '2026-06-08',
    status: 'Pending',
    priority: 'Low',
    createdDate: '2026-05-21',
    updatedDate: '2026-05-21',
  },
  {
    id: 'TSK-005',
    title: 'Pack completed orders for shipping',
    description: 'Package orders ORD-1001 to ORD-1010 for delivery',
    category: 'Packaging',
    targetQuantity: 10,
    unit: 'orders',
    assignedStaff: 'Kumar Rajesh',
    assignedStaffId: 'STF-004',
    dueDate: '2026-06-04',
    status: 'In Progress',
    priority: 'High',
    progress: 'Packed 7 out of 10 orders',
    createdDate: '2026-05-20',
    updatedDate: '2026-05-21',
    assignedDate: '2026-05-20',
  },
  {
    id: 'TSK-006',
    title: 'Update inventory records',
    description: 'Update stock levels after weekly production',
    category: 'Inventory Update',
    assignedStaff: 'Chen Wei',
    assignedStaffId: 'STF-006',
    dueDate: '2026-05-24',
    status: 'Completed',
    priority: 'Medium',
    progress: 'All inventory records updated',
    createdDate: '2026-05-19',
    updatedDate: '2026-05-21',
    assignedDate: '2026-05-19',
    completionDate: '2026-05-21',
  },
  {
    id: 'TSK-007',
    title: 'Train new production staff',
    description: 'Conduct 3-day training program for 2 new production staff members covering scrunchie making, quality standards, and safety procedures.',
    category: 'Training',
    assignedStaff: 'Siti Aminah',
    assignedStaffId: 'STF-001',
    dueDate: '2026-05-18',
    status: 'Completed',
    priority: 'Medium',
    progress: 'Training completed successfully',
    createdDate: '2026-05-12',
    updatedDate: '2026-05-18',
    assignedDate: '2026-05-12',
    completionDate: '2026-05-18',
  },
];

export const mockContributions: Contribution[] = [
  {
    id: 'CNT-001',
    staffId: 'STF-003',
    staffName: 'Lim Mei Ling',
    taskId: 'TSK-003',
    taskTitle: 'Design new summer collection patterns',
    completionDate: '2026-05-20',
    contributionDetails: 'Created 5 unique summer pattern designs including hibiscus, tropical leaves, and ocean wave themes. All designs approved for production.',
    contributionType: 'Design Work',
    qualityOutcome: 'All 5 designs completed and approved for production use.',
    reviewStatus: 'Reviewed',
    reviewNotes: 'Excellent creativity and timely delivery.',
    recordedBy: 'Admin User',
    createdDate: '2026-05-20',
  },
  {
    id: 'CNT-002',
    staffId: 'STF-006',
    staffName: 'Chen Wei',
    taskId: 'TSK-006',
    taskTitle: 'Update inventory records',
    completionDate: '2026-05-21',
    contributionDetails: 'Successfully updated all inventory records after weekly production. Added 45 new items across 4 categories.',
    contributionType: 'Inventory Update',
    qualityOutcome: 'All records updated accurately. Zero discrepancies found.',
    reviewStatus: 'Reviewed',
    remarks: 'Completed ahead of schedule',
    recordedBy: 'Admin User',
    createdDate: '2026-05-21',
  },
  {
    id: 'CNT-003',
    staffId: 'STF-001',
    staffName: 'Siti Aminah',
    taskId: 'TSK-007',
    taskTitle: 'Train new production staff',
    completionDate: '2026-05-18',
    contributionDetails: 'Conducted 3-day training program for 2 new production staff members. Covered scrunchie making, quality standards, and safety procedures.',
    contributionType: 'Training',
    qualityOutcome: 'Both trainees passed the quality assessment with full marks.',
    reviewStatus: 'Pending Review',
    recordedBy: 'Admin User',
    createdDate: '2026-05-18',
  },
];

export const staffRoles = [
  'Production Lead',
  'Production Staff',
  'Designer',
  'Quality Control',
  'Packaging Staff',
  'Inventory Manager',
];