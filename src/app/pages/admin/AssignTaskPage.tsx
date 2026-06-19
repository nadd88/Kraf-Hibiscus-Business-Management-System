import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminForm } from '../../components/admin/AdminForm';
import { mockTasks, mockStaff } from '../../data/staffData';
import { toast } from 'sonner';

export function AssignTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = mockTasks.find((t) => t.id === id);
  const activeStaff = mockStaff.filter((s) => s.status === 'Active');

  const [formData, setFormData] = useState({
    staffId: '',
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: task?.dueDate || '',
    remarks: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const fields = [
    {
      name: 'staffId',
      label: 'Select Staff',
      type: 'select' as const,
      required: true,
      options: activeStaff.map((staff) => ({ label: `${staff.name} (${staff.role})`, value: staff.id })),
    },
    {
      name: 'assignedDate',
      label: 'Assigned Date',
      type: 'date' as const,
      required: true,
    },
    {
      name: 'dueDate',
      label: 'Due Date',
      type: 'date' as const,
      required: true,
    },
    {
      name: 'remarks',
      label: 'Assignment Remarks',
      type: 'textarea' as const,
      placeholder: 'Enter assignment instructions or notes',
      rows: 4,
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

    if (!formData.staffId) {
      errors.staffId = 'Please select a staff member';
    } else {
      const selectedStaff = mockStaff.find(s => s.id === formData.staffId);
      if (selectedStaff?.status === 'Inactive') {
        errors.staffId = 'Selected staff is inactive';
      }
    }

    if (!formData.dueDate) {
      errors.dueDate = 'Due date is required';
    } else if (formData.dueDate < formData.assignedDate) {
      errors.dueDate = 'Due date cannot be earlier than assigned date';
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

    const selectedStaff = mockStaff.find(s => s.id === formData.staffId);
    toast.success(`Task assigned to ${selectedStaff?.name} successfully!`);
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
        title="Assign Task"
        description={`Assign task "${task.title}" to a staff member`}
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Assign Task"
        validationErrors={validationErrors}
        customFields={
          <div className="bg-[#FFF8F0] rounded-lg p-6 border border-[#E8D8C8]">
            <h3 className="text-sm text-[#6B5F5F] mb-3">Selected Task</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-[#6B5F5F]">Task ID</p>
                <p className="text-[#3B2F2F]">{task.id}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B5F5F]">Task Title</p>
                <p className="text-[#3B2F2F]">{task.title}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B5F5F]">Priority</p>
                <p className="text-[#3B2F2F]">{task.priority}</p>
              </div>
            </div>
          </div>
        }
      />
    </AdminLayout>
  );
}
