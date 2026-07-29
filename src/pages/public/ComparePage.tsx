import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Zap, Cpu, ShieldAlert, ArrowRight } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Product Comparison</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Full Feature Matrix</h1>
          <p className="text-base text-slate-400">
            Compare capabilities across AH VIP Signals, AH AI Analyzer, and AH Auto Trader.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Feature / Specification</th>
                <th className="p-4 text-blue-400">AH VIP Signals</th>
                <th className="p-4 text-violet-400">AH AI Analyzer</th>
                <th className="p-4 text-emerald-400">AH Auto Trader</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="p-4 font-semibold text-white">Best For</td>
                <td className="p-4">Active Setup Alert Monitoring</td>
                <td className="p-4">AI Research & Macro Projections</td>
                <td className="p-4">Order Execution & Risk Rules</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Market Coverage</td>
                <td className="p-4 text-emerald-400 font-bold">Crypto, Forex, Indices, Gold</td>
                <td className="p-4 text-emerald-400 font-bold">Global Equities & Crypto</td>
                <td className="p-4 text-slate-300">User API Exchange Keys</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">AI Reasoning Engine</td>
                <td className="p-4 text-slate-500">—</td>
                <td className="p-4 text-emerald-400 font-bold">✓ Gemini 2.5 Flash</td>
                <td className="p-4 text-slate-500">—</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Emergency Stop Kill-Switch</td>
                <td className="p-4 text-slate-500">—</td>
                <td className="p-4 text-slate-500">—</td>
                <td className="p-4 text-emerald-400 font-bold">✓ 150ms Instant Halt</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Exportable Reports</td>
                <td className="p-4 text-slate-400">CSV Signal History</td>
                <td className="p-4 text-emerald-400 font-bold">✓ PDF & Formatted JSON</td>
                <td className="p-4 text-slate-400">Audit Logs CSV</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Subscription Availability</td>
                <td className="p-4 font-mono">$49/month</td>
                <td className="p-4 font-mono">$79/month</td>
                <td className="p-4 font-mono">$149/month</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Included in AH HUB Suite</td>
                <td className="p-4 text-emerald-400 font-bold">✓ Included</td>
                <td className="p-4 text-emerald-400 font-bold">✓ Included</td>
                <td className="p-4 text-emerald-400 font-bold">✓ Included</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => navigateTo('#/pricing')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 inline-flex items-center gap-2"
          >
            <span>Choose Your Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
