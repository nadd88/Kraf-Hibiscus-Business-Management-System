import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  ShoppingBag,
  Clock,
  AlertTriangle,
  Users,
  CheckSquare,
  DollarSign,
  Eye,
  TrendingUp,
  BarChart2,
  ArrowRight,
  CreditCard,
  PackageX,
  XCircle,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';

/* ─────────────────────────── constants ──────────────────────────────── */
const CARD = 'bg-white rounded-xl border border-[#E8D8C8]';

const recentOrders = [
  { id: 'ORD-1001', customer: 'Sarah Ahmad',     date: '2026-05-20', total: 'RM 45.00', status: 'Processing' },
  { id: 'ORD-1002', customer: 'Ahmad bin Hassan', date: '2026-05-20', total: 'RM 28.00', status: 'Shipped'    },
  { id: 'ORD-1003', customer: 'Lim Wei Ting',    date: '2026-05-19', total: 'RM 65.00', status: 'Delivered'  },
  { id: 'ORD-1004', customer: 'Nurul Aisyah',    date: '2026-05-19', total: 'RM 38.00', status: 'Processing' },
  { id: 'ORD-1005', customer: 'Chen Li Ming',    date: '2026-05-18', total: 'RM 52.00', status: 'Shipped'    },
];

const STATUS_BADGE: Record<string, string> = {
  Processing: 'bg-[#FFF3E0] text-[#C77A2A]',
  Shipped:    'bg-[#FDEAF1] text-[#C76B83]',
  Delivered:  'bg-[#E8F5EE] text-[#5A9E72]',
};

