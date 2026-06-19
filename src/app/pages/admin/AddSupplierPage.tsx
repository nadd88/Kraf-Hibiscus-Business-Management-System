import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminForm } from '../../components/admin/AdminForm';
import { toast } from 'sonner';

export function AddSupplierPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplierName: '',
    contact: '',
    email: '',
    address: '',
    suppliedMaterials: '',
    status: 'Active',
  });

  const fields = [
    {
      name: 'supplierName',
      label: 'Supplier Name',
      type: 'text' as const,
      placeholder: 'Enter supplier name',
      required: true,
    },
    {
      name: 'contact',
      label: 'Contact Number',
      type: 'tel' as const,
      placeholder: '+60 3-1234 5678',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      placeholder: 'supplier@example.com',
      required: true,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea' as const,
      placeholder: 'Enter supplier address',
      rows: 3,
      required: true,
    },
    {
      name: 'suppliedMaterials',
      label: 'Supplied Materials',
      type: 'text' as const,
      placeholder: 'e.g., Cotton, Denim, Silk',
      required: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
      ],
    },
  ];

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Supplier added successfully!');
    navigate('/admin/suppliers');
  };

  const handleCancel = () => {
    navigate('/admin/suppliers');
  };

  return (
    <AdminLayout>
      <AdminForm
        title="Add Supplier"
        description="Add a new supplier to the system"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save Supplier"
      />
    </AdminLayout>
  );
}
