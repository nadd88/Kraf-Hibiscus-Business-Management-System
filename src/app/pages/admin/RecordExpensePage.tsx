import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminForm } from '../../components/admin/AdminForm';
import { expenseCategories } from '../../data/adminData';
import { toast } from 'sonner';

export function RecordExpensePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    expenseDate: new Date().toISOString().split('T')[0],
    expenseCategory: '',
    amount: '',
    paymentMethod: '',
    description: '',
    relatedReference: '',
  });

  const fields = [
    {
      name: 'expenseDate',
      label: 'Expense Date',
      type: 'date' as const,
      required: true,
    },
    {
      name: 'expenseCategory',
      label: 'Expense Category',
      type: 'select' as const,
      required: true,
      options: expenseCategories.map((cat) => ({ label: cat, value: cat })),
    },
    {
      name: 'amount',
      label: 'Amount (RM)',
      type: 'number' as const,
      placeholder: '0.00',
      required: true,
    },
    {
      name: 'paymentMethod',
      label: 'Payment Method',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'Cash', value: 'Cash' },
        { label: 'Bank Transfer', value: 'Bank Transfer' },
        { label: 'Credit Card', value: 'Credit Card' },
        { label: 'E-wallet', value: 'E-wallet' },
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Enter expense description',
      rows: 4,
      required: true,
    },
    {
      name: 'relatedReference',
      label: 'Related Supplier/Item (Optional)',
      type: 'text' as const,
      placeholder: 'e.g., SUP-001 or MAT-001',
    },
  ];

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Expense record saved successfully!');
    navigate('/admin/financial');
  };

  const handleCancel = () => {
    navigate('/admin/financial');
  };

  return (
    <AdminLayout>
      <AdminForm
        title="Record Expense"
        description="Record a new expense transaction"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save Expense Record"
      />
    </AdminLayout>
  );
}
