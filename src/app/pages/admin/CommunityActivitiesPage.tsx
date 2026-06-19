import { useState, useMemo } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Recycle, Plus, Users, Package, Activity, Search, Eye, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

interface CommunityActivity {
  id: string;
  title: string;
  date: string;
  location: string;
  materialsKg: number;
  participants: number;
  status: 'Completed' | 'Upcoming' | 'Planned';
  description?: string;
  organizer?: string;
}

const INITIAL_ACTIVITIES: CommunityActivity[] = [
  {
    id: 'ACT-001',
    title: 'Fabric Collection Drive',
    date: '2026-05-10',
    location: 'Kabin Kraf Hibiscus',
    materialsKg: 120,
    participants: 35,
    status: 'Completed',
    description: 'Collected donated fabric materials from community members for upcycling into handmade crafts.',
    organizer: 'Puan Fhairna',
  },
  {
    id: 'ACT-002',
    title: 'Recycling Awareness Workshop',
    date: '2026-05-18',
    location: 'UTM Community Hall',
    materialsKg: 80,
    participants: 45,
    status: 'Completed',
    description: 'Educational workshop on recycling and sustainable fabric use, held in collaboration with UTM.',
    organizer: 'Puan Sheila',
  },
  {
    id: 'ACT-003',
    title: 'Old Clothes Donation Day',
    date: '2026-06-15',
    location: 'Taman Pulai Indah',
    materialsKg: 0,
    participants: 0,
    status: 'Upcoming',
    description: 'Community drive for collecting old clothes and textiles to be repurposed into new craft products.',
    organizer: 'Puan Fhairna',
  },
  {
    id: 'ACT-004',
    title: 'School Fabric Drive — SMK Skudai',
    date: '2026-04-20',
    location: 'SMK Skudai, Johor',
    materialsKg: 800,
    participants: 60,
    status: 'Completed',
    description: 'Fabric donation campaign held at SMK Skudai, engaging students in sustainable practices.',
    organizer: 'Puan Sheila',
  },
  {
    id: 'ACT-005',
    title: 'Community Upcycling Day',
    date: '2026-03-15',
    location: 'Dewan Komuniti Taman Universiti',
    materialsKg: 1500,
    participants: 120,
    status: 'Completed',
    description: 'Large-scale community upcycling event where participants brought textiles for repurposing into handmade goods.',
    organizer: 'Puan Fhairna',
  },
  {
    id: 'ACT-006',
    title: 'Green Bazaar Community Event',
    date: '2026-06-28',
    location: 'Taman Pulai Indah Community Hall',
    materialsKg: 0,
    participants: 0,
    status: 'Upcoming',
    description: 'A community bazaar promoting eco-friendly products and sustainable living, featuring KRAF HIBISCUS handmade items.',
    organizer: 'Puan Sheila',
  },
];

const STATUS_COLORS: Record<string, string> = {
  Completed: 'bg-[#E8F5EE] text-[#3A7D58]',
  Upcoming: 'bg-[#FFF0E0] text-[#C77A2A]',
  Planned: 'bg-[#F0F0F0] text-[#6B6B6B]',
};

type ModalType = 'view' | 'edit' | 'add' | 'delete' | null;

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' });
}

