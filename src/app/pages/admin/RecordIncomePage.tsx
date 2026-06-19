import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminForm } from '../../components/admin/AdminForm';
import { incomeCategories } from '../../data/adminData';
import { toast } from 'sonner';

export function RecordIncomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    incomeDate: new Date().toISOString().split('T')[0],
    incomeCategory: '',
    relatedOrderId: '',
    amount: '',
    paymentMethod: '',
    description: '',
  });

  const fields = [
    {
      name: 'incomeDate',
      label: 'Income Date',
      type: 'date' as const,
      required: true,
    },
    {
      name: 'incomeCategory',
      label: 'Income Category',
      type: 'select' as const,
      required: true,
      options: incomeCategories.map((cat) => ({ label: cat, value: cat })),
    },
    {
      name: 'relatedOrderId',
      label: 'Related Order ID (Optional)',
      type: 'text' as const,
      placeholder: 'e.g., ORD-1001',
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
        { label: 'Online Transfer', value: 'Online Transfer' },
        { label: 'E-wallet', value: 'E-wallet' },
        { label: 'Cash', value: 'Cash' },
        { label: 'Bank Transfer', value: 'Bank Transfer' },
      ],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Enter income description',
      rows: 4,
      required: true,
    },
  ];

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Income record saved successfully!');
    navigate('/admin/financial');
  };

  const handleCancel = () => {
    navigate('/admin/financial');
  };

  return (
    <AdminLayout>
      <AdminForm
        title="Record Income"
        description="Record a new income transaction"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save Income Record"
      />
    </AdminLayout>
  );
}
