import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminForm } from '../../components/admin/AdminForm';
import { toast } from 'sonner';

export function AddInventoryPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });

  const fields = [
    {
      name: 'productName',
      label: 'Product Name',
      type: 'text' as const,
      placeholder: 'Enter product name',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      required: true,
      options: [
        { label: 'Scrunchies', value: 'scrunchies' },
        { label: 'Bags', value: 'bags' },
        { label: 'Purses', value: 'purses' },
        { label: 'Fabric Crafts', value: 'crafts' },
      ],
    },
    {
      name: 'price',
      label: 'Price (RM)',
      type: 'number' as const,
      placeholder: '0.00',
      required: true,
    },
    {
      name: 'stock',
      label: 'Stock Quantity',
      type: 'number' as const,
      placeholder: '0',
      required: true,
    },
    {
      name: 'description',
      label: 'Product Description',
      type: 'textarea' as const,
      placeholder: 'Enter product description',
      required: true,
      rows: 4,
    },
  ];

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Product added successfully!');
    navigate('/admin/inventory');
  };

  const handleCancel = () => {
    navigate('/admin/inventory');
  };

  return (
    <AdminLayout>
      <AdminForm
        title="Add New Product"
        description="Add a new product to your inventory"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Add Product"
      />
    </AdminLayout>
  );
}
