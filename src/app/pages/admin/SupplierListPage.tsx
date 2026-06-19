import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { toast } from 'sonner';
import { Plus, Search, Eye, Edit2, PowerOff, X, Truck, AlertTriangle } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  suppliedMaterials: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
  remarks: string;
}

const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Green Fabric Recyclers Sdn Bhd',
    contact: '+60 3-7890 1234',
    email: 'info@greenfabric.com.my',
    address: 'No. 45, Jalan Industri 3, Taman Industri, 47810 Petaling Jaya, Selangor',
    suppliedMaterials: 'Cotton, Denim, Mixed Fabrics',
    status: 'Active',
    createdDate: '2025-11-10',
    remarks: 'Primary supplier for cotton and denim. Reliable delivery schedule.',
  },
  {
    id: 'SUP-002',
    name: 'EcoTextile Solutions',
    contact: '+60 3-8901 2345',
    email: 'sales@ecotextile.com',
    address: 'Lot 12, Jalan Perdagangan 5, Seksyen 15, 40200 Shah Alam, Selangor',
    suppliedMaterials: 'Silk, Velvet, Satin',
    status: 'Active',
    createdDate: '2025-12-01',
    remarks: 'Specialises in premium fabric types. MOQ applies for silk orders.',
  },
  {
    id: 'SUP-003',
    name: 'Community Fabric Donation Center',
    contact: '+60 12-901 2345',
    email: 'donations@cfdc.org',
    address: '88, Jalan Sejahtera 2, Taman Sejahtera, 58200 Kuala Lumpur',
    suppliedMaterials: 'Donated Fabrics, Mixed Materials',
    status: 'Active',
    createdDate: '2026-01-05',
    remarks: 'Non-profit donation partner. Deliveries are irregular — coordinate in advance.',
  },
  {
    id: 'SUP-004',
    name: 'Fabric Plus Trading',
    contact: '+60 7-234 5678',
    email: 'enquiry@fabricplus.com.my',
    address: 'No. 8, Jalan Perniagaan 4, Taman Perniagaan Skudai, 81300 Skudai, Johor',
    suppliedMaterials: 'Cotton, Polyester',
    status: 'Inactive',
    createdDate: '2025-10-20',
    remarks: 'Supplier deactivated due to quality issues reported in Q4 2025.',
  },
];

// ─── View Modal ───────────────────────────────────────────────────────────────

