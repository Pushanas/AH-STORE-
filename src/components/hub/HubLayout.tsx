import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LOGOS } from '../../lib/logos';
import { RechargeModal } from '../ui/RechargeModal';
import {
  LayoutDashboard,
  Zap,
  Cpu,
  ShieldAlert,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  Lock,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Command,
  Sun,
  Moon,
  ShieldCheck,
  UserCheck,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  Wallet
} from 'lucide-react';

interface HubLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

export const HubLayout: React.FC<HubLayoutProps> = ({ children, activeTab = 'overview' }) => {
  const { user, logout, theme, setTheme, setCommandPaletteOpen, entitlements } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

  const navigateTo = (path: string) => {
    window.location.hash = path;
    setMobileOpen(false);
  };

  const hasSignals = entitlements.some(e => e.productId === 'vip-signals' && e.active);
  const hasAi = entitlements.some(e => e.productId === 'ai-analyzer' && e.active);
  const hasTrader = entitlements.some(e => e.productId === 'auto-trader' && e.active);

  const navItems = [
    { id: 'overview', label: 'الرئيسية (Command Center)', icon: <LayoutDashboard className="w-4 h-4" />, path: '#/hub' },
    { id: 'vip-signals', label: 'بوت زمني (Quotex)', icon: <Zap className="w-4 h-4 text-blue-400" />, path: '#/hub/products/vip-signals', badge: hasSignals ? 'Active' : 'Upgrade' },
    { id: 'ai-analyzer', label: 'بوت تحليل فني عالمي', icon: <Cpu className="w-4 h-4 text-violet-400" />, path: '#/hub/products/ai-analyzer', badge: hasAi ? 'Active' : 'Upgrade' },
    { id: 'auto-trader', label: 'بوت تحليل شارت OTC', icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />, path: '#/hub/products/auto-trader', badge: hasTrader ? 'Active' : 'Upgrade' },
    { id: 'billing', label: 'الاشتراكات والفلترة', icon: <CreditCard className="w-4 h-4 text-amber-400" />, path: '#/hub/billing' },
    { id: 'notifications', label: 'التنبيهات الفورية', icon: <Bell className="w-4 h-4 text-indigo-400" />, path: '#/hub/notifications' },
    { id: 'support', label: 'الدعم الفني', icon: <HelpCircle className="w-4 h-4 text-rose-400" />, path: '#/hub/support' },
    { id: 'settings', label: 'الإعدادات والأمان', icon: <Settings className="w-4 h-4 text-slate-400" />, path: '#/hub/settings' }
  ];

  if (user && (user.role === 'admin' || user.role === 'super_admin')) {
    navItems.push({
      id: 'admin',
      label: 'Admin Control',
      icon: <ShieldCheck className="w-4 h-4 text-rose-400" />,
      path: '#/admin',
      badge: 'Admin'
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row font-sans">
      {/* Sidebar Desktop */}
      <aside
        className={`hidden md:flex flex-col justify-between bg-slate-950 border-r border-slate-800/60 transition-all duration-300 relative z-20 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Logo & Toggle */}
          <div className="flex items-center justify-between">
            <button onClick={() => navigateTo('#/')} className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                <img
                  src={LOGOS.ahStore}
                  alt="AH Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              {!collapsed && (
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">AH HUB</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/10 text-blue-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card at bottom */}
        <div className="p-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm text-white shrink-0">
                {user?.name.charAt(0) || 'U'}
              </div>
              {!collapsed && (
                <div className="truncate text-left">
                  <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
                  <div className="text-xs text-slate-400 truncate">{user?.email}</div>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={logout}
                className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Container Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-slate-800/60 bg-slate-950 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <span>Welcome back, {user?.name.split(' ')[0] || 'Member'}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Recharge Balance Button */}
            <button
              onClick={() => setIsRechargeModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors whitespace-nowrap"
            >
              <Wallet className="w-4 h-4" />
              <span>شحن رصيد +</span>
            </button>

            {/* Public Store Link */}
            <button
              onClick={() => navigateTo('#/')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              title="Return to Public Store"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Workspace Content View */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
      />
    </div>
  );
};
