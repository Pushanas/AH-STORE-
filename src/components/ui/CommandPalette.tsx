import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Search, Zap, Cpu, ShieldAlert, CreditCard, Shield, HelpCircle, FileText, LayoutDashboard, Settings, User, X, ArrowRight, Sun, Moon } from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: 'Products' | 'AH HUB' | 'Navigation' | 'Actions';
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen, theme, setTheme, user } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (path: string) => {
    window.location.hash = path;
    setCommandPaletteOpen(false);
  };

  const commands: CommandItem[] = [
    {
      id: 'prod-signals',
      title: 'AH VIP Signals (Public Page)',
      category: 'Products',
      icon: <Zap className="w-4 h-4 text-blue-400" />,
      action: () => navigateTo('#/products/ah-vip-signals')
    },
    {
      id: 'prod-ai',
      title: 'AH AI Analyzer (Public Page)',
      category: 'Products',
      icon: <Cpu className="w-4 h-4 text-violet-400" />,
      action: () => navigateTo('#/products/ah-ai-analyzer')
    },
    {
      id: 'prod-trader',
      title: 'AH Auto Trader (Public Page)',
      category: 'Products',
      icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />,
      action: () => navigateTo('#/products/ah-auto-trader')
    },
    {
      id: 'hub-overview',
      title: 'AH HUB Command Center',
      category: 'AH HUB',
      icon: <LayoutDashboard className="w-4 h-4 text-blue-400" />,
      action: () => navigateTo('#/hub')
    },
    {
      id: 'hub-signals-ws',
      title: 'VIP Signals Workspace',
      category: 'AH HUB',
      icon: <Zap className="w-4 h-4 text-blue-400" />,
      action: () => navigateTo('#/hub/products/vip-signals')
    },
    {
      id: 'hub-ai-ws',
      title: 'AI Analyzer Workspace',
      category: 'AH HUB',
      icon: <Cpu className="w-4 h-4 text-violet-400" />,
      action: () => navigateTo('#/hub/products/ai-analyzer')
    },
    {
      id: 'hub-trader-ws',
      title: 'Auto Trader Workspace',
      category: 'AH HUB',
      icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />,
      action: () => navigateTo('#/hub/products/auto-trader')
    },
    {
      id: 'hub-billing',
      title: 'Manage Subscriptions & Billing',
      category: 'AH HUB',
      icon: <CreditCard className="w-4 h-4 text-amber-400" />,
      action: () => navigateTo('#/hub/billing')
    },
    {
      id: 'nav-pricing',
      title: 'View Pricing & Plans',
      category: 'Navigation',
      icon: <CreditCard className="w-4 h-4 text-slate-400" />,
      action: () => navigateTo('#/pricing')
    },
    {
      id: 'nav-security',
      title: 'Security & Encryption Architecture',
      category: 'Navigation',
      icon: <Shield className="w-4 h-4 text-slate-400" />,
      action: () => navigateTo('#/security')
    },
    {
      id: 'act-theme',
      title: `Switch Theme to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`,
      category: 'Actions',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />,
      action: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        setCommandPaletteOpen(false);
      }
    }
  ];

  if (user && (user.role === 'admin' || user.role === 'super_admin')) {
    commands.push({
      id: 'admin-portal',
      title: 'Admin Control Center',
      category: 'AH HUB',
      icon: <Settings className="w-4 h-4 text-rose-400" />,
      action: () => navigateTo('#/admin')
    });
  }

  const filtered = commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products, workspaces, documentation, or settings..."
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setCommandPaletteOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results list */}
          <div className="max-h-96 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No commands matching &quot;{query}&quot;
              </div>
            ) : (
              <div className="space-y-1">
                {filtered.map(cmd => (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-800/60 group-hover:bg-slate-700/60 transition-colors">
                        {cmd.icon}
                      </div>
                      <span className="font-medium">{cmd.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-md">
                        {cmd.category}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer keyboard guide */}
          <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">ESC</kbd> to exit</span>
            <span className="flex items-center gap-1">
              <span>Navigate with</span>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">↓</kbd>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
