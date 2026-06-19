import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Save, Building2, Bell, User, Settings2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

const INPUT = 'w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] bg-white';
const LABEL = 'block text-xs text-[#6B5F5F] mb-1.5';
const CARD = 'bg-white rounded-xl border border-[#E8D8C8] overflow-hidden';
const CARD_HEAD = 'px-6 py-4 border-b border-[#E8D8C8] flex items-center gap-3';

export function SettingsAdminPage() {
  const [business, setBusiness] = useState({
    name: 'KRAF HIBISCUS',
    tagline: 'Timeless & Handmade',
    email: 'krafhibiscus@gmail.com',
    hours: 'Monday – Saturday, 9:00 AM – 6:00 PM',
    phone1: '+60 13-754 8950',
    phone2: '+60 19-734 3239',
    address: 'Kabin Kraf Hibiscus, Jalan PI 4/14, Taman Pulai Indah, 81300 Skudai, Johor, Malaysia',
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    newOrders: true,
    paymentVerification: true,
    taskDeadline: false,
  });

  const [system, setSystem] = useState({
    currency: 'RM',
    dateFormat: 'YYYY/MM/DD',
    lowStock: '5',
    materialLowStock: '10',
  });

  const setBiz = (k: keyof typeof business, v: string) =>
    setBusiness(p => ({ ...p, [k]: v }));

  const setSys = (k: keyof typeof system, v: string) =>
    setSystem(p => ({ ...p, [k]: v }));

  const handleSave = () => toast.success('Settings updated successfully.');

  return (
    <AdminLayout>
      {/* Centered container — fills the admin main area without being too stretched */}
      <div className="max-w-[1100px] mx-auto space-y-6">

        {/* ── Page header ───────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Settings</h1>
            <p className="text-sm text-[#6B5F5F] mt-1">
              Manage business information, notification preferences, and system display settings.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {/* ── Row 1: Business Profile Settings (full width) ─────────────── */}
        <div className={CARD}>
          <div className={CARD_HEAD}>
            <div className="w-8 h-8 bg-[#FFF3E0] rounded-full flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-[#E8A87C]" />
            </div>
            <div>
              <p className="text-sm text-[#3B2F2F]">Business Profile Settings</p>
              <p className="text-xs text-[#9B8B8B]">Store and workshop details displayed across the system</p>
            </div>
          </div>

          <div className="p-6">
            {/* Row A: Name + Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={LABEL}>Business Name</label>
                <input type="text" value={business.name}
                  onChange={e => setBiz('name', e.target.value)} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>Business Tagline</label>
                <input type="text" value={business.tagline}
                  onChange={e => setBiz('tagline', e.target.value)} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>Business Email</label>
                <input type="email" value={business.email}
                  onChange={e => setBiz('email', e.target.value)} className={INPUT} />
              </div>
            </div>

            {/* Row B: Phones + Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className={LABEL}>Phone 1 — Puan Fhairna</label>
                <input type="text" value={business.phone1}
                  onChange={e => setBiz('phone1', e.target.value)} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>Phone 2 — Puan Sheila</label>
                <input type="text" value={business.phone2}
                  onChange={e => setBiz('phone2', e.target.value)} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>Operating Hours</label>
                <input type="text" value={business.hours}
                  onChange={e => setBiz('hours', e.target.value)} className={INPUT} />
              </div>
            </div>

            {/* Row C: Address (full width) */}
            <div>
              <label className={LABEL}>Workshop / Store Address</label>
              <textarea rows={2} value={business.address}
                onChange={e => setBiz('address', e.target.value)}
                className={`${INPUT} resize-none`} />
              <p className="text-xs text-[#9B8B8B] mt-1.5">
                This is the Kraf Hibiscus workshop address — not used as a customer delivery address.
              </p>
            </div>
          </div>
        </div>

        {/* ── Row 2: Admin Account (left) + Notification Settings (right) ─ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Admin Account — compact 2/5 */}
          <div className={`${CARD} lg:col-span-2`}>
            <div className={CARD_HEAD}>
              <div className="w-8 h-8 bg-[#FDEAF1] rounded-full flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-[#C76B83]" />
              </div>
              <p className="text-sm text-[#3B2F2F]">Admin Account</p>
            </div>

            <div className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#EFA3B7] rounded-full flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-[#3B2F2F]">Admin User</p>
                <p className="text-xs text-[#6B5F5F] truncate">admin@krafhibiscus.com</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#FFF3E0] text-[#C77A2A] text-[10px] rounded-full">
                  Administrator
                </span>
              </div>
            </div>

            <div className="px-5 pb-5">
              <Link
                to="/admin/profile"
                className="flex items-center justify-center gap-2 w-full py-2 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-sm"
              >
                Go to Admin Profile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Notification Settings — 3/5 */}
          <div className={`${CARD} lg:col-span-3`}>
            <div className={CARD_HEAD}>
              <div className="w-8 h-8 bg-[#E8F5EE] rounded-full flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-[#8FBF9F]" />
              </div>
              <div>
                <p className="text-sm text-[#3B2F2F]">Notification Settings</p>
                <p className="text-xs text-[#9B8B8B]">Choose which alerts to receive</p>
              </div>
            </div>

            <div className="divide-y divide-[#F5EDE3]">
              {([
                {
                  key: 'lowStock' as const,
                  label: 'Low stock alerts',
                  desc: 'Notify when product or material stock falls below the minimum level.',
                },
                {
                  key: 'newOrders' as const,
                  label: 'New order alerts',
                  desc: 'Notify when a customer places a new order.',
                },
                {
                  key: 'paymentVerification' as const,
                  label: 'Payment verification alerts',
                  desc: 'Notify when a payment proof is submitted and needs admin verification.',
                },
                {
                  key: 'taskDeadline' as const,
                  label: 'Task deadline alerts',
                  desc: 'Remind admin when a task deadline is approaching.',
                },
              ] as const).map(({ key, label, desc }) => (
                <div key={key} className="flex items-center gap-4 px-6 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#3B2F2F]">{label}</p>
                    <p className="text-xs text-[#9B8B8B] mt-0.5 leading-snug">{desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifications(p => ({ ...p, [key]: !p[key] }))}
                    aria-label={`Toggle ${label}`}
                    className={`relative shrink-0 w-10 h-5 rounded-full transition-colors duration-200 ${
                      notifications[key] ? 'bg-[#C76B83]' : 'bg-[#D8C8C8]'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      notifications[key] ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: System Preferences (full width, compact) ───────────── */}
        <div className={CARD}>
          <div className={CARD_HEAD}>
            <div className="w-8 h-8 bg-[#F0EAF5] rounded-full flex items-center justify-center shrink-0">
              <Settings2 className="w-4 h-4 text-[#9B7DC8]" />
            </div>
            <div>
              <p className="text-sm text-[#3B2F2F]">System Preferences</p>
              <p className="text-xs text-[#9B8B8B]">Display and threshold configuration</p>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={LABEL}>Default Currency</label>
                <select value={system.currency} onChange={e => setSys('currency', e.target.value)}
                  className={INPUT}>
                  <option value="RM">RM — Malaysian Ringgit</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="SGD">SGD — Singapore Dollar</option>
                </select>
              </div>
              <div>
                <label className={LABEL}>Date Format</label>
                <select value={system.dateFormat} onChange={e => setSys('dateFormat', e.target.value)}
                  className={INPUT}>
                  <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                </select>
              </div>
              <div>
                <label className={LABEL}>Low Stock Threshold</label>
                <div className="relative">
                  <input type="number" min="1" value={system.lowStock}
                    onChange={e => setSys('lowStock', e.target.value)}
                    className={`${INPUT} pr-12`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9B8B8B] pointer-events-none">
                    units
                  </span>
                </div>
              </div>
              <div>
                <label className={LABEL}>Material Low Stock Threshold</label>
                <div className="relative">
                  <input type="number" min="1" value={system.materialLowStock}
                    onChange={e => setSys('materialLowStock', e.target.value)}
                    className={`${INPUT} pr-12`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9B8B8B] pointer-events-none">
                    m/kg
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}