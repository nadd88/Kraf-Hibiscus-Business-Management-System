import { createContext, useContext, useState, ReactNode } from 'react';

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  registeredDate: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  customer: CustomerProfile | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: RegisterData) => void;
  updateProfile: (data: Partial<CustomerProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SARAH_AHMAD: CustomerProfile = {
  id: 'CUST-001',
  fullName: 'Sarah Ahmad',
  email: 'sarah.ahmad@example.com',
  phone: '+60 12-345 6789',
  address: 'No. 12, Jalan Meranti 3, Taman Universiti, 81300 Skudai, Johor, Malaysia',
  status: 'Active',
  registeredDate: '2026/01/15',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [registeredCustomers, setRegisteredCustomers] = useState<Map<string, CustomerProfile>>(
    new Map([['sarah.ahmad@example.com', SARAH_AHMAD]])
  );

  const login = (email: string, password: string): boolean => {
    if (!email.trim() || !password.trim()) return false;
    const profile = registeredCustomers.get(email) ?? {
      id: `CUST-${Date.now()}`,
      fullName: email.split('@')[0],
      email,
      phone: '',
      address: '',
      status: 'Active',
      registeredDate: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
    };
    setCustomer(profile);
    return true;
  };

  const logout = () => setCustomer(null);

  const register = (data: RegisterData) => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
    const profile: CustomerProfile = {
      id: `CUST-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      status: 'Active',
      registeredDate: today,
    };
    setRegisteredCustomers((prev) => new Map(prev).set(data.email, profile));
    setCustomer(profile);
  };

  const updateProfile = (data: Partial<CustomerProfile>) => {
    if (!customer) return;
    const updated = { ...customer, ...data };
    setCustomer(updated);
    setRegisteredCustomers((prev) => new Map(prev).set(updated.email, updated));
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: customer !== null, customer, login, logout, register, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