/* ─────────────────────────── component ──────────────────────────────── */
export function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="max-w-[1340px] mx-auto space-y-5">

        {/* ══════════════════════════════════════════
            1. PAGE HEADER
        ══════════════════════════════════════════ */}
        <div>
          <h1 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">Admin Dashboard</h1>
          <p className="text-xs text-[#9B8B8B] mt-0.5">
            Welcome back. Here is today's business overview. &nbsp;·&nbsp; Tuesday, 2 June 2026
          </p>
        </div>

        {/* ══════════════════════════════════════════
            2. KEY METRICS — 4 primary cards
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Today's Orders */}
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-[#FDEAF1] rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#C76B83]" />
              </div>
              <span className="flex items-center gap-1 text-[11px] text-[#5A9E72] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +12% this month
              </span>
            </div>
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide mb-1">Today's Orders</p>
            <p className="text-3xl text-[#3B2F2F]">18</p>
            <p className="text-[11px] text-[#9B8B8B] mt-1">156 total orders overall</p>
          </div>

          {/* Pending Payments */}
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-[#FFF3E0] rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#E8A87C]" />
              </div>
              <span className="text-[11px] text-[#C77A2A] bg-[#FFF3E0] px-2 py-0.5 rounded-full">
                Needs review
              </span>
            </div>
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide mb-1">Pending Payments</p>
            <p className="text-3xl text-[#3B2F2F]">3</p>
            <p className="text-[11px] text-[#9B8B8B] mt-1">Awaiting verification</p>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white rounded-xl border border-[#FDDCDC] p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-[#FDEAEA] rounded-xl flex items-center justify-center">
                <PackageX className="w-5 h-5 text-[#C94C4C]" />
              </div>
              <span className="text-[11px] text-[#C94C4C] bg-[#FDEAEA] px-2 py-0.5 rounded-full">
                Action needed
              </span>
            </div>
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide mb-1">Low Stock Alerts</p>
            <p className="text-3xl text-[#C94C4C]">2</p>
            <p className="text-[11px] text-[#9B8B8B] mt-1">Products below threshold</p>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-[#E8F5EE] rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#5A9E72]" />
              </div>
              <span className="flex items-center gap-1 text-[11px] text-[#5A9E72] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +18%
              </span>
            </div>
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide mb-1">Monthly Revenue</p>
            <p className="text-2xl text-[#3B2F2F]">RM 12,450</p>
            <p className="text-[11px] text-[#9B8B8B] mt-1">June 2026 to date</p>
          </div>

        </div>

        {/* ══════════════════════════════════════════
            3. ATTENTION REQUIRED
        ══════════════════════════════════════════ */}
        <div className={`${CARD} overflow-hidden`}>
          {/* card header */}
          <div className="px-5 py-3 border-b border-[#E8D8C8] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C94C4C] animate-pulse" />
            <p className="text-sm text-[#3B2F2F]">Attention Required</p>
            <span className="ml-auto text-[10px] bg-[#FDEAEA] text-[#C94C4C] px-2 py-0.5 rounded-full">4 items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F5EDE3]">

            {/* Payments */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-9 h-9 bg-[#FFF3E0] rounded-lg flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4 text-[#E8A87C]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#3B2F2F]">3 payments waiting</p>
                <p className="text-[10px] text-[#9B8B8B] mt-0.5">Need verification</p>
              </div>
              <Link to="/admin/payments" className="shrink-0 text-[10px] text-[#C76B83] hover:text-[#9B2D4A] font-medium transition-colors">
                Review →
              </Link>
            </div>

            {/* Low stock */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-9 h-9 bg-[#FDEAEA] rounded-lg flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-[#C94C4C]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#3B2F2F]">2 items low in stock</p>
                <p className="text-[10px] text-[#9B8B8B] mt-0.5">Need restocking</p>
              </div>
              <Link to="/admin/inventory" className="shrink-0 text-[10px] text-[#C76B83] hover:text-[#9B2D4A] font-medium transition-colors">
                Restock →
              </Link>
            </div>

            {/* Tasks pending */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-9 h-9 bg-[#FDEAF1] rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#C76B83]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#3B2F2F]">4 tasks still pending</p>
                <p className="text-[10px] text-[#9B8B8B] mt-0.5">Awaiting assignment</p>
              </div>
              <Link to="/admin/tasks" className="shrink-0 text-[10px] text-[#C76B83] hover:text-[#9B2D4A] font-medium transition-colors">
                Assign →
              </Link>
            </div>

            {/* Cancellation */}
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-9 h-9 bg-[#FDEAEA] rounded-lg flex items-center justify-center shrink-0">
                <XCircle className="w-4 h-4 text-[#C94C4C]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#3B2F2F]">1 cancellation request</p>
                <p className="text-[10px] text-[#9B8B8B] mt-0.5">Needs admin review</p>
              </div>
              <Link to="/admin/orders" className="shrink-0 text-[10px] text-[#C76B83] hover:text-[#9B2D4A] font-medium transition-colors">
                Review →
              </Link>
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════
            4. MAIN GRID — left 65% · right 35%
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 items-start">

          {/* ── LEFT: Recent Orders ─────────────────────────────── */}
          <div className={CARD}>
            <div className="px-5 py-3.5 border-b border-[#E8D8C8] flex items-center justify-between">
              <p className="text-sm text-[#3B2F2F]">Recent Orders</p>
              <Link to="/admin/orders" className="flex items-center gap-1 text-xs text-[#C76B83] hover:text-[#EFA3B7] transition-colors">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr className="bg-[#FFF8F0]">
                    {['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Action'].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-2.5 text-[10px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap ${i === 5 ? 'text-center' : 'text-left'}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5EDE3]">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FFFAF5] transition-colors">
                      <td className="px-4 py-3 text-xs text-[#3B2F2F] whitespace-nowrap">{order.id}</td>
                      <td className="px-4 py-3 text-xs text-[#3B2F2F]">{order.customer}</td>
                      <td className="px-4 py-3 text-xs text-[#6B5F5F] whitespace-nowrap">{order.date}</td>
                      <td className="px-4 py-3 text-xs text-[#3B2F2F] whitespace-nowrap">{order.total}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap ${STATUS_BADGE[order.status] ?? 'bg-[#F5EDE3] text-[#6B5F5F]'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => navigate('/admin/orders')}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg hover:bg-[#FDEAF1] text-[#C76B83] hover:text-[#9B2D4A] transition-colors"
                          title="View order"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── RIGHT COLUMN ────────────────────────────────────── */}
          <div className="space-y-4">

            {/* 5. Quick Actions */}
            <div className={CARD}>
              <div className="px-5 py-3.5 border-b border-[#E8D8C8]">
                <p className="text-sm text-[#3B2F2F]">Quick Actions</p>
              </div>
              <div className="p-3 space-y-1.5">

                {/* standard actions */}
                {[
                  { label: 'Add Product',  icon: ShoppingBag, path: '/admin/inventory/add', accent: '#C76B83', bg: '#FDEAF1' },
                  { label: 'Create Task',  icon: CheckSquare, path: '/admin/tasks/create',  accent: '#E8A87C', bg: '#FFF3E0' },
                  { label: 'Add Staff',    icon: Users,       path: '/admin/staff/add',     accent: '#8FBF9F', bg: '#E8F5EE' },
                ].map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.label}
                      to={a.path}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFF8F0] transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: a.bg }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: a.accent }} />
                      </div>
                      <span className="text-xs text-[#3B2F2F] group-hover:text-[#C76B83] transition-colors flex-1">{a.label}</span>
                      <ArrowRight className="w-3 h-3 text-[#D8C8C8] group-hover:text-[#C76B83] transition-colors" />
                    </Link>
                  );
                })}

                {/* divider */}
                <div className="border-t border-[#F5EDE3] pt-1.5 space-y-1.5">
                  {/* highlighted actions */}
                  <Link
                    to="/admin/payments"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#FFF3E0] hover:bg-[#FFE8C8] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#E8A87C] flex items-center justify-center shrink-0">
                      <CreditCard className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-[#3B2F2F]">Verify Payment</span>
                      <span className="ml-2 text-[10px] text-[#C94C4C] bg-[#FDEAEA] px-1.5 py-0.5 rounded-full">3 pending</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#E8A87C]" />
                  </Link>
                  <Link
                    to="/admin/reports"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#FDEAF1] hover:bg-[#F5D4E0] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#C76B83] flex items-center justify-center shrink-0">
                      <BarChart2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs text-[#3B2F2F] flex-1">Generate Report</span>
                    <ArrowRight className="w-3 h-3 text-[#C76B83]" />
                  </Link>
                </div>

              </div>
            </div>

            {/* 6. Task Progress + staff/task chips */}
            <div className={CARD}>
              <div className="px-5 py-3.5 border-b border-[#E8D8C8] flex items-center justify-between">
                <p className="text-sm text-[#3B2F2F]">Task Progress</p>
                <Link to="/admin/tasks" className="text-xs text-[#C76B83] hover:text-[#EFA3B7] transition-colors">View Tasks</Link>
              </div>

              {/* summary chips */}
              <div className="flex items-center gap-2 px-5 pt-3.5">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E8F5EE] rounded-full">
                  <Users className="w-3 h-3 text-[#5A9E72]" />
                  <span className="text-[10px] text-[#5A9E72]">Active Staff: 12</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FDEAF1] rounded-full">
                  <CheckSquare className="w-3 h-3 text-[#C76B83]" />
                  <span className="text-[10px] text-[#C76B83]">Ongoing Tasks: 34</span>
                </div>
              </div>

              {/* bars */}
              <div className="px-5 py-3.5 space-y-3">
                {[
                  { label: 'Completed',   count: 18, total: 34, pct: 53, bar: 'bg-[#8FBF9F]', val: 'text-[#5A9E72]', icon: CheckCircle2, iconCol: 'text-[#5A9E72]' },
                  { label: 'In Progress', count: 12, total: 34, pct: 35, bar: 'bg-[#E8A87C]', val: 'text-[#C77A2A]', icon: Clock,         iconCol: 'text-[#C77A2A]' },
                  { label: 'Pending',     count: 4,  total: 34, pct: 12, bar: 'bg-[#EFA3B7]', val: 'text-[#C76B83]', icon: Clock,         iconCol: 'text-[#C76B83]' },
                ].map((row) => {
                  const Icon = row.icon;
                  return (
                    <div key={row.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Icon className={`w-3 h-3 ${row.iconCol}`} />
                          <span className="text-xs text-[#6B5F5F]">{row.label}</span>
                        </div>
                        <span className={`text-[11px] ${row.val}`}>{row.count}/{row.total}</span>
                      </div>
                      <div className="w-full bg-[#F5EDE3] rounded-full h-1.5">
                        <div className={`${row.bar} h-1.5 rounded-full`} style={{ width: `${row.pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 7. Inventory Alert */}
            <div className={CARD}>
              <div className="px-5 py-3.5 border-b border-[#FDDCDC] flex items-center justify-between bg-[#FFF8F0]">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#C94C4C]" />
                  <p className="text-sm text-[#3B2F2F]">Inventory Alert</p>
                </div>
                <Link to="/admin/inventory" className="text-xs text-[#C76B83] hover:text-[#EFA3B7] transition-colors">View All</Link>
              </div>
              <div className="p-3 space-y-2">
                {[
                  { name: 'Floral Scrunchie Set', sku: 'P001', stock: 5, level: 'warning'  },
                  { name: 'Crossbody Bag',         sku: 'P003', stock: 3, level: 'critical' },
                ].map((item) => {
                  const isCrit = item.level === 'critical';
                  return (
                    <div key={item.name} className={`flex items-center gap-3 px-3 py-3 rounded-lg border ${isCrit ? 'bg-[#FFFAFA] border-[#FDDCDC]' : 'bg-[#FFFDF5] border-[#FFE8C8]'}`}>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${isCrit ? 'bg-[#C94C4C]' : 'bg-[#E8A87C]'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#3B2F2F] truncate">{item.name}</p>
                        <p className={`text-[10px] mt-0.5 ${isCrit ? 'text-[#C94C4C]' : 'text-[#C77A2A]'}`}>
                          {item.stock} units left
                        </p>
                      </div>
                      <Link
                        to="/admin/materials"
                        className={`shrink-0 text-[10px] px-2 py-1 rounded-md font-medium transition-colors ${
                          isCrit
                            ? 'bg-[#FDEAEA] text-[#C94C4C] hover:bg-[#F5C6C6]'
                            : 'bg-[#FFF3E0] text-[#C77A2A] hover:bg-[#FFE8C8]'
                        }`}
                      >
                        Restock
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
