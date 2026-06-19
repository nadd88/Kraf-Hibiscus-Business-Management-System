import { useState, useMemo } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockCustomers } from '../../data/adminData';
import { Search, Filter, Eye, Edit, XCircle, X, AlertTriangle, Save } from 'lucide-react';
import { toast } from 'sonner';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CustomerOrder {
  id: string;
  date: string;
  total: number;
  status: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
  status: 'Active' | 'Inactive';
  adminRemarks: string;
  totalOrders: number;
  latestOrder?: CustomerOrder;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const CUSTOMER_ORDERS: Record<string, CustomerOrder[]> = {
  'CUST-001': [
    { id: 'ORD-1001', date: '2026-05-20', total: 48.00, status: 'Processing' },
    { id: 'ORD-0998', date: '2026-05-15', total: 65.00, status: 'Delivered' },
    { id: 'ORD-0975', date: '2026-04-28', total: 28.00, status: 'Delivered' },
  ],
  'CUST-002': [
    { id: 'ORD-1003', date: '2026-05-19', total: 70.00, status: 'Delivered' },
    { id: 'ORD-0980', date: '2026-04-10', total: 34.00, status: 'Delivered' },
  ],
  'CUST-003': [
    { id: 'ORD-1002', date: '2026-05-20', total: 55.00, status: 'Shipped' },
  ],
  'CUST-004': [
    { id: 'ORD-1005', date: '2026-05-18', total: 73.00, status: 'Cancellation Requested' },
    { id: 'ORD-0960', date: '2026-02-14', total: 45.00, status: 'Delivered' },
  ],
  'CUST-005': [
    { id: 'ORD-1005', date: '2026-05-18', total: 73.00, status: 'Cancellation Requested' },
  ],
  'CUST-006': [
    { id: 'ORD-1006', date: '2026-06-01', total: 115.00, status: 'Processing' },
  ],
};

function buildInitialCustomers(): Customer[] {
  return mockCustomers.map((c) => {
    const orders = CUSTOMER_ORDERS[c.id] ?? [];
    const sorted = [...orders].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return {
      ...c,
      adminRemarks: c.adminRemarks ?? '',
      totalOrders: orders.length,
      latestOrder: sorted[0],
    };
  });
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

const ORDER_STATUS_BADGE: Record<string, string> = {
  Processing: 'bg-[#E8A87C] text-white',
  Shipped: 'bg-[#6BAEBF] text-white',
  Delivered: 'bg-[#8FBF9F] text-white',
  Cancelled: 'bg-[#C94C4C] text-white',
  'Cancellation Requested': 'bg-[#C94C4C] text-white',
};

function fmtDate(iso: string) {
  return iso.replace(/-/g, '/');
}

// ─── View Modal ────────────────────────────────────────────────────────────────

function ViewCustomerModal({
  customer,
  onClose,
}: {
  customer: Customer;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] sticky top-0 bg-white z-10">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">
            Customer Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5F5F] hover:text-[#C94C4C] hover:bg-[#FFF8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Profile */}
          <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#E8D8C8]">
            <h3 className="text-xs text-[#9B8B8B] mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="text-[#9B8B8B]">Customer ID</p>
                <p className="text-[#3B2F2F]">{customer.id}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Full Name</p>
                <p className="text-[#3B2F2F]">{customer.name}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Email</p>
                <p className="text-[#3B2F2F]">{customer.email}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Phone Number</p>
                <p className="text-[#3B2F2F]">{customer.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[#9B8B8B]">Delivery Address</p>
                <p className="text-[#3B2F2F]">{customer.address}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Registration Date</p>
                <p className="text-[#3B2F2F]">{fmtDate(customer.registrationDate)}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Account Status</p>
                <span
                  className={`inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-xs ${
                    customer.status === 'Active'
                      ? 'bg-[#8FBF9F] text-white'
                      : 'bg-[#C8C8C8] text-white'
                  }`}
                >
                  {customer.status}
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#E8D8C8]">
            <h3 className="text-xs text-[#9B8B8B] mb-3">Order Summary</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="text-[#9B8B8B]">Total Orders</p>
                <p className="text-[#3B2F2F]">{customer.totalOrders}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Latest Order</p>
                {customer.latestOrder ? (
                  <div>
                    <p className="text-[#3B2F2F]">{customer.latestOrder.id}</p>
                    <p className="text-xs text-[#9B8B8B]">
                      {fmtDate(customer.latestOrder.date)} · RM{' '}
                      {customer.latestOrder.total.toFixed(2)}
                    </p>
                    <span
                      className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs ${
                        ORDER_STATUS_BADGE[customer.latestOrder.status] ??
                        'bg-[#6B5F5F] text-white'
                      }`}
                    >
                      {customer.latestOrder.status}
                    </span>
                  </div>
                ) : (
                  <p className="text-[#9B8B8B]">No orders yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Admin Remarks */}
          <div>
            <p className="text-xs text-[#9B8B8B] mb-1">Admin Remarks</p>
            <div className="bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8] text-sm text-[#3B2F2F] min-h-[48px]">
              {customer.adminRemarks || (
                <span className="text-[#C8C8C8]">No remarks.</span>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Modal ────────────────────────────────────────────────────────────────

function EditCustomerModal({
  customer,
  onSave,
  onClose,
}: {
  customer: Customer;
  onSave: (
    id: string,
    data: Pick<Customer, 'name' | 'email' | 'phone' | 'address' | 'status' | 'adminRemarks'>,
  ) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [address, setAddress] = useState(customer.address);
  const [status, setStatus] = useState<'Active' | 'Inactive'>(customer.status);
  const [adminRemarks, setAdminRemarks] = useState(customer.adminRemarks);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(customer.id, { name, email, phone, address, status, adminRemarks });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] sticky top-0 bg-white z-10">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">
            Edit Customer
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5F5F] hover:text-[#C94C4C] hover:bg-[#FFF8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="p-6 space-y-4">
            {/* Read-only fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#9B8B8B] mb-1">Customer ID</label>
                <input
                  type="text"
                  value={customer.id}
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm bg-[#FFF8F0] text-[#9B8B8B] cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-[#9B8B8B] mb-1">Registration Date</label>
                <input
                  type="text"
                  value={fmtDate(customer.registrationDate)}
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm bg-[#FFF8F0] text-[#9B8B8B] cursor-not-allowed"
                />
              </div>
            </div>

            {/* Editable fields */}
            <div>
              <label className="block text-sm text-[#3B2F2F] mb-1">
                Full Name <span className="text-[#C94C4C]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]"
              />
            </div>

            <div>
              <label className="block text-sm text-[#3B2F2F] mb-1">
                Email <span className="text-[#C94C4C]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]"
              />
            </div>

            <div>
              <label className="block text-sm text-[#3B2F2F] mb-1">
                Phone Number <span className="text-[#C94C4C]">*</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]"
              />
            </div>

            <div>
              <label className="block text-sm text-[#3B2F2F] mb-1">
                Delivery Address <span className="text-[#C94C4C]">*</span>
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Customer's personal delivery address"
                className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#3B2F2F] mb-1">Account Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#3B2F2F] mb-1">
                Admin Remarks <span className="text-[#9B8B8B]">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={adminRemarks}
                onChange={(e) => setAdminRemarks(e.target.value)}
                placeholder="Internal notes about this customer..."
                className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#E8D8C8] flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Deactivate Modal ──────────────────────────────────────────────────────────

function DeactivateModal({
  customer,
  onConfirm,
  onClose,
}: {
  customer: Customer;
  onConfirm: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">
            Deactivate Account?
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5F5F] hover:text-[#C94C4C] hover:bg-[#FFF8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex gap-4 items-start">
          <div className="w-12 h-12 bg-[#E8A87C] rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-[#3B2F2F] mb-1">
              Are you sure you want to deactivate{' '}
              <strong>{customer.name}</strong>'s account?
            </p>
            <p className="text-sm text-[#6B5F5F]">
              They will not be able to place new orders. You can reactivate the account
              by editing the customer later.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#E8D8C8] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-2.5 border-2 border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(customer.id)}
            className="flex-1 px-5 py-2.5 bg-[#E8A87C] text-white rounded-lg hover:bg-[#D89A6C] transition-colors text-sm"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function CustomerListPage() {
  const [customers, setCustomers] = useState<Customer[]>(buildInitialCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [deactivateCustomer, setDeactivateCustomer] = useState<Customer | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return customers.filter((c) => {
      const matchesSearch =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  const handleSaveEdit = (
    id: string,
    data: Pick<Customer, 'name' | 'email' | 'phone' | 'address' | 'status' | 'adminRemarks'>,
  ) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c)),
    );
    setEditCustomer(null);
    toast.success('Customer details updated successfully.');
  };

  const handleDeactivate = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Inactive' } : c)),
    );
    setDeactivateCustomer(null);
    toast.success('Customer account has been deactivated.');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">
            Customer Management
          </h1>
          <p className="text-sm text-[#6B5F5F] mt-1">
            View and manage customer accounts.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl p-5 border border-[#E8D8C8]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F5F]" />
              <input
                type="text"
                placeholder="Search by Customer ID, name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]"
              />
            </div>
            <div className="md:w-52 relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F5F]" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as 'All' | 'Active' | 'Inactive')
                }
                className="w-full pl-9 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] appearance-none bg-white text-[#3B2F2F]"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-[#9B8B8B] mt-3">
            Showing {filtered.length} of {customers.length} customer
            {customers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#FFF8F0] border-b border-[#E8D8C8]">
                <tr>
                  {[
                    'Customer ID',
                    'Customer Name',
                    'Email',
                    'Phone Number',
                    'Registration Date',
                    'Status',
                    'Actions',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-[#6B5F5F]"
                    >
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FFF8F0] transition-colors">
                      <td className="px-5 py-3 text-[#9B8B8B] whitespace-nowrap">{c.id}</td>
                      <td className="px-5 py-3 text-[#3B2F2F] whitespace-nowrap">{c.name}</td>
                      <td className="px-5 py-3 text-[#6B5F5F]">{c.email}</td>
                      <td className="px-5 py-3 text-[#6B5F5F] whitespace-nowrap">{c.phone}</td>
                      <td className="px-5 py-3 text-[#6B5F5F] whitespace-nowrap">
                        {fmtDate(c.registrationDate)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs ${
                            c.status === 'Active'
                              ? 'bg-[#8FBF9F] text-white'
                              : 'bg-[#C8C8C8] text-white'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setViewCustomer(c)}
                            className="p-1.5 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#C76B83] rounded transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditCustomer(c)}
                            className="p-1.5 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#EFA3B7] rounded transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeactivateCustomer(c)}
                            disabled={c.status === 'Inactive'}
                            className="p-1.5 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#E8A87C] rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Deactivate"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {viewCustomer && (
        <ViewCustomerModal
          customer={viewCustomer}
          onClose={() => setViewCustomer(null)}
        />
      )}
      {editCustomer && (
        <EditCustomerModal
          customer={editCustomer}
          onSave={handleSaveEdit}
          onClose={() => setEditCustomer(null)}
        />
      )}
      {deactivateCustomer && (
        <DeactivateModal
          customer={deactivateCustomer}
          onConfirm={handleDeactivate}
          onClose={() => setDeactivateCustomer(null)}
        />
      )}
    </AdminLayout>
  );
}
