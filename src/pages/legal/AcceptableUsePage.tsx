import React from 'react';

export const AcceptableUsePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs leading-relaxed text-slate-300">
        <h1 className="text-3xl font-black text-white">Acceptable Use Policy</h1>
        <p className="text-slate-400">Last updated: July 29, 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Prohibited Actions</h2>
          <p>
            Users agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Attempt to reverse-engineer, decompile, or extract permanent launch URLs from signed launch sessions.</li>
            <li>Re-sell, share, or broadcast VIP Signals alerts to unauthorized third parties.</li>
            <li>Use automated scripts to abuse Gemini AI research quotas.</li>
            <li>Bypass role-based access controls or entitlement verification procedures.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
