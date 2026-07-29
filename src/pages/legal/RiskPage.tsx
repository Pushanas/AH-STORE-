import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const RiskPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs leading-relaxed text-slate-300">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
          <span className="font-bold text-sm">Regulatory & Financial Market Risk Disclosure</span>
        </div>

        <h1 className="text-3xl font-black text-white">Risk Disclosure Statement</h1>
        <p className="text-slate-400">Important regulatory disclosure for all AH STORE & AH HUB subscribers.</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. High Risk Warning</h2>
          <p>
            Trading financial instruments (Crypto, Foreign Exchange, Commodities, Equities, Derivatives) carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. No Guarantee of Performance</h2>
          <p>
            Past performance of signal setups, AI research synthesis, or strategy automation configurations is not indicative of future results. No representation is being made that any account will or is likely to achieve profits or losses similar to those discussed on this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. User Responsibility & Risk Limits</h2>
          <p>
            Subscribers using AH Auto Trader or AH VIP Signals remain sole administrators of their trade parameters, position sizes, stop losses, and emergency stop configurations. AH STORE platform providers assume zero liability for trading losses incurred.
          </p>
        </section>
      </div>
    </div>
  );
};
