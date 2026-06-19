import { useState, useMemo } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { toast } from 'sonner';
import {
  Plus, Search, X, Layers, ArrowDownToLine, ArrowUpFromLine,
  Eye, Trash2, History, Filter, RotateCcw,
} from 'lucide-react';

/* ─────────────────────── types & constants ──────────────────────── */

interface Material {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  source: string;
  supplier: string;
  storageLocation: string;
  remarks: string;
  lastUpdated: string;
  isNew?: boolean; // added in-session — can be deleted
}

type TxnType = 'Stock In' | 'Stock Out' | 'Stock Adjustment' | 'Material Added' | 'Material Updated';

interface Transaction {
  id: string;
  date: string;
  materialId: string;
  materialName: string;
  category: string;
  type: TxnType;
  quantityChange: number;
  unit: string;
  sourceUsedFor: string;
  recordedBy: string;
  remarks: string;
}

const CATEGORIES = ['Cotton', 'Denim', 'Silk', 'Velvet', 'Satin', 'Mixed'] as const;
const SUPPLIERS = [
  'Green Fabric Recyclers Sdn Bhd',
  'EcoTextile Solutions',
  'Community Fabric Donation Center',
  'N/A',
];
const ALL_TXN_TYPES: TxnType[] = ['Stock In', 'Stock Out', 'Stock Adjustment', 'Material Added', 'Material Updated'];

const INPUT = 'w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white';
const LABEL = 'block text-xs text-[#6B5F5F] mb-1.5';

const STOCK_BADGE: Record<string, string> = {
  'In Stock':    'bg-[#E8F5EE] text-[#5A9E72]',
  'Low Stock':   'bg-[#FFF3E0] text-[#C77A2A]',
  'Out of Stock':'bg-[#FDEAEA] text-[#C94C4C]',
};

const TYPE_BADGE: Record<TxnType, string> = {
  'Stock In':         'bg-[#E8F5EE] text-[#5A9E72]',
  'Stock Out':        'bg-[#FFF3E0] text-[#C77A2A]',
  'Stock Adjustment': 'bg-[#F0EAF5] text-[#9B7DC8]',
  'Material Added':   'bg-[#E0F0F8] text-[#3A8FA8]',
  'Material Updated': 'bg-[#F5EDE3] text-[#6B5F5F]',
};

const getStockStatus = (qty: number): 'In Stock' | 'Low Stock' | 'Out of Stock' =>
  qty === 0 ? 'Out of Stock' : qty <= 10 ? 'Low Stock' : 'In Stock';

/* ─────────────────────── initial data ──────────────────────────── */

const INITIAL_MATERIALS: Material[] = [
  { id:'MAT-001', name:'Cotton Fabric - Floral Pattern', category:'Cotton',  quantity:50, unit:'meters', source:'Supplier',           supplier:'Green Fabric Recyclers Sdn Bhd',    storageLocation:'Warehouse A, Shelf 1', remarks:'Suitable for scrunchies and small bags.',           lastUpdated:'2026-05-15' },
  { id:'MAT-002', name:'Denim Fabric - Blue',            category:'Denim',   quantity:8,  unit:'meters', source:'Supplier',           supplier:'Green Fabric Recyclers Sdn Bhd',    storageLocation:'Warehouse A, Shelf 2', remarks:'Running low. Reorder needed.',                      lastUpdated:'2026-05-20' },
  { id:'MAT-003', name:'Velvet Fabric - Purple',         category:'Velvet',  quantity:25, unit:'meters', source:'Supplier',           supplier:'EcoTextile Solutions',              storageLocation:'Warehouse B, Shelf 1', remarks:'Premium quality. Use for velvet scrunchies.',       lastUpdated:'2026-05-14' },
  { id:'MAT-004', name:'Mixed Donated Fabrics',          category:'Mixed',   quantity:0,  unit:'kg',     source:'Community Donation', supplier:'Community Fabric Donation Center',  storageLocation:'Warehouse C, Bin 1',   remarks:'Awaiting next community collection drive.',         lastUpdated:'2026-05-25' },
  { id:'MAT-005', name:'Silk Fabric - Cream',            category:'Silk',    quantity:15, unit:'meters', source:'Supplier',           supplier:'EcoTextile Solutions',              storageLocation:'Warehouse B, Shelf 2', remarks:'Reserved for premium product lines.',               lastUpdated:'2026-05-12' },
  { id:'MAT-006', name:'Satin Fabric - Rose Gold',       category:'Satin',   quantity:6,  unit:'meters', source:'Supplier',           supplier:'EcoTextile Solutions',              storageLocation:'Warehouse B, Shelf 3', remarks:'',                                                  lastUpdated:'2026-05-22' },
  { id:'MAT-007', name:'Cotton Fabric - Plain White',    category:'Cotton',  quantity:3,  unit:'meters', source:'Community Donation', supplier:'Community Fabric Donation Center',  storageLocation:'Warehouse A, Shelf 3', remarks:'Donated by community member. Quality checked.',     lastUpdated:'2026-05-28' },
];

