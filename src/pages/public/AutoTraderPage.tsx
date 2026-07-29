import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LOGOS } from '../../lib/logos';
import { ShieldAlert, CheckCircle2, Lock, ArrowRight, ShieldCheck, AlertTriangle, Activity, Sliders, RefreshCw } from 'lucide-react';
import { SecureLaunchModal } from '../../components/ui/SecureLaunchModal';
import { CryptoPaymentModal } from '../../components/ui/CryptoPaymentModal';
import { RiskDisclaimerBanner } from '../../components/ui/RiskDisclaimerBanner';

export const AutoTraderPage: React.FC = () => {
  const { products, plans } = useApp();
  const product = products.find(p => p.id === 'auto-trader');
  const plan = plans.find(p => p.id === 'trader-pro');
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <img src={LOGOS.autoTrader} alt="Auto Trader Logo" referrerPolicy="no-referrer" className="w-5 h-5 rounded-md object-cover" />
              <span>{product.name} ({product.version})</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Configurable automation with hardened risk controls.
            </h1>

            <p className="text-base text-slate-400 leading-relaxed">
              AH Auto Trader provides modular automation software for eligible users. Configure execution strategy rules, set strict daily loss caps and max drawdown limits, and maintain 100% control with an instant emergency kill-switch.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsLaunchModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Launch Auto Trader Workspace
              </button>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all"
              >
                Subscribe ($149/mo)
              </button>
            </div>
          </div>

          {/* Emergency Stop Mock Dashboard */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" /> Strategy Router: Alpha Scalper v4
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono">RUNNING</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase">Daily Loss Cap</span>
                <span className="font-mono text-slate-200 font-bold">$500 Max Loss</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase">Max Drawdown Limit</span>
                <span className="font-mono text-slate-200 font-bold">3.5% Hard Lock</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
              <div>
                <span className="font-bold text-rose-300 text-xs block">Emergency Stop Kill-Switch</span>
                <span className="text-[10px] text-slate-400">Instantly halts all order routers within 150ms</span>
              </div>
              <button className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30">
                HALT NOW
              </button>
            </div>
          </div>
        </div>

        <RiskDisclaimerBanner />

        <div className="space-y-8">
          <h2 className="text-2xl font-extrabold text-white">Automation Controls & Safety</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.features.map((feat, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
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
          onSuccess={() => window.location.hash = '#/hub/products/auto-trader'}
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
