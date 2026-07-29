import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LOGOS } from '../../lib/logos';
import { Cpu, CheckCircle2, Lock, ArrowRight, Sparkles, FileText, Search, Database } from 'lucide-react';
import { SecureLaunchModal } from '../../components/ui/SecureLaunchModal';
import { CryptoPaymentModal } from '../../components/ui/CryptoPaymentModal';
import { RiskDisclaimerBanner } from '../../components/ui/RiskDisclaimerBanner';

export const AiAnalyzerPage: React.FC = () => {
  const { products, plans } = useApp();
  const product = products.find(p => p.id === 'ai-analyzer');
  const plan = plans.find(p => p.id === 'analyzer-pro');
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-violet-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono">
              <img src={LOGOS.aiAnalyzer} alt="AI Analyzer Logo" referrerPolicy="no-referrer" className="w-5 h-5 rounded-md object-cover" />
              <span>{product.name} ({product.version})</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Gemini 2.5 market research & probabilistic scenarios.
            </h1>

            <p className="text-base text-slate-400 leading-relaxed">
              AH AI Analyzer delivers deep explainable market intelligence. Analyze any asset symbol instantly for technical driver summaries, macro liquidity context, and multi-scenario bullish/bearish probability projections.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsLaunchModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-violet-500/20 transition-all flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Open AI Analyzer Workspace
              </button>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all"
              >
                Subscribe ($79/mo)
              </button>
            </div>
          </div>

          {/* AI Mock Dashboard Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" /> Symbol Analysis: NVDA
              </span>
              <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 text-xs font-mono">BULLISH (94%)</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Key Drivers</span>
              <ul className="space-y-1 text-slate-300">
                <li>• Enterprise AI compute demand scaling across cloud providers</li>
                <li>• Technical bounce off 21-day EMA ascend channel</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">Bullish Target</span>
                <span className="text-slate-300 font-mono">$165.00 (+14.2%)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold block">Bearish Retest</span>
                <span className="text-slate-300 font-mono">$135.00 (-6.5%)</span>
              </div>
            </div>
          </div>
        </div>

        <RiskDisclaimerBanner />

        <div className="space-y-8">
          <h2 className="text-2xl font-extrabold text-white">Analysis Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.features.map((feat, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-violet-400" />
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
          onSuccess={() => window.location.hash = '#/hub/products/ai-analyzer'}
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
