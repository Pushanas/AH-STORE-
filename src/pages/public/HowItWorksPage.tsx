import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Cpu, ShieldAlert } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Platform Workflow</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">How AH STORE & AH HUB operate.</h1>
          <p className="text-base text-slate-400">
            A step-by-step breakdown of how you select, subscribe, and launch software products seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <span className="text-4xl font-black text-blue-500/30 font-mono">STEP 01</span>
            <h3 className="text-xl font-bold text-white">1. Account Creation & Identity Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Create your AH HUB account with instant email confirmation. Choose your regional parameters and enable optional 2FA session security.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <span className="text-4xl font-black text-violet-500/30 font-mono">STEP 02</span>
            <h3 className="text-xl font-bold text-white">2. Select Software License or AH HUB Suite</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose an individual monthly or yearly plan for AH VIP Signals ($49), AH AI Analyzer ($79), or AH Auto Trader ($149) — or select the all-inclusive AH HUB Suite ($199).
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <span className="text-4xl font-black text-emerald-500/30 font-mono">STEP 03</span>
            <h3 className="text-xl font-bold text-white">3. Verified Crypto Payment Settlement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pay via USDT (TRC20/BEP20), Binance Pay, BTC, ETH, or TON. The backend automatically grants product access entitlements upon network verification.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <span className="text-4xl font-black text-amber-500/30 font-mono">STEP 04</span>
            <h3 className="text-xl font-bold text-white">4. Secure Workspace Product Launch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Launch authorized software with short-lived signed sessions. Manage live setup feeds, request Gemini AI analyses, or adjust execution risk controls inside AH HUB.
            </p>
          </div>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => navigateTo('#/register')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 inline-flex items-center gap-2"
          >
            <span>Get Started with AH HUB</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
