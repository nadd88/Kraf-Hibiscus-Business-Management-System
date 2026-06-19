import { useState, useMemo } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockFinancialRecords, incomeCategories, expenseCategories } from '../../data/adminData';
import type { FinancialRecord } from '../../data/adminData';
import { toast } from 'sonner';
import { DollarSign, TrendingUp, TrendingDown, Search, Eye, Trash2, X, Receipt, BarChart2 } from 'lucide-react';
import { Link } from 'react-router';

const PAYMENT_METHODS = ['Cash', 'Bank Transfer', 'Online Transfer', 'E-wallet'];

// Enrich initial records with createdDate
interface LocalRecord extends FinancialRecord {
  relatedSupplier?: string;
  createdDate: string;
}

const INITIAL_RECORDS: LocalRecord[] = mockFinancialRecords.map((r) => ({
  ...r,
  createdDate: r.date,
}));

// ─── View Modal ───────────────────────────────────────────────────────────────

function ViewTransactionModal({ record, onClose }: { record: LocalRecord; onClose: () => void }) {
  const isIncome = record.type === 'Income';
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Transaction Details</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Transaction ID</p>
              <p className="text-sm text-[#3B2F2F]">{record.id}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Type</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs ${isIncome ? 'bg-[#E8F5EE] text-[#5A9E72]' : 'bg-[#FDEAEA] text-[#C94C4C]'}`}>
                {record.type}
              </span>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Date</p>
              <p className="text-sm text-[#3B2F2F]">{record.date.replace(/-/g, '/')}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Created Date</p>
              <p className="text-sm text-[#3B2F2F]">{record.createdDate.replace(/-/g, '/')}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Category</p>
              <p className="text-sm text-[#3B2F2F]">{record.category}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Amount</p>
              <p className={`text-sm ${isIncome ? 'text-[#8FBF9F]' : 'text-[#C94C4C]'}`}>
                RM {record.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Payment Method</p>
              <p className="text-sm text-[#3B2F2F]">{record.paymentMethod}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Recorded By</p>
              <p className="text-sm text-[#3B2F2F]">{record.createdBy}</p>
            </div>
            {(record.relatedOrder || record.relatedSupplier) && (
              <div className="col-span-2">
                <p className="text-xs text-[#6B5F5F] mb-1">{isIncome ? 'Related Order' : 'Related Supplier / Item'}</p>
                <p className="text-sm text-[#3B2F2F]">{record.relatedOrder || record.relatedSupplier || '—'}</p>
              </div>
            )}
            <div className="col-span-2">
              <p className="text-xs text-[#6B5F5F] mb-1">Description</p>
              <div className="bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8]">
                <p className="text-sm text-[#3B2F2F]">{record.description || '—'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirmation Modal ─────────────────────────────────────────────────

function DeleteTransactionModal({ record, onConfirm, onClose }: { record: LocalRecord; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-[#FDEAEA] rounded-full mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-[#C94C4C]" />
          </div>
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F] text-center mb-2">Delete Transaction?</h2>
          <p className="text-sm text-[#3B2F2F] text-center mb-1">{record.id} — {record.category}</p>
          <p className="text-sm text-[#6B5F5F] text-center">
            Are you sure you want to delete this financial record? This action cannot be undone in this prototype.
          </p>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-5 py-2 bg-[#C94C4C] text-white rounded-lg hover:bg-[#A03C3C] transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── Record Income Modal ───────────────────────────────────────────────────────

function RecordIncomeModal({ onSave, onClose, nextId }: { onSave: (r: LocalRecord) => void; onClose: () => void; nextId: string }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ date: today, category: incomeCategories[0], relatedOrder: '', amount: '', paymentMethod: 'Online Transfer', description: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: '' })); };

  const handleSave = () => {
    const e: Record<string, string> = {};
    if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) e.amount = 'Enter a valid amount.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ id: nextId, date: form.date, type: 'Income', category: form.category, amount: parseFloat(form.amount), paymentMethod: form.paymentMethod, relatedOrder: form.relatedOrder.trim() || undefined, description: form.description.trim(), createdBy: 'Admin User', createdDate: today });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Record Income</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Income Date</label>
              <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]" />
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Income Category</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white">
                {incomeCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Amount (RM)</label>
              <input type="number" min="0" step="0.01" value={form.amount} onChange={(e) => set('amount', e.target.value)} placeholder="0.00" className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${errors.amount ? 'border-red-400' : 'border-[#E8D8C8]'}`} />
              {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Payment Method</label>
              <select value={form.paymentMethod} onChange={(e) => set('paymentMethod', e.target.value)} className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white">
                {PAYMENT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Related Order ID <span className="text-[#C8B8B8]">(optional)</span></label>
            <input type="text" value={form.relatedOrder} onChange={(e) => set('relatedOrder', e.target.value)} placeholder="e.g. ORD-1001" className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]" />
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe this income transaction" className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] resize-none ${errors.description ? 'border-red-400' : 'border-[#E8D8C8]'}`} />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#8FBF9F] text-white rounded-lg hover:bg-[#7AA98A] transition-colors">Save Income Record</button>
        </div>
      </div>
    </div>
  );
}

