import { useState } from 'react';
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending reset email
    toast.success('Password reset link sent to your email!');
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Navbar />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/login"
          className="inline-flex items-center text-[#6B5F5F] hover:text-[#C76B83] mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <div className="bg-white rounded-2xl p-8 border border-[#E8D8C8]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EFA3B7] rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl text-[#3B2F2F] mb-2">
              Forgot Password?
            </h1>
            <p className="text-[#6B5F5F]">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm text-[#3B2F2F] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7]"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#EFA3B7] text-[#3B2F2F] rounded-lg hover:bg-[#C76B83] hover:text-white transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="bg-[#FFF8F0] rounded-lg p-6 border border-[#E8D8C8] mb-6">
                <p className="text-[#3B2F2F] mb-2">
                  Check your email!
                </p>
                <p className="text-sm text-[#6B5F5F]">
                  We've sent a password reset link to <strong>{email}</strong>.
                  Please check your inbox and follow the instructions to reset your password.
                </p>
              </div>
              <p className="text-sm text-[#6B5F5F] mb-4">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#C76B83] hover:underline"
                >
                  try again
                </button>
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-[#C76B83] hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
