import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Product,
  Plan,
  Subscription,
  Entitlement,
  ProductId
} from '../types';
import {
  fetchMe,
  loginUser,
  registerUser,
  fetchProducts,
  fetchPlans,
  fetchUserSubscriptions
} from '../lib/api';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

interface AppContextType {
  user: User | null;
  token: string | null;
  products: Product[];
  plans: Plan[];
  subscriptions: Subscription[];
  entitlements: Entitlement[];
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; country?: string }) => Promise<void>;
  logout: () => void;
  refreshSubscriptions: () => Promise<void>;
  hasEntitlement: (productId: ProductId) => boolean;
  toasts: ToastMessage[];
  addToast: (msg: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const DEFAULT_USER: User = {
    id: 'usr_admin_999',
    name: 'المتداول الفائق (Pro Admin)',
    email: 'admin@ahstore.com',
    role: 'super_admin',
    country: 'International',
    twoFactorEnabled: true,
    createdAt: '2025-01-01T00:00:00Z',
    lastLogin: new Date().toISOString()
  };

  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ah_token') || 'token_open_access');
  const [products, setProducts] = useState<Product[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  const setTheme = (t: 'dark' | 'light') => {
    setThemeState(t);
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const addToast = (msg: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const toastItem = { ...msg, id };
    setToasts(prev => [...prev, toastItem]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const refreshSubscriptions = async () => {
    if (!user) return;
    try {
      const res = await fetchUserSubscriptions(user.id);
      setSubscriptions(res.subscriptions);
      setEntitlements(res.entitlements);
    } catch (err) {
      console.error('Error refreshing subscriptions', err);
    }
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');

    const initData = async () => {
      setIsLoading(true);
      try {
        const [prodRes, planRes] = await Promise.all([fetchProducts(), fetchPlans()]);
        setProducts(prodRes.products);
        setPlans(planRes.plans);

        // Fetch current logged in user (defaults to demo user)
        const meRes = await fetchMe(token || undefined);
        setUser(meRes.user);

        if (meRes.user) {
          const subRes = await fetchUserSubscriptions(meRes.user.id);
          setSubscriptions(subRes.subscriptions);
          setEntitlements(subRes.entitlements);
        }
      } catch (err) {
        console.error('Initialization error', err);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, [token]);

  const login = async (email: string, pass: string) => {
    const res = await loginUser(email, pass);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('ah_token', res.token);
    addToast({ title: 'Welcome back', description: `Signed in as ${res.user.name}`, type: 'success' });
    const subRes = await fetchUserSubscriptions(res.user.id);
    setSubscriptions(subRes.subscriptions);
    setEntitlements(subRes.entitlements);
  };

  const register = async (data: { name: string; email: string; password: string; country?: string }) => {
    const res = await registerUser(data);
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('ah_token', res.token);
    addToast({ title: 'Account Created', description: 'Welcome to AH HUB', type: 'success' });
    const subRes = await fetchUserSubscriptions(res.user.id);
    setSubscriptions(subRes.subscriptions);
    setEntitlements(subRes.entitlements);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setSubscriptions([]);
    setEntitlements([]);
    localStorage.removeItem('ah_token');
    addToast({ title: 'Signed Out', description: 'You have been safely signed out.', type: 'info' });
  };

  const hasEntitlement = (_productId: ProductId) => {
    return true; // Open access system for all Quotex bots
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        products,
        plans,
        subscriptions,
        entitlements,
        theme,
        setTheme,
        isLoading,
        login,
        register,
        logout,
        refreshSubscriptions,
        hasEntitlement,
        toasts,
        addToast,
        removeToast,
        isCommandPaletteOpen,
        setCommandPaletteOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
