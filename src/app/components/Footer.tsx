import { Link } from 'react-router';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E8D8C8] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <h3 className="font-['Playfair_Display'] text-xl text-[#C76B83] tracking-wide">
                KRAF HIBISCUS
              </h3>
              <p className="text-[10px] text-[#9B8B8B] tracking-widest uppercase">Timeless & Handmade</p>
            </div>
            <p className="text-[#6B5F5F] mb-4">
              Transforming recycled fabrics into handmade items while supporting
              community-based sustainability activities.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-[#3B2F2F] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-[#6B5F5F] hover:text-[#C76B83] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-[#6B5F5F] hover:text-[#C76B83] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#6B5F5F] hover:text-[#C76B83] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders"
                  className="text-[#6B5F5F] hover:text-[#C76B83] transition-colors"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[#3B2F2F] mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-[#6B5F5F]">
                <Mail className="w-4 h-4 mr-2 mt-0.5 text-[#EFA3B7] flex-shrink-0" />
                <span>krafhibiscus@gmail.com</span>
              </li>
              <li className="flex items-start text-[#6B5F5F]">
                <Phone className="w-4 h-4 mr-2 mt-0.5 text-[#EFA3B7] flex-shrink-0" />
                <div>
                  <div>+60 13-754 8950 <span className="text-xs text-[#9B8B8B]">(Puan Fhairna)</span></div>
                  <div>+60 19-734 3239 <span className="text-xs text-[#9B8B8B]">(Puan Sheila)</span></div>
                </div>
              </li>
              <li className="flex items-start text-[#6B5F5F]">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-[#EFA3B7] flex-shrink-0" />
                <span>Kabin Kraf Hibiscus, Jalan PI 4/14, Taman Pulai Indah, 81300 Skudai, Johor, Malaysia</span>
              </li>
              <li className="flex items-start text-[#6B5F5F]">
                <Clock className="w-4 h-4 mr-2 mt-0.5 text-[#EFA3B7] flex-shrink-0" />
                <span>Mon – Sat, 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#E8D8C8] flex justify-between items-center">
          <p className="text-[#6B5F5F] text-sm">
            &copy; 2026 Kraf Hibiscus. All rights reserved.
          </p>
          <Link
            to="/admin-login"
            className="text-sm text-[#6B5F5F] hover:text-[#C76B83] transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}