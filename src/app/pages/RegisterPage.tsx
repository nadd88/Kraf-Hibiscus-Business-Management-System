import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { fullName, email, phone, address, password, confirmPassword } = formData;
    if (!fullName || !email || !phone || !address || !password || !confirmPassword) {
      setError('Please complete all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    register({ fullName, email, phone, address });
    toast.success('Account registered successfully.');
    navigate('/my-profile');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 border border-[#E8D8C8] shadow-lg">
          <div className="text-center mb-8">
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-2">
              Create Account
            </h1>
            <p className="text-[#6B5F5F]">Join Kraf Hibiscus today</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                  placeholder="Sarah Ahmad"
                />
              </div>
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#3B2F2F] mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                placeholder="+60 12-345 6789"
              />
            </div>

            <div>
              <label className="block text-sm text-[#3B2F2F] mb-2">Delivery Address *</label>
              <p className="text-xs text-[#9B8B8B] mb-2">
                Enter your own home or delivery address (not the shop address).
              </p>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] resize-none"
                placeholder="e.g. No. 12, Jalan Meranti 3, Taman Universiti, 81300 Skudai, Johor"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block text-sm text-[#3B2F2F] mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6B5F5F]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#C76B83] hover:text-[#EFA3B7]">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
