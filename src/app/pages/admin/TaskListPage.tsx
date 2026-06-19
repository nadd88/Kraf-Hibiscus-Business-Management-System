import { useState, useMemo } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { toast } from 'sonner';
import { mockTasks, mockStaff, mockContributions } from '../../data/staffData';
import type { Task, Contribution } from '../../data/staffData';
import {
  Plus, Search, Eye, UserPlus, RefreshCw, CheckCircle, X, ClipboardList,
  AlertTriangle, Info,
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<string, string> = {
  Pending: 'bg-[#E8A87C] text-white',
  Assigned: 'bg-[#6BAEBF] text-white',
  'In Progress': 'bg-[#C9943C] text-white',
  Completed: 'bg-[#8FBF9F] text-white',
  Cancelled: 'bg-[#C94C4C] text-white',
};

const PRIORITY_BADGE: Record<string, string> = {
  Low: 'border-[#8FBF9F] text-[#5A9E72]',
  Medium: 'border-[#E8A87C] text-[#C77A2A]',
  High: 'border-[#C94C4C] text-[#C94C4C]',
};

const TASK_CATEGORIES = [
  'Product Making',
  'Sorting',
  'Packaging',
  'Inventory Update',
  'Quality Check',
  'Design Work',
  'Community Activity',
  'Training',
];

const today = new Date().toISOString().slice(0, 10);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(iso: string) {
  return iso.replace(/-/g, '/');
}

function isOverdue(task: Task) {
  return (
    task.dueDate < today &&
    task.status !== 'Completed' &&
    task.status !== 'Cancelled'
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs whitespace-nowrap ${STATUS_BADGE[status] ?? 'bg-[#6B5F5F] text-white'}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs border whitespace-nowrap ${PRIORITY_BADGE[priority] ?? 'border-[#6B5F5F] text-[#6B5F5F]'}`}>
      {priority}
    </span>
  );
}

function FormField({
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

function DetailField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-[#6B5F5F] mb-1">{label}</p>
      <div className="text-sm text-[#3B2F2F]">{value || '—'}</div>
    </div>
  );
}

function inputCls(error?: string) {
  return `w-full px-4 py-2.5 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white transition-colors ${error ? 'border-[#C94C4C]' : 'border-[#E8D8C8]'}`;
}

// ─── Task Details Modal ───────────────────────────────────────────────────────

function TaskDetailsModal({
  task,
  contribution,
  onClose,
  onAssign,
  onUpdate,
  onComplete,
}: {
  task: Task;
  contribution?: Contribution;
  onClose: () => void;
  onAssign: () => void;
  onUpdate: () => void;
  onComplete: () => void;
}) {
  const overdue = isOverdue(task);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Task Details</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-5 overflow-y-auto">
          {overdue && (
            <div className="flex items-start gap-3 bg-[#FDEAEA] border border-[#C94C4C]/30 rounded-lg px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-[#C94C4C] shrink-0 mt-0.5" />
              <p className="text-xs text-[#C94C4C]">This task is overdue. Due date was {fmt(task.dueDate)}.</p>
            </div>
          )}

          <div className="bg-white border border-[#E8D8C8] rounded-xl p-5">
            <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
              <h3 className="text-[#3B2F2F]">Task Information</h3>
              <div className="flex gap-2 flex-wrap">
                <StatusBadge status={task.status} />
                <PriorityBadge priority={task.priority} />
                {overdue && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs bg-[#FDEAEA] text-[#C94C4C] border border-[#C94C4C]/30">
                    Overdue
                  </span>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <DetailField label="Task Title" value={<span className="text-base">{task.title}</span>} />
              </div>
              <div className="md:col-span-2">
                <DetailField label="Task Description" value={task.description} />
              </div>
              <DetailField label="Task ID" value={<span className="font-mono">{task.id}</span>} />
              <DetailField label="Category" value={task.category ?? '—'} />
              {(task.targetQuantity != null) && (
                <DetailField label="Target Quantity" value={`${task.targetQuantity}${task.unit ? ' ' + task.unit : ''}`} />
              )}
              <DetailField label="Assigned Staff" value={task.assignedStaff ?? 'Not assigned yet'} />
              <DetailField label="Due Date" value={fmt(task.dueDate)} />
              <DetailField label="Created Date" value={fmt(task.createdDate)} />
              {task.assignedDate && <DetailField label="Assigned Date" value={fmt(task.assignedDate)} />}
              <DetailField label="Last Updated" value={fmt(task.updatedDate)} />
              {task.completionDate && <DetailField label="Completion Date" value={fmt(task.completionDate)} />}
              {task.progress && (
                <div className="md:col-span-2">
                  <DetailField label="Progress Remarks" value={task.progress} />
                </div>
              )}
              {task.remarks && (
                <div className="md:col-span-2">
                  <DetailField label="Remarks" value={task.remarks} />
                </div>
              )}
            </div>
          </div>

          {contribution && (
            <div className="bg-white border border-[#E8D8C8] rounded-xl p-5">
              <h3 className="text-[#3B2F2F] mb-4">Contribution Record</h3>
              <div className="bg-[#FFF8F0] rounded-lg p-4 grid md:grid-cols-2 gap-4">
                <DetailField label="Contribution ID" value={contribution.id} />
                <DetailField label="Recorded By" value={contribution.recordedBy} />
                <div className="md:col-span-2">
                  <DetailField label="Contribution Details" value={contribution.contributionDetails} />
                </div>
                {contribution.remarks && (
                  <div className="md:col-span-2">
                    <DetailField label="Remarks" value={contribution.remarks} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#E8D8C8] flex flex-wrap gap-3 justify-end shrink-0">
          {task.status === 'Pending' && !task.assignedStaff && (
            <button
              onClick={onAssign}
              className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <UserPlus className="w-4 h-4" /> Assign Task
            </button>
          )}
          {(task.status === 'Assigned' || task.status === 'In Progress') && (
            <button
              onClick={onUpdate}
              className="px-5 py-2 bg-[#E8A87C] text-white rounded-lg hover:bg-[#D89A6C] transition-colors flex items-center gap-2 text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Update Progress
            </button>
          )}
          {task.status === 'In Progress' && (
            <button
              onClick={onComplete}
              className="px-5 py-2 bg-[#8FBF9F] text-white rounded-lg hover:bg-[#7AA98A] transition-colors flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4" /> Confirm Completion
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Create Task Modal ────────────────────────────────────────────────────────

function CreateTaskModal({
  onSave,
  onClose,
  nextId,
}: {
  onSave: (t: Task) => void;
  onClose: () => void;
  nextId: string;
}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    targetQuantity: '',
    unit: '',
    priority: 'Medium',
    dueDate: '',
    remarks: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Task title is required.';
    if (!form.dueDate) e.dueDate = 'Due date is required.';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); toast.error('Please fill in all required fields.'); return; }
    const qty = form.targetQuantity ? parseInt(form.targetQuantity, 10) : undefined;
    onSave({
      id: nextId,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category || undefined,
      targetQuantity: isNaN(qty as number) ? undefined : qty,
      unit: form.unit.trim() || undefined,
      priority: form.priority as Task['priority'],
      dueDate: form.dueDate,
      status: 'Pending',
      createdDate: today,
      updatedDate: today,
      remarks: form.remarks.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-xl shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Create Task</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Auto-generated ID */}
          <div className="bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8] flex items-center gap-3">
            <Info className="w-4 h-4 text-[#9B8B8B] shrink-0" />
            <div>
              <p className="text-xs text-[#9B8B8B]">Auto-generated Task ID (read-only)</p>
              <p className="text-sm text-[#3B2F2F] font-mono mt-0.5">{nextId}</p>
            </div>
          </div>

          {/* Title (full width) */}
          <FormField label="Task Title" required error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Prepare 50 scrunchies for bulk order"
              className={inputCls(errors.title)}
            />
          </FormField>

          {/* Description (full width) */}
          <FormField label="Task Description">
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Describe what needs to be done"
              className={`${inputCls()} resize-none`}
            />
          </FormField>

          {/* Category + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Task Category">
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls()}>
                <option value="">— Select category —</option>
                {TASK_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Priority" required>
              <select value={form.priority} onChange={(e) => set('priority', e.target.value)} className={inputCls()}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </FormField>
          </div>

          {/* Target Quantity + Unit */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Target Quantity">
              <input
                type="number"
                min="0"
                value={form.targetQuantity}
                onChange={(e) => set('targetQuantity', e.target.value)}
                placeholder="e.g. 50"
                className={inputCls()}
              />
            </FormField>
            <FormField label="Unit">
              <input
                type="text"
                value={form.unit}
                onChange={(e) => set('unit', e.target.value)}
                placeholder="e.g. pcs, kg, sets"
                className={inputCls()}
              />
            </FormField>
          </div>

          {/* Due Date + Initial Status */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Due Date" required error={errors.dueDate}>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => set('dueDate', e.target.value)}
                className={inputCls(errors.dueDate)}
              />
            </FormField>
            <FormField label="Initial Status">
              <div className="w-full px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#9B8B8B] bg-[#FFF8F0]">
                Pending
              </div>
            </FormField>
          </div>

          {/* Remarks */}
          <FormField label="Remarks">
            <textarea
              rows={2}
              value={form.remarks}
              onChange={(e) => set('remarks', e.target.value)}
              placeholder="Additional notes (optional)"
              className={`${inputCls()} resize-none`}
            />
          </FormField>
        </div>

        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm">Save Task</button>
        </div>
      </div>
    </div>
  );
}

// ─── Assign Task Modal ────────────────────────────────────────────────────────

function AssignTaskModal({
  task,
  activeStaffWithWorkload,
  onSave,
  onClose,
}: {
  task: Task;
  activeStaffWithWorkload: { id: string; name: string; role: string; activeTasks: number }[];
  onSave: (staffId: string, staffName: string, assignedDate: string, dueDate: string, remarks: string) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    staffId: '',
    assignedDate: today,
    dueDate: task.dueDate,
    remarks: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const overdue = task.dueDate < today;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.staffId) e.staffId = 'Please select a staff member.';
    if (!form.dueDate) e.dueDate = 'Due date is required.';
    else if (form.assignedDate && form.dueDate < form.assignedDate) e.dueDate = 'Due date cannot be earlier than assigned date.';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const staff = activeStaffWithWorkload.find((s) => s.id === form.staffId)!;
    onSave(form.staffId, staff.name, form.assignedDate, form.dueDate, form.remarks.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Assign Task</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Task info header */}
          <div className="bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8]">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-xs text-[#9B8B8B] font-mono">{task.id}</p>
                <p className="text-sm text-[#3B2F2F] mt-0.5">{task.title}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <StatusBadge status={task.status} />
                <PriorityBadge priority={task.priority} />
              </div>
            </div>
            <p className="text-xs text-[#6B5F5F]">Due: <span className="text-[#3B2F2F]">{fmt(task.dueDate)}</span></p>
          </div>

          {overdue && (
            <div className="flex items-start gap-3 bg-[#FDEAEA] border border-[#C94C4C]/30 rounded-lg px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-[#C94C4C] shrink-0 mt-0.5" />
              <p className="text-xs text-[#C94C4C]">
                This task is overdue. Please update the due date before assigning.
              </p>
            </div>
          )}

          {/* Select Staff */}
          <FormField label="Select Staff" required error={errors.staffId}>
            <select
              value={form.staffId}
              onChange={(e) => set('staffId', e.target.value)}
              className={inputCls(errors.staffId)}
            >
              <option value="">— Select staff member —</option>
              {activeStaffWithWorkload.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.role} — {s.activeTasks} active task{s.activeTasks !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </FormField>

          {/* Assigned Date + Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Assigned Date">
              <input
                type="date"
                value={form.assignedDate}
                onChange={(e) => set('assignedDate', e.target.value)}
                className={inputCls()}
              />
            </FormField>
            <FormField label="Due Date" required error={errors.dueDate}>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => set('dueDate', e.target.value)}
                className={inputCls(errors.dueDate)}
              />
            </FormField>
          </div>

          {/* Assignment Remarks */}
          <FormField label="Assignment Remarks">
            <textarea
              rows={3}
              value={form.remarks}
              onChange={(e) => set('remarks', e.target.value)}
              placeholder="Enter assignment instructions or notes (optional)"
              className={`${inputCls()} resize-none`}
            />
          </FormField>
        </div>

        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm">Assign Task</button>
        </div>
      </div>
    </div>
  );
}

// ─── Update Progress Modal ────────────────────────────────────────────────────

function UpdateProgressModal({
  task,
  onSave,
  onClose,
}: {
  task: Task;
  onSave: (status: Task['status'], remarks: string, updatedDate: string, progressPct?: number, completedQty?: number) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    newStatus: task.status as string,
    progressPct: '',
    completedQty: '',
    progressRemarks: '',
    updatedDate: today,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const hasTarget = task.targetQuantity != null;

  const handleSave = () => {
    const e: Record<string, string> = {};
    if (!form.progressRemarks.trim()) e.progressRemarks = 'Progress remarks are required.';
    if (form.progressPct !== '') {
      const pct = Number(form.progressPct);
      if (isNaN(pct) || pct < 0 || pct > 100) e.progressPct = 'Progress percentage must be between 0 and 100.';
    }
    if (hasTarget && form.completedQty !== '') {
      const qty = Number(form.completedQty);
      if (isNaN(qty) || qty < 0) e.completedQty = 'Completed quantity must be a positive number.';
      else if (qty > task.targetQuantity!) e.completedQty = `Cannot exceed target quantity of ${task.targetQuantity} ${task.unit ?? ''}.`.trim();
    }
    if (Object.keys(e).length) { setErrors(e); return; }
    const pct = form.progressPct !== '' ? Number(form.progressPct) : undefined;
    const qty = hasTarget && form.completedQty !== '' ? Number(form.completedQty) : undefined;
    const remarksWithMeta = [
      form.progressRemarks.trim(),
      pct !== undefined ? `Progress: ${pct}%` : '',
      qty !== undefined ? `Completed: ${qty}${task.unit ? ' ' + task.unit : ''} of ${task.targetQuantity}${task.unit ? ' ' + task.unit : ''}` : '',
    ].filter(Boolean).join(' | ');
    onSave(form.newStatus as Task['status'], remarksWithMeta, form.updatedDate, pct, qty);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Update Task Progress</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Task Summary */}
          <div className="bg-[#FFF8F0] rounded-lg p-4 border border-[#E8D8C8]">
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide mb-2">Task Summary</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <div>
                <p className="text-xs text-[#9B8B8B]">Task ID</p>
                <p className="text-sm text-[#3B2F2F] font-mono">{task.id}</p>
              </div>
              <div>
                <p className="text-xs text-[#9B8B8B]">Current Status</p>
                <div className="mt-0.5"><StatusBadge status={task.status} /></div>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-[#9B8B8B]">Task Title</p>
                <p className="text-sm text-[#3B2F2F]">{task.title}</p>
              </div>
              <div>
                <p className="text-xs text-[#9B8B8B]">Assigned Staff</p>
                <p className="text-sm text-[#3B2F2F]">{task.assignedStaff ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-[#9B8B8B]">Due Date</p>
                <p className="text-sm text-[#3B2F2F]">{fmt(task.dueDate)}</p>
              </div>
              {task.progress && (
                <div className="col-span-2">
                  <p className="text-xs text-[#9B8B8B]">Previous Progress</p>
                  <p className="text-sm text-[#6B5F5F] italic">{task.progress}</p>
                </div>
              )}
            </div>
          </div>

          {/* New Status */}
          <FormField label="New Status" required>
            <select value={form.newStatus} onChange={(e) => set('newStatus', e.target.value)} className={inputCls()}>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </FormField>

          {/* Progress % + Completed Qty */}
          <div className={`grid gap-4 ${hasTarget ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <FormField label="Progress %" error={errors.progressPct}>
              <input
                type="number"
                min="0"
                max="100"
                value={form.progressPct}
                onChange={(e) => set('progressPct', e.target.value)}
                placeholder="0 – 100"
                className={inputCls(errors.progressPct)}
              />
            </FormField>
            {hasTarget && (
              <FormField label={`Completed ${task.unit ? `(${task.unit})` : 'Qty'}`} error={errors.completedQty}>
                <input
                  type="number"
                  min="0"
                  value={form.completedQty}
                  onChange={(e) => set('completedQty', e.target.value)}
                  placeholder="e.g. 30"
                  className={inputCls(errors.completedQty)}
                />
              </FormField>
            )}
            {hasTarget && (
              <FormField label="Target Qty">
                <div className="w-full px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#9B8B8B] bg-[#FFF8F0]">
                  {task.targetQuantity}{task.unit ? ` ${task.unit}` : ''}
                </div>
              </FormField>
            )}
          </div>

          {/* Progress Remarks */}
          <FormField label="Progress Remarks" required error={errors.progressRemarks}>
            <textarea
              rows={3}
              value={form.progressRemarks}
              onChange={(e) => set('progressRemarks', e.target.value)}
              placeholder="Describe the current progress and any updates"
              className={`${inputCls(errors.progressRemarks)} resize-none`}
            />
          </FormField>

          {/* Updated Date */}
          <FormField label="Updated Date">
            <input
              type="date"
              value={form.updatedDate}
              onChange={(e) => set('updatedDate', e.target.value)}
              className={inputCls()}
            />
          </FormField>
        </div>

        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#E8A87C] text-white rounded-lg hover:bg-[#D89A6C] transition-colors text-sm">Save Progress Update</button>
        </div>
      </div>
    </div>
  );
}

// ─── Complete Task Modal ──────────────────────────────────────────────────────

const CONTRIBUTION_TYPES = [
  'Product Making',
  'Sorting',
  'Packaging',
  'Inventory Update',
  'Quality Check',
  'Design Work',
  'Community Activity',
  'Training',
];

function CompleteTaskModal({
  task,
  onConfirm,
  onClose,
}: {
  task: Task;
  onConfirm: (args: {
    completionDate: string;
    contributionType: string;
    finalOutcome: string;
    contributionDetails: string;
    adminRemarks: string;
  }) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    completionDate: today,
    contributionType: task.category ?? '',
    finalOutcome: '',
    contributionDetails: '',
    adminRemarks: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const handleConfirm = () => {
    const e: Record<string, string> = {};
    if (!form.contributionType) e.contributionType = 'Contribution type is required.';
    if (!form.finalOutcome.trim()) e.finalOutcome = 'Final outcome is required.';
    if (Object.keys(e).length) { setErrors(e); return; }
    onConfirm({
      completionDate: form.completionDate,
      contributionType: form.contributionType,
      finalOutcome: form.finalOutcome.trim(),
      contributionDetails: form.contributionDetails.trim(),
      adminRemarks: form.adminRemarks.trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Confirm Task Completion</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Confirmation banner */}
          <div className="flex items-center gap-3 bg-[#E8F5EE] border border-[#5A9E72]/30 rounded-lg px-4 py-3">
            <div className="w-8 h-8 bg-[#5A9E72] rounded-full flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs text-[#3B6B4A]">
              Once confirmed, the task status will be updated to <span className="font-medium">Completed</span> and a staff contribution record will be created.
            </p>
          </div>

          {/* Task Summary */}
          <div className="bg-[#FFF8F0] rounded-lg p-4 border border-[#E8D8C8]">
            <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide mb-2">Task Summary</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <div>
                <p className="text-xs text-[#9B8B8B]">Task ID</p>
                <p className="text-sm text-[#3B2F2F] font-mono">{task.id}</p>
              </div>
              <div>
                <p className="text-xs text-[#9B8B8B]">Priority</p>
                <div className="mt-0.5"><PriorityBadge priority={task.priority} /></div>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-[#9B8B8B]">Task Title</p>
                <p className="text-sm text-[#3B2F2F]">{task.title}</p>
              </div>
              <div>
                <p className="text-xs text-[#9B8B8B]">Assigned Staff</p>
                <p className="text-sm text-[#3B2F2F]">{task.assignedStaff ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-[#9B8B8B]">Due Date</p>
                <p className="text-sm text-[#3B2F2F]">{fmt(task.dueDate)}</p>
              </div>
            </div>
          </div>

          {/* Completion Date + Contribution Type */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Completion Date" required>
              <input
                type="date"
                value={form.completionDate}
                onChange={(e) => set('completionDate', e.target.value)}
                className={inputCls()}
              />
            </FormField>
            <FormField label="Contribution Type" required error={errors.contributionType}>
              <select value={form.contributionType} onChange={(e) => set('contributionType', e.target.value)} className={inputCls(errors.contributionType)}>
                <option value="">— Select type —</option>
                {CONTRIBUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </FormField>
          </div>

          {/* Final Outcome */}
          <FormField label="Final Outcome" required error={errors.finalOutcome}>
            <input
              type="text"
              value={form.finalOutcome}
              onChange={(e) => set('finalOutcome', e.target.value)}
              placeholder="e.g. All 50 scrunchies completed and passed quality check"
              className={inputCls(errors.finalOutcome)}
            />
          </FormField>

          {/* Contribution Details */}
          <FormField label="Contribution Details">
            <textarea
              rows={3}
              value={form.contributionDetails}
              onChange={(e) => set('contributionDetails', e.target.value)}
              placeholder="Describe the work done, methods used, or key contributions (optional)"
              className={`${inputCls()} resize-none`}
            />
          </FormField>

          {/* Admin Remarks */}
          <FormField label="Admin Remarks">
            <textarea
              rows={2}
              value={form.adminRemarks}
              onChange={(e) => set('adminRemarks', e.target.value)}
              placeholder="Any additional notes for the admin record (optional)"
              className={`${inputCls()} resize-none`}
            />
          </FormField>
        </div>

        <div className="px-6 py-4 border-t border-[#E8D8C8] flex gap-3 justify-end shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm">Cancel</button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 bg-[#8FBF9F] text-white rounded-lg hover:bg-[#7AA98A] transition-colors text-sm"
          >
            Confirm Completion
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type ModalType = 'view' | 'create' | 'assign' | 'progress' | 'complete' | null;

export function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>(() => [...mockTasks]);
  const [contributions, setContributions] = useState<Contribution[]>(() => [...mockContributions]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [staffFilter, setStaffFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openModal = (modal: ModalType, task?: Task) => {
    setSelectedTask(task ?? null);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTask(null);
  };

  // ── Derived data ──────────────────────────────────────────────────────────

  const nextTaskId = useMemo(() => {
    const nums = tasks.map((t) => parseInt(t.id.replace('TSK-', ''), 10));
    return `TSK-${String(Math.max(...nums) + 1).padStart(3, '0')}`;
  }, [tasks]);

  const nextContribId = useMemo(() => {
    const nums = contributions.map((c) => parseInt(c.id.replace('CNT-', ''), 10));
    return `CNT-${String(Math.max(...nums) + 1).padStart(3, '0')}`;
  }, [contributions]);

  const activeStaffWithWorkload = useMemo(() => {
    return mockStaff
      .filter((s) => s.status === 'Active')
      .map((s) => ({
        id: s.id,
        name: s.name,
        role: s.role,
        activeTasks: tasks.filter(
          (t) => t.assignedStaffId === s.id && (t.status === 'Assigned' || t.status === 'In Progress')
        ).length,
      }));
  }, [tasks]);

  // ── Summary stats ─────────────────────────────────────────────────────────

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const assignedTasks = tasks.filter((t) => t.status === 'Assigned').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;

  // ── Filtered tasks ────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tasks.filter((t) => {
      const matchSearch =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        (t.assignedStaff ?? '').toLowerCase().includes(q) ||
        (t.category ?? '').toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchStaff = staffFilter === 'all' || t.assignedStaffId === staffFilter;
      const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
      return matchSearch && matchStatus && matchStaff && matchPriority;
    });
  }, [tasks, search, statusFilter, staffFilter, priorityFilter]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleCreateTask = (t: Task) => {
    setTasks((prev) => [...prev, t]);
    closeModal();
    toast.success('Task created successfully.');
  };

  const handleAssignTask = (
    staffId: string, staffName: string,
    assignedDate: string, dueDate: string, remarks: string,
  ) => {
    if (!selectedTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id
          ? { ...t, assignedStaff: staffName, assignedStaffId: staffId, assignedDate, dueDate, status: 'Assigned', updatedDate: today, remarks: remarks || t.remarks }
          : t,
      ),
    );
    closeModal();
    toast.success('Task assigned successfully.');
  };

  const handleUpdateProgress = (status: Task['status'], remarks: string, updatedDate: string) => {
    if (!selectedTask) return;
    setTasks((prev) =>
      prev.map((t) => t.id === selectedTask.id ? { ...t, status, progress: remarks, updatedDate } : t),
    );
    closeModal();
    toast.success('Task progress updated successfully.');
  };

  const handleCompleteTask = (args: {
    completionDate: string;
    contributionType: string;
    finalOutcome: string;
    contributionDetails: string;
    adminRemarks: string;
  }) => {
    if (!selectedTask) return;
    const { completionDate, contributionType, finalOutcome, contributionDetails, adminRemarks } = args;
    setTasks((prev) => prev.map((t) =>
      t.id === selectedTask.id
        ? { ...t, status: 'Completed', completionDate, progress: finalOutcome, updatedDate: today }
        : t
    ));
    const newContrib: Contribution = {
      id: nextContribId,
      staffId: selectedTask.assignedStaffId ?? '',
      staffName: selectedTask.assignedStaff ?? '',
      taskId: selectedTask.id,
      taskTitle: selectedTask.title,
      completionDate,
      contributionType,
      contributionDetails: contributionDetails || finalOutcome,
      reviewStatus: 'Pending Review',
      remarks: adminRemarks,
      recordedBy: 'Admin User',
      createdDate: today,
    };
    setContributions((prev) => [...prev, newContrib]);
    closeModal();
    toast.success('Task completed. Contribution record created and sent for review.');
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Task Management</h1>
            <p className="text-sm text-[#6B5F5F] mt-1">Create, assign, monitor, and complete internal tasks.</p>
          </div>
          <button
            onClick={() => openModal('create')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Tasks', value: totalTasks, bg: 'bg-[#F5EDE3]', color: 'text-[#C76B83]' },
            { label: 'Pending', value: pendingTasks, bg: 'bg-[#FFF3E0]', color: 'text-[#C77A2A]' },
            { label: 'Assigned', value: assignedTasks, bg: 'bg-[#E8F4F8]', color: 'text-[#4A8A9E]' },
            { label: 'In Progress', value: inProgressTasks, bg: 'bg-[#FFF8E0]', color: 'text-[#C9943C]' },
            { label: 'Completed', value: completedTasks, bg: 'bg-[#E8F5EE]', color: 'text-[#5A9E72]' },
          ].map(({ label, value, bg, color }) => (
            <div key={label} className="bg-white rounded-xl border border-[#E8D8C8] p-5 flex items-center gap-4">
              <div className={`w-11 h-11 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
                <ClipboardList className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">{label}</p>
                <p className={`text-2xl ${color} mt-0.5`}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          {/* Filters */}
          <div className="px-5 py-4 border-b border-[#E8D8C8] space-y-3">
            {/* Row 1: Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8B8B8]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Task ID, title, staff, or category..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              />
            </div>
            {/* Row 2: Dropdowns */}
            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 min-w-[130px] px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select
                value={staffFilter}
                onChange={(e) => setStaffFilter(e.target.value)}
                className="flex-1 min-w-[150px] px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                <option value="all">All Staff</option>
                {mockStaff.filter((s) => s.status === 'Active').map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="flex-1 min-w-[130px] px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                <option value="all">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Task ID</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide">Task Title</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Assigned Staff</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Due Date</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Progress</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-[#C8B8B8]">
                        <ClipboardList className="w-8 h-8" />
                        <p className="text-sm">No tasks found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((task) => {
                    const overdue = isOverdue(task);
                    const progressMatch = task.progress?.match(/Progress:\s*(\d+)%/);
                    const progressPct = task.status === 'Completed'
                      ? 100
                      : progressMatch
                        ? parseInt(progressMatch[1], 10)
                        : (task.progress ? 50 : 0);
                    return (
                      <tr key={task.id} className="hover:bg-[#FFF8F0] transition-colors">
                        <td className="px-4 py-3.5 text-xs text-[#6B5F5F] whitespace-nowrap font-mono">{task.id}</td>
                        <td className="px-4 py-3.5" style={{ maxWidth: '220px' }}>
                          <p className="text-sm text-[#3B2F2F] truncate leading-snug">{task.title}</p>
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            {task.category && (
                              <span className="text-[10px] text-[#9B8B8B]">{task.category}</span>
                            )}
                            <PriorityBadge priority={task.priority} />
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-[#6B5F5F] whitespace-nowrap">
                          {task.assignedStaff ?? <span className="text-[#C8B8B8]">Unassigned</span>}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-sm text-[#6B5F5F]">{fmt(task.dueDate)}</span>
                          {overdue && (
                            <span className="block px-2 py-0.5 rounded-full text-[10px] bg-[#FDEAEA] text-[#C94C4C] w-fit mt-0.5">
                              Overdue
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={task.status} />
                        </td>
                        <td className="px-4 py-3.5">
                          {(task.progress || task.status === 'Completed') ? (
                            <div>
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <div className="w-14 h-1.5 bg-[#E8D8C8] rounded-full overflow-hidden shrink-0">
                                  <div
                                    className="h-full bg-[#C9943C] rounded-full transition-all"
                                    style={{ width: `${progressPct}%` }}
                                  />
                                </div>
                                <span className="text-[10px] text-[#6B5F5F]">{progressPct}%</span>
                              </div>
                              {task.progress && (
                                <p className="text-[10px] text-[#9B8B8B] truncate" style={{ maxWidth: '110px' }}>
                                  {task.progress.split(' | ')[0]}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-[#C8B8B8]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex gap-1">
                            <button
                              onClick={() => openModal('view', task)}
                              title="View Details"
                              className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#F5EDE3] rounded transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {task.status === 'Pending' && !task.assignedStaff && (
                              <button
                                onClick={() => openModal('assign', task)}
                                title="Assign Task"
                                className="p-1.5 text-[#C76B83] hover:text-[#3B2F2F] hover:bg-[#F5EDE3] rounded transition-colors"
                              >
                                <UserPlus className="w-4 h-4" />
                              </button>
                            )}
                            {(task.status === 'Assigned' || task.status === 'In Progress') && (
                              <button
                                onClick={() => openModal('progress', task)}
                                title="Update Progress"
                                className="p-1.5 text-[#C77A2A] hover:text-[#3B2F2F] hover:bg-[#FFF3E0] rounded transition-colors"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            )}
                            {task.status === 'In Progress' && (
                              <button
                                onClick={() => openModal('complete', task)}
                                title="Mark as Complete"
                                className="p-1.5 text-[#5A9E72] hover:text-[#3B2F2F] hover:bg-[#E8F5EE] rounded transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
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
              Showing {filtered.length} of {tasks.length} tasks.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'view' && selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          contribution={contributions.find((c) => c.taskId === selectedTask.id)}
          onClose={closeModal}
          onAssign={() => setActiveModal('assign')}
          onUpdate={() => setActiveModal('progress')}
          onComplete={() => setActiveModal('complete')}
        />
      )}
      {activeModal === 'create' && (
        <CreateTaskModal onSave={handleCreateTask} onClose={closeModal} nextId={nextTaskId} />
      )}
      {activeModal === 'assign' && selectedTask && (
        <AssignTaskModal
          task={selectedTask}
          activeStaffWithWorkload={activeStaffWithWorkload}
          onSave={handleAssignTask}
          onClose={closeModal}
        />
      )}
      {activeModal === 'progress' && selectedTask && (
        <UpdateProgressModal task={selectedTask} onSave={handleUpdateProgress} onClose={closeModal} />
      )}
      {activeModal === 'complete' && selectedTask && (
        <CompleteTaskModal task={selectedTask} onConfirm={(args) => handleCompleteTask(args)} onClose={closeModal} />
      )}
    </AdminLayout>
  );
}
