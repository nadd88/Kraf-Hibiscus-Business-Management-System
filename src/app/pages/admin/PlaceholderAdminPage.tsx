import { AdminLayout } from '../../components/admin/AdminLayout';
import { Package } from 'lucide-react';

interface PlaceholderAdminPageProps {
  title: string;
  description: string;
}

export function PlaceholderAdminPage({ title, description }: PlaceholderAdminPageProps) {
  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F5EDE3] rounded-full mb-6">
            <Package className="w-10 h-10 text-[#EFA3B7]" />
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-3">
            {title}
          </h1>
          <p className="text-[#6B5F5F] mb-8 max-w-md">{description}</p>
          <p className="text-sm text-[#6B5F5F]">This module is coming soon.</p>
        </div>
      </div>
    </AdminLayout>
  );
}
