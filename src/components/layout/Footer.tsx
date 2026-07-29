import React from 'react';
import { ShieldCheck, Zap, Cpu, ShieldAlert, Lock, ArrowUpRight } from 'lucide-react';
import { RiskDisclaimerBanner } from '../ui/RiskDisclaimerBanner';
import { LOGOS } from '../../lib/logos';

export const Footer: React.FC = () => {
  const navigateTo = (path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-blue-500/30 p-0.5 shadow-md bg-slate-900">
                <img
                  src={LOGOS.ahStore}
                  alt="AH STORE Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">AH STORE</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              The premier SaaS command platform for multi-asset market intelligence, Gemini-powered research, and configurable execution automation.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AH HUB OS Status: Operational (100% Uptime)</span>
            </div>
          </div>

          {/* Products Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Software Suite</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('#/vip-signals')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-blue-400" /> AH VIP Signals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('#/ai-analyzer')}
                  className="hover:text-violet-400 transition-colors flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5 text-violet-400" /> AH AI Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('#/auto-trader')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" /> AH Auto Trader
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('#/compare')}
                  className="hover:text-white transition-colors"
                >
                  Product Comparison Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Resources Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('#/pricing')} className="hover:text-white transition-colors">
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('#/security')} className="hover:text-white transition-colors">
                  Security Architecture
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('#/how-it-works')} className="hover:text-white transition-colors">
                  How AH HUB Works
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('#/changelog')} className="hover:text-white transition-colors">
                  Changelog & Releases
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('#/contact')} className="hover:text-white transition-colors">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">Compliance & Legal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('#/legal/terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('#/legal/privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('#/legal/risk-disclosure')} className="hover:text-white transition-colors text-amber-400 font-semibold">
                  Risk Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('#/legal/refund-policy')} className="hover:text-white transition-colors">
                  Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('#/legal/acceptable-use')} className="hover:text-white transition-colors">
                  Acceptable Use Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Risk Banner Component */}
        <RiskDisclaimerBanner compact />

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AH STORE Platform Ltd. All rights reserved. Built for modern financial workflows.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Lock className="w-3 h-3 text-blue-400" /> 256-Bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified Merchant Gateway
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
