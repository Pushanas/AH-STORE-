import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Plan } from '../../types';
import { CheckCircle2, ShieldCheck, Zap, Cpu, ShieldAlert, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { CryptoPaymentModal } from '../../components/ui/CryptoPaymentModal';
import { RiskDisclaimerBanner } from '../../components/ui/RiskDisclaimerBanner';

export const PricingPage: React.FC = () => {
  const { plans, user } = useApp();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Transparent Licensing</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Simple, honest pricing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400">
              No hidden fees.
            </span>
          </h1>
          <p className="text-base text-slate-400">
            Choose individual software licenses or get complete access to all 3 products with the AH HUB Suite.
          </p>

          {/* Billing Interval Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 inline-flex items-center gap-2">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  billingInterval === 'monthly'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingInterval('yearly')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  billingInterval === 'yearly'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Yearly Billing
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map(plan => {
            const isFeatured = plan.featured;
            const price = billingInterval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const periodLabel = billingInterval === 'yearly' ? '/year' : '/month';

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                  isFeatured
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-blue-500/80 shadow-2xl shadow-blue-500/20'
                    : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular Bundle
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[36px]">{plan.tagline}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">${price}</span>
                      <span className="text-xs text-slate-400">{periodLabel}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 pt-3 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-2">
                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white shadow-xl shadow-blue-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>Subscribe Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {plan.riskNote && (
                    <p className="text-[10px] text-slate-400 text-center leading-tight pt-1">{plan.riskNote}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Crypto Payment Method Logos Strip */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Supported Global Payment Gateways</span>
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">🟡 Binance Pay</span>
            <span className="flex items-center gap-1.5 text-emerald-400">₮ USDT (TRC20 & BEP20)</span>
            <span className="flex items-center gap-1.5 text-amber-400">₿ Bitcoin (BTC)</span>
            <span className="flex items-center gap-1.5 text-indigo-400">Ξ Ethereum (ETH)</span>
            <span className="flex items-center gap-1.5 text-blue-400">💎 TON Network</span>
          </div>
        </div>

        <RiskDisclaimerBanner />
      </div>

      {selectedPlan && (
        <CryptoPaymentModal
          plan={selectedPlan}
          billingInterval={billingInterval}
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={() => navigateTo('#/hub')}
        />
      )}
    </div>
  );
};
