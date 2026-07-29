import React from 'react';

export const RefundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs leading-relaxed text-slate-300">
        <h1 className="text-3xl font-black text-white">Refund Policy</h1>
        <p className="text-slate-400">Last updated: July 29, 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Software Subscription Licenses</h2>
          <p>
            Due to the immediate digital granting of access tokens, market signal streams, and AI research engine capacity upon crypto payment confirmation, digital software subscriptions are generally non-refundable unless required by applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Exceptional Circumstances</h2>
          <p>
            If a technical failure prevents subscription activation or product launch for more than 48 hours following verified on-chain payment, users may contact support for license extension or credit adjustment.
          </p>
        </section>
      </div>
    </div>
  );
};