// IDs present at launch — these have history and cannot be deleted
const INITIAL_IDS = new Set(INITIAL_MATERIALS.map(m => m.id));

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id:'TXN-001', date:'2026-05-15', materialId:'MAT-001', materialName:'Cotton Fabric - Floral Pattern', category:'Cotton',  type:'Stock In',      quantityChange:50,  unit:'meters', sourceUsedFor:'Green Fabric Recyclers Sdn Bhd',   recordedBy:'Admin User', remarks:'Received in good condition.' },
  { id:'TXN-002', date:'2026-05-18', materialId:'MAT-002', materialName:'Denim Fabric - Blue',            category:'Denim',   type:'Stock In',      quantityChange:20,  unit:'meters', sourceUsedFor:'Green Fabric Recyclers Sdn Bhd',   recordedBy:'Admin User', remarks:'New shipment received.' },
  { id:'TXN-003', date:'2026-05-20', materialId:'MAT-002', materialName:'Denim Fabric - Blue',            category:'Denim',   type:'Stock Out',     quantityChange:-12, unit:'meters', sourceUsedFor:'Production of Crossbody Bag',      recordedBy:'Admin User', remarks:'' },
  { id:'TXN-004', date:'2026-05-10', materialId:'MAT-003', materialName:'Velvet Fabric - Purple',         category:'Velvet',  type:'Stock In',      quantityChange:30,  unit:'meters', sourceUsedFor:'EcoTextile Solutions',             recordedBy:'Admin User', remarks:'Premium velvet batch.' },
  { id:'TXN-005', date:'2026-05-14', materialId:'MAT-003', materialName:'Velvet Fabric - Purple',         category:'Velvet',  type:'Stock Out',     quantityChange:-5,  unit:'meters', sourceUsedFor:'Production of Floral Scrunchie Set', recordedBy:'Admin User', remarks:'' },
  { id:'TXN-006', date:'2026-05-25', materialId:'MAT-004', materialName:'Mixed Donated Fabrics',          category:'Mixed',   type:'Material Added',quantityChange:0,   unit:'kg',     sourceUsedFor:'Community Fabric Donation Center',  recordedBy:'Admin User', remarks:'Awaiting next drive.' },
  { id:'TXN-007', date:'2026-05-12', materialId:'MAT-005', materialName:'Silk Fabric - Cream',            category:'Silk',    type:'Stock In',      quantityChange:15,  unit:'meters', sourceUsedFor:'EcoTextile Solutions',             recordedBy:'Admin User', remarks:'Reserved for premium lines.' },
  { id:'TXN-008', date:'2026-05-20', materialId:'MAT-006', materialName:'Satin Fabric - Rose Gold',       category:'Satin',   type:'Stock In',      quantityChange:10,  unit:'meters', sourceUsedFor:'EcoTextile Solutions',             recordedBy:'Admin User', remarks:'' },
  { id:'TXN-009', date:'2026-05-22', materialId:'MAT-006', materialName:'Satin Fabric - Rose Gold',       category:'Satin',   type:'Stock Out',     quantityChange:-4,  unit:'meters', sourceUsedFor:'Production of Mini Coin Purse',    recordedBy:'Admin User', remarks:'' },
  { id:'TXN-010', date:'2026-05-28', materialId:'MAT-007', materialName:'Cotton Fabric - Plain White',    category:'Cotton',  type:'Material Added',quantityChange:3,   unit:'meters', sourceUsedFor:'Community Fabric Donation Center',  recordedBy:'Admin User', remarks:'Donated by community member.' },
];

const getNextId = (list: { id: string }[], prefix: string) => {
  const nums = list.map(x => parseInt(x.id.replace(`${prefix}-`, ''), 10)).filter(n => !isNaN(n));
  return `${prefix}-${String(Math.max(0, ...nums) + 1).padStart(3, '0')}`;
};

