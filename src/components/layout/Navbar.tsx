import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { LOGOS } from '../../lib/logos';
import { RechargeModal } from '../ui/RechargeModal';
import { Zap, Cpu, ShieldAlert, LayoutDashboard, ChevronDown, Menu, X, Sun, Moon, ArrowRight, Shield, Command, Wallet } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, setTheme, setCommandPaletteOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
    setIsProductsOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-blue-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigateTo('#/')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-blue-500/30 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform bg-slate-900">
              <img
                src={LOGOS.ahStore}
                alt="AH STORE Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold tracking-tight text-base text-white group-hover:text-blue-400 transition-colors">
                AH STORE
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-1 tracking-wider uppercase">
                HUB OS
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Products Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                onClick={() => navigateTo('#/products')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 p-2 mt-1 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-2xl"
                  >
                    <button
                      onClick={() => navigateTo('#/products/ah-vip-signals')}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/80 transition-all text-left group"
                    >
                      <img
                        src={LOGOS.vipSignals}
                        alt="بوت زمني Logo"
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-lg object-cover border border-amber-500/30"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                          بوت زمني (Quotex)
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          توقيت دخول الصفقات بالثواني لشمعة 1m و 5m.
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('#/products/ah-ai-analyzer')}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/80 transition-all text-left group"
                    >
                      <img
                        src={LOGOS.aiAnalyzer}
                        alt="بوت تحليل فني سوق عالمي Logo"
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-lg object-cover border border-purple-500/30"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-violet-400 transition-colors">
                          بوت تحليل فني سوق عالمي
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          تحليل الاتجاه والدعم والمقاومة لأزواج كوتيكس.
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => navigateTo('#/products/ah-auto-trader')}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/80 transition-all text-left group"
                    >
                      <img
                        src={LOGOS.autoTrader}
                        alt="بوت تحليل شارت OTC Logo"
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-lg object-cover border border-emerald-500/30"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                          بوت تحليل شارت OTC
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          قراءة كوتيكس OTC وتفادي الاختراقات الوهمية.
                        </p>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigateTo('#/pricing')}
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              Pricing
            </button>

            <button
              onClick={() => navigateTo('#/compare')}
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              Compare
            </button>

            <button
              onClick={() => navigateTo('#/security')}
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              Security
            </button>

            <button
              onClick={() => navigateTo('#/how-it-works')}
              className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              How It Works
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all"
              title="Search AH STORE (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5 text-blue-400" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 ml-1">⌘K</kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* Recharge Balance Button */}
            <button
              onClick={() => setIsRechargeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all border border-emerald-400/30"
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-200" />
              <span>شحن رصيد +</span>
            </button>

            {/* Direct Hub CTA (No Login Required) */}
            <button
              onClick={() => navigateTo('#/hub')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>تشغيل البوتات (AH HUB)</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-6 space-y-4 shadow-2xl"
          >
            <div className="space-y-1">
              <button
                onClick={() => navigateTo('#/products')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
              >
                Products Overview
              </button>
              <button
                onClick={() => navigateTo('#/products/ah-vip-signals')}
                className="w-full text-left px-6 py-2 text-xs text-blue-400 hover:bg-slate-900 rounded-lg flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" /> AH VIP Signals
              </button>
              <button
                onClick={() => navigateTo('#/products/ah-ai-analyzer')}
                className="w-full text-left px-6 py-2 text-xs text-violet-400 hover:bg-slate-900 rounded-lg flex items-center gap-2"
              >
                <Cpu className="w-3.5 h-3.5" /> AH AI Analyzer
              </button>
              <button
                onClick={() => navigateTo('#/products/ah-auto-trader')}
                className="w-full text-left px-6 py-2 text-xs text-emerald-400 hover:bg-slate-900 rounded-lg flex items-center gap-2"
              >
                <ShieldAlert className="w-3.5 h-3.5" /> AH Auto Trader
              </button>
              <button
                onClick={() => navigateTo('#/pricing')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
              >
                Pricing & Plans
              </button>
              <button
                onClick={() => navigateTo('#/compare')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
              >
                Product Matrix Compare
              </button>
              <button
                onClick={() => navigateTo('#/security')}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
              >
                Security Architecture
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setIsRechargeModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                شحن رصيد +
              </button>
              <button
                onClick={() => navigateTo('#/hub')}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                تشغيل البوتات (AH HUB)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
      />
    </header>
  );
};
