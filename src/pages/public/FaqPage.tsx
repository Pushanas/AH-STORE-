import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, Mail } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const faqs = [
    {
      category: 'General & Platform',
      q: 'What is the difference between AH STORE and AH HUB?',
      a: 'AH STORE is our marketing and purchasing website. AH HUB is your authenticated customer workspace operating system where software products are launched and configured.'
    },
    {
      category: 'Security',
      q: 'Are permanent vendor URLs exposed in browser traffic?',
      a: 'No. We enforce a zero-secret-exposure policy. When you launch a product, backend servers generate short-lived signed sessions (1-hour validity) that render the workspace securely within AH HUB.'
    },
    {
      category: 'Billing & Crypto',
      q: 'Which crypto networks are supported?',
      a: 'We accept USDT (TRC20 & BEP20), Binance Pay, BTC, ETH, and TON. Subscriptions activate automatically once confirmed on-chain.'
    },
    {
      category: 'Products',
      q: 'Can I cancel or upgrade my subscription at any time?',
      a: 'Yes. You can upgrade to the AH HUB Suite or adjust your plan anytime directly inside the AH HUB Billing settings tab.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Help Center</span>
          <h1 className="text-4xl font-black text-white">Frequently Asked Questions</h1>
          <p className="text-sm text-slate-400">
            Find answers regarding security, subscriptions, crypto checkout, and product workspaces.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden">
              <button
                onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                className="w-full p-5 text-left text-sm font-semibold text-white flex items-center justify-between hover:text-blue-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeIdx === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
