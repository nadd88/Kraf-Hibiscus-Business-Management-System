import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockStaff, mockTasks, mockContributions } from '../../data/staffData';
import { toast } from 'sonner';
import {
  ArrowLeft, Edit2, PowerOff, Phone, Mail, Calendar,
  AlertTriangle, User, ClipboardList, CheckCircle,
} from 'lucide-react';

// ─── Badge maps ───────────────────────────────────────────────────────────────

const TASK_STATUS_BADGE: Record<string, string> = {
  Pending: 'bg-[#E8A87C] text-white',
  Assigned: 'bg-[#6BAEBF] text-white',
  'In Progress': 'bg-[#C9943C] text-white',
  Completed: 'bg-[#8FBF9F] text-white',
  Cancelled: 'bg-[#C94C4C] text-white',
};

const AVAIL_BADGE: Record<string, string> = {
  Available: 'bg-[#E8F5EE] text-[#5A9E72]',
  Busy: 'bg-[#FFF3E0] text-[#C77A2A]',
  'Not Available': 'bg-[#F5F5F5] text-[#9B8B8B]',
};

const REVIEW_BADGE: Record<string, string> = {
  Verified: 'bg-[#E8F5EE] text-[#5A9E72]',
  'Pending Review': 'bg-[#FFF3E0] text-[#C77A2A]',
  Rejected: 'bg-[#FDEAEA] text-[#C94C4C]',
};

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

