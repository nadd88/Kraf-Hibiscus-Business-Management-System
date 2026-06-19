import { useState } from 'react';
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  ClipboardList,
  KeyRound,
  Pencil,
  X,
} from 'lucide-react';

export function MyProfilePage() {
  const { customer, updateProfile } = useAuth();

  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState({ fullName: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [changePwOpen, setChangePwOpen] = useState(false);

  if (!customer) return null;

  const openEdit = () => {
    setDraft({
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
    setErrors({});
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setErrors({});
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!draft.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!draft.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))
      errs.email = 'Enter a valid email address.';
    if (!draft.phone.trim()) errs.phone = 'Phone number is required.';
    if (!draft.address.trim()) errs.address = 'Delivery address is required.';
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    updateProfile(draft);
    setEditOpen(false);
    toast.success('Profile updated successfully.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-4xl text-[#3B2F2F] mb-1">My Profile</h1>
          <p className="text-[#6B5F5F]">View and manage your personal account information.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Left: Summary + Actions ── */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Avatar card */}
            <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-[#EFA3B7] to-[#C76B83] px-6 py-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-['Playfair_Display'] text-xl text-white mb-1">
                  {customer.fullName}
                </h2>
                <p className="text-white/80 text-sm">{customer.email}</p>
              </div>
              <div className="px-6 py-5 space-y-3">
                <SummaryRow
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="Customer ID"
                  value={customer.id}
                />
                <SummaryRow
                  icon={<Calendar className="w-4 h-4" />}
                  label="Registered Date"
                  value={customer.registeredDate}
                />
                <SummaryRow
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="Account Status"
                  value={customer.status}
                  badge
                />
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-sm p-6">
              <h3 className="text-[#3B2F2F] mb-4">Account Actions</h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={openEdit}
                  className="flex items-center gap-3 px-4 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-xl hover:bg-[#C76B83] hover:text-white transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={() => setChangePwOpen(true)}
                  className="flex items-center gap-3 px-4 py-3 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-xl hover:bg-[#F5EDE3] transition-colors"
                >
                  <KeyRound className="w-4 h-4" />
                  Change Password
                </button>
                <Link
                  to="/my-orders"
                  className="flex items-center gap-3 px-4 py-3 border-2 border-[#E8D8C8] text-[#6B5F5F] rounded-xl hover:bg-[#FFF8F0] transition-colors"
                >
                  <ClipboardList className="w-4 h-4" />
                  View My Orders
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right: Personal Info + Overview ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-[#E8D8C8] flex items-center justify-between">
                <h3 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">
                  Personal Information
                </h3>
                <button
                  onClick={openEdit}
                  className="flex items-center gap-2 text-sm text-[#C76B83] hover:text-[#EFA3B7] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>

              <div className="px-8 py-2">
                <div className="grid sm:grid-cols-2 gap-x-10">
                  <InfoField icon={<User className="w-4 h-4" />} label="Full Name" value={customer.fullName} />
                  <InfoField icon={<Mail className="w-4 h-4" />} label="Email Address" value={customer.email} />
                  <InfoField icon={<Phone className="w-4 h-4" />} label="Phone Number" value={customer.phone || '—'} />
                </div>
                <div className="border-t border-[#F5EDE3] pt-5 pb-5">
                  <div className="flex items-start gap-3">
                    <div className="text-[#EFA3B7] mt-0.5 flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B5F5F] mb-0.5">Delivery Address</p>
                      <p className="text-[#3B2F2F]">{customer.address || '—'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Overview */}
            <div className="bg-white rounded-2xl border border-[#E8D8C8] shadow-sm p-8">
              <h3 className="font-['Playfair_Display'] text-xl text-[#3B2F2F] mb-4">
                Account Overview
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <StatCard label="Total Orders" value="3" color="bg-[#FDEAF1]" textColor="text-[#C76B83]" />
                <StatCard label="Delivered" value="1" color="bg-[#E8F5EE]" textColor="text-[#4B9E6B]" />
                <StatCard label="Processing" value="1" color="bg-[#FFF3E0]" textColor="text-[#E8A87C]" />
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/my-orders"
                  className="text-sm text-[#C76B83] hover:text-[#EFA3B7] transition-colors"
                >
                  View all orders →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Edit Profile Modal ── */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center px-8 py-6 border-b border-[#E8D8C8]">
              <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">Edit Profile</h2>
              <button onClick={closeEdit} className="text-[#6B5F5F] hover:text-[#C94C4C] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-8 py-6 space-y-5">
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Full Name *</label>
                <input
                  name="fullName"
                  value={draft.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                />
                {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  value={draft.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Phone Number *</label>
                <input
                  name="phone"
                  value={draft.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                />
                {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Delivery Address *</label>
                <textarea
                  name="address"
                  value={draft.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] resize-none"
                />
                {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Read-only fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#6B5F5F] mb-2">Customer ID</label>
                  <input
                    value={customer.id}
                    readOnly
                    className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg bg-[#FFF8F0] text-[#6B5F5F] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#6B5F5F] mb-2">Registered Date</label>
                  <input
                    value={customer.registeredDate}
                    readOnly
                    className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg bg-[#FFF8F0] text-[#6B5F5F] cursor-not-allowed"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-[#6B5F5F] mb-2">Account Status</label>
                  <input
                    value={customer.status}
                    readOnly
                    className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg bg-[#FFF8F0] text-[#6B5F5F] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-8 pb-8">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={closeEdit}
                className="px-6 py-3 border-2 border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Change Password Modal ── */}
      {changePwOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center px-8 py-6 border-b border-[#E8D8C8]">
              <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">Change Password</h2>
              <button
                onClick={() => setChangePwOpen(false)}
                className="text-[#6B5F5F] hover:text-[#C94C4C] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-8 py-6 space-y-4">
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="flex gap-3 px-8 pb-8">
              <button
                onClick={() => { setChangePwOpen(false); toast.success('Password changed successfully.'); }}
                className="flex-1 px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
              >
                Save Password
              </button>
              <button
                onClick={() => setChangePwOpen(false)}
                className="px-6 py-3 border-2 border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function SummaryRow({ icon, label, value, badge }: { icon: React.ReactNode; label: string; value: string; badge?: boolean }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-[#F5EDE3] last:border-0">
      <div className="text-[#EFA3B7] flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#6B5F5F]">{label}</p>
        {badge ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 mt-0.5">
            {value}
          </span>
        ) : (
          <p className="text-sm text-[#3B2F2F] truncate">{value}</p>
        )}
      </div>
    </div>
  );
}

function InfoField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-5 border-b border-[#F5EDE3]">
      <div className="text-[#EFA3B7] mt-0.5 flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#6B5F5F] mb-0.5">{label}</p>
        <p className="text-[#3B2F2F] break-words">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, textColor }: { label: string; value: string; color: string; textColor: string }) {
  return (
    <div className={`${color} rounded-xl p-4 text-center`}>
      <p className={`text-2xl ${textColor} mb-1`}>{value}</p>
      <p className="text-xs text-[#6B5F5F]">{label}</p>
    </div>
  );
}
