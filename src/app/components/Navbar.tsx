import { Link, useNavigate } from 'react-router';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { cart } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-[#E8D8C8] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand + main nav */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex flex-col leading-tight">
                <span className="font-['Playfair_Display'] text-2xl text-[#C76B83] tracking-wide">
                  KRAF HIBISCUS
                </span>
                <span className="text-[10px] text-[#6B5F5F] tracking-widest uppercase">
                  Timeless &amp; Handmade
                </span>
              </div>
            </Link>

            <div className="hidden md:flex space-x-5">
              <Link to="/" className="text-[#3B2F2F] hover:text-[#C76B83] transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-[#3B2F2F] hover:text-[#C76B83] transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-[#3B2F2F] hover:text-[#C76B83] transition-colors">
                About
              </Link>
              <Link to="/community" className="text-[#3B2F2F] hover:text-[#C76B83] transition-colors">
                Community Recycling
              </Link>
              <Link to="/contact" className="text-[#3B2F2F] hover:text-[#C76B83] transition-colors">
                Contact
              </Link>

              {/* Shown only when logged in */}
              {isLoggedIn && (
                <>
                  <Link to="/my-orders" className="text-[#3B2F2F] hover:text-[#C76B83] transition-colors">
                    My Orders
                  </Link>
                  <Link to="/my-profile" className="text-[#3B2F2F] hover:text-[#C76B83] transition-colors">
                    My Profile
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right-side actions */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 text-[#6B5F5F] hover:text-[#C76B83] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-[#3B2F2F] hover:text-[#C76B83] transition-colors"
              >
                Login
              </Link>
            )}

            <Link
              to="/products"
              className="px-6 py-2 bg-[#EFA3B7] text-[#3B2F2F] rounded-full hover:bg-[#C76B83] hover:text-white transition-colors"
            >
              Shop Now
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-[#3B2F2F] hover:text-[#C76B83] transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C76B83] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}