import { useState, useMemo } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockContributions, mockTasks, mockStaff } from '../../data/staffData';
import type { Contribution } from '../../data/staffData';
import { toast } from 'sonner';
import {
  Plus, Search, Eye, Edit2, ClipboardCheck, Award, X, Info,
  CheckCircle, AlertCircle, Clock,
} from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const CONTRIBUTION_TYPES = [
  'Product Making', 'Sorting', 'Packaging', 'Inventory Update',
  'Quality Check', 'Design Work', 'Community Activity', 'Training',
];

const REVIEW_STATUS_OPTIONS: Contribution['reviewStatus'][] = [
  'Pending Review', 'Reviewed', 'Needs Follow-up',
];

const REVIEW_BADGE: Record<string, { cls: string; icon: React.ReactNode }> = {
  'Pending Review': {
    cls: 'bg-[#FFF3E0] text-[#C77A2A]',
    icon: <Clock className="w-3 h-3" />,
  },
  Reviewed: {
    cls: 'bg-[#E8F5EE] text-[#5A9E72]',
    icon: <CheckCircle className="w-3 h-3" />,
  },
  'Needs Follow-up': {
    cls: 'bg-[#FDEAEA] text-[#C94C4C]',
    icon: <AlertCircle className="w-3 h-3" />,
  },
};

const today = new Date().toISOString().slice(0, 10);
const thisMonth = today.slice(0, 7);

function fmt(iso: string) { return iso.replace(/-/g, '/'); }

// ─── Shared field wrapper ─────────────────────────────────────────────────────

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

function inputCls(err?: string) {
  return `w-full px-4 py-2.5 border rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white transition-colors ${err ? 'border-[#C94C4C]' : 'border-[#E8D8C8]'}`;
}