function ViewSupplierModal({ supplier, onClose }: { supplier: Supplier; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Supplier Details</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Supplier ID</p>
              <p className="text-sm text-[#3B2F2F]">{supplier.id}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs text-white ${supplier.status === 'Active' ? 'bg-[#8FBF9F]' : 'bg-[#C8C8C8]'}`}>
                {supplier.status}
              </span>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-[#6B5F5F] mb-1">Supplier Name</p>
              <p className="text-sm text-[#3B2F2F]">{supplier.name}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Contact Number</p>
              <p className="text-sm text-[#3B2F2F]">{supplier.contact}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Email</p>
              <p className="text-sm text-[#3B2F2F]">{supplier.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-[#6B5F5F] mb-1">Address</p>
              <p className="text-sm text-[#3B2F2F]">{supplier.address}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-[#6B5F5F] mb-1">Supplied Materials</p>
              <p className="text-sm text-[#3B2F2F]">{supplier.suppliedMaterials}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Created Date</p>
              <p className="text-sm text-[#3B2F2F]">{supplier.createdDate.replace(/-/g, '/')}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-[#6B5F5F] mb-1">Remarks</p>
              <p className="text-sm text-[#3B2F2F]">{supplier.remarks || '—'}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditSupplierModal({
  supplier,
  onSave,
  onClose,
}: {
  supplier: Supplier;
  onSave: (updated: Supplier) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: supplier.name,
    contact: supplier.contact,
    email: supplier.email,
    address: supplier.address,
    suppliedMaterials: supplier.suppliedMaterials,
    status: supplier.status as string,
    remarks: supplier.remarks,
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({
      ...supplier,
      name: form.name.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      suppliedMaterials: form.suppliedMaterials.trim(),
      status: form.status as Supplier['status'],
      remarks: form.remarks.trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Edit Supplier</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <p className="text-xs text-[#6B5F5F] mb-1">Supplier ID</p>
            <p className="text-sm text-[#C8B8B8] bg-[#FFF8F0] px-4 py-2 rounded-lg border border-[#E8D8C8]">{supplier.id}</p>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Supplier Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Contact Number</label>
              <input
                type="tel"
                value={form.contact}
                onChange={(e) => set('contact', e.target.value)}
                className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]"
            />
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Address</label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => set('address', e.target.value)}
              className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] resize-none"
            />
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Supplied Materials</label>
            <input
              type="text"
              value={form.suppliedMaterials}
              onChange={(e) => set('suppliedMaterials', e.target.value)}
              placeholder="e.g. Cotton, Denim, Mixed Fabrics"
              className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]"
            />
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Remarks</label>
            <textarea
              rows={2}
              value={form.remarks}
              onChange={(e) => set('remarks', e.target.value)}
              placeholder="Additional notes about this supplier..."
              className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] resize-none"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add Supplier Modal ───────────────────────────────────────────────────────

function AddSupplierModal({
  onAdd,
  onClose,
  nextId,
}: {
  onAdd: (s: Supplier) => void;
  onClose: () => void;
  nextId: string;
}) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    suppliedMaterials: '',
    status: 'Active',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Supplier name is required.';
    if (!form.contact.trim()) e.contact = 'Contact number is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    if (!form.suppliedMaterials.trim()) e.suppliedMaterials = 'Supplied materials is required.';
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const today = new Date().toISOString().slice(0, 10);
    onAdd({
      id: nextId,
      name: form.name.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      suppliedMaterials: form.suppliedMaterials.trim(),
      status: form.status as Supplier['status'],
      createdDate: today,
      remarks: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Add New Supplier</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Supplier Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Enter supplier name"
              className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${errors.name ? 'border-red-400' : 'border-[#E8D8C8]'}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Contact Number</label>
              <input
                type="tel"
                value={form.contact}
                onChange={(e) => set('contact', e.target.value)}
                placeholder="+60 3-1234 5678"
                className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${errors.contact ? 'border-red-400' : 'border-[#E8D8C8]'}`}
              />
              {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="supplier@example.com"
              className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${errors.email ? 'border-red-400' : 'border-[#E8D8C8]'}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Address</label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => set('address', e.target.value)}
              placeholder="Enter supplier address"
              className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] resize-none"
            />
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Supplied Materials</label>
            <input
              type="text"
              value={form.suppliedMaterials}
              onChange={(e) => set('suppliedMaterials', e.target.value)}
              placeholder="e.g. Cotton, Denim, Silk"
              className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${errors.suppliedMaterials ? 'border-red-400' : 'border-[#E8D8C8]'}`}
            />
            {errors.suppliedMaterials && <p className="text-xs text-red-500 mt-1">{errors.suppliedMaterials}</p>}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
          >
            Save Supplier
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Deactivate Modal ─────────────────────────────────────────────────────────

function DeactivateModal({
  supplier,
  onConfirm,
  onClose,
}: {
  supplier: Supplier;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-[#FFF3E0] rounded-full mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-[#C77A2A]" />
          </div>
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F] text-center mb-2">
            Deactivate Supplier?
          </h2>
          <p className="text-sm text-[#3B2F2F] text-center mb-1">{supplier.name}</p>
          <p className="text-sm text-[#6B5F5F] text-center">
            No new materials can be purchased from this supplier.
          </p>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-[#E8A87C] text-white rounded-lg hover:bg-[#D89A6C] transition-colors"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function SupplierListPage() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [search, setSearch] = useState('');

  const [viewSupplier, setViewSupplier] = useState<Supplier | null>(null);
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);
  const [deactivateSupplier, setDeactivateSupplier] = useState<Supplier | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return suppliers;
    return suppliers.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.contact.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.suppliedMaterials.toLowerCase().includes(q)
    );
  }, [suppliers, search]);

  const nextId = useMemo(() => {
    const nums = suppliers.map((s) => parseInt(s.id.replace('SUP-', ''), 10));
    return `SUP-${String(Math.max(...nums) + 1).padStart(3, '0')}`;
  }, [suppliers]);

  const handleEdit = (updated: Supplier) => {
    setSuppliers((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditSupplier(null);
    toast.success('Supplier details updated successfully.');
  };

  const handleAdd = (s: Supplier) => {
    setSuppliers((prev) => [...prev, s]);
    setShowAdd(false);
    toast.success('Supplier added successfully.');
  };

  const handleDeactivate = () => {
    if (!deactivateSupplier) return;
    setSuppliers((prev) =>
      prev.map((s) => (s.id === deactivateSupplier.id ? { ...s, status: 'Inactive' } : s))
    );
    setDeactivateSupplier(null);
    toast.success('Supplier has been deactivated.');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Supplier Management</h1>
            <p className="text-sm text-[#6B5F5F] mt-1">Manage supplier information and contacts</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Supplier
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8B8B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Supplier ID, name, contact, email, or supplied materials..."
            className="w-full pl-10 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Supplier ID</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Supplier Name</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Contact Number</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Email</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Supplied Materials</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Status</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center gap-2 text-[#C8B8B8]">
                        <Truck className="w-8 h-8" />
                        <p className="text-sm">No suppliers found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-[#FFF8F0]">
                      <td className="px-6 py-4 text-sm text-[#6B5F5F] whitespace-nowrap">{supplier.id}</td>
                      <td className="px-6 py-4 text-sm text-[#3B2F2F] max-w-[200px] truncate">{supplier.name}</td>
                      <td className="px-6 py-4 text-sm text-[#6B5F5F] whitespace-nowrap">{supplier.contact}</td>
                      <td className="px-6 py-4 text-sm text-[#6B5F5F]">{supplier.email}</td>
                      <td className="px-6 py-4 text-sm text-[#6B5F5F]">{supplier.suppliedMaterials}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs text-white ${supplier.status === 'Active' ? 'bg-[#8FBF9F]' : 'bg-[#C8C8C8]'}`}>
                          {supplier.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewSupplier(supplier)}
                            className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#FFF8F0] rounded transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditSupplier(supplier)}
                            className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#FFF8F0] rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeactivateSupplier(supplier)}
                            disabled={supplier.status === 'Inactive'}
                            className="p-1.5 text-[#C77A2A] hover:text-[#9B5A0A] hover:bg-[#FFF3E0] rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Deactivate"
                          >
                            <PowerOff className="w-4 h-4" />
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
              Showing {filtered.length} of {suppliers.length} suppliers
            </div>
          )}
        </div>
      </div>

      {viewSupplier && (
        <ViewSupplierModal supplier={viewSupplier} onClose={() => setViewSupplier(null)} />
      )}
      {editSupplier && (
        <EditSupplierModal
          supplier={editSupplier}
          onSave={handleEdit}
          onClose={() => setEditSupplier(null)}
        />
      )}
      {deactivateSupplier && (
        <DeactivateModal
          supplier={deactivateSupplier}
          onConfirm={handleDeactivate}
          onClose={() => setDeactivateSupplier(null)}
        />
      )}
      {showAdd && (
        <AddSupplierModal
          onAdd={handleAdd}
          onClose={() => setShowAdd(false)}
          nextId={nextId}
        />
      )}
    </AdminLayout>
  );
}