// ─── Record Expense Modal ──────────────────────────────────────────────────────

function RecordExpenseModal({ onSave, onClose, nextId }: { onSave: (r: LocalRecord) => void; onClose: () => void; nextId: string }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ date: today, category: expenseCategories[0], amount: '', paymentMethod: 'Bank Transfer', description: '', relatedSupplier: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: '' })); };

  const handleSave = () => {
    const e: Record<string, string> = {};
    if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) e.amount = 'Enter a valid amount.';
    if (!form.description.trim()) e.description = 'Description is required.';
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ id: nextId, date: form.date, type: 'Expense', category: form.category, amount: parseFloat(form.amount), paymentMethod: form.paymentMethod, relatedSupplier: form.relatedSupplier.trim() || undefined, description: form.description.trim(), createdBy: 'Admin User', createdDate: today });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Record Expense</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Expense Date</label>
              <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]" />
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Expense Category</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white">
                {expenseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Amount (RM)</label>
              <input type="number" min="0" step="0.01" value={form.amount} onChange={(e) => set('amount', e.target.value)} placeholder="0.00" className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${errors.amount ? 'border-red-400' : 'border-[#E8D8C8]'}`} />
              {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Payment Method</label>
              <select value={form.paymentMethod} onChange={(e) => set('paymentMethod', e.target.value)} className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white">
                {PAYMENT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe this expense" className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] resize-none ${errors.description ? 'border-red-400' : 'border-[#E8D8C8]'}`} />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Related Supplier / Item <span className="text-[#C8B8B8]">(optional)</span></label>
            <input type="text" value={form.relatedSupplier} onChange={(e) => set('relatedSupplier', e.target.value)} placeholder="e.g. Green Fabric Recyclers Sdn Bhd" className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#C94C4C] text-white rounded-lg hover:bg-[#A03C3C] transition-colors">Save Expense Record</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function FinancialRecordsPage() {
  const [records, setRecords] = useState<LocalRecord[]>(INITIAL_RECORDS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const [viewRecord, setViewRecord] = useState<LocalRecord | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<LocalRecord | null>(null);
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);

  const totalIncome = useMemo(() => records.filter((r) => r.type === 'Income').reduce((s, r) => s + r.amount, 0), [records]);
  const totalExpense = useMemo(() => records.filter((r) => r.type === 'Expense').reduce((s, r) => s + r.amount, 0), [records]);
  const netProfit = totalIncome - totalExpense;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return records.filter((r) => {
      const matchSearch = !q || r.id.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.paymentMethod.toLowerCase().includes(q) || (r.relatedOrder ?? '').toLowerCase().includes(q) || (r.relatedSupplier ?? '').toLowerCase().includes(q);
      const matchType = typeFilter === 'all' || r.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [records, search, typeFilter]);

  const nextId = useMemo(() => {
    const nums = records.map((r) => parseInt(r.id.replace('TRX-', ''), 10));
    return `TRX-${String(Math.max(...nums) + 1).padStart(3, '0')}`;
  }, [records]);

  const handleDelete = () => {
    if (!deleteRecord) return;
    setRecords((prev) => prev.filter((r) => r.id !== deleteRecord.id));
    setDeleteRecord(null);
    toast.success('Transaction record has been deleted successfully.');
  };

  const handleAddIncome = (r: LocalRecord) => {
    setRecords((prev) => [r, ...prev]);
    setShowIncome(false);
    toast.success('Income record has been saved successfully.');
  };

  const handleAddExpense = (r: LocalRecord) => {
    setRecords((prev) => [r, ...prev]);
    setShowExpense(false);
    toast.success('Expense record has been saved successfully.');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Financial Records</h1>
          <p className="text-sm text-[#6B5F5F] mt-1">Track income, expenses, and net profit</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#E8D8C8]">
            <div className="p-3 bg-[#8FBF9F] rounded-lg w-fit mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-[#6B5F5F] mb-1">Total Income</p>
            <p className="text-2xl text-[#3B2F2F]">RM {totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#E8D8C8]">
            <div className="p-3 bg-[#C94C4C] rounded-lg w-fit mb-4">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-[#6B5F5F] mb-1">Total Expense</p>
            <p className="text-2xl text-[#3B2F2F]">RM {totalExpense.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#E8D8C8]">
            <div className="p-3 bg-[#EFA3B7] rounded-lg w-fit mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-[#6B5F5F] mb-1">Net Profit</p>
            <p className={`text-2xl ${netProfit >= 0 ? 'text-[#8FBF9F]' : 'text-[#C94C4C]'}`}>
              RM {netProfit.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setShowIncome(true)} className="px-5 py-2.5 bg-[#8FBF9F] text-white rounded-lg hover:bg-[#7AA98A] transition-colors">
            + Record Income
          </button>
          <button onClick={() => setShowExpense(true)} className="px-5 py-2.5 bg-[#C94C4C] text-white rounded-lg hover:bg-[#A03C3C] transition-colors">
            + Record Expense
          </button>
          <Link
            to="/admin/reports"
            className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            Generate Report
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          <div className="p-5 border-b border-[#E8D8C8]">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8B8B8]" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Transaction ID, category, payment method, or order..." className="w-full pl-10 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white" />
              </div>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="sm:w-40 px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white">
                <option value="all">All Types</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Date</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Type</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Category</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Amount</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Payment Method</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Related Order</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center gap-2 text-[#C8B8B8]">
                        <Receipt className="w-8 h-8" />
                        <p className="text-sm">No transactions found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((record) => (
                    <tr key={record.id} className="hover:bg-[#FFF8F0] transition-colors">
                      <td className="px-6 py-4 text-sm text-[#6B5F5F] whitespace-nowrap">{record.id}</td>
                      <td className="px-6 py-4 text-sm text-[#6B5F5F] whitespace-nowrap">{record.date.replace(/-/g, '/')}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs ${record.type === 'Income' ? 'bg-[#E8F5EE] text-[#5A9E72]' : 'bg-[#FDEAEA] text-[#C94C4C]'}`}>{record.type}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#3B2F2F] whitespace-nowrap">{record.category}</td>
                      <td className="px-6 py-4 text-sm text-[#3B2F2F] whitespace-nowrap">RM {record.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-[#3B2F2F] whitespace-nowrap">{record.paymentMethod}</td>
                      <td className="px-6 py-4 text-sm text-[#6B5F5F] whitespace-nowrap">{record.relatedOrder || record.relatedSupplier || '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button onClick={() => setViewRecord(record)} className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#FFF8F0] rounded transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteRecord(record)} className="p-1.5 text-[#C94C4C] hover:text-[#A03C3C] hover:bg-[#FDEAEA] rounded transition-colors" title="Delete">
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
          {filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-[#E8D8C8] text-xs text-[#6B5F5F]">
              Showing {filtered.length} of {records.length} transactions
            </div>
          )}
        </div>
      </div>

      {viewRecord && <ViewTransactionModal record={viewRecord} onClose={() => setViewRecord(null)} />}
      {deleteRecord && <DeleteTransactionModal record={deleteRecord} onConfirm={handleDelete} onClose={() => setDeleteRecord(null)} />}
      {showIncome && <RecordIncomeModal onSave={handleAddIncome} onClose={() => setShowIncome(false)} nextId={nextId} />}
      {showExpense && <RecordExpenseModal onSave={handleAddExpense} onClose={() => setShowExpense(false)} nextId={nextId} />}
    </AdminLayout>
  );
}