function ReviewBadge({ status }: { status?: string }) {
  const key = status ?? 'Pending Review';
  const badge = REVIEW_BADGE[key] ?? REVIEW_BADGE['Pending Review'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs whitespace-nowrap ${badge.cls}`}>
      {badge.icon}
      {key}
    </span>
  );
}

// ─── View Contribution Modal ──────────────────────────────────────────────────

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[#E8D8C8] overflow-hidden">
      <div className="bg-[#FFF8F0] px-5 py-2.5 border-b border-[#E8D8C8]">
        <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">{title}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs text-[#9B8B8B] mb-0.5">{label}</p>
      <p className={`text-sm text-[#3B2F2F] ${mono ? 'font-mono' : ''}`}>{value || '—'}</p>
    </div>
  );
}

function ViewContributionModal({
  contribution,
  onClose,
  onUpdateStatus,
  onEdit,
}: {
  contribution: Contribution;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Contribution['reviewStatus']) => void;
  onEdit: () => void;
}) {
  const isReviewed = contribution.reviewStatus === 'Reviewed';
  const isFollowUp = contribution.reviewStatus === 'Needs Follow-up';

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <div>
            <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Contribution Details</h2>
            <p className="text-xs text-[#9B8B8B] mt-0.5">UC036 — Review Contribution Records</p>
          </div>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Section 1: Contribution Summary */}
          <SectionBlock title="Section 1 — Contribution Summary">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoRow label="Contribution ID" value={contribution.id} mono />
              <InfoRow label="Contribution Type" value={contribution.contributionType ?? '—'} />
              <InfoRow label="Completion Date" value={fmt(contribution.completionDate)} />
              <div>
                <p className="text-xs text-[#9B8B8B] mb-0.5">Review Status</p>
                <div className="mt-1"><ReviewBadge status={contribution.reviewStatus} /></div>
              </div>
            </div>
          </SectionBlock>

          {/* Section 2: Staff and Task Information */}
          <SectionBlock title="Section 2 — Staff and Task Information">
            <div className="grid grid-cols-2 gap-4">
              <InfoRow label="Staff ID" value={contribution.staffId || '—'} mono />
              <InfoRow label="Staff Name" value={contribution.staffName} />
              <InfoRow label="Task ID" value={contribution.taskId} mono />
              <div>
                <p className="text-xs text-[#9B8B8B] mb-0.5">Task Title</p>
                <p className="text-sm text-[#3B2F2F] leading-snug">{contribution.taskTitle}</p>
              </div>
            </div>
          </SectionBlock>

          {/* Section 3: Contribution Details */}
          <SectionBlock title="Section 3 — Contribution Details">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[#9B8B8B] mb-1.5">Contribution Details</p>
                <div className="bg-[#FFF8F0] border border-[#E8D8C8] rounded-lg px-4 py-3">
                  <p className="text-sm text-[#3B2F2F] leading-relaxed">{contribution.contributionDetails}</p>
                </div>
              </div>
              {contribution.qualityOutcome && (
                <div>
                  <p className="text-xs text-[#9B8B8B] mb-1.5">Quality / Outcome</p>
                  <div className="bg-[#E8F5EE] border border-[#5A9E72]/20 rounded-lg px-4 py-3">
                    <p className="text-sm text-[#3B6B4A]">{contribution.qualityOutcome}</p>
                  </div>
                </div>
              )}
              {contribution.remarks && (
                <div>
                  <p className="text-xs text-[#9B8B8B] mb-1.5">Admin Remarks</p>
                  <div className="bg-[#FFF8F0] border border-[#E8D8C8] rounded-lg px-4 py-3">
                    <p className="text-sm text-[#6B5F5F]">{contribution.remarks}</p>
                  </div>
                </div>
              )}
            </div>
          </SectionBlock>

          {/* Section 4: Review Information */}
          <SectionBlock title="Section 4 — Review Information">
            <div className="grid grid-cols-2 gap-4">
              <InfoRow label="Recorded By" value={contribution.recordedBy} />
              <InfoRow label="Recorded Date" value={fmt(contribution.createdDate)} />
              <InfoRow label="Reviewed By" value="Admin User" />
              <div>
                <p className="text-xs text-[#9B8B8B] mb-0.5">Review Decision</p>
                <div className="mt-1"><ReviewBadge status={contribution.reviewStatus} /></div>
              </div>
              <div>
                <p className="text-xs text-[#9B8B8B] mb-0.5">Review Notes</p>
                {contribution.reviewNotes ? (
                  <p className="text-sm text-[#3B2F2F] leading-snug">{contribution.reviewNotes}</p>
                ) : (
                  <p className="text-sm text-[#C8B8B8] italic">No review notes yet.</p>
                )}
              </div>
            </div>

            {/* Pending review notice */}
            {contribution.reviewStatus === 'Pending Review' && (
              <div className="mt-4 flex items-start gap-3 bg-[#FFF3E0] border border-[#C77A2A]/20 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 text-[#C77A2A] shrink-0 mt-0.5" />
                <p className="text-xs text-[#C77A2A]">
                  This contribution is awaiting review. Use the action buttons below to approve or flag for follow-up.
                </p>
              </div>
            )}
            {contribution.reviewStatus === 'Needs Follow-up' && (
              <div className="mt-4 flex items-start gap-3 bg-[#FDEAEA] border border-[#C94C4C]/20 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 text-[#C94C4C] shrink-0 mt-0.5" />
                <p className="text-xs text-[#C94C4C]">
                  This contribution has been flagged for follow-up. Review the details and mark as Reviewed once resolved.
                </p>
              </div>
            )}
            {contribution.reviewStatus === 'Reviewed' && (
              <div className="mt-4 flex items-start gap-3 bg-[#E8F5EE] border border-[#5A9E72]/20 rounded-lg px-4 py-3">
                <CheckCircle className="w-4 h-4 text-[#5A9E72] shrink-0 mt-0.5" />
                <p className="text-xs text-[#3B6B4A]">
                  This contribution has been reviewed and accepted for staff performance records.
                </p>
              </div>
            )}
          </SectionBlock>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
          >
            Back to Contribution Records
          </button>
          <div className="flex gap-2 flex-wrap">
            {!isFollowUp && (
              <button
                onClick={() => { onUpdateStatus(contribution.id, 'Needs Follow-up'); onClose(); }}
                className="px-4 py-2 border border-[#C77A2A]/40 text-[#C77A2A] rounded-lg hover:bg-[#FFF3E0] transition-colors text-sm"
              >
                Needs Follow-up
              </button>
            )}
            <button
              onClick={onEdit}
              className="px-4 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm"
            >
              Edit Record
            </button>
            {!isReviewed && (
              <button
                onClick={() => { onUpdateStatus(contribution.id, 'Reviewed'); onClose(); }}
                className="px-5 py-2 bg-[#8FBF9F] text-white rounded-lg hover:bg-[#7AA98A] transition-colors text-sm flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Reviewed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Review Modal ─────────────────────────────────────────────────────────────

function ReviewModal({
  contribution,
  onSave,
  onClose,
}: {
  contribution: Contribution;
  onSave: (id: string, status: Contribution['reviewStatus'], notes: string) => void;
  onClose: () => void;
}) {
  const [reviewStatus, setReviewStatus] = useState<Contribution['reviewStatus']>(
    contribution.reviewStatus ?? 'Pending Review',
  );
  const [reviewNotes, setReviewNotes] = useState(contribution.reviewNotes ?? '');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!reviewNotes.trim()) { setError('Review notes are required.'); return; }
    onSave(contribution.id, reviewStatus, reviewNotes.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Review Contribution</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Contribution summary */}
          <div className="bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8]">
            <div className="flex justify-between items-start gap-2 mb-2">
              <div>
                <p className="text-xs text-[#9B8B8B] font-mono">{contribution.id}</p>
                <p className="text-sm text-[#3B2F2F] mt-0.5">{contribution.staffName}</p>
              </div>
              <ReviewBadge status={contribution.reviewStatus} />
            </div>
            <p className="text-xs text-[#6B5F5F] truncate">{contribution.taskTitle}</p>
            {contribution.qualityOutcome && (
              <p className="text-xs text-[#9B8B8B] mt-1 italic">{contribution.qualityOutcome}</p>
            )}
          </div>

          {/* Contribution details (read) */}
          <div>
            <p className="text-xs text-[#9B8B8B] mb-1.5">Contribution Details</p>
            <div className="bg-white border border-[#E8D8C8] rounded-lg px-4 py-3 text-sm text-[#6B5F5F] leading-relaxed max-h-28 overflow-y-auto">
              {contribution.contributionDetails}
            </div>
          </div>

          {/* Review Status */}
          <FormField label="Review Status" required>
            <select
              value={reviewStatus}
              onChange={(e) => setReviewStatus(e.target.value as Contribution['reviewStatus'])}
              className={inputCls()}
            >
              {REVIEW_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </FormField>

          {/* Review Notes */}
          <FormField label="Review Notes" required error={error}>
            <textarea
              rows={4}
              value={reviewNotes}
              onChange={(e) => { setReviewNotes(e.target.value); setError(''); }}
              placeholder="Provide feedback or notes about this contribution"
              className={`${inputCls(error || undefined)} resize-none`}
            />
          </FormField>

          {/* Reviewed By (read-only) */}
          <FormField label="Reviewed By">
            <div className="w-full px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#9B8B8B] bg-[#FFF8F0]">
              Admin User
            </div>
          </FormField>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm">Save Review</button>
        </div>
      </div>
    </div>
  );
}

// ─── Edit Contribution Modal ──────────────────────────────────────────────────

function EditContributionModal({
  contribution,
  onSave,
  onClose,
}: {
  contribution: Contribution;
  onSave: (id: string, patch: Partial<Contribution>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    contributionType: contribution.contributionType ?? '',
    qualityOutcome: contribution.qualityOutcome ?? '',
    contributionDetails: contribution.contributionDetails,
    remarks: contribution.remarks ?? '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const handleSave = () => {
    const e: Record<string, string> = {};
    if (!form.contributionDetails.trim()) e.contributionDetails = 'Contribution details are required.';
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(contribution.id, {
      contributionType: form.contributionType || undefined,
      qualityOutcome: form.qualityOutcome.trim() || undefined,
      contributionDetails: form.contributionDetails.trim(),
      remarks: form.remarks.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Edit Contribution Record</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Read-only summary */}
          <div className="bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8]">
            <p className="text-xs text-[#9B8B8B] font-mono mb-0.5">{contribution.id}</p>
            <p className="text-sm text-[#3B2F2F]">{contribution.staffName}</p>
            <p className="text-xs text-[#6B5F5F] mt-1 truncate">{contribution.taskTitle}</p>
          </div>

          <FormField label="Contribution Type">
            <select value={form.contributionType} onChange={(e) => set('contributionType', e.target.value)} className={inputCls()}>
              <option value="">— Select type —</option>
              {CONTRIBUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </FormField>

          <FormField label="Quality / Outcome">
            <input
              type="text"
              value={form.qualityOutcome}
              onChange={(e) => set('qualityOutcome', e.target.value)}
              placeholder="e.g. All items passed quality check"
              className={inputCls()}
            />
          </FormField>

          <FormField label="Contribution Details" required error={errors.contributionDetails}>
            <textarea
              rows={4}
              value={form.contributionDetails}
              onChange={(e) => set('contributionDetails', e.target.value)}
              placeholder="Describe the contribution made"
              className={`${inputCls(errors.contributionDetails)} resize-none`}
            />
          </FormField>

          <FormField label="Admin Remarks">
            <textarea
              rows={2}
              value={form.remarks}
              onChange={(e) => set('remarks', e.target.value)}
              placeholder="Additional remarks (optional)"
              className={`${inputCls()} resize-none`}
            />
          </FormField>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── Record Contribution Modal ────────────────────────────────────────────────

function RecordContributionModal({
  contributions,
  onSave,
  onClose,
  nextId,
}: {
  contributions: Contribution[];
  onSave: (c: Contribution) => void;
  onClose: () => void;
  nextId: string;
}) {
  const completedTasks = useMemo(() => {
    const usedTaskIds = new Set(contributions.map((c) => c.taskId));
    return mockTasks.filter((t) => t.status === 'Completed' && !usedTaskIds.has(t.id));
  }, [contributions]);

  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [autoFilled, setAutoFilled] = useState<{
    taskId: string; taskTitle: string; staffId: string; staffName: string; completionDate: string;
  } | null>(null);
  const [form, setForm] = useState({
    contributionType: '',
    qualityOutcome: '',
    contributionDetails: '',
    adminRemarks: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskId(taskId);
    setErrors((p) => { const n = { ...p }; delete n.task; return n; });
    if (!taskId) { setAutoFilled(null); return; }
    const task = mockTasks.find((t) => t.id === taskId);
    if (!task) return;
    setAutoFilled({
      taskId: task.id,
      taskTitle: task.title,
      staffId: task.assignedStaffId ?? '',
      staffName: task.assignedStaff ?? '',
      completionDate: task.completionDate ?? today,
    });
    // Pre-fill contribution type from task category
    if (task.category) {
      setForm((p) => ({ ...p, contributionType: task.category! }));
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!selectedTaskId) e.task = 'Please select a completed task.';
    if (!form.contributionType) e.contributionType = 'Contribution type is required.';
    if (!form.contributionDetails.trim()) e.contributionDetails = 'Contribution details are required.';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); toast.error('Please fill in all required fields.'); return; }
    onSave({
      id: nextId,
      staffId: autoFilled!.staffId,
      staffName: autoFilled!.staffName,
      taskId: autoFilled!.taskId,
      taskTitle: autoFilled!.taskTitle,
      completionDate: autoFilled!.completionDate,
      contributionType: form.contributionType,
      qualityOutcome: form.qualityOutcome.trim() || undefined,
      contributionDetails: form.contributionDetails.trim(),
      reviewStatus: 'Pending Review',
      remarks: form.adminRemarks.trim() || undefined,
      recordedBy: 'Admin User',
      createdDate: today,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-xl shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Record Staff Contribution</h2>
          <button onClick={onClose} className="text-[#6B5F5F] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Auto-generated ID */}
          <div className="bg-[#FFF8F0] rounded-lg px-4 py-3 border border-[#E8D8C8] flex items-center gap-3">
            <Info className="w-4 h-4 text-[#9B8B8B] shrink-0" />
            <div>
              <p className="text-xs text-[#9B8B8B]">Auto-generated Contribution ID</p>
              <p className="text-sm text-[#3B2F2F] font-mono mt-0.5">{nextId}</p>
            </div>
          </div>

          {/* Select Completed Task */}
          <FormField label="Select Completed Task" required error={errors.task}>
            <select
              value={selectedTaskId}
              onChange={(e) => handleTaskSelect(e.target.value)}
              className={inputCls(errors.task)}
            >
              <option value="">— Select a completed task —</option>
              {completedTasks.length === 0 && (
                <option disabled>All completed tasks already have contribution records</option>
              )}
              {completedTasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id} — {t.assignedStaff ?? 'Unassigned'} — {t.title}
                </option>
              ))}
            </select>
            {completedTasks.length === 0 && !selectedTaskId && (
              <p className="text-xs text-[#9B8B8B] mt-1">No eligible completed tasks found.</p>
            )}
          </FormField>

          {/* Auto-filled task info */}
          {autoFilled && (
            <div className="bg-[#FFF8F0] rounded-lg p-4 border border-[#E8D8C8]">
              <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide mb-3">Auto-filled from Selected Task</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                <div>
                  <p className="text-xs text-[#9B8B8B]">Task ID</p>
                  <p className="text-sm text-[#3B2F2F] font-mono">{autoFilled.taskId}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9B8B8B]">Completion Date</p>
                  <p className="text-sm text-[#3B2F2F]">{fmt(autoFilled.completionDate)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-[#9B8B8B]">Task Title</p>
                  <p className="text-sm text-[#3B2F2F]">{autoFilled.taskTitle}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9B8B8B]">Staff ID</p>
                  <p className="text-sm text-[#3B2F2F] font-mono">{autoFilled.staffId || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9B8B8B]">Staff Name</p>
                  <p className="text-sm text-[#3B2F2F]">{autoFilled.staffName || '—'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Contribution Type */}
          <FormField label="Contribution Type" required error={errors.contributionType}>
            <select value={form.contributionType} onChange={(e) => set('contributionType', e.target.value)} className={inputCls(errors.contributionType)}>
              <option value="">— Select type —</option>
              {CONTRIBUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </FormField>

          {/* Quality / Outcome */}
          <FormField label="Quality / Outcome">
            <input
              type="text"
              value={form.qualityOutcome}
              onChange={(e) => set('qualityOutcome', e.target.value)}
              placeholder="e.g. All 50 items passed quality inspection"
              className={inputCls()}
            />
          </FormField>

          {/* Contribution Details */}
          <FormField label="Contribution Details" required error={errors.contributionDetails}>
            <textarea
              rows={3}
              value={form.contributionDetails}
              onChange={(e) => set('contributionDetails', e.target.value)}
              placeholder="Describe the work done, methods used, or key contributions"
              className={`${inputCls(errors.contributionDetails)} resize-none`}
            />
          </FormField>

          {/* Admin Remarks */}
          <FormField label="Admin Remarks">
            <textarea
              rows={2}
              value={form.adminRemarks}
              onChange={(e) => set('adminRemarks', e.target.value)}
              placeholder="Any internal notes (optional)"
              className={`${inputCls()} resize-none`}
            />
          </FormField>

          {/* Read-only fields row */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Recorded By">
              <div className="w-full px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#9B8B8B] bg-[#FFF8F0]">
                Admin User
              </div>
            </FormField>
            <FormField label="Review Status">
              <div className="w-full px-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#9B8B8B] bg-[#FFF8F0]">
                Pending Review
              </div>
            </FormField>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2 border border-[#E8D8C8] text-[#6B5F5F] rounded-lg hover:bg-[#FFF8F0] transition-colors text-sm">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm">Save Contribution Record</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type ModalState =
  | { type: 'view'; contribution: Contribution }
  | { type: 'review'; contribution: Contribution }
  | { type: 'edit'; contribution: Contribution }
  | { type: 'record' }
  | null;

export function ContributionListPage() {
  const [contributions, setContributions] = useState<Contribution[]>(() => [...mockContributions]);
  const [modal, setModal] = useState<ModalState>(null);

  const [search, setSearch] = useState('');
  const [staffFilter, setStaffFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // ── Summary stats ──────────────────────────────────────────────────────────

  const totalCount = contributions.length;
  const thisMonthCount = contributions.filter((c) => c.completionDate.slice(0, 7) === thisMonth).length;
  const pendingCount = contributions.filter((c) => (c.reviewStatus ?? 'Pending Review') === 'Pending Review').length;

  const topContributor = useMemo(() => {
    const counts: Record<string, number> = {};
    contributions.forEach((c) => { counts[c.staffName] = (counts[c.staffName] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? { name: sorted[0][0], count: sorted[0][1] } : null;
  }, [contributions]);

  // ── Filter options ─────────────────────────────────────────────────────────

  const uniqueStaff = useMemo(() => {
    const seen = new Set<string>();
    return contributions.filter((c) => { if (seen.has(c.staffId)) return false; seen.add(c.staffId); return true; });
  }, [contributions]);

  // ── Filtered list ──────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return contributions.filter((c) => {
      const matchSearch =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.staffName.toLowerCase().includes(q) ||
        c.taskTitle.toLowerCase().includes(q);
      const matchStaff = staffFilter === 'all' || c.staffId === staffFilter;
      const matchType = typeFilter === 'all' || c.contributionType === typeFilter;
      const matchStatus = statusFilter === 'all' || (c.reviewStatus ?? 'Pending Review') === statusFilter;
      const matchFrom = !dateFrom || c.completionDate >= dateFrom;
      const matchTo = !dateTo || c.completionDate <= dateTo;
      return matchSearch && matchStaff && matchType && matchStatus && matchFrom && matchTo;
    });
  }, [contributions, search, staffFilter, typeFilter, statusFilter, dateFrom, dateTo]);

  // ── Next ID ────────────────────────────────────────────────────────────────

  const nextId = useMemo(() => {
    const nums = contributions.map((c) => parseInt(c.id.replace('CNT-', ''), 10));
    return `CNT-${String(Math.max(...nums) + 1).padStart(3, '0')}`;
  }, [contributions]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSaveRecord = (c: Contribution) => {
    setContributions((prev) => [c, ...prev]);
    setModal(null);
    toast.success('Contribution record saved successfully.');
  };

  const handleSaveReview = (id: string, status: Contribution['reviewStatus'], notes: string) => {
    setContributions((prev) =>
      prev.map((c) => c.id === id ? { ...c, reviewStatus: status, reviewNotes: notes } : c)
    );
    setModal(null);
    toast.success('Review saved successfully.');
  };

  const handleQuickStatus = (id: string, status: Contribution['reviewStatus']) => {
    setContributions((prev) =>
      prev.map((c) => c.id === id ? { ...c, reviewStatus: status } : c)
    );
    const label = status === 'Reviewed' ? 'marked as Reviewed' : 'flagged for follow-up';
    toast.success(`Contribution ${label}.`);
  };

  const handleSaveEdit = (id: string, patch: Partial<Contribution>) => {
    setContributions((prev) => prev.map((c) => c.id === id ? { ...c, ...patch } : c));
    setModal(null);
    toast.success('Contribution record updated.');
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Staff Contribution Management</h1>
            <p className="text-sm text-[#6B5F5F] mt-1">
              Record, review, and monitor staff contributions after task completion.
            </p>
          </div>
          <button
            onClick={() => setModal({ type: 'record' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Record Contribution
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-[#F5EDE3] rounded-lg flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#C76B83]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Total Contributions</p>
              <p className="text-2xl text-[#3B2F2F] mt-0.5">{totalCount}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-[#E8F4F8] rounded-lg flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-5 h-5 text-[#4A8A9E]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">This Month</p>
              <p className="text-2xl text-[#3B2F2F] mt-0.5">{thisMonthCount}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-[#E8F5EE] rounded-lg flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#5A9E72]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Top Contributor</p>
              {topContributor ? (
                <>
                  <p className="text-sm text-[#3B2F2F] mt-0.5 truncate max-w-[120px]">{topContributor.name}</p>
                  <p className="text-xs text-[#9B8B8B]">{topContributor.count} record{topContributor.count !== 1 ? 's' : ''}</p>
                </>
              ) : (
                <p className="text-2xl text-[#3B2F2F] mt-0.5">—</p>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E8D8C8] p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-[#FFF3E0] rounded-lg flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#C77A2A]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B8B8B] uppercase tracking-wide">Pending Review</p>
              <p className="text-2xl text-[#C77A2A] mt-0.5">{pendingCount}</p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-hidden">
          {/* Filters */}
          <div className="px-5 py-4 border-b border-[#E8D8C8] space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8B8B8]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Contribution ID, staff name, or task title..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              />
            </div>
            {/* Filter row */}
            <div className="flex flex-wrap gap-3">
              <select
                value={staffFilter}
                onChange={(e) => setStaffFilter(e.target.value)}
                className="flex-1 min-w-[140px] px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                <option value="all">All Staff</option>
                {uniqueStaff.map((c) => (
                  <option key={c.staffId} value={c.staffId}>{c.staffName}</option>
                ))}
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex-1 min-w-[160px] px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                <option value="all">All Types</option>
                {CONTRIBUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 min-w-[160px] px-4 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
              >
                <option value="all">All Review Status</option>
                {REVIEW_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <label className="text-xs text-[#9B8B8B] shrink-0">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="flex-1 px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
                />
                <label className="text-xs text-[#9B8B8B] shrink-0">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="flex-1 px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm text-[#3B2F2F] focus:outline-none focus:border-[#C76B83] bg-white"
                />
                {(dateFrom || dateTo) && (
                  <button
                    onClick={() => { setDateFrom(''); setDateTo(''); }}
                    className="p-1.5 text-[#9B8B8B] hover:text-[#C94C4C] transition-colors shrink-0"
                    title="Clear date range"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Contribution ID</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Staff</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide">Related Task</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Type</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Date</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Review Status</th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#9B8B8B] uppercase tracking-wide whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-[#C8B8B8]">
                        <Award className="w-8 h-8" />
                        <p className="text-sm">No contribution records found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FFF8F0] transition-colors">
                      <td className="px-4 py-3.5 text-xs text-[#6B5F5F] whitespace-nowrap font-mono">{c.id}</td>
                      <td className="px-4 py-3.5 text-sm text-[#3B2F2F] whitespace-nowrap">{c.staffName}</td>
                      <td className="px-4 py-3.5" style={{ maxWidth: '200px' }}>
                        <p className="text-sm text-[#3B2F2F] truncate">{c.taskTitle}</p>
                        <p className="text-xs text-[#9B8B8B] font-mono mt-0.5">{c.taskId}</p>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {c.contributionType ? (
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-[#F5EDE3] text-[#C76B83]">
                            {c.contributionType}
                          </span>
                        ) : (
                          <span className="text-sm text-[#C8C8C8]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-[#6B5F5F] whitespace-nowrap">
                        {fmt(c.completionDate)}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <ReviewBadge status={c.reviewStatus} />
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setModal({ type: 'view', contribution: c })}
                            title="View Details"
                            className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#F5EDE3] rounded transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setModal({ type: 'review', contribution: c })}
                            title="Review"
                            className="p-1.5 text-[#C77A2A] hover:text-[#9B5A0A] hover:bg-[#FFF3E0] rounded transition-colors"
                          >
                            <ClipboardCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setModal({ type: 'edit', contribution: c })}
                            title="Edit"
                            className="p-1.5 text-[#6B5F5F] hover:text-[#3B2F2F] hover:bg-[#F5EDE3] rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[#E8D8C8] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <p className="text-xs text-[#9B8B8B]">
              Showing {filtered.length} of {contributions.length} records.
            </p>
            <p className="text-xs text-[#C8B8B8] italic">
              Contribution records are created after task completion and used for staff performance review.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modal?.type === 'view' && (
        <ViewContributionModal
          contribution={modal.contribution}
          onClose={() => setModal(null)}
          onUpdateStatus={handleQuickStatus}
          onEdit={() => setModal({ type: 'edit', contribution: modal.contribution })}
        />
      )}
      {modal?.type === 'review' && (
        <ReviewModal contribution={modal.contribution} onSave={handleSaveReview} onClose={() => setModal(null)} />
      )}
      {modal?.type === 'edit' && (
        <EditContributionModal contribution={modal.contribution} onSave={handleSaveEdit} onClose={() => setModal(null)} />
      )}
      {modal?.type === 'record' && (
        <RecordContributionModal contributions={contributions} onSave={handleSaveRecord} onClose={() => setModal(null)} nextId={nextId} />
      )}
    </AdminLayout>
  );
}
