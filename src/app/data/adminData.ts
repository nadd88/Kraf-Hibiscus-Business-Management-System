export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  status: 'Active' | 'Inactive';
  adminRemarks?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  paymentMethod: string;
  amount: number;
  paymentDate: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  suppliedMaterials: string;
  status: 'Active' | 'Inactive';
}

export interface Material {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  source: string;
  storageLocation: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  supplierId?: string;
}

export interface StockMovement {
  id: string;
  itemName: string;
  itemType: 'Material' | 'Product';
  movementType: 'Stock In' | 'Stock Out' | 'Adjustment';
  quantity: number;
  date: string;
  updatedBy: string;
  remarks: string;
}

export interface FinancialRecord {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
  amount: number;
  paymentMethod: string;
  relatedOrder?: string;
  description: string;
  createdBy: string;
}

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Sarah Ahmad',
    email: 'sarah.ahmad@example.com',
    phone: '+60 12-345 6789',
    address: 'No. 12, Jalan Meranti 3, Taman Universiti, 81300 Skudai, Johor',
    registrationDate: '2026-01-15',
    status: 'Active',
    adminRemarks: '',
  },
  {
    id: 'CUST-002',
    name: 'Lim Wei Ting',
    email: 'lim.weiting@example.com',
    phone: '+60 13-456 7890',
    address: 'No. 5, Jalan Bahagia 2, Taman Bahagia, 81300 Skudai, Johor',
    registrationDate: '2026-02-20',
    status: 'Active',
    adminRemarks: '',
  },
  {
    id: 'CUST-003',
    name: 'Ahmad bin Hassan',
    email: 'ahmad.hassan@example.com',
    phone: '+60 14-567 8901',
    address: 'No. 21, Jalan Cempaka 4, Taman Cempaka, 81300 Skudai, Johor',
    registrationDate: '2026-03-10',
    status: 'Active',
    adminRemarks: '',
  },
  {
    id: 'CUST-004',
    name: 'Nurul Aisyah',
    email: 'nurul.aisyah@example.com',
    phone: '+60 16-678 9012',
    address: 'Unit 8-3, Residensi Setia, Jalan Setia 1, 81200 Johor Bahru, Johor',
    registrationDate: '2025-12-05',
    status: 'Inactive',
    adminRemarks: 'Account inactive — no activity for over 6 months.',
  },
  {
    id: 'CUST-005',
    name: 'Tan Wei Liang',
    email: 'twl@example.com',
    phone: '+60 18-567 8901',
    address: 'No. 3, Lorong Mawar 6, Taman Indah, 81400 Senai, Johor',
    registrationDate: '2026-04-03',
    status: 'Active',
    adminRemarks: '',
  },
  {
    id: 'CUST-006',
    name: 'Priya Nair',
    email: 'priya@example.com',
    phone: '+60 13-678 9012',
    address: 'No. 9, Jalan Kenanga 1, Taman Kenanga, 81300 Skudai, Johor',
    registrationDate: '2026-05-11',
    status: 'Active',
    adminRemarks: '',
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    orderId: 'ORD-1001',
    customerName: 'Sarah Ahmad',
    paymentMethod: 'Online Transfer',
    amount: 45.0,
    paymentDate: '2026-05-20',
    status: 'Verified',
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-1002',
    customerName: 'Ahmad bin Hassan',
    paymentMethod: 'E-wallet',
    amount: 28.0,
    paymentDate: '2026-05-20',
    status: 'Verified',
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-1004',
    customerName: 'Nurul Aisyah',
    paymentMethod: 'Online Transfer',
    amount: 38.0,
    paymentDate: '2026-05-21',
    status: 'Pending',
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Green Fabric Recyclers Sdn Bhd',
    contact: '+60 3-7890 1234',
    email: 'info@greenfabric.com.my',
    address: 'No. 45, Jalan Industri 3, Petaling Jaya',
    suppliedMaterials: 'Cotton, Denim, Mixed Fabrics',
    status: 'Active',
  },
  {
    id: 'SUP-002',
    name: 'EcoTextile Solutions',
    contact: '+60 3-8901 2345',
    email: 'sales@ecotextile.com',
    address: 'Lot 12, Jalan Perdagangan, Shah Alam',
    suppliedMaterials: 'Silk, Velvet, Satin',
    status: 'Active',
  },
  {
    id: 'SUP-003',
    name: 'Community Fabric Donation Center',
    contact: '+60 12-901 2345',
    email: 'donations@cfdc.org',
    address: '88 Jalan Sejahtera, Kuala Lumpur',
    suppliedMaterials: 'Donated Fabrics, Mixed Materials',
    status: 'Active',
  },
];

