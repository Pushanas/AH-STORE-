import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { LOGOS } from '../../lib/logos';
import { Zap, CheckCircle2, ShieldCheck, ArrowRight, Lock, Bell, BarChart2, Filter, Layers, Clock } from 'lucide-react';
import { SecureLaunchModal } from '../../components/ui/SecureLaunchModal';
import { CryptoPaymentModal } from '../../components/ui/CryptoPaymentModal';
import { RiskDisclaimerBanner } from '../../components/ui/RiskDisclaimerBanner';

export const VipSignalsPage: React.FC = () => {
  const { products, plans, user } = useApp();
  const product = products.find(p => p.id === 'vip-signals');
  const plan = plans.find(p => p.id === 'signals-pro');
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <img src={LOGOS.vipSignals} alt="VIP Signals Logo" referrerPolicy="no-referrer" className="w-5 h-5 rounded-md object-cover" />
              <span>{product.name} ({product.version})</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Institutional alert signals & structured setups.
            </h1>

            <p className="text-base text-slate-400 leading-relaxed">
              AH VIP Signals provides high-conviction market setup notifications across Crypto, Forex, Indices, and Commodities with transparent entry, multi-tier take-profit, and stop-loss levels.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsLaunchModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Launch VIP Signals Workspace
              </button>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all"
              >
                Subscribe ($49/mo)
              </button>
            </div>
          </div>

          {/* Interactive Mock Setup Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-white text-sm">BTC/USDT // Live Setup</span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">LONG</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase">Entry Zone</span>
                <span className="font-mono text-slate-200 font-bold">$118,200 - $118,800</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase">Stop Loss</span>
                <span className="font-mono text-rose-400 font-bold">$116,900</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-500 text-[10px] uppercase block">Take Profit Targets</span>
              <div className="flex justify-between font-mono text-emerald-400 font-semibold">
                <span>TP1: $120.5k</span>
                <span>TP2: $122.0k</span>
                <span className="text-emerald-300 font-bold">TP3: $124.5k</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed italic border-t border-slate-800/80 pt-3">
              &quot;Bullish consolidation above 20-day EMA with expanding volume on lower timeframe breakouts.&quot;
            </p>
          </div>
        </div>

        <RiskDisclaimerBanner />

        {/* Feature Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-extrabold text-white">Engine Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.features.map((feat, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
                <p className="text-xs text-slate-200 font-medium leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {plan && (
        <CryptoPaymentModal
          plan={plan}
          billingInterval="monthly"
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => navigateTo('#/hub/products/vip-signals')}
        />
      )}

      <SecureLaunchModal
        product={product}
        isOpen={isLaunchModalOpen}
        onClose={() => setIsLaunchModalOpen(false)}
      />
    </div>
  );
};
