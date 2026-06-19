import { Search, Bell, User, ChevronDown, Settings, LogOut, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

const MOCK_SEARCH_DATA = [
  { type: 'Order', label: 'ORD-1001 — Sarah Ahmad', path: '/admin/orders' },
  { type: 'Order', label: 'ORD-1002 — Ahmad Razif', path: '/admin/orders' },
  { type: 'Order', label: 'ORD-1003 — Nurul Ain Hassan', path: '/admin/orders' },
  { type: 'Order', label: 'ORD-1004 — Tan Wei Liang', path: '/admin/orders' },
  { type: 'Order', label: 'ORD-1005 — Priya Nair', path: '/admin/orders' },
  { type: 'Order', label: 'ORD-1006 — Lim Mei Ling', path: '/admin/orders' },
  { type: 'Customer', label: 'Sarah Ahmad', path: '/admin/customers' },
  { type: 'Customer', label: 'Ahmad Razif bin Osman', path: '/admin/customers' },
  { type: 'Customer', label: 'Nurul Ain Binti Hassan', path: '/admin/customers' },
  { type: 'Customer', label: 'Tan Wei Liang', path: '/admin/customers' },
  { type: 'Customer', label: 'Priya Nair', path: '/admin/customers' },
  { type: 'Product', label: 'Floral Scrunchie Set — P001', path: '/admin/inventory' },
  { type: 'Product', label: 'Batik Tote Bag — P002', path: '/admin/inventory' },
  { type: 'Product', label: 'Crossbody Bag — P003', path: '/admin/inventory' },
  { type: 'Product', label: 'Mini Coin Purse — P004', path: '/admin/inventory' },
  { type: 'Product', label: 'Quilted Fabric Pouch — P005', path: '/admin/inventory' },
  { type: 'Staff', label: 'Fatimah Zahra — Artisan', path: '/admin/staff' },
  { type: 'Staff', label: 'Rosnah Binti Ali — Senior Artisan', path: '/admin/staff' },
  { type: 'Staff', label: 'Siti Norzahira — Artisan', path: '/admin/staff' },
  { type: 'Task', label: 'TSK-001 — Produce Scrunchie Batch', path: '/admin/tasks' },
  { type: 'Task', label: 'TSK-002 — Prepare Tote Bag Order', path: '/admin/tasks' },
  { type: 'Task', label: 'TSK-003 — Fabric Sorting Session', path: '/admin/tasks' },
  { type: 'Payment', label: 'PAY-001 — ORD-1001 — RM 45.00 — Verified', path: '/admin/payments' },
  { type: 'Payment', label: 'PAY-002 — ORD-1002 — RM 85.00 — Verified', path: '/admin/payments' },
  { type: 'Payment', label: 'PAY-003 — ORD-1003 — RM 60.00 — Pending', path: '/admin/payments' },
  { type: 'Supplier', label: 'Kedai Kain Mutiara — Fabric Supplier', path: '/admin/suppliers' },
  { type: 'Supplier', label: 'EcoThread Sdn Bhd — Recycled Materials', path: '/admin/suppliers' },
];

const NOTIFICATIONS = [
  { id: 1, text: 'New order ORD-1006 received', time: '2 min ago', path: '/admin/orders', unread: true },
  { id: 2, text: 'Payment PAY-003 is pending verification', time: '15 min ago', path: '/admin/payments', unread: true },
  { id: 3, text: 'Low stock: Crossbody Bag', time: '1 hour ago', path: '/admin/inventory', unread: true },
  { id: 4, text: 'Task TSK-002 is due soon', time: '3 hours ago', path: '/admin/tasks', unread: false },
];

export function AdminHeader() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim().length > 0
    ? MOCK_SEARCH_DATA.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowProfile(false);
    navigate('/admin-login');
  };

  return (
    <header className="bg-white border-b border-[#E8D8C8] sticky top-0 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5F5F]" />
            <input
              type="text"
              placeholder="Search orders, customers, products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-[#FFF8F0] border border-[#E8D8C8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EFA3B7] text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5F5F] hover:text-[#3B2F2F]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8D8C8] rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-[#6B5F5F]">
                  No matching records found.
                </div>
              ) : (
                searchResults.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setSearchQuery('')}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFF8F0] transition-colors border-b border-[#E8D8C8] last:border-0"
                  >
                    <span className="text-xs px-2 py-0.5 bg-[#F5EDE3] text-[#C76B83] rounded-full shrink-0">
                      {item.type}
                    </span>
                    <span className="text-sm text-[#3B2F2F] truncate">{item.label}</span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 ml-6">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative p-2 text-[#6B5F5F] hover:bg-[#FFF8F0] rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C94C4C] rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[#E8D8C8] rounded-xl shadow-lg z-50">
                <div className="px-4 py-3 border-b border-[#E8D8C8] flex justify-between items-center">
                  <p className="text-sm text-[#3B2F2F]">Notifications</p>
                  <span className="text-xs bg-[#EFA3B7] text-white px-2 py-0.5 rounded-full">
                    3 new
                  </span>
                </div>
                {NOTIFICATIONS.map((notif) => (
                  <Link
                    key={notif.id}
                    to={notif.path}
                    onClick={() => setShowNotifications(false)}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-[#FFF8F0] transition-colors border-b border-[#E8D8C8] last:border-0 ${
                      notif.unread ? 'bg-[#FFFAF5]' : ''
                    }`}
                  >
                    <div
                      className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${
                        notif.unread ? 'bg-[#C76B83]' : 'bg-[#E8D8C8]'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#3B2F2F] leading-snug">{notif.text}</p>
                      <p className="text-xs text-[#9B8B8B] mt-0.5">{notif.time}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Admin Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-3 px-3 py-2 hover:bg-[#FFF8F0] rounded-lg cursor-pointer transition-colors"
            >
              <div className="w-9 h-9 bg-[#EFA3B7] rounded-full flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm text-[#3B2F2F] leading-none mb-0.5">Admin User</p>
                <p className="text-xs text-[#6B5F5F]">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-[#6B5F5F] hidden md:block" />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E8D8C8] rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 bg-[#FFF8F0] border-b border-[#E8D8C8]">
                  <p className="text-sm text-[#3B2F2F]">Admin User</p>
                  <p className="text-xs text-[#6B5F5F]">admin@krafhibiscus.com</p>
                </div>
                <Link
                  to="/admin/profile"
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[#6B5F5F] hover:bg-[#FFF8F0] hover:text-[#3B2F2F] transition-colors"
                >
                  <User className="w-4 h-4" />
                  Admin Profile
                </Link>
                <Link
                  to="/admin/settings"
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[#6B5F5F] hover:bg-[#FFF8F0] hover:text-[#3B2F2F] transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <div className="border-t border-[#E8D8C8]">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-[#C94C4C] hover:bg-[#FFF8F0] transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
