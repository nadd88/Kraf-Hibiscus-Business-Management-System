import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockFinancialRecords } from '../../data/adminData';
import { mockTasks, mockStaff, mockContributions } from '../../data/staffData';
import { toast } from 'sonner';
import {
  TrendingUp, ShoppingBag, Package, Users, BarChart2,
  Download, FileText, Calendar, Hash,
} from 'lucide-react';

// ─── Static chart data ────────────────────────────────────────────────────────

const monthlyRevenue = [
  { month: 'Jan', revenue: 1240 },
  { month: 'Feb', revenue: 1850 },
  { month: 'Mar', revenue: 2100 },
  { month: 'Apr', revenue: 1780 },
  { month: 'May', revenue: 2450 },
  { month: 'Jun', revenue: 3120 },
];

const orderTrend = [
  { month: 'Jan', orders: 18 },
  { month: 'Feb', orders: 25 },
  { month: 'Mar', orders: 30 },
  { month: 'Apr', orders: 22 },
  { month: 'May', orders: 35 },
  { month: 'Jun', orders: 42 },
];

const topProducts = [
  { name: 'Floral Scrunchie Set', category: 'Scrunchies', unitsSold: 84, revenue: 1176 },
  { name: 'Batik Tote Bag', category: 'Bags', unitsSold: 47, revenue: 2209 },
  { name: 'Crossbody Bag', category: 'Bags', unitsSold: 31, revenue: 2170 },
  { name: 'Mini Coin Purse', category: 'Purses', unitsSold: 58, revenue: 1044 },
  { name: 'Quilted Fabric Pouch', category: 'Purses', unitsSold: 26, revenue: 884 },
];

const staffPerformance = mockStaff
  .filter((s) => s.status === 'Active')
  .map((s) => {
    const staffTasks = mockTasks.filter((t) => t.assignedStaffId === s.id);
    const completed = staffTasks.filter((t) => t.status === 'Completed').length;
    return {
      name: s.name,
      tasks: staffTasks.length,
      completed,
      rate: staffTasks.length > 0 ? Math.round((completed / staffTasks.length) * 100) : 0,
    };
  })
  .filter((s) => s.tasks > 0);

const REPORT_TYPES = [
  'Sales Report',
  'Inventory Report',
  'Staff Contribution Report',
  'Financial Report',
];

// ─── Bar Chart (self-contained, no overflow) ─────────────────────────────────

function BarChartCustom({ data, valueKey, color, formatValue }: {
  data: { month: string; [key: string]: number | string }[];
  valueKey: string;
  color: string;
  formatValue: (v: number) => string;
}) {
  const values = data.map((d) => d[valueKey] as number);
  const max = Math.max(...values);
  return (
    <div className="w-full">
      {/* Bar area: fixed height, no overflow */}
      <div className="flex items-end gap-1.5 px-1" style={{ height: '120px' }}>
        {data.map((d) => {
          const val = d[valueKey] as number;
          const pct = max > 0 ? (val / max) * 90 : 0; // max 90% so bars have headroom
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center justify-end group relative" style={{ height: '100%' }}>
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#3B2F2F] text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10"
              >
                {formatValue(val)}
              </div>
              <div
                className="w-full rounded-t-sm transition-all duration-300"
                style={{ height: `${pct}%`, backgroundColor: color, minHeight: '4px' }}
              />
            </div>
          );
        })}
      </div>
      {/* Month labels */}
      <div className="flex mt-2 px-1">
        {data.map((d) => (
          <div key={d.month} className="flex-1 text-center text-[10px] text-[#6B5F5F]">{d.month}</div>
        ))}
      </div>
    </div>
  );
}

// ─── Line Chart (fully contained, no overflow) ───────────────────────────────

