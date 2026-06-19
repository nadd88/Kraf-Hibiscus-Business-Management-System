import { useState, useMemo } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  Search, Filter, Eye, CheckCircle, XCircle, X, AlertTriangle,
  FileText, Download, Building2, Calendar, CreditCard,
} from 'lucide-react';
import { toast } from 'sonner';

// ─── Types ─────────────────────────────────────────────────────────────────────

type PaymentStatus = 'Pending' | 'Verified' | 'Rejected';

interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  paymentMethod: string;
  amount: number;
  paymentDate: string;
  status: PaymentStatus;
  rejectionReason?: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'PAY-001',
    orderId: 'ORD-1001',
    customerName: 'Sarah Ahmad',
    paymentMethod: 'Online Transfer',
    amount: 48.00,
    paymentDate: '2026-05-20',
    status: 'Verified',
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-1002',
    customerName: 'Ahmad bin Hassan',
    paymentMethod: 'E-wallet',
    amount: 55.00,
    paymentDate: '2026-05-20',
    status: 'Verified',
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-1003',
    customerName: 'Lim Wei Ting',
    paymentMethod: 'Online Transfer',
    amount: 70.00,
    paymentDate: '2026-05-19',
    status: 'Verified',
  },
  {
    id: 'PAY-004',
    orderId: 'ORD-1004',
    customerName: 'Nurul Aisyah',
    paymentMethod: 'Online Transfer',
    amount: 83.00,
    paymentDate: '2026-05-21',
    status: 'Pending',
  },
  {
    id: 'PAY-005',
    orderId: 'ORD-1006',
    customerName: 'Priya Nair',
    paymentMethod: 'E-wallet',
    amount: 115.00,
    paymentDate: '2026-06-01',
    status: 'Pending',
  },
  {
    id: 'PAY-006',
    orderId: 'ORD-1007',
    customerName: 'Rosmawati binti Yusuf',
    paymentMethod: 'Online Transfer',
    amount: 68.00,
    paymentDate: '2026-05-16',
    status: 'Rejected',
    rejectionReason: 'Bank transfer reference number does not match. Please resubmit with correct proof.',
  },
];

const FILTER_OPTIONS: Array<PaymentStatus | 'All'> = ['All', 'Pending', 'Verified', 'Rejected'];

// ─── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<PaymentStatus, string> = {
  Verified: 'bg-[#8FBF9F] text-white',
  Pending: 'bg-[#E8A87C] text-white',
  Rejected: 'bg-[#C94C4C] text-white',
};

function fmtDate(iso: string) {
  return iso.replace(/-/g, '/');
}

// ─── Mock PDF Preview ─────────────────────────────────────────────────────────

