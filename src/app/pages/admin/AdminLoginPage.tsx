import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-[#6B5F5F] hover:text-[#C76B83] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Homepage
        </Link>

        <div className="bg-white rounded-2xl p-8 border border-[#E8D8C8] shadow-lg">
          <div className="text-center mb-8">
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-2">
              Kraf Hibiscus
            </h1>
            <p className="text-xl text-[#6B5F5F]">Admin Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-[#3B2F2F] mb-2">Admin Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                placeholder="admin@krafthibiscus.com"
              />
            </div>

            <div>
              <label className="block text-sm text-[#3B2F2F] mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
            >
              Login to Admin Panel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
