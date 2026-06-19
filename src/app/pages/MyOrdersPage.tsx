import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Eye, FileText, X, Printer } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  paymentStatus: 'Pending' | 'Verified' | 'Failed' | 'Pending Verification';
  orderStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Cancellation Requested';
  customerName: string;
  phone: string;
  address: string;
  deliveryOption: string;
  paymentMethod: string;
  items: OrderItem[];
}

function buildSampleOrders(customerName: string, phone: string, address: string): Order[] {
  return [
    {
      id: 'ORD-1780305433166',
      date: '2026/06/01',
      total: 30.0,
      paymentStatus: 'Pending',
      orderStatus: 'Processing',
      customerName,
      phone,
      address,
      deliveryOption: 'Home Delivery',
      paymentMethod: 'Online Transfer',
      items: [{ id: '1', name: 'Floral Scrunchie Set', qty: 2, price: 15.0 }],
    },
    {
      id: 'ORD-1002',
      date: '2026/05/20',
      total: 28.0,
      paymentStatus: 'Verified',
      orderStatus: 'Shipped',
      customerName,
      phone,
      address,
      deliveryOption: 'Home Delivery',
      paymentMethod: 'Online Transfer',
      items: [{ id: '2', name: 'Canvas Tote Bag', qty: 2, price: 14.0 }],
    },
    {
      id: 'ORD-1003',
      date: '2026/05/19',
      total: 65.0,
      paymentStatus: 'Verified',
      orderStatus: 'Delivered',
      customerName,
      phone,
      address,
      deliveryOption: 'Home Delivery',
      paymentMethod: 'Online Transfer',
      items: [
        { id: '3', name: 'Fabric Purse', qty: 1, price: 35.0 },
        { id: '4', name: 'Mini Scrunchie Set', qty: 3, price: 10.0 },
      ],
    },
  ];
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    Processing: 'bg-orange-100 text-orange-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
    'Cancellation Requested': 'bg-amber-100 text-amber-700',
    Pending: 'bg-orange-100 text-orange-700',
    'Pending Verification': 'bg-yellow-100 text-yellow-700',
    Verified: 'bg-green-100 text-green-700',
    Failed: 'bg-red-100 text-red-700',
  };
  return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${map[status] ?? 'bg-gray-100 text-gray-700'}`;
}

function canCancel(order: Order) {
  return order.orderStatus === 'Processing';
}

export function MyOrdersPage() {
  const { customer } = useAuth();

  const SAMPLE_ORDERS = buildSampleOrders(
    customer?.fullName ?? 'Sarah Ahmad',
    customer?.phone ?? '+60 12-345 6789',
    customer?.address ?? 'No. 12, Jalan Meranti 3, Taman Universiti, 81300 Skudai, Johor, Malaysia'
  );

  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError] = useState('');

  const openCancel = (id: string) => {
    setCancelOrderId(id);
    setCancelReason('');
    setCancelError('');
  };

  const handleCancelSubmit = () => {
    if (!cancelReason.trim()) {
      setCancelError('Please provide a cancellation reason.');
      return;
    }
    setOrders((prev) =>
      prev.map((o) =>
        o.id === cancelOrderId ? { ...o, orderStatus: 'Cancellation Requested' as const } : o
      )
    );
    if (viewOrder?.id === cancelOrderId) setViewOrder(null);
    setCancelOrderId(null);
    setCancelReason('');
    setCancelError('');
    toast.success('Cancellation request submitted successfully.');
  };

  const liveOrder = (id: string) => orders.find((o) => o.id === id) ?? null;

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-8">My Orders</h1>

        {/* Desktop table */}
        <div className="hidden md:block bg-white rounded-2xl border border-[#E8D8C8] overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FFF8F0] border-b border-[#E8D8C8]">
                {['Order ID', 'Order Date', 'Total Amount', 'Payment Status', 'Order Status', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-sm text-[#6B5F5F]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-[#F5EDE3] last:border-0 hover:bg-[#FDFAF8]">
                  <td className="px-5 py-4 text-sm text-[#3B2F2F]">{order.id}</td>
                  <td className="px-5 py-4 text-sm text-[#3B2F2F]">{order.date}</td>
                  <td className="px-5 py-4 text-sm text-[#3B2F2F]">RM {order.total.toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <span className={statusBadge(order.paymentStatus)}>{order.paymentStatus}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={statusBadge(order.orderStatus)}>{order.orderStatus}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => setViewOrder(order)}
                        className="px-3 py-1.5 border border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-sm flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                      <button
                        onClick={() => setReceiptOrder(order)}
                        className="px-3 py-1.5 border border-[#C76B83] text-[#C76B83] rounded-lg hover:bg-[#FFF0F4] transition-colors text-sm flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> Receipt
                      </button>
                      {canCancel(order) && (
                        <button
                          onClick={() => openCancel(order.id)}
                          className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-5 border border-[#E8D8C8]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-[#6B5F5F] mb-0.5">Order ID</p>
                  <p className="text-[#3B2F2F] text-sm">{order.id}</p>
                </div>
                <span className={statusBadge(order.orderStatus)}>{order.orderStatus}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-xs text-[#6B5F5F]">Date</p>
                  <p className="text-[#3B2F2F]">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B5F5F]">Total</p>
                  <p className="text-[#3B2F2F]">RM {order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B5F5F]">Payment</p>
                  <span className={statusBadge(order.paymentStatus)}>{order.paymentStatus}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setViewOrder(order)} className="px-3 py-1.5 border border-[#EFA3B7] text-[#3B2F2F] rounded-lg text-sm flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> View
                </button>
                <button onClick={() => setReceiptOrder(order)} className="px-3 py-1.5 border border-[#C76B83] text-[#C76B83] rounded-lg text-sm flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Receipt
                </button>
                {canCancel(order) && (
                  <button onClick={() => openCancel(order.id)} className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-1">
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Order Details Modal ── */}
      {viewOrder && (() => {
        const live = liveOrder(viewOrder.id) ?? viewOrder;
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="flex justify-between items-center px-8 py-6 border-b border-[#E8D8C8]">
                <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">Order Details</h2>
                <button onClick={() => setViewOrder(null)} className="text-[#6B5F5F] hover:text-[#C94C4C]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-8 py-6">
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm mb-6">
                  <DetailCell label="Order ID" value={live.id} />
                  <DetailCell label="Order Date" value={live.date} />
                  <DetailCell label="Customer Name" value={live.customerName} />
                  <DetailCell label="Phone Number" value={live.phone} />
                  <DetailCell label="Delivery Option" value={live.deliveryOption} />
                  <DetailCell label="Payment Method" value={live.paymentMethod} />
                  <DetailCell label="Payment Status" value={live.paymentStatus} isBadge />
                  <DetailCell label="Order Status" value={live.orderStatus} isBadge />
                  <div className="col-span-2">
                    <DetailCell label="Delivery Address" value={live.address} />
                  </div>
                </div>

                <div className="border-t border-[#E8D8C8] pt-5">
                  <h3 className="text-[#3B2F2F] mb-3">Ordered Items</h3>
                  <div className="space-y-2 mb-5">
                    {live.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-[#FFF8F0] rounded-lg text-sm">
                        <div>
                          <p className="text-[#3B2F2F]">{item.name}</p>
                          <p className="text-[#6B5F5F]">Qty: {item.qty} × RM {item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-[#3B2F2F]">RM {(item.qty * item.price).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-[#E8D8C8]">
                    <span className="text-[#3B2F2F]">Total Amount</span>
                    <span className="text-[#3B2F2F] text-lg">RM {live.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 px-8 pb-8 flex-wrap">
                <button
                  onClick={() => setViewOrder(null)}
                  className="px-5 py-2.5 border-2 border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => { setReceiptOrder(live); setViewOrder(null); }}
                  className="px-5 py-2.5 border border-[#C76B83] text-[#C76B83] rounded-lg hover:bg-[#FFF0F4] transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> View Receipt
                </button>
                {canCancel(live) && (
                  <button
                    onClick={() => { openCancel(live.id); setViewOrder(null); }}
                    className="px-5 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Receipt Modal ── */}
      {receiptOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="px-8 pt-8 pb-6 text-center border-b border-dashed border-[#E8D8C8]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FDEAF1] mb-3">
                <Printer className="w-6 h-6 text-[#C76B83]" />
              </div>
              <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F] mb-1">Order Receipt</h2>
              <p className="text-xs text-[#6B5F5F] tracking-widest uppercase">KRAF HIBISCUS — Timeless & Handmade</p>
            </div>

            <div className="px-8 py-5 space-y-3 text-sm border-b border-dashed border-[#E8D8C8]">
              <ReceiptRow label="Receipt No." value={`RCP-${receiptOrder.id.slice(-3)}`} />
              <ReceiptRow label="Order ID" value={receiptOrder.id} />
              <ReceiptRow label="Payment Date" value={receiptOrder.date} />
              <ReceiptRow label="Customer Name" value={receiptOrder.customerName} />
              <ReceiptRow label="Payment Method" value={receiptOrder.paymentMethod} />
              <ReceiptRow label="Payment Status" value={receiptOrder.paymentStatus} isBadge />
            </div>

            <div className="px-8 py-5 border-b border-dashed border-[#E8D8C8]">
              <p className="text-xs text-[#6B5F5F] mb-3 uppercase tracking-wide">Items Purchased</p>
              <div className="space-y-3">
                {receiptOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="text-[#3B2F2F]">{item.name}</p>
                      <p className="text-[#6B5F5F]">{item.qty} × RM {item.price.toFixed(2)}</p>
                    </div>
                    <p className="text-[#3B2F2F]">RM {(item.qty * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#E8D8C8]">
                <span className="text-[#3B2F2F]">Total Amount</span>
                <span className="text-[#3B2F2F] text-lg">RM {receiptOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 px-8 py-6 flex-wrap">
              <button
                onClick={() => toast.success('Receipt download started.')}
                className="flex-1 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm"
              >
                Download Receipt
              </button>
              <button
                onClick={() => setReceiptOrder(null)}
                className="px-5 py-2.5 border-2 border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
              >
                Back to My Orders
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Cancel Order Modal ── */}
      {cancelOrderId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 border border-[#E8D8C8] shadow-xl">
            <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F] mb-2 text-center">Cancel Order?</h2>
            <p className="text-[#6B5F5F] text-sm text-center mb-6">
              Please provide a reason for cancelling this order. This helps the admin understand the cancellation request.
            </p>
            <div className="mb-5">
              <label className="block text-sm text-[#3B2F2F] mb-2">Cancellation Reason *</label>
              <textarea
                value={cancelReason}
                onChange={(e) => { setCancelReason(e.target.value); if (cancelError) setCancelError(''); }}
                rows={4}
                className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] resize-none text-sm"
                placeholder="e.g. Changed my mind, ordered the wrong item..."
              />
              {cancelError && <p className="text-red-600 text-xs mt-1">{cancelError}</p>}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setCancelOrderId(null); setCancelReason(''); setCancelError(''); }}
                className="flex-1 px-5 py-3 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelSubmit}
                className="flex-1 px-5 py-3 bg-[#C94C4C] text-white rounded-lg hover:bg-[#A03C3C] transition-colors"
              >
                Submit Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function DetailCell({ label, value, isBadge }: { label: string; value: string; isBadge?: boolean }) {
  return (
    <div className="py-3 border-b border-[#F5EDE3] last:border-0">
      <p className="text-xs text-[#6B5F5F] mb-0.5">{label}</p>
      {isBadge
        ? <span className={statusBadge(value)}>{value}</span>
        : <p className="text-[#3B2F2F]">{value}</p>}
    </div>
  );
}

function ReceiptRow({ label, value, isBadge }: { label: string; value: string; isBadge?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[#6B5F5F]">{label}</span>
      {isBadge
        ? <span className={statusBadge(value)}>{value}</span>
        : <span className="text-[#3B2F2F]">{value}</span>}
    </div>
  );
}