function MockPdfPreview({ payment }: { payment: Payment }) {
  return (
    <div className="border-2 border-dashed border-[#EFA3B7] rounded-xl bg-[#FFF8F0] overflow-hidden">
      {/* PDF toolbar mock */}
      <div className="bg-[#F5EDE3] px-4 py-2 flex items-center justify-between border-b border-[#E8D8C8]">
        <div className="flex items-center gap-2 text-xs text-[#6B5F5F]">
          <FileText className="w-4 h-4 text-[#C76B83]" />
          <span>payment_confirmation_{payment.id.toLowerCase()}.pdf</span>
        </div>
        <button className="flex items-center gap-1 text-xs text-[#C76B83] hover:text-[#EFA3B7]">
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
      </div>

      {/* Mock receipt content */}
      <div className="p-6 font-mono text-xs text-[#3B2F2F] space-y-3">
        <div className="text-center space-y-1 mb-4">
          <p className="text-sm font-medium">MAYBANK BERHAD</p>
          <p className="text-[#6B5F5F]">Payment Receipt / Resit Pembayaran</p>
          <p className="text-[#9B8B8B]">www.maybank2u.com.my</p>
        </div>

        <div className="border-t border-[#E8D8C8] pt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-[#6B5F5F]">Reference No.</span>
            <span>MBB{payment.id.replace('PAY-', '')}2026{Math.floor(Math.random() * 9000 + 1000)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B5F5F]">Transaction Date</span>
            <span>{fmtDate(payment.paymentDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B5F5F]">Transfer Type</span>
            <span>{payment.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B5F5F]">From Account</span>
            <span>****{(parseInt(payment.id.replace('PAY-', '')) * 3721 + 1000).toString().slice(-4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B5F5F]">To Account</span>
            <span>****8943 (Kraf Hibiscus)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B5F5F]">Recipient Ref.</span>
            <span>{payment.orderId}</span>
          </div>
        </div>

        <div className="border-t-2 border-[#E8D8C8] pt-3 flex justify-between items-center">
          <span className="text-[#6B5F5F]">Amount Transferred</span>
          <span className="text-base text-[#3B2F2F]">RM {payment.amount.toFixed(2)}</span>
        </div>

        <div className="border-t border-[#E8D8C8] pt-3 text-center text-[#9B8B8B] text-[10px]">
          <p>This is a computer-generated receipt. No signature required.</p>
          <p className="mt-1 text-[#C8C8C8]">[Mock data — not a real transaction]</p>
        </div>
      </div>
    </div>
  );
}

// ─── View Modal ────────────────────────────────────────────────────────────────

function ViewPaymentModal({
  payment,
  onClose,
}: {
  payment: Payment;
  onClose: () => void;
}) {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] sticky top-0 bg-white z-10">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">
            Payment Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5F5F] hover:text-[#C94C4C] hover:bg-[#FFF8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Payment Info */}
          <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#E8D8C8]">
            <h3 className="text-xs text-[#9B8B8B] mb-4">Payment Information</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <p className="text-[#9B8B8B]">Payment ID</p>
                <p className="text-[#3B2F2F]">{payment.id}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Order ID</p>
                <p className="text-[#3B2F2F]">{payment.orderId}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Customer Name</p>
                <p className="text-[#3B2F2F]">{payment.customerName}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Payment Method</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#C76B83]" />
                  <p className="text-[#3B2F2F]">{payment.paymentMethod}</p>
                </div>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Payment Amount</p>
                <p className="text-[#3B2F2F]">RM {payment.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[#9B8B8B]">Payment Date</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C76B83]" />
                  <p className="text-[#3B2F2F]">{fmtDate(payment.paymentDate)}</p>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-[#9B8B8B]">Payment Status</p>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs ${STATUS_BADGE[payment.status]}`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          </div>

          {/* Rejection reason if rejected */}
          {payment.status === 'Rejected' && payment.rejectionReason && (
            <div className="bg-[#FFF0F0] rounded-xl p-4 border border-[#C94C4C]/30">
              <p className="text-xs text-[#C94C4C] mb-1">Rejection Reason</p>
              <p className="text-sm text-[#3B2F2F]">{payment.rejectionReason}</p>
            </div>
          )}

          {/* Payment Confirmation section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-[#3B2F2F]">Uploaded Payment Confirmation</h3>
              <button
                onClick={() => setShowPdf(!showPdf)}
                className="flex items-center gap-2 px-4 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm"
              >
                <FileText className="w-4 h-4" />
                {showPdf ? 'Hide' : 'View Payment Confirmation PDF'}
              </button>
            </div>

            {!showPdf && (
              <div className="flex items-center gap-3 px-4 py-3 bg-[#FFF8F0] rounded-lg border border-[#E8D8C8] text-sm text-[#6B5F5F]">
                <Building2 className="w-4 h-4 text-[#EFA3B7] shrink-0" />
                Payment proof uploaded by customer on {fmtDate(payment.paymentDate)}.
                Click the button above to preview.
              </div>
            )}

            {showPdf && (
              <div className="space-y-2">
                <p className="text-xs text-[#9B8B8B]">
                  Displaying uploaded payment confirmation PDF.
                </p>
                <MockPdfPreview payment={payment} />
              </div>
            )}
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

// ─── Verify Modal ──────────────────────────────────────────────────────────────

function VerifyPaymentModal({
  payment,
  onConfirm,
  onClose,
}: {
  payment: Payment;
  onConfirm: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">Verify Payment?</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5F5F] hover:text-[#C94C4C] hover:bg-[#FFF8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex gap-4 items-start">
          <div className="w-12 h-12 bg-[#8FBF9F] rounded-full flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-[#3B2F2F] mb-1">
              Are you sure this payment has been received correctly?
            </p>
            <div className="mt-3 bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8] text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-[#9B8B8B]">Payment ID</span>
                <span className="text-[#3B2F2F]">{payment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9B8B8B]">Customer</span>
                <span className="text-[#3B2F2F]">{payment.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9B8B8B]">Amount</span>
                <span className="text-[#3B2F2F]">RM {payment.amount.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-[#9B8B8B] mt-3">
              This will set the payment status to <strong>Verified</strong> and update
              the order payment status to <strong>Paid</strong>.
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
            onClick={() => onConfirm(payment.id)}
            className="flex-1 px-5 py-2.5 bg-[#8FBF9F] text-white rounded-lg hover:bg-[#7AA98A] transition-colors text-sm"
          >
            Confirm Verification
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Reject Modal ──────────────────────────────────────────────────────────────

function RejectPaymentModal({
  payment,
  onConfirm,
  onClose,
}: {
  payment: Payment;
  onConfirm: (id: string, reason: string) => void;
  onClose: () => void;
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleReject = () => {
    if (!reason.trim()) {
      setError('Please enter a rejection reason.');
      return;
    }
    onConfirm(payment.id, reason.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">Reject Payment?</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B5F5F] hover:text-[#C94C4C] hover:bg-[#FFF8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 bg-[#C94C4C] rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-[#3B2F2F] mb-1">
                Rejecting payment <strong>{payment.id}</strong> for{' '}
                <strong>{payment.customerName}</strong>.
              </p>
              <p className="text-xs text-[#9B8B8B]">
                The customer will be notified with the rejection reason below.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#3B2F2F] mb-1.5">
              Rejection Reason <span className="text-[#C94C4C]">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              placeholder="Explain why this payment is being rejected..."
              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 text-[#3B2F2F] resize-none transition-colors ${
                error
                  ? 'border-[#C94C4C] focus:ring-[#C94C4C]/30'
                  : 'border-[#E8D8C8] focus:ring-[#EFA3B7]'
              }`}
            />
            {error && (
              <p className="text-xs text-[#C94C4C] mt-1">{error}</p>
            )}
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
            onClick={handleReject}
            className="flex-1 px-5 py-2.5 bg-[#C94C4C] text-white rounded-lg hover:bg-[#A03C3C] transition-colors text-sm"
          >
            Reject Payment
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function PaymentListPage() {
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'All'>('All');

  const [viewPayment, setViewPayment] = useState<Payment | null>(null);
  const [verifyPayment, setVerifyPayment] = useState<Payment | null>(null);
  const [rejectPayment, setRejectPayment] = useState<Payment | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return payments.filter((p) => {
      const matchesSearch =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.orderId.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchQuery, statusFilter]);

  const handleVerify = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'Verified' } : p)),
    );
    setVerifyPayment(null);
    toast.success('Payment has been verified successfully.');
  };

  const handleReject = (id: string, reason: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: 'Rejected', rejectionReason: reason } : p,
      ),
    );
    setRejectPayment(null);
    toast.error('Payment has been rejected.');
  };

  const pendingCount = payments.filter((p) => p.status === 'Pending').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">
              Payment Management
            </h1>
            <p className="text-sm text-[#6B5F5F] mt-1">
              Review and verify customer payment submissions.
            </p>
          </div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#FFF3E0] border border-[#E8A87C]/40 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-[#E8A87C]" />
              <span className="text-sm text-[#C77A2A]">
                {pendingCount} payment{pendingCount !== 1 ? 's' : ''} pending verification
              </span>
            </div>
          )}
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-xl p-5 border border-[#E8D8C8]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F5F]" />
              <input
                type="text"
                placeholder="Search by Payment ID, Order ID, or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]"
              />
            </div>
            <div className="md:w-52 relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5F5F]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | 'All')}
                className="w-full pl-9 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] appearance-none bg-white text-[#3B2F2F]"
              >
                {FILTER_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-[#9B8B8B] mt-3">
            Showing {filtered.length} of {payments.length} payment{payments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#FFF8F0] border-b border-[#E8D8C8]">
                <tr>
                  {[
                    'Payment ID', 'Order ID', 'Customer Name',
                    'Payment Method', 'Amount', 'Payment Date',
                    'Status', 'Actions',
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
                    <td colSpan={8} className="px-5 py-12 text-center text-sm text-[#6B5F5F]">
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((payment) => (
                    <tr
                      key={payment.id}
                      className={`hover:bg-[#FFF8F0] transition-colors ${
                        payment.status === 'Pending' ? 'bg-[#FFFAF5]' : ''
                      }`}
                    >
                      <td className="px-5 py-3 text-[#9B8B8B] whitespace-nowrap">
                        {payment.id}
                      </td>
                      <td className="px-5 py-3 text-[#3B2F2F] whitespace-nowrap">
                        {payment.orderId}
                      </td>
                      <td className="px-5 py-3 text-[#3B2F2F] whitespace-nowrap">
                        {payment.customerName}
                      </td>
                      <td className="px-5 py-3 text-[#6B5F5F] whitespace-nowrap">
                        {payment.paymentMethod}
                      </td>
                      <td className="px-5 py-3 text-[#3B2F2F] whitespace-nowrap">
                        RM {payment.amount.toFixed(2)}
                      </td>
                      <td className="px-5 py-3 text-[#6B5F5F] whitespace-nowrap">
                        {new Date(payment.paymentDate).toLocaleDateString('en-MY', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs ${STATUS_BADGE[payment.status]}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1.5 items-center">
                          {/* View */}
                          <button
                            onClick={() => setViewPayment(payment)}
                            className="flex items-center gap-1 px-2.5 py-1 text-xs border border-[#E8D8C8] text-[#6B5F5F] rounded hover:bg-[#F5EDE3] hover:text-[#C76B83] transition-colors"
                            title="View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>

                          {/* Verify (Pending only) */}
                          {payment.status === 'Pending' && (
                            <button
                              onClick={() => setVerifyPayment(payment)}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs bg-[#8FBF9F] text-white rounded hover:bg-[#7AA98A] transition-colors"
                              title="Verify"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Verify
                            </button>
                          )}

                          {/* Reject (Pending only) */}
                          {payment.status === 'Pending' && (
                            <button
                              onClick={() => setRejectPayment(payment)}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs bg-[#C94C4C] text-white rounded hover:bg-[#A03C3C] transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Reject
                            </button>
                          )}
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
      {viewPayment && (
        <ViewPaymentModal
          payment={viewPayment}
          onClose={() => setViewPayment(null)}
        />
      )}
      {verifyPayment && (
        <VerifyPaymentModal
          payment={verifyPayment}
          onConfirm={handleVerify}
          onClose={() => setVerifyPayment(null)}
        />
      )}
      {rejectPayment && (
        <RejectPaymentModal
          payment={rejectPayment}
          onConfirm={handleReject}
          onClose={() => setRejectPayment(null)}
        />
      )}
    </AdminLayout>
  );
}
