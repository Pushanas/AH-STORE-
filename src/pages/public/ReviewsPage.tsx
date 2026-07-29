import React from 'react';
import { Star, ShieldCheck, UserCheck } from 'lucide-react';
import { RiskDisclaimerBanner } from '../../components/ui/RiskDisclaimerBanner';

export const ReviewsPage: React.FC = () => {
  const sampleReviews = [
    {
      name: 'Marcus Vance',
      role: 'Quantitative Multi-Asset Trader',
      location: 'London, UK',
      product: 'AH VIP Signals Pro',
      rating: 5,
      comment: 'The alert setup layout inside AH VIP Signals is crisp and institutional. Receiving TP1-TP3 targets with clear risk parameters makes watchlist tracking effortless.',
      date: 'July 2026'
    },
    {
      name: 'Elena Rostova',
      role: 'Portfolio Analyst',
      location: 'Zurich, Switzerland',
      product: 'AH AI Analyzer Pro',
      rating: 5,
      comment: 'Gemini 2.5 scenario synthesis has saved our desk hours of technical research. The PDF export reports look extremely professional.',
      date: 'July 2026'
    },
    {
      name: 'David Chen',
      role: 'Algorithmic Execution Manager',
      location: 'Singapore',
      product: 'AH Auto Trader Pro',
      rating: 5,
      comment: 'Having a hard daily loss cap and an emergency stop kill switch gives us full operational confidence. The audit trail logging is top tier.',
      date: 'June 2026'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Platform Feedback</span>
          <h1 className="text-4xl font-black text-white">Verified Subscriber Experiences</h1>
          <p className="text-sm text-slate-400">
            Read sample feedback from traders using AH STORE & AH HUB across global markets.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-amber-400 font-mono">
            <span>Note: Displayed feedback represents sample user testimonials</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleReviews.map((rev, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">&quot;{rev.comment}&quot;</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{rev.name}</div>
                  <div className="text-[10px] text-slate-400">{rev.role} • {rev.location}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px]">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>

        <RiskDisclaimerBanner />
      </div>
    </div>
  );
};
