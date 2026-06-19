import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminForm } from '../../components/admin/AdminForm';
import { toast } from 'sonner';

export function CreateTaskPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskTitle: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    remarks: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const fields = [
    {
      name: 'taskTitle',
      label: 'Task Title',
      type: 'text' as const,
      placeholder: 'Enter task title',
      required: true,
    },
    {
      name: 'description',
      label: 'Task Description',
      type: 'textarea' as const,
      placeholder: 'Enter detailed task description',
      rows: 4,
    },
    {
      name: 'dueDate',
      label: 'Due Date',
      type: 'date' as const,
      required: true,
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' },
      ],
    },
    {
      name: 'status',
      label: 'Initial Status',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Assigned', value: 'Assigned' },
        { label: 'In Progress', value: 'In Progress' },
      ],
    },
    {
      name: 'remarks',
      label: 'Remarks',
      type: 'textarea' as const,
      placeholder: 'Enter any additional remarks',
      rows: 3,
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

    if (!formData.taskTitle.trim()) {
      errors.taskTitle = 'Task title is required';
    }

    if (!formData.dueDate) {
      errors.dueDate = 'Due date is required';
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (formData.dueDate < today) {
        errors.dueDate = 'Due date cannot be earlier than current date';
      }
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

    toast.success('Task created successfully!');
    navigate('/admin/tasks');
  };

  const handleCancel = () => {
    navigate('/admin/tasks');
  };

  return (
    <AdminLayout>
      <AdminForm
        title="Create Task"
        description="Create a new task for staff assignment"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save Task"
        validationErrors={validationErrors}
      />
    </AdminLayout>
  );
}
