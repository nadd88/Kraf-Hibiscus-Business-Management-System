import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminForm } from '../../components/admin/AdminForm';
import { mockTasks } from '../../data/staffData';
import { toast } from 'sonner';

export function UpdateTaskProgressPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = mockTasks.find((t) => t.id === id);

  const [formData, setFormData] = useState({
    newStatus: task?.status || 'Pending',
    progressRemarks: '',
    updatedDate: new Date().toISOString().split('T')[0],
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const fields = [
    {
      name: 'newStatus',
      label: 'New Status',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Assigned', value: 'Assigned' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'Cancelled' },
      ],
    },
    {
      name: 'progressRemarks',
      label: 'Progress Remarks',
      type: 'textarea' as const,
      placeholder: 'Describe the current progress and any updates',
      rows: 5,
      required: true,
    },
    {
      name: 'updatedDate',
      label: 'Updated Date',
      type: 'date' as const,
      required: true,
    },
  ];

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (!formData.progressRemarks.trim()) {
      errors.progressRemarks = 'Progress remarks are required';
    }

    if (formData.newStatus === task?.status && !formData.progressRemarks.trim()) {
      errors.newStatus = 'No changes made';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Please fix the validation errors.');
      return;
    }

    toast.success('Task progress updated successfully!');
    navigate(`/admin/tasks/${id}`);
  };

  const handleCancel = () => {
    navigate(`/admin/tasks/${id}`);
  };

  if (!task) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-[#6B5F5F]">Task not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminForm
        title="Update Task Progress"
        description={`Update progress for task "${task.title}"`}
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save Progress Update"
        validationErrors={validationErrors}
        customFields={
          <div className="bg-[#FFF8F0] rounded-lg p-6 border border-[#E8D8C8]">
            <h3 className="text-sm text-[#6B5F5F] mb-3">Current Task Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#6B5F5F]">Task Title</p>
                <p className="text-[#3B2F2F]">{task.title}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B5F5F]">Current Status</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs bg-[#E8A87C] text-white">
                  {task.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-[#6B5F5F]">Assigned Staff</p>
                <p className="text-[#3B2F2F]">{task.assignedStaff || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B5F5F]">Due Date</p>
                <p className="text-[#3B2F2F]">{task.dueDate}</p>
              </div>
              {task.progress && (
                <div className="md:col-span-2">
                  <p className="text-xs text-[#6B5F5F]">Previous Progress</p>
                  <p className="text-[#3B2F2F] text-sm">{task.progress}</p>
                </div>
              )}
            </div>
          </div>
        }
      />
    </AdminLayout>
  );
}
