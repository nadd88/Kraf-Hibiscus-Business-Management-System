import { useParams, useNavigate, Link } from 'react-router';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mockCustomers } from '../../data/adminData';
import { ArrowLeft, Edit } from 'lucide-react';

export function CustomerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = mockCustomers.find((c) => c.id === id);

  // Mock recent orders for this customer
  const recentOrders = [
    {
      id: 'ORD-1001',
      date: '2026-05-20',
      total: 45.0,
      status: 'Processing',
    },
    {
      id: 'ORD-0998',
      date: '2026-05-15',
      total: 65.0,
      status: 'Delivered',
    },
    {
      id: 'ORD-0975',
      date: '2026-05-10',
      total: 28.0,
      status: 'Delivered',
    },
  ];

  if (!customer) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-[#6B5F5F]">Customer not found</p>
          <Link to="/admin/customers" className="text-[#C76B83] hover:text-[#EFA3B7] mt-4 inline-block">
            Back to Customer List
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'Processing': 'bg-[#E8A87C] text-white',
      'Shipped': 'bg-[#EFA3B7] text-white',
      'Delivered': 'bg-[#8FBF9F] text-white',
      'Cancelled': 'bg-[#C94C4C] text-white',
    };
    return colorMap[status] || 'bg-[#6B5F5F] text-white';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <Link
              to="/admin/customers"
              className="inline-flex items-center text-[#6B5F5F] hover:text-[#C76B83] mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Customer List
            </Link>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-2">
              Customer Details
            </h1>
          </div>
          <button
            onClick={() => navigate(`/admin/customers/edit/${id}`)}
            className="px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Customer
          </button>
        </div>

        {/* Customer Profile Card */}
        <div className="bg-white rounded-xl p-8 border border-[#E8D8C8]">
          <h2 className="text-xl text-[#3B2F2F] mb-6">Customer Profile</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Customer ID</p>
              <p className="text-[#3B2F2F]">{customer.id}</p>
            </div>
            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Full Name</p>
              <p className="text-[#3B2F2F] text-lg">{customer.name}</p>
            </div>
            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Email</p>
              <p className="text-[#3B2F2F]">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Phone Number</p>
              <p className="text-[#3B2F2F]">{customer.phone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-[#6B5F5F] mb-1">Address</p>
              <p className="text-[#3B2F2F]">{customer.address}</p>
            </div>
            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Registration Date</p>
              <p className="text-[#3B2F2F]">{customer.registrationDate}</p>
            </div>
            <div>
              <p className="text-sm text-[#6B5F5F] mb-1">Account Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs ${
                  customer.status === 'Active' ? 'bg-[#8FBF9F]' : 'bg-[#C8C8C8]'
                } text-white`}
              >
                {customer.status}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-[#E8D8C8]">
          <div className="p-6 border-b border-[#E8D8C8]">
            <h2 className="text-xl text-[#3B2F2F]">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FFF8F0]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-[#3B2F2F]">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm text-[#3B2F2F]">Date</th>
                  <th className="px-6 py-3 text-left text-sm text-[#3B2F2F]">Total</th>
                  <th className="px-6 py-3 text-left text-sm text-[#3B2F2F]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D8C8]">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FFF8F0]">
                    <td className="px-6 py-4 text-sm text-[#3B2F2F]">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-[#6B5F5F]">{order.date}</td>
                    <td className="px-6 py-4 text-sm text-[#3B2F2F]">RM {order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
