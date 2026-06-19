import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  User, Mail, Shield, Clock, Calendar,
  Edit, KeyRound, X, Save, CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

// ─── Edit Profile Modal ───────────────────────────────────────────────────────

function EditProfileModal({
  profile,
  onClose,
  onSave,
}: {
  profile: { name: string; email: string };
  onClose: () => void;
  onSave: (name: string, email: string) => void;
}) {
  const [form, setForm] = useState({ name: profile.name, email: profile.email });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSave(form.name.trim(), form.email.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Edit Profile</h2>
          <button onClick={onClose} className="text-[#9B8B8B] hover:text-[#3B2F2F] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-[#6B5F5F] mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] ${errors.name ? 'border-red-400' : 'border-[#E8D8C8]'}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs text-[#6B5F5F] mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] ${errors.email ? 'border-red-400' : 'border-[#E8D8C8]'}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs text-[#6B5F5F] mb-1.5">Role</label>
            <input
              type="text"
              value="Administrator"
              readOnly
              className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm bg-[#FFF8F0] text-[#9B8B8B] cursor-not-allowed"
            />
            <p className="text-xs text-[#9B8B8B] mt-1">Role cannot be changed from this page.</p>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-sm">
            Cancel
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Change Password Modal ────────────────────────────────────────────────────

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => {
    setForm(p => ({ ...p, [key]: val }));
    setErrors(p => ({ ...p, [key]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.current) e.current = 'Current password is required.';
    if (!form.newPass) e.newPass = 'New password is required.';
    else if (form.newPass.length < 8) e.newPass = 'Password must be at least 8 characters.';
    if (!form.confirm) e.confirm = 'Please confirm your new password.';
    else if (form.newPass && form.confirm !== form.newPass) e.confirm = 'Passwords do not match.';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    toast.success('Password updated successfully.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Change Password</h2>
          <button onClick={onClose} className="text-[#9B8B8B] hover:text-[#3B2F2F] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { key: 'current', label: 'Current Password', placeholder: '••••••••' },
            { key: 'newPass', label: 'New Password', placeholder: '••••••••' },
            { key: 'confirm', label: 'Confirm New Password', placeholder: '••••••••' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs text-[#6B5F5F] mb-1.5">
                {label} <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                value={form[key as keyof typeof form]}
                onChange={e => set(key, e.target.value)}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] ${errors[key] ? 'border-red-400' : 'border-[#E8D8C8]'}`}
              />
              {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-sm">
            Cancel
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm">
            <KeyRound className="w-4 h-4" />
            Save Password
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Profile Page ───────────────────────────────────────────────────────

const DETAIL_ROWS = [
  { icon: User,     label: 'Full Name',      key: 'name' as const },
  { icon: Mail,     label: 'Email',           key: 'email' as const },
  { icon: Shield,   label: 'Role',            key: 'role' as const },
  { icon: CheckCircle, label: 'Account Status', key: 'status' as const },
  { icon: Calendar, label: 'Created Date',    key: 'created' as const },
  { icon: Clock,    label: 'Last Login',      key: 'lastLogin' as const },
];

export function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@krafhibiscus.com',
    role: 'Administrator',
    status: 'Active',
    created: '2026/01/01',
    lastLogin: 'Today, 9:30 AM',
  });

  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSaveProfile = (name: string, email: string) => {
    setProfile(p => ({ ...p, name, email }));
    setShowEdit(false);
    toast.success('Profile updated successfully.');
  };

  return (
    <AdminLayout>
      <div className="max-w-[1100px] mx-auto space-y-6">

        {/* Page header */}
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Admin Profile</h1>
          <p className="text-sm text-[#6B5F5F] mt-1">
            View and manage administrator account information.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* ── Left column: Profile summary card (2/5) ─────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
              {/* Avatar section */}
              <div className="bg-[#FFF8F0] px-6 pt-8 pb-6 flex flex-col items-center text-center border-b border-[#E8D8C8]">
                <div className="w-20 h-20 bg-[#EFA3B7] rounded-full flex items-center justify-center shadow-md mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <p className="font-['Playfair_Display'] text-xl text-[#3B2F2F] mb-0.5">{profile.name}</p>
                <p className="text-sm text-[#6B5F5F] mb-3">{profile.email}</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F5EE] text-[#3A7D58] text-xs rounded-full">
                  <span className="w-1.5 h-1.5 bg-[#3A7D58] rounded-full" />
                  Active
                </span>
              </div>

              {/* Summary info */}
              <div className="px-6 py-5 space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-[#F5EDE3]">
                  <span className="text-xs text-[#9B8B8B]">Role</span>
                  <span className="text-sm text-[#3B2F2F]">{profile.role}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#F5EDE3]">
                  <span className="text-xs text-[#9B8B8B]">Created Date</span>
                  <span className="text-sm text-[#3B2F2F]">{profile.created}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-[#9B8B8B]">Last Login</span>
                  <span className="text-sm text-[#3B2F2F]">{profile.lastLogin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: Details + Actions (3/5) ───────────────────── */}
          <div className="lg:col-span-3 space-y-5">

            {/* Account Information card */}
            <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E8D8C8] flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FDEAF1] rounded-full flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#C76B83]" />
                </div>
                <div>
                  <p className="text-sm text-[#3B2F2F]">Account Information</p>
                  <p className="text-xs text-[#9B8B8B]">Current administrator account details</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                  {DETAIL_ROWS.map(({ icon: Icon, label, key }) => (
                    <div key={key} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#FFF8F0] rounded-full flex items-center justify-center shrink-0 border border-[#E8D8C8]">
                        <Icon className="w-3.5 h-3.5 text-[#C76B83]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#9B8B8B] mb-0.5">{label}</p>
                        {key === 'status' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#E8F5EE] text-[#3A7D58] text-xs rounded-full">
                            <span className="w-1.5 h-1.5 bg-[#3A7D58] rounded-full" />
                            {profile[key]}
                          </span>
                        ) : (
                          <p className="text-sm text-[#3B2F2F] break-words">{profile[key]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Actions card */}
            <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E8D8C8] flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFF3E0] rounded-full flex items-center justify-center shrink-0">
                  <KeyRound className="w-4 h-4 text-[#E8A87C]" />
                </div>
                <div>
                  <p className="text-sm text-[#3B2F2F]">Account Actions</p>
                  <p className="text-xs text-[#9B8B8B]">Update profile information or change password</p>
                </div>
              </div>

              <div className="px-6 py-5 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowEdit(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowPassword(true)}
                  className="flex items-center gap-2 px-5 py-2.5 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-sm"
                >
                  <KeyRound className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {showEdit && (
        <EditProfileModal
          profile={{ name: profile.name, email: profile.email }}
          onClose={() => setShowEdit(false)}
          onSave={handleSaveProfile}
        />
      )}
      {showPassword && (
        <ChangePasswordModal onClose={() => setShowPassword(false)} />
      )}
    </AdminLayout>
  );
}