function LineChartCustom({ data, valueKey, color }: {
  data: { month: string; [key: string]: number | string }[];
  valueKey: string;
  color: string;
}) {
  const values = data.map((d) => d[valueKey] as number);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  // ViewBox with internal padding so points/circles never touch the edge
  const VW = 300;
  const VH = 100;
  const PAD_X = 12;
  const PAD_Y = 10;
  const plotW = VW - PAD_X * 2;
  const plotH = VH - PAD_Y * 2;

  const points = data.map((d, i) => {
    const val = d[valueKey] as number;
    const x = PAD_X + (data.length > 1 ? (i / (data.length - 1)) * plotW : plotW / 2);
    const y = PAD_Y + plotH - ((val - min) / range) * plotH;
    return { x, y, val, month: d.month as string };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="w-full">
      {/* Chart area: explicit height + overflow hidden to contain the SVG */}
      <div className="overflow-hidden rounded" style={{ height: '120px' }}>
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          style={{ display: 'block', overflow: 'hidden' }}
        >
          {/* Horizontal grid lines (inside padded area) */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={PAD_X}
              y1={PAD_Y + t * plotH}
              x2={PAD_X + plotW}
              y2={PAD_Y + t * plotH}
              stroke="#F0E4D8"
              strokeWidth="0.8"
            />
          ))}
          {/* Filled area under the line */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${PAD_Y + plotH} L ${points[0].x} ${PAD_Y + plotH} Z`}
            fill={color}
            fillOpacity="0.08"
          />
          {/* The line itself */}
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data point circles — drawn last so they appear on top */}
          {points.map((p) => (
            <circle key={p.month} cx={p.x} cy={p.y} r="3.5" fill="white" stroke={color} strokeWidth="1.8" />
          ))}
        </svg>
      </div>
      {/* Month labels below chart area */}
      <div className="flex mt-2">
        {data.map((d) => (
          <div key={d.month} className="flex-1 text-center text-[10px] text-[#6B5F5F]">{d.month}</div>
        ))}
      </div>
    </div>
  );
}

// ─── Report preview data generators ──────────────────────────────────────────

type PreviewData = {
  summaryCards: { label: string; value: string; color: string }[];
  tableHeaders: string[];
  tableRows: string[][];
  extraTableTitle?: string;
  extraTableHeaders?: string[];
  extraTableRows?: string[][];
};

function getReportPreview(reportType: string): PreviewData | null {
  const totalIncome = mockFinancialRecords.filter((r) => r.type === 'Income').reduce((s, r) => s + r.amount, 0);
  const totalExpense = mockFinancialRecords.filter((r) => r.type === 'Expense').reduce((s, r) => s + r.amount, 0);

  switch (reportType) {
    case 'Financial Report':
      return {
        summaryCards: [
          { label: 'Total Income', value: `RM ${totalIncome.toFixed(2)}`, color: 'bg-[#8FBF9F]' },
          { label: 'Total Expense', value: `RM ${totalExpense.toFixed(2)}`, color: 'bg-[#C94C4C]' },
          { label: 'Net Profit', value: `RM ${(totalIncome - totalExpense).toFixed(2)}`, color: 'bg-[#EFA3B7]' },
          { label: 'No. of Transactions', value: String(mockFinancialRecords.length), color: 'bg-[#E8A87C]' },
        ],
        tableHeaders: ['Transaction ID', 'Date', 'Type', 'Category', 'Amount (RM)'],
        tableRows: mockFinancialRecords.map((r) => [r.id, r.date, r.type, r.category, r.amount.toFixed(2)]),
      };

    case 'Inventory Report': {
      const products = [
        { id: 'P001', name: 'Floral Scrunchie Set', category: 'Scrunchies', stock: 25 },
        { id: 'P002', name: 'Velvet Hair Scrunchie', category: 'Scrunchies', stock: 30 },
        { id: 'P003', name: 'Crossbody Bag', category: 'Bags', stock: 3 },
        { id: 'P004', name: 'Mini Purse - Floral', category: 'Purses', stock: 20 },
        { id: 'P005', name: 'Fabric Coasters Set', category: 'Fabric Crafts', stock: 0 },
        { id: 'P006', name: 'Tote Bag - Batik', category: 'Bags', stock: 8 },
        { id: 'P007', name: 'Coin Purse - Patchwork', category: 'Purses', stock: 4 },
      ];
      const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
      const outOfStock = products.filter((p) => p.stock === 0).length;
      return {
        summaryCards: [
          { label: 'Total Products', value: String(products.length), color: 'bg-[#EFA3B7]' },
          { label: 'Low Stock Items', value: String(lowStock), color: 'bg-[#E8A87C]' },
          { label: 'Out of Stock Items', value: String(outOfStock), color: 'bg-[#C94C4C]' },
          { label: 'Material Stock Alerts', value: '2', color: 'bg-[#C8C8C8]' },
        ],
        tableHeaders: ['Product ID', 'Product Name', 'Category', 'Stock', 'Status'],
        tableRows: products.map((p) => [
          p.id, p.name, p.category, String(p.stock),
          p.stock === 0 ? 'Out of Stock' : p.stock <= 5 ? 'Low Stock' : 'In Stock',
        ]),
      };
    }

    case 'Staff Contribution Report': {
      const thisMonth = new Date().toISOString().slice(0, 7);
      const thisMonthCount = mockContributions.filter((c) => c.completionDate.slice(0, 7) === thisMonth).length;
      const pendingCount = mockContributions.filter((c) => (c.reviewStatus ?? 'Pending Review') === 'Pending Review').length;

      // Top contributor
      const staffCounts: Record<string, number> = {};
      mockContributions.forEach((c) => { staffCounts[c.staffName] = (staffCounts[c.staffName] || 0) + 1; });
      const topEntry = Object.entries(staffCounts).sort((a, b) => b[1] - a[1])[0];

      // Contribution type summary
      const typeCounts: Record<string, number> = {};
      mockContributions.forEach((c) => {
        const t = c.contributionType ?? 'Uncategorised';
        typeCounts[t] = (typeCounts[t] || 0) + 1;
      });

      return {
        summaryCards: [
          { label: 'Total Contributions', value: String(mockContributions.length), color: 'bg-[#EFA3B7]' },
          { label: 'This Month', value: String(thisMonthCount), color: 'bg-[#6BAEBF]' },
          { label: 'Top Contributor', value: topEntry ? `${topEntry[0]} (${topEntry[1]})` : '—', color: 'bg-[#8FBF9F]' },
          { label: 'Pending Review', value: String(pendingCount), color: 'bg-[#E8A87C]' },
        ],
        tableHeaders: ['Contribution ID', 'Staff Name', 'Task Title', 'Type', 'Completion Date', 'Review Status'],
        tableRows: mockContributions.map((c) => [
          c.id, c.staffName, c.taskTitle,
          c.contributionType ?? '—',
          c.completionDate.replace(/-/g, '/'),
          c.reviewStatus ?? 'Pending Review',
        ]),
        extraTableTitle: 'Contribution Type Summary',
        extraTableHeaders: ['Contribution Type', 'Count'],
        extraTableRows: Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => [type, String(count)]),
      };
    }

    case 'Sales Report': {
      const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
      const totalOrders = orderTrend.reduce((s, m) => s + m.orders, 0);
      const unitsSold = topProducts.reduce((s, p) => s + p.unitsSold, 0);
      return {
        summaryCards: [
          { label: 'Total Revenue', value: `RM ${totalRevenue.toLocaleString()}`, color: 'bg-[#EFA3B7]' },
          { label: 'Total Orders', value: String(totalOrders), color: 'bg-[#E8A87C]' },
          { label: 'Units Sold', value: String(unitsSold), color: 'bg-[#8FBF9F]' },
          { label: 'Top Product', value: 'Floral Scrunchie Set', color: 'bg-[#9B7DC8]' },
        ],
        tableHeaders: ['Product Name', 'Category', 'Units Sold', 'Revenue (RM)'],
        tableRows: topProducts.map((p) => [p.name, p.category, String(p.unitsSold), p.revenue.toLocaleString()]),
      };
    }

    case 'Community Activity Report':
      return {
        summaryCards: [
          { label: 'Total Activities', value: '6', color: 'bg-[#EFA3B7]' },
          { label: 'Completed', value: '4', color: 'bg-[#8FBF9F]' },
          { label: 'Upcoming', value: '2', color: 'bg-[#E8A87C]' },
          { label: 'Materials Collected (kg)', value: '2,500', color: 'bg-[#9B7DC8]' },
        ],
        tableHeaders: ['Activity ID', 'Activity Name', 'Date', 'Location', 'Status'],
        tableRows: [
          ['ACT-001', 'Fabric Collection Drive', '2026-05-10', 'Kabin Kraf Hibiscus', 'Completed'],
          ['ACT-002', 'Recycling Awareness Workshop', '2026-05-18', 'UTM Community Hall', 'Completed'],
          ['ACT-003', 'Old Clothes Donation Day', '2026-06-15', 'Taman Pulai Indah', 'Upcoming'],
          ['ACT-004', 'School Fabric Drive', '2026-04-20', 'SMK Skudai, Johor', 'Completed'],
          ['ACT-005', 'Community Upcycling Day', '2026-03-15', 'Dewan Komuniti Taman Universiti', 'Completed'],
          ['ACT-006', 'Green Bazaar Community Event', '2026-06-28', 'Taman Pulai Indah Community Hall', 'Upcoming'],
        ],
      };

    default:
      return null;
  }
}

// ─── Report Preview component ─────────────────────────────────────────────────

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[#FFF8F0]">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-5 py-3 text-left text-xs text-[#6B5F5F] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8D8C8]">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? 'bg-[#FFFAF7]' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3 text-xs text-[#3B2F2F] whitespace-nowrap">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReportPreview({ reportType, startDate, endDate }: {
  reportType: string;
  startDate: string;
  endDate: string;
}) {
  const generatedDate = new Date().toLocaleDateString('en-MY', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
  const preview = getReportPreview(reportType);
  if (!preview) return null;

  const fmtDate = (d: string) =>
    d ? new Date(d).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  return (
    <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
      {/* Header */}
      <div className="bg-[#FFF8F0] px-6 py-5 border-b border-[#E8D8C8]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-xs text-[#C76B83] mb-1">Generated Report Preview</p>
            <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">{reportType}</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#6B5F5F]">
                <Calendar className="w-3.5 h-3.5 text-[#C76B83]" />
                <span>Date Range: <span className="text-[#3B2F2F]">{fmtDate(startDate)} — {fmtDate(endDate)}</span></span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B5F5F]">
                <Hash className="w-3.5 h-3.5 text-[#C76B83]" />
                <span>Generated: <span className="text-[#3B2F2F]">{generatedDate}</span></span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => toast.success('Report exported successfully.')}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] text-sm transition-colors"
            >
              <FileText className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={() => toast.success('Report exported successfully.')}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white text-sm transition-colors"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="p-6 border-b border-[#E8D8C8]">
        <p className="text-xs text-[#9B8B8B] mb-3">Summary</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {preview.summaryCards.map((card) => (
            <div key={card.label} className="bg-[#FFF8F0] rounded-xl p-4 border border-[#E8D8C8]">
              <div className={`w-7 h-7 ${card.color} rounded-lg mb-3`} />
              <p className="text-base text-[#3B2F2F] truncate">{card.value}</p>
              <p className="text-xs text-[#6B5F5F] mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Primary data table */}
      <div>
        <div className="px-6 py-3 border-b border-[#E8D8C8]">
          <p className="text-xs text-[#9B8B8B]">Detailed Data</p>
        </div>
        <DataTable headers={preview.tableHeaders} rows={preview.tableRows} />
      </div>

      {/* Extra table (e.g. type summary for Staff Contribution Report) */}
      {preview.extraTableTitle && preview.extraTableHeaders && preview.extraTableRows && (
        <div className="border-t border-[#E8D8C8]">
          <div className="px-6 py-3 border-b border-[#E8D8C8]">
            <p className="text-xs text-[#9B8B8B]">{preview.extraTableTitle}</p>
          </div>
          <DataTable headers={preview.extraTableHeaders} rows={preview.extraTableRows} />
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function ReportsPage() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = orderTrend.reduce((s, m) => s + m.orders, 0);
  const totalUnitsSold = topProducts.reduce((s, p) => s + p.unitsSold, 0);

  const [reportType, setReportType] = useState(REPORT_TYPES[0]);
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-06-30');
  const [preview, setPreview] = useState<{ reportType: string; startDate: string; endDate: string } | null>(null);
  const [dateError, setDateError] = useState('');

  const handleGenerate = () => {
    if (startDate && endDate && endDate < startDate) {
      setDateError('End date cannot be earlier than start date.');
      return;
    }
    setDateError('');
    setPreview({ reportType, startDate, endDate });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Reports</h1>
          <p className="text-sm text-[#6B5F5F] mt-1">Generate and preview business reports</p>
        </div>

        {/* Generate Report form */}
        <div className="bg-white rounded-xl p-6 border border-[#E8D8C8]">
          <h2 className="text-[#3B2F2F] mb-5">Generate Report</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => { setReportType(e.target.value); setPreview(null); }}
                className="w-full px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                {REPORT_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setDateError(''); setPreview(null); }}
                className="w-full px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setDateError(''); setPreview(null); }}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] ${dateError ? 'border-red-400' : 'border-[#E8D8C8]'}`}
              />
              {dateError && <p className="text-xs text-red-500 mt-1">{dateError}</p>}
            </div>
            <button
              onClick={handleGenerate}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
            >
              <BarChart2 className="w-4 h-4" /> Generate Report
            </button>
          </div>
        </div>

        {/* Generated report preview */}
        {preview && (
          <ReportPreview
            reportType={preview.reportType}
            startDate={preview.startDate}
            endDate={preview.endDate}
          />
        )}

        {/* Business Overview (always visible) */}
        <div className="space-y-6">
          <h2 className="text-[#3B2F2F]">Business Overview — January to June 2026</h2>

          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: TrendingUp, bg: 'bg-[#FDEAF1]', iconColor: 'text-[#C76B83]', value: `RM ${totalRevenue.toLocaleString()}`, label: 'Total Revenue (YTD)' },
              { icon: ShoppingBag, bg: 'bg-[#FFF3E0]', iconColor: 'text-[#E8A87C]', value: String(totalOrders), label: 'Total Orders (YTD)' },
              { icon: Package, bg: 'bg-[#E8F5EE]', iconColor: 'text-[#8FBF9F]', value: String(totalUnitsSold), label: 'Units Sold (YTD)' },
              { icon: Users, bg: 'bg-[#F0EAF5]', iconColor: 'text-[#9B7DC8]', value: String(mockStaff.filter((s) => s.status === 'Active').length), label: 'Active Staff' },
            ].map(({ icon: Icon, bg, iconColor, value, label }) => (
              <div key={label} className="bg-white rounded-xl p-5 border border-[#E8D8C8] flex items-center gap-4">
                <div className={`w-11 h-11 ${bg} rounded-full flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-xl text-[#3B2F2F]">{value}</p>
                  <p className="text-xs text-[#6B5F5F]">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts row — two equal cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Revenue bar chart */}
            <div className="bg-white rounded-xl p-6 border border-[#E8D8C8] overflow-hidden">
              <h3 className="text-sm text-[#3B2F2F] mb-4">Monthly Revenue (RM)</h3>
              <BarChartCustom
                data={monthlyRevenue}
                valueKey="revenue"
                color="#EFA3B7"
                formatValue={(v) => `RM ${v.toLocaleString()}`}
              />
            </div>

            {/* Monthly Orders line chart — contained inside the card */}
            <div className="bg-white rounded-xl p-6 border border-[#E8D8C8] overflow-hidden">
              <h3 className="text-sm text-[#3B2F2F] mb-4">Monthly Orders</h3>
              <LineChartCustom
                data={orderTrend}
                valueKey="orders"
                color="#C76B83"
              />
            </div>
          </div>

          {/* Bottom row — products table + staff progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8D8C8]">
                <h3 className="text-sm text-[#3B2F2F]">Top Products by Sales</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#FFF8F0] border-b border-[#E8D8C8]">
                    <th className="px-5 py-3 text-left text-xs text-[#6B5F5F]">Product</th>
                    <th className="px-5 py-3 text-right text-xs text-[#6B5F5F]">Units</th>
                    <th className="px-5 py-3 text-right text-xs text-[#6B5F5F]">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p, idx) => (
                    <tr key={p.name} className={`border-b border-[#E8D8C8] last:border-0 ${idx % 2 === 1 ? 'bg-[#FFFAF7]' : ''}`}>
                      <td className="px-5 py-3">
                        <p className="text-[#3B2F2F] text-xs">{p.name}</p>
                        <p className="text-[9px] text-[#9B8B8B]">{p.category}</p>
                      </td>
                      <td className="px-5 py-3 text-right text-xs text-[#3B2F2F]">{p.unitsSold}</td>
                      <td className="px-5 py-3 text-right text-xs text-[#3B2F2F]">RM {p.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Staff Task Completion — progress bars only, no chart overlap */}
            <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8D8C8]">
                <h3 className="text-sm text-[#3B2F2F]">Staff Task Completion</h3>
              </div>
              <div className="p-5 space-y-5">
                {staffPerformance.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-sm text-[#3B2F2F]">{s.name}</span>
                      <span className="text-xs text-[#6B5F5F] whitespace-nowrap ml-2">
                        {s.completed}/{s.tasks} tasks &mdash; {s.rate}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#F5EDE3] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#EFA3B7] rounded-full transition-all duration-500"
                        style={{ width: `${s.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
