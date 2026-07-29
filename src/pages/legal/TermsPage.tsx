import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs leading-relaxed text-slate-300">
        <h1 className="text-3xl font-black text-white">Terms of Service</h1>
        <p className="text-slate-400">Last updated: July 29, 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Platform Services & Licensing</h2>
          <p>
            AH STORE and AH HUB provide software licensing for market analytics tools, research interpretation software, and strategy automation interfaces. Products are licensed on a recurring subscription basis.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. No Financial Advice Disclaimer</h2>
          <p>
            The software, insights, signals, and automated configurations provided within AH HUB do not constitute financial advice, investment recommendations, or endorsement of any trading asset. Users assume full responsibility for all market decisions and configuration parameters.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. User Obligations & Account Security</h2>
          <p>
            Users are responsible for maintaining the confidentiality of their authentication credentials and API keys. Reverse engineering, link extraction, or unauthorized redistribution of signed launch sessions is strictly prohibited.
          </p>
        </section>
      </div>
    </div>
  );
};
