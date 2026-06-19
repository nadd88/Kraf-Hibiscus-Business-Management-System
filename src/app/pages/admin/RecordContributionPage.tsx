import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminForm } from '../../components/admin/AdminForm';
import { mockStaff, mockTasks } from '../../data/staffData';
import { toast } from 'sonner';

export function RecordContributionPage() {
  const navigate = useNavigate();

  const completedTasks = mockTasks.filter((t) => t.status === 'Completed');

  const [formData, setFormData] = useState({
    staffId: '',
    taskId: '',
    completionDate: new Date().toISOString().split('T')[0],
    contributionDetails: '',
    remarks: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const fields = [
    {
      name: 'staffId',
      label: 'Select Staff',
      type: 'select' as const,
      required: true,
      options: mockStaff.map((staff) => ({ label: `${staff.name} (${staff.id})`, value: staff.id })),
    },
    {
      name: 'taskId',
      label: 'Select Completed Task',
      type: 'select' as const,
      required: true,
      options: completedTasks.map((task) => ({ label: `${task.title} (${task.id})`, value: task.id })),
    },
    {
      name: 'completionDate',
      label: 'Completion Date',
      type: 'date' as const,
      required: true,
    },
    {
      name: 'contributionDetails',
      label: 'Contribution Details',
      type: 'textarea' as const,
      placeholder: 'Describe the contribution made by the staff member',
      rows: 5,
      required: true,
    },
    {
      name: 'remarks',
      label: 'Remarks',
      type: 'textarea' as const,
      placeholder: 'Additional remarks (optional)',
      rows: 3,
    },
  ];

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'taskId' && value) {
      const task = mockTasks.find((t) => t.id === value);
      setSelectedTask(task);
    }

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.staffId) {
      errors.staffId = 'Staff selection is required';
    }

    if (!formData.taskId) {
      errors.taskId = 'Task selection is required';
    } else {
      const task = mockTasks.find((t) => t.id === formData.taskId);
      if (!task || task.status !== 'Completed') {
        errors.taskId = 'Completed task record not found';
      }
    }

    if (!formData.contributionDetails.trim()) {
      errors.contributionDetails = 'Contribution details are required';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Required information is missing.');
      return;
    }

    toast.success('Contribution record saved successfully!');
    navigate('/admin/contribution');
  };

  const handleCancel = () => {
    navigate('/admin/contribution');
  };

  return (
    <AdminLayout>
      <AdminForm
        title="Record Staff Contribution"
        description="Record a staff contribution for a completed task"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save Contribution Record"
        validationErrors={validationErrors}
        customFields={
          selectedTask && (
            <div className="bg-[#FFF8F0] rounded-lg p-6 border border-[#E8D8C8]">
              <h3 className="text-sm text-[#6B5F5F] mb-3">Task Summary</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#6B5F5F]">Task Title</p>
                  <p className="text-[#3B2F2F]">{selectedTask.title}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B5F5F]">Assigned Staff</p>
                  <p className="text-[#3B2F2F]">{selectedTask.assignedStaff || '-'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-[#6B5F5F]">Completion Date</p>
                  <p className="text-[#3B2F2F]">{selectedTask.completionDate || '-'}</p>
                </div>
              </div>
            </div>
          )
        }
      />
    </AdminLayout>
  );
}
