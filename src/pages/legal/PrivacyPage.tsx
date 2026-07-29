import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs leading-relaxed text-slate-300">
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p className="text-slate-400">Last updated: July 29, 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Data Collection & Usage</h2>
          <p>
            We collect account profile information (name, email), authentication logs, subscription records, and product workspace settings required to deliver services securely. We never sell user data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Security & Encryption</h2>
          <p>
            All network communication is protected by 256-Bit SSL encryption. Passwords and token secrets are stored securely on server-side architecture.
          </p>
        </section>
      </div>
    </div>
  );
};