/* ─────────────────────── shared modal shell ─────────────────────── */
function Modal({ title, accent, onClose, footer, children }: {
  title: string; accent?: string; onClose: () => void; footer: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">{title}</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">{children}</div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">{footer}</div>
      </div>
    </div>
  );
}

/* ─────────────────────── view modal ─────────────────────────────── */
function ViewMaterialModal({ m, onClose }: { m: Material; onClose: () => void }) {
  const status = getStockStatus(m.quantity);
  const rows = [
    ['Material ID', m.id], ['Category', m.category], ['Unit', m.unit],
    ['Source', m.source], ['Supplier', m.supplier], ['Last Updated', m.lastUpdated],
  ];
  return (
    <Modal title="Material Details" onClose={onClose}
      footer={<button onClick={onClose} className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors">Close</button>}
    >
      <div className="bg-[#FFF8F0] rounded-lg px-4 py-3">
        <p className="text-xs text-[#9B8B8B] mb-0.5">Material Name</p>
        <p className="text-sm text-[#3B2F2F]">{m.name}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-[#9B8B8B]">Quantity:</span>
          <span className="text-sm text-[#3B2F2F]">{m.quantity} {m.unit}</span>
          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] ${STOCK_BADGE[status]}`}>{status}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {rows.map(([lbl, val]) => (
          <div key={lbl}>
            <p className="text-[10px] text-[#9B8B8B] uppercase tracking-wide mb-0.5">{lbl}</p>
            <p className="text-sm text-[#3B2F2F]">{val}</p>
          </div>
        ))}
      </div>
      {m.storageLocation && (
        <div>
          <p className="text-[10px] text-[#9B8B8B] uppercase tracking-wide mb-0.5">Storage Location</p>
          <p className="text-sm text-[#3B2F2F]">{m.storageLocation}</p>
        </div>
      )}
      {m.remarks && (
        <div>
          <p className="text-[10px] text-[#9B8B8B] uppercase tracking-wide mb-0.5">Remarks</p>
          <p className="text-sm text-[#3B2F2F]">{m.remarks}</p>
        </div>
      )}
    </Modal>
  );
}

/* ─────────────────────── add modal ──────────────────────────────── */
function AddMaterialModal({ onAdd, onClose, nextId }: {
  onAdd: (m: Material) => void; onClose: () => void; nextId: string;
}) {
  const [form, setForm] = useState({ name:'', category:'Cotton', quantity:'', unit:'meters', source:'Supplier', supplier:SUPPLIERS[0], remarks:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const set = (k: string, v: string) => { setForm(p => ({...p,[k]:v})); setErrors(p => ({...p,[k]:''})); };

  const handleSubmit = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = 'Material name is required.';
    const qty = parseInt(form.quantity, 10);
    if (!form.quantity || isNaN(qty) || qty < 0) e.quantity = 'Enter a valid quantity.';
    if (!form.unit.trim()) e.unit = 'Unit is required.';
    if (Object.keys(e).length) { setErrors(e); return; }
    onAdd({ id:nextId, name:form.name.trim(), category:form.category, quantity:qty, unit:form.unit.trim(),
            source:form.source, supplier:form.supplier, storageLocation:'', remarks:form.remarks.trim(),
            lastUpdated:new Date().toISOString().slice(0,10), isNew:true });
  };

  return (
    <Modal title="Add New Material" onClose={onClose}
      footer={<>
        <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors">Cancel</button>
        <button onClick={handleSubmit} className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors">Add Material</button>
      </>}
    >
      <div>
        <label className={LABEL}>Material Name</label>
        <input type="text" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Cotton Fabric - Floral Pattern"
          className={`${INPUT} ${errors.name?'border-red-400':''}`} />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Category</label>
          <select value={form.category} onChange={e=>set('category',e.target.value)} className={INPUT}>
            {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL}>Source</label>
          <select value={form.source} onChange={e=>set('source',e.target.value)} className={INPUT}>
            <option value="Supplier">Supplier</option>
            <option value="Community Donation">Community Donation</option>
            <option value="Internal">Internal</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Quantity</label>
          <input type="number" min="0" value={form.quantity} onChange={e=>set('quantity',e.target.value)} placeholder="0"
            className={`${INPUT} ${errors.quantity?'border-red-400':''}`} />
          {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
        </div>
        <div>
          <label className={LABEL}>Unit</label>
          <input type="text" value={form.unit} onChange={e=>set('unit',e.target.value)} placeholder="meters, kg, pieces"
            className={`${INPUT} ${errors.unit?'border-red-400':''}`} />
          {errors.unit && <p className="text-xs text-red-500 mt-1">{errors.unit}</p>}
        </div>
      </div>
      <div>
        <label className={LABEL}>Supplier / Donor</label>
        <select value={form.supplier} onChange={e=>set('supplier',e.target.value)} className={INPUT}>
          {SUPPLIERS.map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className={LABEL}>Remarks</label>
        <textarea rows={2} value={form.remarks} onChange={e=>set('remarks',e.target.value)}
          placeholder="Additional notes..." className={`${INPUT} resize-none`} />
      </div>
    </Modal>
  );
}

/* ─────────────────────── delete confirm modal ───────────────────── */
function DeleteConfirmModal({ m, onConfirm, onClose }: { m: Material; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="px-6 pt-6 pb-4">
          <div className="w-12 h-12 bg-[#FDEAEA] rounded-full flex items-center justify-center mb-4">
            <Trash2 className="w-6 h-6 text-[#C94C4C]" />
          </div>
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F] mb-2">Delete Material?</h2>
          <p className="text-sm text-[#6B5F5F] mb-3">
            Are you sure you want to delete <span className="text-[#3B2F2F]">{m.name}</span>?
          </p>
          <div className="bg-[#FFF8F0] border border-[#E8D8C8] rounded-lg px-4 py-3 text-xs text-[#6B5F5F] leading-relaxed">
            This action should only be used for newly added or incorrect material records.
            Existing materials with transaction history should not be deleted directly.
          </div>
        </div>
        <div className="px-6 pb-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm">Cancel</button>
          <button onClick={onConfirm} className="px-5 py-2 bg-[#C94C4C] text-white rounded-lg hover:bg-[#A83535] transition-colors text-sm">Delete Material</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── stock in modal ─────────────────────────── */
function StockInModal({ m, onSave, onClose }: {
  m: Material; onSave: (qty: number, date: string, source: string, remarks: string) => void; onClose: () => void;
}) {
  const today = new Date().toISOString().slice(0,10);
  const [form, setForm] = useState({ qty:'', date:today, source:m.supplier, remarks:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const set = (k:string, v:string) => { setForm(p=>({...p,[k]:v})); setErrors(p=>({...p,[k]:''})); };

  const handleSave = () => {
    const e: Record<string,string> = {};
    const qty = parseInt(form.qty, 10);
    if (!form.qty || isNaN(qty) || qty <= 0) e.qty = 'Enter a valid quantity greater than 0.';
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(qty, form.date, form.source.trim(), form.remarks.trim());
  };

  return (
    <Modal title="Stock In" onClose={onClose}
      footer={<>
        <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors">Cancel</button>
        <button onClick={handleSave} className="px-5 py-2 bg-[#8FBF9F] text-white rounded-lg hover:bg-[#7AA98A] transition-colors flex items-center gap-2">
          <ArrowDownToLine className="w-4 h-4" /> Record Stock In
        </button>
      </>}
    >
      <div className="bg-[#E8F5EE] rounded-lg px-4 py-3 flex items-center gap-3">
        <ArrowDownToLine className="w-4 h-4 text-[#5A9E72] shrink-0" />
        <div>
          <p className="text-xs text-[#5A9E72] mb-0.5">Adding stock to</p>
          <p className="text-sm text-[#3B2F2F]">{m.name}</p>
          <p className="text-xs text-[#6B5F5F] mt-0.5">Current stock: {m.quantity} {m.unit}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Quantity Added ({m.unit})</label>
          <input type="number" min="1" value={form.qty} onChange={e=>set('qty',e.target.value)} placeholder="0"
            className={`${INPUT} ${errors.qty?'border-red-400':''}`} />
          {errors.qty && <p className="text-xs text-red-500 mt-1">{errors.qty}</p>}
        </div>
        <div>
          <label className={LABEL}>Date</label>
          <input type="date" value={form.date} onChange={e=>set('date',e.target.value)} className={INPUT} />
        </div>
      </div>
      <div>
        <label className={LABEL}>Source / Supplier / Donation Source</label>
        <input type="text" value={form.source} onChange={e=>set('source',e.target.value)} className={INPUT} />
      </div>
      <div>
        <label className={LABEL}>Remarks</label>
        <textarea rows={2} value={form.remarks} onChange={e=>set('remarks',e.target.value)}
          placeholder="e.g. New shipment received" className={`${INPUT} resize-none`} />
      </div>
    </Modal>
  );
}

/* ─────────────────────── stock out modal ────────────────────────── */
function StockOutModal({ m, onSave, onClose }: {
  m: Material; onSave: (qty: number, date: string, usedFor: string, remarks: string) => void; onClose: () => void;
}) {
  const today = new Date().toISOString().slice(0,10);
  const [form, setForm] = useState({ qty:'', date:today, usedFor:'', remarks:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const set = (k:string, v:string) => { setForm(p=>({...p,[k]:v})); setErrors(p=>({...p,[k]:''})); };

  const handleSave = () => {
    const e: Record<string,string> = {};
    const qty = parseInt(form.qty, 10);
    if (!form.qty || isNaN(qty) || qty <= 0) e.qty = 'Enter a valid quantity greater than 0.';
    else if (qty > m.quantity) e.qty = `Cannot exceed available stock (${m.quantity} ${m.unit}).`;
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(qty, form.date, form.usedFor.trim(), form.remarks.trim());
  };

  return (
    <Modal title="Stock Out" onClose={onClose}
      footer={<>
        <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors">Cancel</button>
        <button onClick={handleSave} className="px-5 py-2 bg-[#E8A87C] text-white rounded-lg hover:bg-[#D89A6C] transition-colors flex items-center gap-2">
          <ArrowUpFromLine className="w-4 h-4" /> Record Stock Out
        </button>
      </>}
    >
      <div className="bg-[#FFF3E0] rounded-lg px-4 py-3 flex items-center gap-3">
        <ArrowUpFromLine className="w-4 h-4 text-[#C77A2A] shrink-0" />
        <div>
          <p className="text-xs text-[#C77A2A] mb-0.5">Removing stock from</p>
          <p className="text-sm text-[#3B2F2F]">{m.name}</p>
          <p className="text-xs text-[#6B5F5F] mt-0.5">Available stock: {m.quantity} {m.unit}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Quantity Used ({m.unit})</label>
          <input type="number" min="1" max={m.quantity} value={form.qty} onChange={e=>set('qty',e.target.value)} placeholder="0"
            className={`${INPUT} ${errors.qty?'border-red-400':''}`} />
          {errors.qty && <p className="text-xs text-red-500 mt-1">{errors.qty}</p>}
        </div>
        <div>
          <label className={LABEL}>Date</label>
          <input type="date" value={form.date} onChange={e=>set('date',e.target.value)} className={INPUT} />
        </div>
      </div>
      <div>
        <label className={LABEL}>Used For (Product / Task / Activity)</label>
        <input type="text" value={form.usedFor} onChange={e=>set('usedFor',e.target.value)}
          placeholder="e.g. Production of Floral Scrunchie Set" className={INPUT} />
      </div>
      <div>
        <label className={LABEL}>Remarks</label>
        <textarea rows={2} value={form.remarks} onChange={e=>set('remarks',e.target.value)}
          placeholder="Additional notes..." className={`${INPUT} resize-none`} />
      </div>
    </Modal>
  );
}

/* ─────────────────────── main page ─────────────────────────────── */
export function MaterialInventoryPage() {
  const today = new Date().toISOString().slice(0,10);

  // ── material state ────────────────────────────────────────────
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // ── material list UI state ────────────────────────────────────
  const [matSearch, setMatSearch] = useState('');
  const [matCat, setMatCat] = useState('all');

  // ── modals ────────────────────────────────────────────────────
  const [viewMat, setViewMat]       = useState<Material | null>(null);
  const [stockInMat, setStockInMat] = useState<Material | null>(null);
  const [stockOutMat, setStockOutMat] = useState<Material | null>(null);
  const [deleteMat, setDeleteMat]   = useState<Material | null>(null);
  const [showAdd, setShowAdd]       = useState(false);

  // ── history filter INPUT state (what's in the form controls) ──
  const [histInput, setHistInput] = useState({ search:'', category:'all', type:'all', startDate:'', endDate:'' });
  // ── applied filter state (drives the table) ───────────────────
  const [histFilter, setHistFilter] = useState({ search:'', category:'all', type:'all', startDate:'', endDate:'' });

  // ── derived data ──────────────────────────────────────────────
  const filteredMaterials = useMemo(() => {
    const q = matSearch.toLowerCase();
    return materials.filter(m => {
      const matchSearch = !q || m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q)
        || m.category.toLowerCase().includes(q) || m.source.toLowerCase().includes(q);
      return matchSearch && (matCat === 'all' || m.category === matCat);
    });
  }, [materials, matSearch, matCat]);

  const filteredHistory = useMemo(() => {
    const q = histFilter.search.toLowerCase();
    return transactions.filter(t => {
      if (q && !t.materialId.toLowerCase().includes(q) && !t.materialName.toLowerCase().includes(q)) return false;
      if (histFilter.category !== 'all' && t.category !== histFilter.category) return false;
      if (histFilter.type !== 'all' && t.type !== histFilter.type) return false;
      if (histFilter.startDate && t.date < histFilter.startDate) return false;
      if (histFilter.endDate   && t.date > histFilter.endDate)   return false;
      return true;
    });
  }, [transactions, histFilter]);

  const nextMatId  = useMemo(() => getNextId(materials, 'MAT'), [materials]);
  const nextTxnId  = useMemo(() => getNextId(transactions, 'TXN'), [transactions]);

  // ── handlers ─────────────────────────────────────────────────

  const addTxn = (t: Omit<Transaction, 'id'>) =>
    setTransactions(prev => [...prev, { ...t, id: getNextId(prev, 'TXN') }]);

  const handleAdd = (m: Material) => {
    setMaterials(prev => [...prev, m]);
    addTxn({ date:m.lastUpdated, materialId:m.id, materialName:m.name, category:m.category,
             type:'Material Added', quantityChange:m.quantity, unit:m.unit,
             sourceUsedFor:m.source, recordedBy:'Admin User', remarks:m.remarks });
    setShowAdd(false);
    toast.success('Material added successfully.');
  };

  const handleStockIn = (qty: number, date: string, source: string, remarks: string) => {
    if (!stockInMat) return;
    setMaterials(prev => prev.map(m =>
      m.id === stockInMat.id ? {...m, quantity: m.quantity + qty, lastUpdated: date} : m
    ));
    addTxn({ date, materialId:stockInMat.id, materialName:stockInMat.name, category:stockInMat.category,
             type:'Stock In', quantityChange:qty, unit:stockInMat.unit,
             sourceUsedFor:source || stockInMat.supplier, recordedBy:'Admin User', remarks });
    setStockInMat(null);
    toast.success('Stock in recorded successfully.');
  };

  const handleStockOut = (qty: number, date: string, usedFor: string, remarks: string) => {
    if (!stockOutMat) return;
    setMaterials(prev => prev.map(m =>
      m.id === stockOutMat.id ? {...m, quantity: m.quantity - qty, lastUpdated: date} : m
    ));
    addTxn({ date, materialId:stockOutMat.id, materialName:stockOutMat.name, category:stockOutMat.category,
             type:'Stock Out', quantityChange:-qty, unit:stockOutMat.unit,
             sourceUsedFor:usedFor || '—', recordedBy:'Admin User', remarks });
    setStockOutMat(null);
    toast.success('Stock out recorded successfully.');
  };

  const handleDelete = () => {
    if (!deleteMat) return;
    if (INITIAL_IDS.has(deleteMat.id)) {
      toast.error('This material has transaction history and cannot be deleted. Please deactivate or adjust stock instead.');
      setDeleteMat(null);
      return;
    }
    setMaterials(prev => prev.filter(m => m.id !== deleteMat.id));
    setTransactions(prev => prev.filter(t => t.materialId !== deleteMat.id));
    setDeleteMat(null);
    toast.success('Material record deleted successfully.');
  };

  const handleDeleteClick = (m: Material) => {
    if (INITIAL_IDS.has(m.id)) {
      toast.error('This material has transaction history and cannot be deleted. Please deactivate or adjust stock instead.');
    } else {
      setDeleteMat(m);
    }
  };

  /* ── render ──────────────────────────────────────────────────── */
  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* ── header ───────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Material Inventory</h1>
            <p className="text-sm text-[#6B5F5F] mt-1">Manage recycled fabric and material stock</p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors shrink-0">
            <Plus className="w-4 h-4" /> Add Material
          </button>
        </div>

        {/* ── search + category filter ──────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8B8B8]" />
            <input type="text" value={matSearch} onChange={e=>setMatSearch(e.target.value)}
              placeholder="Search by Material ID, name, category, or source..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white" />
          </div>
          <select value={matCat} onChange={e=>setMatCat(e.target.value)}
            className="px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white">
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* ── material inventory table ──────────────────────────── */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  {['Material ID','Material Name','Category','Quantity','Source','Stock Status','Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EDE3]">
                {filteredMaterials.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <Layers className="w-8 h-8 text-[#D8C8C8] mx-auto mb-2" />
                      <p className="text-sm text-[#9B8B8B]">No materials found.</p>
                    </td>
                  </tr>
                ) : filteredMaterials.map(m => {
                  const status = getStockStatus(m.quantity);
                  return (
                    <tr key={m.id} className="hover:bg-[#FFFAF5] transition-colors">
                      <td className="px-4 py-3 text-xs text-[#6B5F5F] whitespace-nowrap">{m.id}</td>
                      <td className="px-4 py-3 text-xs text-[#3B2F2F]">{m.name}</td>
                      <td className="px-4 py-3 text-xs text-[#6B5F5F] whitespace-nowrap">{m.category}</td>
                      <td className="px-4 py-3 text-xs text-[#3B2F2F] whitespace-nowrap">{m.quantity} {m.unit}</td>
                      <td className="px-4 py-3 text-xs text-[#6B5F5F] whitespace-nowrap">{m.source}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] ${STOCK_BADGE[status]}`}>{status}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <button onClick={()=>setViewMat(m)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] border border-[#E8D8C8] text-[#6B5F5F] rounded-md hover:bg-[#FFF8F0] transition-colors">
                            <Eye className="w-3 h-3" /> View
                          </button>
                          <button onClick={()=>setStockInMat(m)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] bg-[#E8F5EE] text-[#5A9E72] rounded-md hover:bg-[#8FBF9F] hover:text-white transition-colors">
                            <ArrowDownToLine className="w-3 h-3" /> Stock In
                          </button>
                          <button onClick={()=>setStockOutMat(m)} disabled={m.quantity === 0}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] bg-[#FFF3E0] text-[#C77A2A] rounded-md hover:bg-[#E8A87C] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                            <ArrowUpFromLine className="w-3 h-3" /> Stock Out
                          </button>
                          <button onClick={()=>handleDeleteClick(m)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] bg-[#FDEAEA] text-[#C94C4C] rounded-md hover:bg-[#C94C4C] hover:text-white transition-colors">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredMaterials.length > 0 && (
            <div className="px-4 py-2.5 border-t border-[#F5EDE3] text-[11px] text-[#9B8B8B]">
              Showing {filteredMaterials.length} of {materials.length} materials
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════
            INVENTORY TRANSACTION HISTORY
        ════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">

          {/* section header */}
          <div className="px-6 py-4 border-b border-[#E8D8C8] flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F0EAF5] rounded-lg flex items-center justify-center shrink-0">
              <History className="w-4 h-4 text-[#9B7DC8]" />
            </div>
            <div>
              <p className="text-sm text-[#3B2F2F]">Inventory Transaction History</p>
              <p className="text-xs text-[#9B8B8B]">All stock changes, additions, and adjustments</p>
            </div>
            <span className="ml-auto text-[11px] text-[#9B8B8B] bg-[#F5EDE3] px-2 py-0.5 rounded-full">
              {filteredHistory.length} record{filteredHistory.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* filter controls */}
          <div className="px-6 py-4 border-b border-[#F5EDE3] bg-[#FFFAF5]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* search */}
              <div className="relative sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C8B8B8]" />
                <input type="text" value={histInput.search}
                  onChange={e=>setHistInput(p=>({...p,search:e.target.value}))}
                  placeholder="Search by material name or ID"
                  className="w-full pl-9 pr-3 py-2 border border-[#E8D8C8] rounded-lg text-xs text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white" />
              </div>
              {/* category */}
              <select value={histInput.category} onChange={e=>setHistInput(p=>({...p,category:e.target.value}))}
                className="px-3 py-2 border border-[#E8D8C8] rounded-lg text-xs text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white">
                <option value="all">All Categories</option>
                {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              {/* type */}
              <select value={histInput.type} onChange={e=>setHistInput(p=>({...p,type:e.target.value}))}
                className="px-3 py-2 border border-[#E8D8C8] rounded-lg text-xs text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white">
                <option value="all">All Types</option>
                {ALL_TXN_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              {/* start date */}
              <input type="date" value={histInput.startDate}
                onChange={e=>setHistInput(p=>({...p,startDate:e.target.value}))}
                className="px-3 py-2 border border-[#E8D8C8] rounded-lg text-xs text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white" />
              {/* end date */}
              <input type="date" value={histInput.endDate}
                onChange={e=>setHistInput(p=>({...p,endDate:e.target.value}))}
                className="px-3 py-2 border border-[#E8D8C8] rounded-lg text-xs text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white" />
            </div>
            {/* action buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setHistFilter({...histInput})}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg text-xs hover:bg-[#C76B83] hover:text-white transition-colors"
              >
                <Filter className="w-3.5 h-3.5" /> Apply Filter
              </button>
              <button
                onClick={() => {
                  const empty = { search:'', category:'all', type:'all', startDate:'', endDate:'' };
                  setHistInput(empty);
                  setHistFilter(empty);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg text-xs hover:bg-[#FFF8F0] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>

          {/* history table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  {['Txn ID','Date','Material ID','Material Name','Category','Type','Qty Change','Unit','Source / Used For','Recorded By','Remarks'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EDE3]">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-6 py-12 text-center">
                      <History className="w-8 h-8 text-[#D8C8C8] mx-auto mb-2" />
                      <p className="text-sm text-[#9B8B8B]">No inventory transaction records found.</p>
                      <p className="text-xs text-[#C8B8B8] mt-1">Try changing the filter or date range.</p>
                    </td>
                  </tr>
                ) : [...filteredHistory].reverse().map(t => {
                  const isIn = t.quantityChange > 0;
                  const isZero = t.quantityChange === 0;
                  return (
                    <tr key={t.id} className="hover:bg-[#FFFAF5] transition-colors">
                      <td className="px-4 py-2.5 text-[11px] text-[#6B5F5F] whitespace-nowrap">{t.id}</td>
                      <td className="px-4 py-2.5 text-[11px] text-[#6B5F5F] whitespace-nowrap">{t.date}</td>
                      <td className="px-4 py-2.5 text-[11px] text-[#6B5F5F] whitespace-nowrap">{t.materialId}</td>
                      <td className="px-4 py-2.5 text-[11px] text-[#3B2F2F] max-w-[160px] truncate">{t.materialName}</td>
                      <td className="px-4 py-2.5 text-[11px] text-[#6B5F5F] whitespace-nowrap">{t.category}</td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] ${TYPE_BADGE[t.type]}`}>{t.type}</span>
                      </td>
                      <td className={`px-4 py-2.5 text-[11px] whitespace-nowrap font-medium ${isZero ? 'text-[#9B8B8B]' : isIn ? 'text-[#5A9E72]' : 'text-[#C77A2A]'}`}>
                        {isZero ? '—' : (isIn ? '+' : '') + t.quantityChange}
                      </td>
                      <td className="px-4 py-2.5 text-[11px] text-[#6B5F5F] whitespace-nowrap">{t.unit}</td>
                      <td className="px-4 py-2.5 text-[11px] text-[#6B5F5F] max-w-[160px] truncate">{t.sourceUsedFor || '—'}</td>
                      <td className="px-4 py-2.5 text-[11px] text-[#6B5F5F] whitespace-nowrap">{t.recordedBy}</td>
                      <td className="px-4 py-2.5 text-[11px] text-[#9B8B8B] max-w-[120px] truncate">{t.remarks || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* ── modals ───────────────────────────────────────────────── */}
      {viewMat && <ViewMaterialModal m={viewMat} onClose={() => setViewMat(null)} />}
      {showAdd && <AddMaterialModal onAdd={handleAdd} onClose={() => setShowAdd(false)} nextId={nextMatId} />}
      {stockInMat && <StockInModal m={stockInMat} onSave={handleStockIn} onClose={() => setStockInMat(null)} />}
      {stockOutMat && <StockOutModal m={stockOutMat} onSave={handleStockOut} onClose={() => setStockOutMat(null)} />}
      {deleteMat && <DeleteConfirmModal m={deleteMat} onConfirm={handleDelete} onClose={() => setDeleteMat(null)} />}
    </AdminLayout>
  );
}
