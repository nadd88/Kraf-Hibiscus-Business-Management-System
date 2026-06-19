import { useState, useMemo } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Search, Filter, Eye, Edit, Trash2, X, AlertTriangle, Save } from 'lucide-react';
import { toast } from 'sonner';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

type PaymentStatus = 'Pending' | 'Pending Verification' | 'Paid' | 'Rejected';
type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Cancellation Requested';

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  paymentMethod: string;
  payment: PaymentStatus;
  status: OrderStatus;
  items: OrderItem[];
  cancellationReason?: string;
  adminNote?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    customer: 'Sarah Ahmad',
    email: 'sarah.ahmad@example.com',
    phone: '+60 12-345 6789',
    address: 'No. 12, Jalan Meranti 3, Taman Universiti, 81300 Skudai, Johor',
    date: '2026-05-20',
    paymentMethod: 'Online Transfer',
    payment: 'Paid',
    status: 'Processing',
    items: [
      { name: 'Floral Scrunchie Set', quantity: 2, unitPrice: 15.00 },
      { name: 'Mini Coin Purse', quantity: 1, unitPrice: 18.00 },
    ],
  },
  {
    id: 'ORD-1002',
    customer: 'Ahmad bin Hassan',
    email: 'ahmad@example.com',
    phone: '+60 11-234 5678',
    address: 'No. 5, Jalan Bahagia 2, Taman Bahagia, 81300 Skudai, Johor',
    date: '2026-05-20',
    paymentMethod: 'E-wallet',
    payment: 'Paid',
    status: 'Shipped',
    items: [
      { name: 'Batik Tote Bag', quantity: 1, unitPrice: 55.00 },
    ],
  },
  {
    id: 'ORD-1003',
    customer: 'Lim Wei Ting',
    email: 'lim@example.com',
    phone: '+60 16-789 0123',
    address: 'Unit 8-3, Residensi Setia, Jalan Setia 1, 81200 Johor Bahru',
    date: '2026-05-19',
    paymentMethod: 'Online Transfer',
    payment: 'Paid',
    status: 'Delivered',
    items: [
      { name: 'Crossbody Bag', quantity: 1, unitPrice: 70.00 },
    ],
  },
  {
    id: 'ORD-1004',
    customer: 'Nurul Aisyah',
    email: 'nurul@example.com',
    phone: '+60 17-456 7890',
    address: 'No. 21, Jalan Cempaka 4, Taman Cempaka, 81300 Skudai, Johor',
    date: '2026-05-19',
    paymentMethod: 'Online Transfer',
    payment: 'Pending Verification',
    status: 'Processing',
    items: [
      { name: 'Floral Scrunchie Set', quantity: 1, unitPrice: 15.00 },
      { name: 'Quilted Fabric Pouch', quantity: 2, unitPrice: 34.00 },
    ],
  },
  {
    id: 'ORD-1005',
    customer: 'Tan Wei Liang',
    email: 'twl@example.com',
    phone: '+60 18-567 8901',
    address: 'No. 3, Lorong Mawar 6, Taman Indah, 81400 Senai, Johor',
    date: '2026-05-18',
    paymentMethod: 'Cash on Pickup',
    payment: 'Pending',
    status: 'Cancellation Requested',
    items: [
      { name: 'Batik Tote Bag', quantity: 1, unitPrice: 55.00 },
      { name: 'Mini Coin Purse', quantity: 1, unitPrice: 18.00 },
    ],
    cancellationReason: 'Changed my mind and no longer need the items.',
  },
  {
    id: 'ORD-1006',
    customer: 'Priya Nair',
    email: 'priya@example.com',
    phone: '+60 13-678 9012',
    address: 'No. 9, Jalan Kenanga 1, Taman Kenanga, 81300 Skudai, Johor',
    date: '2026-06-01',
    paymentMethod: 'E-wallet',
    payment: 'Pending Verification',
    status: 'Processing',
    items: [
      { name: 'Crossbody Bag', quantity: 1, unitPrice: 70.00 },
      { name: 'Floral Scrunchie Set', quantity: 3, unitPrice: 15.00 },
    ],
  },
  {
    id: 'ORD-1007',
    customer: 'Rosmawati binti Yusuf',
    email: 'ros@example.com',
    phone: '+60 14-321 0987',
    address: 'No. 15, Jalan Pelangi 3, Taman Pelangi, 81750 Masai, Johor',
    date: '2026-05-15',
    paymentMethod: 'Online Transfer',
    payment: 'Rejected',
    status: 'Cancelled',
    items: [
      { name: 'Quilted Fabric Pouch', quantity: 2, unitPrice: 34.00 },
    ],
    adminNote: 'Payment rejected — bank transfer reference not matching.',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function orderTotal(order: Order): number {
  return order.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
}

const PAYMENT_BADGE: Record<PaymentStatus, string> = {
  'Paid': 'bg-[#8FBF9F] text-white',
  'Pending': 'bg-[#E8A87C] text-white',
  'Pending Verification': 'bg-[#C9943C] text-white',
  'Rejected': 'bg-[#C94C4C] text-white',
};

const STATUS_BADGE: Record<OrderStatus, string> = {
  'Processing': 'bg-[#E8A87C] text-white',
  'Shipped': 'bg-[#6BAEBF] text-white',
  'Delivered': 'bg-[#8FBF9F] text-white',
  'Cancelled': 'bg-[#C94C4C] text-white',
  'Cancellation Requested': 'bg-[#C94C4C] text-white',
};

function PaymentBadge({ value }: { value: PaymentStatus }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs ${PAYMENT_BADGE[value]}`}>
      {value}
    </span>
  );
}

function StatusBadge({ value }: { value: OrderStatus }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs ${STATUS_BADGE[value]}`}>
      {value}
    </span>
  );
}

