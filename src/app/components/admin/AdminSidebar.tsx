import { Link, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  CreditCard,
  Package,
  Layers,
  Truck,
  UserCheck,
  CheckSquare,
  Award,
  DollarSign,
  Recycle,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { path: '/admin/customers', label: 'Customers', icon: Users },
  { path: '/admin/payments', label: 'Payments', icon: CreditCard },
  { path: '/admin/inventory', label: 'Product Inventory', icon: Package },
  { path: '/admin/materials', label: 'Material Inventory', icon: Layers },
  { path: '/admin/suppliers', label: 'Suppliers', icon: Truck },
  { path: '/admin/staff', label: 'Staff Management', icon: UserCheck },
  { path: '/admin/tasks', label: 'Task Management', icon: CheckSquare },
  { path: '/admin/contribution', label: 'Staff Contribution', icon: Award },
  { path: '/admin/financial', label: 'Financial Records', icon: DollarSign },
  { path: '/admin/community', label: 'Community Activities', icon: Recycle },
  { path: '/admin/reports', label: 'Reports', icon: BarChart2 },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const handleLogout = () => navigate('/admin-login');

  return (
    <div
      className="relative flex flex-col bg-white border-r border-[#E8D8C8] h-screen sticky top-0 shrink-0 transition-[width] duration-300 ease-in-out"
      style={{ width: collapsed ? '80px' : '260px' }}
    >
      {/* Header: logo + toggle */}
      <div className="border-b border-[#E8D8C8] shrink-0" style={{ height: '72px' }}>
        {collapsed ? (
          /* Compact header */
          <div className="flex flex-col items-center justify-center h-full gap-1 pt-1">
            <Link to="/admin/dashboard">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EFA3B7] to-[#C76B83] flex items-center justify-center shadow-sm">
                <span
                  className="text-white font-bold leading-none select-none"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px' }}
                >
                  KH
                </span>
              </div>
            </Link>
            <button
              onClick={onToggle}
              aria-label="Expand sidebar"
              className="w-6 h-6 rounded-full flex items-center justify-center text-[#9B8B8B] hover:text-[#C76B83] hover:bg-[#F5EDE3] transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Expanded header */
          <div className="flex items-center justify-between px-5 h-full">
            <Link to="/admin/dashboard" className="min-w-0">
              <span
                className="text-[#3B2F2F] font-bold text-lg leading-tight block truncate"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                KRAF HIBISCUS
              </span>
              <p className="text-[10px] text-[#9B8B8B] tracking-widest uppercase mt-0.5">
                Admin Panel
              </p>
            </Link>
            <button
              onClick={onToggle}
              aria-label="Collapse sidebar"
              className="w-7 h-7 rounded-full border border-[#E8D8C8] flex items-center justify-center shrink-0 ml-2 text-[#9B8B8B] hover:text-[#C76B83] hover:bg-[#F5EDE3] hover:border-[#EFA3B7] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-2">
        {collapsed
          ? menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={`relative flex items-center justify-center mx-2 my-0.5 rounded-lg transition-colors`}
                      style={{ padding: '10px' }}
                    >
                      {/* Active left accent */}
                      {active && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-[#C76B83]"
                          style={{ height: '28px' }}
                        />
                      )}
                      <span
                        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                          active
                            ? 'bg-[#F5EDE3] text-[#C76B83]'
                            : 'text-[#7A6A6A] hover:bg-[#FFF8F0] hover:text-[#3B2F2F]'
                        }`}
                      >
                        <Icon className="w-[18px] h-[18px] shrink-0" />
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    <span className="text-xs font-medium">{item.label}</span>
                  </TooltipContent>
                </Tooltip>
              );
            })
          : menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center mx-2 my-0.5 rounded-lg transition-colors text-sm ${
                    active
                      ? 'bg-[#F5EDE3] text-[#C76B83]'
                      : 'text-[#7A6A6A] hover:bg-[#FFF8F0] hover:text-[#3B2F2F]'
                  }`}
                  style={{ padding: '9px 14px' }}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-[#C76B83]"
                      style={{ height: '28px' }}
                    />
                  )}
                  <Icon className="w-[16px] h-[16px] mr-3 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#E8D8C8] p-2 shrink-0">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full rounded-lg text-[#7A6A6A] hover:bg-[#FFF8F0] hover:text-[#C94C4C] transition-colors"
                style={{ padding: '10px' }}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-[#FFF8F0]">
                  <LogOut className="w-[18px] h-[18px] shrink-0" />
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              <span className="text-xs font-medium">Logout</span>
            </TooltipContent>
          </Tooltip>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center w-full rounded-lg text-sm text-[#7A6A6A] hover:bg-[#FFF8F0] hover:text-[#C94C4C] transition-colors"
            style={{ padding: '9px 14px' }}
          >
            <LogOut className="w-[16px] h-[16px] mr-3 shrink-0" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