export const mockMaterials: Material[] = [
  {
    id: 'MAT-001',
    name: 'Cotton Fabric - Floral Pattern',
    category: 'Cotton',
    quantity: 50,
    unit: 'meters',
    source: 'Supplier',
    storageLocation: 'Warehouse A, Shelf 1',
    stockStatus: 'In Stock',
    supplierId: 'SUP-001',
  },
  {
    id: 'MAT-002',
    name: 'Denim Fabric - Blue',
    category: 'Denim',
    quantity: 8,
    unit: 'meters',
    source: 'Supplier',
    storageLocation: 'Warehouse A, Shelf 2',
    stockStatus: 'Low Stock',
    supplierId: 'SUP-001',
  },
  {
    id: 'MAT-003',
    name: 'Velvet Fabric - Purple',
    category: 'Velvet',
    quantity: 25,
    unit: 'meters',
    source: 'Supplier',
    storageLocation: 'Warehouse B, Shelf 1',
    stockStatus: 'In Stock',
    supplierId: 'SUP-002',
  },
  {
    id: 'MAT-004',
    name: 'Mixed Donated Fabrics',
    category: 'Mixed',
    quantity: 0,
    unit: 'kg',
    source: 'Community Donation',
    storageLocation: 'Warehouse C, Bin 1',
    stockStatus: 'Out of Stock',
    supplierId: 'SUP-003',
  },
];

export const mockStockMovements: StockMovement[] = [
  {
    id: 'MOV-001',
    itemName: 'Cotton Fabric - Floral Pattern',
    itemType: 'Material',
    movementType: 'Stock In',
    quantity: 30,
    date: '2026-05-15',
    updatedBy: 'Admin User',
    remarks: 'New shipment from supplier',
  },
  {
    id: 'MOV-002',
    itemName: 'Floral Scrunchie Set',
    itemType: 'Product',
    movementType: 'Stock Out',
    quantity: 15,
    date: '2026-05-20',
    updatedBy: 'Admin User',
    remarks: 'Sold to customer orders',
  },
  {
    id: 'MOV-003',
    itemName: 'Denim Fabric - Blue',
    itemType: 'Material',
    movementType: 'Stock Out',
    quantity: 12,
    date: '2026-05-18',
    updatedBy: 'Siti Aminah',
    remarks: 'Used for production',
  },
];

export const mockFinancialRecords: FinancialRecord[] = [
  {
    id: 'TRX-001',
    date: '2026-05-20',
    type: 'Income',
    category: 'Product Sales',
    amount: 450.0,
    paymentMethod: 'Online Transfer',
    relatedOrder: 'ORD-1001',
    description: 'Payment for order ORD-1001',
    createdBy: 'Admin User',
  },
  {
    id: 'TRX-002',
    date: '2026-05-19',
    type: 'Expense',
    category: 'Material Purchase',
    amount: 280.0,
    paymentMethod: 'Bank Transfer',
    description: 'Cotton fabric purchase from Green Fabric Recyclers',
    createdBy: 'Admin User',
  },
  {
    id: 'TRX-003',
    date: '2026-05-21',
    type: 'Income',
    category: 'Product Sales',
    amount: 280.0,
    paymentMethod: 'E-wallet',
    relatedOrder: 'ORD-1002',
    description: 'Payment for order ORD-1002',
    createdBy: 'Admin User',
  },
  {
    id: 'TRX-004',
    date: '2026-05-18',
    type: 'Expense',
    category: 'Operational Costs',
    amount: 150.0,
    paymentMethod: 'Cash',
    description: 'Packaging materials and shipping supplies',
    createdBy: 'Admin User',
  },
];

export const materialCategories = [
  'Cotton',
  'Denim',
  'Silk',
  'Velvet',
  'Satin',
  'Mixed',
  'Polyester',
  'Linen',
];

export const incomeCategories = [
  'Product Sales',
  'Donation',
  'Workshop Fees',
  'Other Income',
];

export const expenseCategories = [
  'Material Purchase',
  'Operational Costs',
  'Staff Wages',
  'Utilities',
  'Marketing',
  'Transportation',
  'Other Expenses',
];
