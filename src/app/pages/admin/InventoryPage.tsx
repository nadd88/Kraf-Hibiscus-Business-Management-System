import { useState, useMemo } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { toast } from 'sonner';
import { Plus, Search, Eye, Edit2, Trash2, X, Package, ImagePlus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'Scrunchies' | 'Bags' | 'Purses' | 'Fabric Crafts';
  price: number;
  stock: number;
  description: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
  lastUpdated: string;
}

const CATEGORIES = ['Scrunchies', 'Bags', 'Purses', 'Fabric Crafts'] as const;

const getStockStatus = (stock: number): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
  if (stock === 0) return 'Out of Stock';
  if (stock <= 5) return 'Low Stock';
  return 'In Stock';
};

const STOCK_BADGE: Record<string, string> = {
  'In Stock': 'bg-[#8FBF9F] text-white',
  'Low Stock': 'bg-[#E8A87C] text-white',
  'Out of Stock': 'bg-[#C94C4C] text-white',
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'P001',
    name: 'Floral Scrunchie Set',
    category: 'Scrunchies',
    price: 15.0,
    stock: 25,
    description: 'Set of 3 handmade floral fabric scrunchies made from upcycled cotton. Available in pastel tones.',
    status: 'Active',
    createdDate: '2026-01-10',
    lastUpdated: '2026-05-15',
  },
  {
    id: 'P002',
    name: 'Velvet Hair Scrunchie',
    category: 'Scrunchies',
    price: 12.0,
    stock: 30,
    description: 'Single velvet scrunchie crafted from recycled velvet fabric. Soft and gentle on hair.',
    status: 'Active',
    createdDate: '2026-01-15',
    lastUpdated: '2026-05-10',
  },
  {
    id: 'P003',
    name: 'Crossbody Bag',
    category: 'Bags',
    price: 55.0,
    stock: 3,
    description: 'Handcrafted crossbody bag made from upcycled denim and cotton. Adjustable strap.',
    status: 'Active',
    createdDate: '2026-02-01',
    lastUpdated: '2026-05-20',
  },
  {
    id: 'P004',
    name: 'Mini Purse - Floral',
    category: 'Purses',
    price: 28.0,
    stock: 20,
    description: 'Compact floral mini purse with zipper closure. Made from recycled cotton fabric.',
    status: 'Active',
    createdDate: '2026-02-15',
    lastUpdated: '2026-05-18',
  },
  {
    id: 'P005',
    name: 'Fabric Coasters Set',
    category: 'Fabric Crafts',
    price: 20.0,
    stock: 0,
    description: 'Set of 4 handmade fabric coasters from mixed donated fabrics. Heat-resistant padding.',
    status: 'Active',
    createdDate: '2026-03-01',
    lastUpdated: '2026-05-25',
  },
  {
    id: 'P006',
    name: 'Tote Bag - Batik',
    category: 'Bags',
    price: 45.0,
    stock: 8,
    description: 'Spacious tote bag featuring traditional batik fabric from community donations.',
    status: 'Active',
    createdDate: '2026-03-10',
    lastUpdated: '2026-05-22',
  },
  {
    id: 'P007',
    name: 'Coin Purse - Patchwork',
    category: 'Purses',
    price: 18.0,
    stock: 4,
    description: 'Small patchwork coin purse with zip closure, made from upcycled fabric scraps.',
    status: 'Active',
    createdDate: '2026-04-05',
    lastUpdated: '2026-05-28',
  },
];

// ─── View Modal ───────────────────────────────────────────────────────────────

function ViewProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const stockStatus = getStockStatus(product.stock);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Product Details</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Product ID</p>
              <p className="text-sm text-[#3B2F2F]">{product.id}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Category</p>
              <p className="text-sm text-[#3B2F2F]">{product.category}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-[#6B5F5F] mb-1">Product Name</p>
              <p className="text-sm text-[#3B2F2F]">{product.name}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Price</p>
              <p className="text-sm text-[#3B2F2F]">RM {product.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Stock Quantity</p>
              <p className="text-sm text-[#3B2F2F]">{product.stock}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Stock Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs ${STOCK_BADGE[stockStatus]}`}>
                {stockStatus}
              </span>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Listing Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs ${product.status === 'Active' ? 'bg-[#8FBF9F] text-white' : 'bg-[#C8C8C8] text-white'}`}>
                {product.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Created Date</p>
              <p className="text-sm text-[#3B2F2F]">{product.createdDate.replace(/-/g, '/')}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Last Updated</p>
              <p className="text-sm text-[#3B2F2F]">{product.lastUpdated.replace(/-/g, '/')}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-[#6B5F5F] mb-1">Description</p>
              <p className="text-sm text-[#3B2F2F] leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end">
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

function EditProductModal({
  product,
  onSave,
  onClose,
}: {
  product: Product;
  onSave: (updated: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: product.name,
    category: product.category as string,
    price: product.price.toString(),
    stock: product.stock.toString(),
    description: product.description,
    status: product.status as string,
  });

  const set = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    if (!form.name.trim() || !form.price || !form.stock) return;
    onSave({
      ...product,
      name: form.name.trim(),
      category: form.category as Product['category'],
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock, 10) || 0,
      description: form.description.trim(),
      status: form.status as Product['status'],
      lastUpdated: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Edit Product</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Price (RM)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Stock Quantity</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => set('stock', e.target.value)}
                className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
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

// ─── Add Modal ────────────────────────────────────────────────────────────────

function AddProductModal({
  onAdd,
  onClose,
  nextId,
}: {
  onAdd: (p: Product) => void;
  onClose: () => void;
  nextId: string;
}) {
  const [form, setForm] = useState({
    name: '',
    category: 'Scrunchies',
    price: '',
    stock: '',
    description: '',
    status: 'Active',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Product name is required.';
    if (!form.price || isNaN(parseFloat(form.price)) || parseFloat(form.price) < 0)
      e.price = 'Enter a valid price.';
    if (!form.stock || isNaN(parseInt(form.stock, 10)) || parseInt(form.stock, 10) < 0)
      e.stock = 'Enter a valid quantity.';
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const today = new Date().toISOString().slice(0, 10);
    onAdd({
      id: nextId,
      name: form.name.trim(),
      category: form.category as Product['category'],
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      description: form.description.trim(),
      status: form.status as Product['status'],
      createdDate: today,
      lastUpdated: today,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Add New Product</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Image placeholder */}
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Product Image</label>
            <div className="w-full h-28 border-2 border-dashed border-[#E8D8C8] rounded-lg flex flex-col items-center justify-center gap-2 text-[#C8B8B8] hover:border-[#C76B83] hover:text-[#C76B83] cursor-pointer transition-colors">
              <ImagePlus className="w-6 h-6" />
              <p className="text-xs">Click to upload image</p>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Floral Scrunchie Set"
              className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${errors.name ? 'border-red-400' : 'border-[#E8D8C8]'}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Price (RM)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="0.00"
                className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${errors.price ? 'border-red-400' : 'border-[#E8D8C8]'}`}
              />
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Stock Quantity</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => set('stock', e.target.value)}
                placeholder="0"
                className={`w-full px-4 py-2 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${errors.stock ? 'border-red-400' : 'border-[#E8D8C8]'}`}
              />
              {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Product Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Describe the product, materials used, etc."
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
            onClick={handleAdd}
            className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteProductModal({
  product,
  onConfirm,
  onClose,
}: {
  product: Product;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-[#FDEAEA] rounded-full mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-[#C94C4C]" />
          </div>
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F] text-center mb-2">
            Delete Product?
          </h2>
          <p className="text-sm text-[#6B5F5F] text-center mb-1">
            <span className="text-[#3B2F2F]">{product.name}</span>
          </p>
          <p className="text-sm text-[#6B5F5F] text-center">
            This product will be removed from the product inventory.
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
            className="px-5 py-2 bg-[#C94C4C] text-white rounded-lg hover:bg-[#A03C3C] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Scrunchies', value: 'Scrunchies' },
  { label: 'Bags', value: 'Bags' },
  { label: 'Purses', value: 'Purses' },
  { label: 'Fabric Crafts', value: 'Fabric Crafts' },
  { label: 'In Stock', value: 'In Stock' },
  { label: 'Low Stock', value: 'Low Stock' },
  { label: 'Out of Stock', value: 'Out of Stock' },
];

const STOCK_STATUS_VALUES = new Set(['In Stock', 'Low Stock', 'Out of Stock']);
const CATEGORY_VALUES = new Set(['Scrunchies', 'Bags', 'Purses', 'Fabric Crafts']);

export function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchSearch =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);

      let matchFilter = true;
      if (filter !== 'all') {
        if (CATEGORY_VALUES.has(filter)) {
          matchFilter = p.category === filter;
        } else if (STOCK_STATUS_VALUES.has(filter)) {
          matchFilter = getStockStatus(p.stock) === filter;
        }
      }

      return matchSearch && matchFilter;
    });
  }, [products, search, filter]);

  const nextId = useMemo(() => {
    const nums = products.map((p) => parseInt(p.id.replace('P', ''), 10));
    return `P${String(Math.max(...nums) + 1).padStart(3, '0')}`;
  }, [products]);

  const handleEdit = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditProduct(null);
    toast.success('Product updated successfully.');
  };

  const handleAdd = (p: Product) => {
    setProducts((prev) => [...prev, p]);
    setShowAdd(false);
    toast.success('Product added successfully.');
  };

  const handleDelete = () => {
    if (!deleteProduct) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
    setDeleteProduct(null);
    toast.success('Product has been deleted successfully.');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Product Inventory</h1>
            <p className="text-sm text-[#6B5F5F] mt-1">Manage your product listings and stock levels</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8B8B8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Product ID, name, or category..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
          >
            {FILTER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Product ID</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide">Product Name</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Category</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Stock</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Price</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Status</th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center gap-2 text-[#C8B8B8]">
                        <Package className="w-8 h-8" />
                        <p className="text-sm">No products found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <tr key={product.id} className="hover:bg-[#FFF8F0]">
                        <td className="px-6 py-4 text-sm text-[#6B5F5F]">{product.id}</td>
                        <td className="px-6 py-4 text-sm text-[#3B2F2F]">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-[#6B5F5F]">{product.category}</td>
                        <td className="px-6 py-4 text-sm text-[#3B2F2F]">{product.stock}</td>
                        <td className="px-6 py-4 text-sm text-[#3B2F2F]">RM {product.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${STOCK_BADGE[stockStatus]}`}>
                            {stockStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewProduct(product)}
                              className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#FFF8F0] rounded transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditProduct(product)}
                              className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#FFF8F0] rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteProduct(product)}
                              className="p-1.5 text-[#C94C4C] hover:text-[#A03C3C] hover:bg-[#FDEAEA] rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-[#E8D8C8] text-xs text-[#6B5F5F]">
              Showing {filtered.length} of {products.length} products
            </div>
          )}
        </div>
      </div>

      {viewProduct && (
        <ViewProductModal product={viewProduct} onClose={() => setViewProduct(null)} />
      )}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onSave={handleEdit}
          onClose={() => setEditProduct(null)}
        />
      )}
      {deleteProduct && (
        <DeleteProductModal
          product={deleteProduct}
          onConfirm={handleDelete}
          onClose={() => setDeleteProduct(null)}
        />
      )}
      {showAdd && (
        <AddProductModal
          onAdd={handleAdd}
          onClose={() => setShowAdd(false)}
          nextId={nextId}
        />
      )}
    </AdminLayout>
  );
}
