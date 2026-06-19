import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectMessage = (location.state as any)?.message as string | undefined;

  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = login(formData.email, formData.password);
    if (!ok) {
      setError('Please enter your email and password.');
      return;
    }
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 border border-[#E8D8C8] shadow-lg">
          <div className="text-center mb-8">
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#6B5F5F]">Login to your account</p>
          </div>

          {redirectMessage && (
            <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm text-center">
              {redirectMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-[#3B2F2F] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                placeholder="your@email.com"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-[#6B5F5F]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#C76B83] hover:text-[#EFA3B7]">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6B5F5F]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#C76B83] hover:text-[#EFA3B7]">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
