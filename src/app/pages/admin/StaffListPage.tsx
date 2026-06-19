import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockStaff, mockTasks, mockContributions } from '../../data/staffData';
import { toast } from 'sonner';
import {
  Search, Eye, Edit2, PowerOff, Plus, Users, UserCheck,
  Briefcase, UserX, AlertTriangle,
} from 'lucide-react';

// ─── Deactivate Modal ─────────────────────────────────────────────────────────

function DeactivateModal({
  name,
  onConfirm,
  onClose,
}: {
  name: string;
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
            Deactivate Staff Record?
          </h2>
          <p className="text-sm text-[#3B2F2F] text-center font-medium mb-2">{name}</p>
          <p className="text-sm text-[#6B5F5F] text-center">
            This staff member will be marked as inactive and cannot be assigned new tasks.
            Existing task and contribution records will remain in the system.
          </p>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-[#E8A87C] text-white rounded-lg hover:bg-[#D89A6C] transition-colors text-sm"
          >
            Confirm Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type StatusFilter = 'all' | 'active' | 'inactive';

export function StaffListPage() {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState(() => mockStaff.map((s) => ({ ...s })));
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [deactivateTarget, setDeactivateTarget] = useState<{ id: string; name: string } | null>(null);

  const staffStats = useMemo(() => {
    const map: Record<string, { active: number; completed: number; contributions: number }> = {};
    for (const s of staffList) {
      const tasks = mockTasks.filter((t) => t.assignedStaffId === s.id);
      map[s.id] = {
        active: tasks.filter((t) => t.status === 'In Progress' || t.status === 'Assigned').length,
        completed: tasks.filter((t) => t.status === 'Completed').length,
        contributions: mockContributions.filter((c) => c.staffId === s.id).length,
      };
    }
    return map;
  }, [staffList]);

  const totalStaff = staffList.length;
  const activeStaff = staffList.filter((s) => s.status === 'Active').length;
  const inactiveStaff = staffList.filter((s) => s.status === 'Inactive').length;
  const withActiveTasks = staffList.filter((s) => (staffStats[s.id]?.active ?? 0) > 0).length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return staffList.filter((s) => {
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q);
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' ? s.status === 'Active' : s.status === 'Inactive');
      return matchSearch && matchStatus;
    });
  }, [staffList, search, statusFilter]);

  const handleDeactivateClick = (s: (typeof staffList)[number]) => {
    if (s.status === 'Inactive') return;
    setDeactivateTarget({ id: s.id, name: s.name });
  };

  const confirmDeactivate = () => {
    if (!deactivateTarget) return;
    setStaffList((prev) =>
      prev.map((s) => (s.id === deactivateTarget.id ? { ...s, status: 'Inactive' } : s))
    );
    toast.success(`${deactivateTarget.name} has been deactivated.`);
    setDeactivateTarget(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Staff Management</h1>
            <p className="text-sm text-[#6B5F5F] mt-1">
              Manage staff information, task workload, and contribution records.
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/staff/add')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Staff
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-[#F5EDE3] rounded-lg flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#C76B83]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Total Staff</p>
              <p className="text-2xl text-[#3B2F2F] mt-0.5">{totalStaff}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-[#E8F5EE] rounded-lg flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-[#5A9E72]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Active Staff</p>
              <p className="text-2xl text-[#3B2F2F] mt-0.5">{activeStaff}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-[#FFF3E0] rounded-lg flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-[#C77A2A]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">With Active Tasks</p>
              <p className="text-2xl text-[#3B2F2F] mt-0.5">{withActiveTasks}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-[#F5F5F5] rounded-lg flex items-center justify-center shrink-0">
              <UserX className="w-5 h-5 text-[#9B8B8B]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Inactive Staff</p>
              <p className="text-2xl text-[#3B2F2F] mt-0.5">{inactiveStaff}</p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          {/* Controls */}
          <div className="px-5 py-4 border-b border-[#E8D8C8] flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8B8B8]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by staff name, ID, or role..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              {(['all', 'active', 'inactive'] as StatusFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    statusFilter === f
                      ? 'bg-[#EFA3B7] text-[#3B2F2F]'
                      : 'border border-[#E8D8C8] text-[#6B5F5F] hover:bg-[#FFF8F0]'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Inactive'}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  {[
                    'Staff ID', 'Staff Name', 'Role', 'Workload', 'Status', 'Actions',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-[#C8B8B8]">
                        <Users className="w-8 h-8" />
                        <p className="text-sm">No staff members found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => {
                    const stats = staffStats[s.id] ?? { active: 0, completed: 0, contributions: 0 };
                    const isInactive = s.status === 'Inactive';
                    return (
                      <tr
                        key={s.id}
                        className={`hover:bg-[#FFF8F0] transition-colors ${isInactive ? 'opacity-60' : ''}`}
                      >
                        <td className="px-4 py-3.5 text-xs text-[#6B5F5F] whitespace-nowrap font-mono">{s.id}</td>
                        <td className="px-4 py-3.5 text-sm text-[#3B2F2F] whitespace-nowrap">{s.name}</td>
                        <td className="px-4 py-3.5 text-sm text-[#6B5F5F] whitespace-nowrap">{s.role}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-[#FFF3E0] text-[#C77A2A] whitespace-nowrap">
                              Active: {stats.active}
                            </span>
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-[#E8F5EE] text-[#5A9E72] whitespace-nowrap">
                              Done: {stats.completed}
                            </span>
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-[#F5EDE3] text-[#C76B83] whitespace-nowrap">
                              Contrib: {stats.contributions}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs text-white ${
                              s.status === 'Active' ? 'bg-[#8FBF9F]' : 'bg-[#C8C8C8]'
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => navigate(`/admin/staff/${s.id}`)}
                              title="View Details"
                              className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#FFF8F0] rounded transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/staff/edit/${s.id}`)}
                              title="Edit"
                              className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#FFF8F0] rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeactivateClick(s)}
                              disabled={isInactive}
                              title={
                                isInactive
                                  ? 'Already inactive — task and contribution records are retained'
                                  : 'Deactivate Staff'
                              }
                              className="p-1.5 text-[#C77A2A] hover:text-[#9B5A0A] hover:bg-[#FFF3E0] rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <PowerOff className="w-4 h-4" />
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

          <div className="px-5 py-3 border-t border-[#E8D8C8]">
            <p className="text-xs text-[#9B8B8B]">
              Showing {filtered.length} of {staffList.length} staff members.
              {inactiveStaff > 0 && (
                <span className="ml-1">
                  Inactive staff cannot be assigned new tasks, but their task and contribution records remain in the system.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {deactivateTarget && (
        <DeactivateModal
          name={deactivateTarget.name}
          onConfirm={confirmDeactivate}
          onClose={() => setDeactivateTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