const ALL_STATUSES: Array<OrderStatus | 'All'> = [
  'All', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Cancellation Requested',
];

// ─── View Modal ───────────────────────────────────────────────────────────────

function ViewOrderModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const total = orderTotal(order);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] sticky top-0 bg-white z-10">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">
            Order Details — {order.id}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5F5F] hover:text-[#C94C4C] hover:bg-[#FFF8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#E8D8C8]">
            <h3 className="text-sm text-[#9B8B8B] mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="text-[#9B8B8B]">Name</p>
                <p className="text-[#3B2F2F]">{order.customer}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Email</p>
                <p className="text-[#3B2F2F]">{order.email}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Phone</p>
                <p className="text-[#3B2F2F]">{order.phone}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Order Date</p>
                <p className="text-[#3B2F2F]">{order.date.replace(/-/g, '/')}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[#9B8B8B]">Delivery Address</p>
                <p className="text-[#3B2F2F]">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#E8D8C8]">
            <h3 className="text-sm text-[#9B8B8B] mb-3">Order Information</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="text-[#9B8B8B]">Payment Method</p>
                <p className="text-[#3B2F2F]">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Payment Status</p>
                <div className="mt-0.5">
                  <PaymentBadge value={order.payment} />
                </div>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Order Status</p>
                <div className="mt-0.5">
                  <StatusBadge value={order.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-sm text-[#9B8B8B] mb-3">Ordered Items</h3>
            <div className="border border-[#E8D8C8] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#FFF8F0]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-[#6B5F5F]">Item</th>
                    <th className="px-4 py-3 text-right text-xs text-[#6B5F5F]">Qty</th>
                    <th className="px-4 py-3 text-right text-xs text-[#6B5F5F]">Unit Price</th>
                    <th className="px-4 py-3 text-right text-xs text-[#6B5F5F]">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="border-t border-[#E8D8C8]">
                      <td className="px-4 py-3 text-[#3B2F2F]">{item.name}</td>
                      <td className="px-4 py-3 text-right text-[#3B2F2F]">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-[#3B2F2F]">RM {item.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-[#3B2F2F]">
                        RM {(item.quantity * item.unitPrice).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[#E8D8C8] bg-[#FFF8F0]">
                    <td colSpan={3} className="px-4 py-3 text-right text-[#3B2F2F]">
                      Total
                    </td>
                    <td className="px-4 py-3 text-right text-[#3B2F2F]">
                      RM {total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cancellation Reason */}
          {order.cancellationReason && (
            <div className="bg-[#FFF0E0] rounded-xl p-4 border border-[#E8A87C]/40">
              <p className="text-xs text-[#C77A2A] mb-1">Customer Cancellation Reason</p>
              <p className="text-sm text-[#3B2F2F]">{order.cancellationReason}</p>
            </div>
          )}

          {/* Admin Note */}
          {order.adminNote && (
            <div className="bg-[#FFF8F0] rounded-xl p-4 border border-[#E8D8C8]">
              <p className="text-xs text-[#9B8B8B] mb-1">Admin Note</p>
              <p className="text-sm text-[#3B2F2F]">{order.adminNote}</p>
            </div>
          )}
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

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditOrderModal({
  order,
  onSave,
  onClose,
}: {
  order: Order;
  onSave: (id: string, payment: PaymentStatus, status: OrderStatus, note: string) => void;
  onClose: () => void;
}) {
  const [payment, setPayment] = useState<PaymentStatus>(order.payment);
  const [status, setStatus] = useState<OrderStatus>(
    order.status === 'Cancellation Requested' ? 'Processing' : order.status
  );
  const [adminNote, setAdminNote] = useState(order.adminNote ?? '');

  const handleSave = () => {
    onSave(order.id, payment, status, adminNote);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">
            Edit Order — {order.id}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5F5F] hover:text-[#C94C4C] hover:bg-[#FFF8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Customer summary */}
          <div className="bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8] text-sm">
            <span className="text-[#9B8B8B]">Customer: </span>
            <span className="text-[#3B2F2F]">{order.customer}</span>
            <span className="text-[#9B8B8B] ml-4">Date: </span>
            <span className="text-[#3B2F2F]">{order.date.replace(/-/g, '/')}</span>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm text-[#3B2F2F] mb-2">Payment Status</label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value as PaymentStatus)}
              className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="Pending Verification">Pending Verification</option>
              <option value="Paid">Paid</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Order Status */}
          <div>
            <label className="block text-sm text-[#3B2F2F] mb-2">Order Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] bg-white"
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Admin Remarks */}
          <div>
            <label className="block text-sm text-[#3B2F2F] mb-2">Admin Remarks (optional)</label>
            <textarea
              rows={3}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Add an internal note or remark..."
              className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cancel Modal ─────────────────────────────────────────────────────────────

function CancelOrderModal({
  order,
  onConfirm,
  onClose,
}: {
  order: Order;
  onConfirm: (id: string, note: string) => void;
  onClose: () => void;
}) {
  const [note, setNote] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">Cancel Order?</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5F5F] hover:text-[#C94C4C] hover:bg-[#FFF8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-[#E8A87C] rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#3B2F2F] mb-1">
                Are you sure you want to cancel order <strong>{order.id}</strong>?
              </p>
              <p className="text-sm text-[#6B5F5F]">
                The customer will be notified. This action cannot be undone.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#3B2F2F] mb-2">
              Admin Cancellation Note{' '}
              <span className="text-[#9B8B8B]">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter a reason or note for this cancellation..."
              className="w-full px-3 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] resize-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#E8D8C8] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-2.5 border-2 border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
          >
            Keep Order
          </button>
          <button
            onClick={() => onConfirm(order.id, note)}
            className="flex-1 px-5 py-2.5 bg-[#C94C4C] text-white rounded-lg hover:bg-[#A03C3C] transition-colors text-sm"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');

  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [cancelOrder, setCancelOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return orders.filter((o) => {
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const handleSaveEdit = (
    id: string,
    payment: PaymentStatus,
    status: OrderStatus,
    note: string,
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, payment, status, adminNote: note || o.adminNote }
          : o,
      ),
    );
    setEditOrder(null);
    toast.success('Order status updated successfully.');
  };

  const handleConfirmCancel = (id: string, note: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: 'Cancelled',
              adminNote: note || o.adminNote,
            }
          : o,
      ),
    );
    setCancelOrder(null);
    toast.success(`Order ${id} has been cancelled.`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">
            Orders Management
          </h1>
          <p className="text-sm text-[#6B5F5F] mt-1">
            Manage and track all customer orders.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl p-5 border border-[#E8D8C8]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F5F]" />
              <input
                type="text"
                placeholder="Search by Order ID, customer name, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]"
              />
            </div>
            <div className="md:w-64 relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F5F]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'All')}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] appearance-none bg-white text-[#3B2F2F]"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-[#9B8B8B] mt-3">
            Showing {filtered.length} of {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#FFF8F0] border-b border-[#E8D8C8]">
                <tr>
                  {['Order ID', 'Customer', 'Email', 'Date', 'Total', 'Payment', 'Status', 'Actions'].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-sm text-[#6B5F5F]">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FFF8F0] transition-colors">
                      <td className="px-5 py-3 text-[#3B2F2F] whitespace-nowrap">{order.id}</td>
                      <td className="px-5 py-3 text-[#3B2F2F] whitespace-nowrap">{order.customer}</td>
                      <td className="px-5 py-3 text-[#6B5F5F] max-w-[160px] truncate">{order.email}</td>
                      <td className="px-5 py-3 text-[#6B5F5F] whitespace-nowrap">
                        {order.date.replace(/-/g, '/')}
                      </td>
                      <td className="px-5 py-3 text-[#3B2F2F] whitespace-nowrap">
                        RM {orderTotal(order).toFixed(2)}
                      </td>
                      <td className="px-5 py-3">
                        <PaymentBadge value={order.payment} />
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge value={order.status} />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setViewOrder(order)}
                            className="p-1.5 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#C76B83] rounded transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditOrder(order)}
                            className="p-1.5 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#EFA3B7] rounded transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCancelOrder(order)}
                            disabled={order.status === 'Cancelled'}
                            className="p-1.5 text-[#6B5F5F] hover:bg-[#F5EDE3] hover:text-[#C94C4C] rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Cancel Order"
                          >
                            <Trash2 className="w-4 h-4" />
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
      {viewOrder && (
        <ViewOrderModal order={viewOrder} onClose={() => setViewOrder(null)} />
      )}
      {editOrder && (
        <EditOrderModal
          order={editOrder}
          onSave={handleSaveEdit}
          onClose={() => setEditOrder(null)}
        />
      )}
      {cancelOrder && (
        <CancelOrderModal
          order={cancelOrder}
          onConfirm={handleConfirmCancel}
          onClose={() => setCancelOrder(null)}
        />
      )}
    </AdminLayout>
  );
}
