import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockStaff } from '../../data/staffData';
import { toast } from 'sonner';
import { ArrowLeft, Info } from 'lucide-react';

const ROLES = [
  'Production Lead',
  'Production Staff',
  'Designer',
  'Quality Control',
  'Packaging Staff',
  'Inventory Manager',
];

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-[#3B2F2F] mb-1.5">
        {label}
        {required && <span className="text-[#C94C4C] ml-0.5"> *</span>}
      </label>
      {children}
      {error && <p className="text-xs text-[#C94C4C] mt-1">{error}</p>}
    </div>
  );
}

export function AddStaffPage() {
  const navigate = useNavigate();

  const nextId = useMemo(() => {
    const nums = mockStaff.map((s) => parseInt(s.id.replace('STF-', ''), 10));
    return `STF-${String(Math.max(...nums) + 1).padStart(3, '0')}`;
  }, []);

  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    role: '',
    joiningDate: new Date().toISOString().slice(0, 10),
    status: 'Active',
    availabilityStatus: 'Available',
    remarks: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => {
      const n = { ...p };
      delete n[k];
      return n;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Staff name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.contact.trim()) e.contact = 'Contact number is required.';
    else if (!/^[+]?[\d\s\-()]{8,}$/.test(form.contact)) e.contact = 'Enter a valid contact number.';
    if (!form.role) e.role = 'Role is required.';
    if (!form.joiningDate) e.joiningDate = 'Joining date is required.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fill in all required fields.');
      return;
    }
    toast.success('Staff record added successfully!');
    navigate('/admin/staff');
  };

  const cls = (field: string) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white transition-colors ${
      errors[field] ? 'border-[#C94C4C]' : 'border-[#E8D8C8]'
    }`;

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <Link
          to="/admin/staff"
          className="inline-flex items-center text-sm text-[#6B5F5F] hover:text-[#C76B83] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Staff List
        </Link>

        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8D8C8] bg-[#FFF8F0]">
            <h1 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">Add Staff Record</h1>
            <p className="text-sm text-[#6B5F5F] mt-1">Add a new staff member to the system.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Auto-generated ID */}
            <div className="bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8] flex items-center gap-3">
              <Info className="w-4 h-4 text-[#9B8B8B] shrink-0" />
              <div>
                <p className="text-xs text-[#9B8B8B]">Auto-generated Staff ID (read-only)</p>
                <p className="text-sm text-[#3B2F2F] font-mono mt-0.5">{nextId}</p>
              </div>
            </div>

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Staff Name" required error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. Siti Aminah"
                  className={cls('name')}
                />
              </Field>
              <Field label="Email Address" required error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="e.g. staff@krafhibiscus.com"
                  className={cls('email')}
                />
              </Field>
            </div>

            {/* Contact + Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Contact Number" required error={errors.contact}>
                <input
                  type="tel"
                  value={form.contact}
                  onChange={(e) => set('contact', e.target.value)}
                  placeholder="+60 12-345 6789"
                  className={cls('contact')}
                />
              </Field>
              <Field label="Role" required error={errors.role}>
                <select value={form.role} onChange={(e) => set('role', e.target.value)} className={cls('role')}>
                  <option value="">— Select role —</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Joining Date + Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Joining Date" required error={errors.joiningDate}>
                <input
                  type="date"
                  value={form.joiningDate}
                  onChange={(e) => set('joiningDate', e.target.value)}
                  className={cls('joiningDate')}
                />
              </Field>
              <Field label="Status" required>
                <select value={form.status} onChange={(e) => set('status', e.target.value)} className={cls('status')}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </Field>
            </div>

            {/* Availability Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Availability Status" required>
                <select
                  value={form.availabilityStatus}
                  onChange={(e) => set('availabilityStatus', e.target.value)}
                  className={cls('availabilityStatus')}
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </Field>
              <div />
            </div>

            {/* Remarks */}
            <Field label="Remarks">
              <textarea
                rows={3}
                value={form.remarks}
                onChange={(e) => set('remarks', e.target.value)}
                placeholder="Additional notes about this staff member (optional)"
                className={`${cls('remarks')} resize-none`}
              />
            </Field>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-[#E8D8C8]">
              <button
                type="button"
                onClick={() => navigate('/admin/staff')}
                className="px-6 py-2.5 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm"
              >
                Save Staff Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}