function ViewActivityModal({ activity, onClose }: { activity: CommunityActivity; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Activity Details</h2>
          <button onClick={onClose} className="text-[#9B8B8B] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Activity ID</p>
              <p className="text-[#3B2F2F]">{activity.id}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Status</p>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${STATUS_COLORS[activity.status]}`}>{activity.status}</span>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-[#6B5F5F] mb-1">Activity Name</p>
              <p className="text-[#3B2F2F]">{activity.title}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Date</p>
              <p className="text-[#3B2F2F]">{formatDate(activity.date)}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Location</p>
              <p className="text-[#3B2F2F]">{activity.location}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Materials Collected</p>
              <p className="text-[#3B2F2F]">{activity.materialsKg > 0 ? `${activity.materialsKg} kg` : '—'}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B5F5F] mb-1">Participants</p>
              <p className="text-[#3B2F2F]">{activity.participants > 0 ? activity.participants : '—'}</p>
            </div>
            {activity.organizer && (
              <div>
                <p className="text-xs text-[#6B5F5F] mb-1">Organizer</p>
                <p className="text-[#3B2F2F]">{activity.organizer}</p>
              </div>
            )}
            {activity.description && (
              <div className="col-span-2">
                <p className="text-xs text-[#6B5F5F] mb-1">Description</p>
                <div className="bg-[#FFF8F0] rounded-lg p-3 border border-[#E8D8C8]">
                  <p className="text-[#3B2F2F] text-sm">{activity.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end shrink-0">
          <button onClick={onClose} className="px-6 py-2 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function EditActivityModal({ activity, onClose, onSave }: { activity: CommunityActivity; onClose: () => void; onSave: (updated: CommunityActivity) => void }) {
  const [form, setForm] = useState({ ...activity });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Activity name is required.';
    if (!form.date) e.date = 'Date is required.';
    if (!form.location.trim()) e.location = 'Location is required.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Edit Activity</h2>
          <button onClick={onClose} className="text-[#9B8B8B] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Activity Name <span className="text-red-400">*</span></label>
            <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Date <span className="text-red-400">*</span></label>
              <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as CommunityActivity['status'] }))}
                className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]">
                <option>Upcoming</option>
                <option>Planned</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Location <span className="text-red-400">*</span></label>
            <input type="text" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Materials Collected (kg)</label>
              <input type="number" min="0" value={form.materialsKg} onChange={e => setForm(p => ({ ...p, materialsKg: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Participants</label>
              <input type="number" min="0" value={form.participants} onChange={e => setForm(p => ({ ...p, participants: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Organizer</label>
            <input type="text" value={form.organizer || ''} onChange={e => setForm(p => ({ ...p, organizer: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Description</label>
            <textarea rows={3} value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] resize-none" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-6 py-2 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-sm">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function AddActivityModal({ activities, onClose, onAdd }: { activities: CommunityActivity[]; onClose: () => void; onAdd: (a: CommunityActivity) => void }) {
  const [form, setForm] = useState({
    title: '', date: '', location: '', materialsKg: 0, participants: 0, status: 'Upcoming' as CommunityActivity['status'], organizer: '', description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Activity name is required.';
    if (!form.date) e.date = 'Date is required.';
    if (!form.location.trim()) e.location = 'Location is required.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const nums = activities.map(a => parseInt(a.id.replace('ACT-', ''), 10));
    const nextNum = Math.max(...nums) + 1;
    const newId = `ACT-${String(nextNum).padStart(3, '0')}`;
    onAdd({ id: newId, ...form });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8] shrink-0">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Add Activity</h2>
          <button onClick={onClose} className="text-[#9B8B8B] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Activity Name <span className="text-red-400">*</span></label>
            <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Fabric Collection Drive"
              className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Date <span className="text-red-400">*</span></label>
              <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as CommunityActivity['status'] }))}
                className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]">
                <option>Upcoming</option>
                <option>Planned</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Location <span className="text-red-400">*</span></label>
            <input type="text" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
              placeholder="e.g. Kabin Kraf Hibiscus"
              className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Materials Collected (kg)</label>
              <input type="number" min="0" value={form.materialsKg} onChange={e => setForm(p => ({ ...p, materialsKg: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
            </div>
            <div>
              <label className="block text-sm text-[#6B5F5F] mb-1">Participants</label>
              <input type="number" min="0" value={form.participants} onChange={e => setForm(p => ({ ...p, participants: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Organizer</label>
            <input type="text" value={form.organizer} onChange={e => setForm(p => ({ ...p, organizer: e.target.value }))}
              placeholder="e.g. Puan Fhairna"
              className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]" />
          </div>
          <div>
            <label className="block text-sm text-[#6B5F5F] mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Brief description of the activity"
              className="w-full px-3 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F] resize-none" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-6 py-2 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-sm">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm">
            Add Activity
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteActivityModal({ activity, onClose, onDelete }: { activity: CommunityActivity; onClose: () => void; onDelete: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8D8C8]">
          <h2 className="font-['Playfair_Display'] text-xl text-[#3B2F2F]">Delete Activity</h2>
          <button onClick={onClose} className="text-[#9B8B8B] hover:text-[#3B2F2F]"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          <p className="text-[#6B5F5F] text-sm">
            Are you sure you want to delete <span className="text-[#3B2F2F]">{activity.title}</span> ({activity.id})? This action cannot be undone in this prototype.
          </p>
        </div>
        <div className="px-6 py-4 border-t border-[#E8D8C8] flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 border-2 border-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#F5EDE3] transition-colors text-sm">
            Cancel
          </button>
          <button onClick={onDelete} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function CommunityActivitiesPage() {
  const [activities, setActivities] = useState<CommunityActivity[]>(INITIAL_ACTIVITIES);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Upcoming' | 'Planned'>('All');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selected, setSelected] = useState<CommunityActivity | null>(null);

  const totalActivities = activities.length;
  const totalUpcoming = activities.filter(a => a.status === 'Upcoming').length;
  const totalCompleted = activities.filter(a => a.status === 'Completed').length;
  const totalMaterials = activities.reduce((s, a) => s + a.materialsKg, 0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return activities.filter(a => {
      const matchSearch = !q || a.title.toLowerCase().includes(q) || a.location.toLowerCase().includes(q) || a.status.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [activities, search, statusFilter]);

  const openModal = (modal: ModalType, activity?: CommunityActivity) => {
    if (activity) setSelected(activity);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelected(null);
  };

  const handleEdit = (updated: CommunityActivity) => {
    setActivities(prev => prev.map(a => a.id === updated.id ? updated : a));
    toast.success('Activity record has been updated successfully.');
    closeModal();
  };

  const handleAdd = (newActivity: CommunityActivity) => {
    setActivities(prev => [newActivity, ...prev]);
    toast.success('Activity has been added successfully.');
    closeModal();
  };

  const handleDelete = () => {
    if (!selected) return;
    setActivities(prev => prev.filter(a => a.id !== selected.id));
    toast.success('Activity record has been deleted successfully.');
    closeModal();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F]">Community Activities</h1>
            <p className="text-sm text-[#6B5F5F] mt-1">Track recycling drives, fabric donations, and community events.</p>
          </div>
          <button
            onClick={() => setActiveModal('add')}
            className="flex items-center gap-2 px-4 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors text-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Activity
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-[#E8D8C8] flex items-center gap-4">
            <div className="w-11 h-11 bg-[#FDEAF1] rounded-full flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-[#C76B83]" />
            </div>
            <div>
              <p className="text-2xl text-[#3B2F2F]">{totalActivities}</p>
              <p className="text-xs text-[#6B5F5F]">Total Activities</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-[#E8D8C8] flex items-center gap-4">
            <div className="w-11 h-11 bg-[#FFF0E0] rounded-full flex items-center justify-center shrink-0">
              <Recycle className="w-5 h-5 text-[#C77A2A]" />
            </div>
            <div>
              <p className="text-2xl text-[#3B2F2F]">{totalUpcoming}</p>
              <p className="text-xs text-[#6B5F5F]">Upcoming</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-[#E8D8C8] flex items-center gap-4">
            <div className="w-11 h-11 bg-[#E8F5EE] rounded-full flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#3A7D58]" />
            </div>
            <div>
              <p className="text-2xl text-[#3B2F2F]">{totalCompleted}</p>
              <p className="text-xs text-[#6B5F5F]">Completed</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-[#E8D8C8] flex items-center gap-4">
            <div className="w-11 h-11 bg-[#FFF3E0] rounded-full flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-[#E8A87C]" />
            </div>
            <div>
              <p className="text-2xl text-[#3B2F2F]">{totalMaterials.toLocaleString()} kg</p>
              <p className="text-xs text-[#6B5F5F]">Materials Collected</p>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B8B8B]" />
            <input
              type="text"
              placeholder="Search by name, location, status..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#E8D8C8] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-[#3B2F2F]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Completed', 'Upcoming', 'Planned'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${statusFilter === tab ? 'bg-[#EFA3B7] text-white' : 'bg-white border border-[#E8D8C8] text-[#6B5F5F] hover:bg-[#FFF8F0]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-[#E8D8C8] overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-[#FFF8F0] border-b border-[#E8D8C8]">
                <th className="px-4 py-3 text-left text-xs text-[#6B5F5F] whitespace-nowrap">Activity ID</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B5F5F]">Activity Name</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B5F5F] whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B5F5F]">Location</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B5F5F] whitespace-nowrap">Collected Materials</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B5F5F] whitespace-nowrap">Participants</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B5F5F] whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B5F5F] whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, idx) => (
                <tr key={a.id} className={`border-b border-[#E8D8C8] last:border-0 hover:bg-[#FFF8F0] transition-colors ${idx % 2 !== 0 ? 'bg-[#FFFAF7]' : ''}`}>
                  <td className="px-4 py-3 text-[#9B8B8B] whitespace-nowrap">{a.id}</td>
                  <td className="px-4 py-3 text-[#3B2F2F]">{a.title}</td>
                  <td className="px-4 py-3 text-[#6B5F5F] whitespace-nowrap">{formatDate(a.date)}</td>
                  <td className="px-4 py-3 text-[#6B5F5F] max-w-[160px] truncate">{a.location}</td>
                  <td className="px-4 py-3 text-right text-[#3B2F2F] whitespace-nowrap">{a.materialsKg > 0 ? `${a.materialsKg} kg` : '—'}</td>
                  <td className="px-4 py-3 text-right text-[#3B2F2F] whitespace-nowrap">{a.participants > 0 ? a.participants : '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${STATUS_COLORS[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal('view', a)} className="p-1.5 text-[#6B5F5F] hover:text-[#C76B83] hover:bg-[#FDEAF1] rounded transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openModal('edit', a)} className="p-1.5 text-[#6B5F5F] hover:text-[#C76B83] hover:bg-[#FDEAF1] rounded transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => openModal('delete', a)} className="p-1.5 text-[#6B5F5F] hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-[#6B5F5F]">No activities found.</div>
          )}
        </div>
      </div>

      {activeModal === 'view' && selected && <ViewActivityModal activity={selected} onClose={closeModal} />}
      {activeModal === 'edit' && selected && <EditActivityModal activity={selected} onClose={closeModal} onSave={handleEdit} />}
      {activeModal === 'add' && <AddActivityModal activities={activities} onClose={closeModal} onAdd={handleAdd} />}
      {activeModal === 'delete' && selected && <DeleteActivityModal activity={selected} onClose={closeModal} onDelete={handleDelete} />}
    </AdminLayout>
  );
}