export function StaffDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeactivate, setShowDeactivate] = useState(false);

  const staff = mockStaff.find((s) => s.id === id);
  const allTasks = useMemo(() => mockTasks.filter((t) => t.assignedStaffId === id), [id]);
  const contributions = useMemo(() => mockContributions.filter((c) => c.staffId === id), [id]);

  const [staffStatus, setStaffStatus] = useState<'Active' | 'Inactive'>(staff?.status ?? 'Active');

  if (!staff) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <p className="text-[#6B5F5F] mb-4">Staff member not found.</p>
          <Link to="/admin/staff" className="text-[#C76B83] hover:text-[#EFA3B7]">
            ← Back to Staff List
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const activeTasks = allTasks.filter((t) => t.status === 'In Progress').length;
  const pendingTasks = allTasks.filter((t) => t.status === 'Assigned').length;
  const completedTasks = allTasks.filter((t) => t.status === 'Completed').length;

  const confirmDeactivate = () => {
    setStaffStatus('Inactive');
    setShowDeactivate(false);
    toast.success(`${staff.name} has been deactivated.`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back link + header */}
        <div>
          <Link
            to="/admin/staff"
            className="inline-flex items-center text-sm text-[#6B5F5F] hover:text-[#C76B83] mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Staff List
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Staff Profile</h1>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/staff/edit/${id}`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm"
              >
                <Edit2 className="w-4 h-4" />
                Edit Staff
              </button>
              {staffStatus === 'Active' && (
                <button
                  onClick={() => setShowDeactivate(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E8A87C] text-[#C77A2A] rounded-lg hover:bg-[#FFF3E0] transition-colors text-sm"
                >
                  <PowerOff className="w-4 h-4" />
                  Deactivate
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Inactive Banner */}
        {staffStatus === 'Inactive' && (
          <div className="bg-[#F5F5F5] border border-[#E0D8D0] rounded-xl px-5 py-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#9B8B8B] shrink-0 mt-0.5" />
            <p className="text-sm text-[#6B5F5F]">
              <span className="font-medium text-[#3B2F2F]">This staff member is inactive</span> and cannot
              be assigned new tasks. Existing task and contribution records are retained.
            </p>
          </div>
        )}

        {/* Profile Summary Card */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] p-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-[#F5EDE3] flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-[#C76B83]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-1">
                <h2 className="font-['Playfair_Display'] text-2xl text-[#3B2F2F]">{staff.name}</h2>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs text-white ${
                    staffStatus === 'Active' ? 'bg-[#8FBF9F]' : 'bg-[#C8C8C8]'
                  }`}
                >
                  {staffStatus}
                </span>
                {staff.availabilityStatus && (
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs ${
                      AVAIL_BADGE[staff.availabilityStatus] ?? ''
                    }`}
                  >
                    {staff.availabilityStatus}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#9B8B8B] mb-4">
                {staff.role} &nbsp;·&nbsp; {staff.id}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#FFF8F0] rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#C8B8B8]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#9B8B8B] uppercase tracking-wide">Contact</p>
                    <p className="text-sm text-[#3B2F2F]">{staff.contact}</p>
                  </div>
                </div>
                {staff.email && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-[#FFF8F0] rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5 text-[#C8B8B8]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#9B8B8B] uppercase tracking-wide">Email</p>
                      <p className="text-sm text-[#3B2F2F] truncate">{staff.email}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#FFF8F0] rounded-lg flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-[#C8B8B8]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#9B8B8B] uppercase tracking-wide">Joined</p>
                    <p className="text-sm text-[#3B2F2F]">{staff.joiningDate.replace(/-/g, '/')}</p>
                  </div>
                </div>
                {staff.remarks && (
                  <div className="sm:col-span-2 lg:col-span-1">
                    <p className="text-[10px] text-[#9B8B8B] uppercase tracking-wide mb-1">Remarks</p>
                    <p className="text-sm text-[#6B5F5F]">{staff.remarks}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Workload Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5">
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Active Tasks</p>
            <p className="text-3xl text-[#C77A2A] mt-1">{activeTasks}</p>
            <p className="text-xs text-[#9B8B8B] mt-1">Currently in progress</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5">
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Pending Tasks</p>
            <p className="text-3xl text-[#6BAEBF] mt-1">{pendingTasks}</p>
            <p className="text-xs text-[#9B8B8B] mt-1">Assigned, not started</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5">
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Completed Tasks</p>
            <p className="text-3xl text-[#5A9E72] mt-1">{completedTasks}</p>
            <p className="text-xs text-[#9B8B8B] mt-1">All time</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5">
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Contributions</p>
            <p className="text-3xl text-[#C76B83] mt-1">{contributions.length}</p>
            <p className="text-xs text-[#9B8B8B] mt-1">Contribution records</p>
          </div>
        </div>

        {/* Assigned Task History */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E8D8C8]">
            <p className="text-[#3B2F2F] font-medium">Assigned Task History</p>
            <p className="text-xs text-[#9B8B8B] mt-0.5">
              {allTasks.length} task{allTasks.length !== 1 ? 's' : ''} assigned in total
            </p>
          </div>
          {allTasks.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <ClipboardList className="w-8 h-8 text-[#C8B8B8] mx-auto mb-2" />
              <p className="text-sm text-[#6B5F5F]">No tasks assigned to this staff member yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FFF8F0]">
                  <tr>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Task ID</th>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide">Task Title</th>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Due Date</th>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Status</th>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D8C8]">
                  {allTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-[#FFF8F0] transition-colors">
                      <td className="px-6 py-3.5 text-sm text-[#6B5F5F] whitespace-nowrap">{task.id}</td>
                      <td className="px-6 py-3.5 text-sm text-[#3B2F2F] max-w-[220px] truncate">{task.title}</td>
                      <td className="px-6 py-3.5 text-sm text-[#6B5F5F] whitespace-nowrap">
                        {task.dueDate.replace(/-/g, '/')}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs ${
                            TASK_STATUS_BADGE[task.status] ?? 'bg-[#C8C8C8] text-white'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-[#6B5F5F] max-w-xs truncate">
                        {task.progress ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Contribution Records */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E8D8C8]">
            <p className="text-[#3B2F2F] font-medium">Contribution Records</p>
            <p className="text-xs text-[#9B8B8B] mt-0.5">
              {contributions.length} record{contributions.length !== 1 ? 's' : ''}
            </p>
          </div>
          {contributions.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <CheckCircle className="w-8 h-8 text-[#C8B8B8] mx-auto mb-2" />
              <p className="text-sm text-[#6B5F5F]">No contribution records yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FFF8F0]">
                  <tr>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Contribution ID</th>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide">Related Task</th>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Completion Date</th>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Contribution Type</th>
                    <th className="px-6 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Review Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D8C8]">
                  {contributions.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FFF8F0] transition-colors">
                      <td className="px-6 py-3.5 text-sm text-[#6B5F5F] whitespace-nowrap">{c.id}</td>
                      <td className="px-6 py-3.5 text-sm text-[#3B2F2F] max-w-[180px] truncate">{c.taskTitle}</td>
                      <td className="px-6 py-3.5 text-sm text-[#6B5F5F] whitespace-nowrap">
                        {c.completionDate.replace(/-/g, '/')}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-[#6B5F5F] whitespace-nowrap">
                        {c.contributionType ?? 'Task Completion'}
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs ${
                            REVIEW_BADGE[c.reviewStatus ?? 'Verified']
                          }`}
                        >
                          {c.reviewStatus ?? 'Verified'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showDeactivate && (
        <DeactivateModal
          name={staff.name}
          onConfirm={confirmDeactivate}
          onClose={() => setShowDeactivate(false)}
        />
      )}
    </AdminLayout>
  );
}
