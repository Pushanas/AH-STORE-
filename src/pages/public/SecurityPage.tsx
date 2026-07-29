import React from 'react';
import { ShieldCheck, Lock, Key, Server, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';
import { RiskDisclaimerBanner } from '../../components/ui/RiskDisclaimerBanner';

export const SecurityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Platform Security</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Built like an institutional vault.</h1>
          <p className="text-base text-slate-400">
            How AH STORE and AH HUB guarantee zero exposure of vendor URLs, API tokens, or internal execution endpoints.
          </p>
        </div>

        {/* Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 w-fit">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Signed Launch Tokens</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When a user clicks &quot;Launch Product&quot;, backend servers validate subscription entitlement and mint a single-use, short-lived signed launch token (1-hour expiry). No permanent external URLs ever touch client code or browser storage.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Server-Side Authorization</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every single protected API action, signal fetch, AI request, or order halt is validated server-side against role permissions and database entitlement state before execution.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400 w-fit">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Immutable Audit Logging</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Security-critical operations — including product launches, payment confirmations, subscription updates, and Emergency Stops — are logged with timestamp, user ID, IP address, and cryptographic nonce.
            </p>
          </div>
        </div>

        {/* Sequence Flow Explanation Box */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white">Secure Product Launch Sequence</h3>
          <div className="space-y-3 text-xs font-mono text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span>1. User triggers Launch Request</span>
              <span className="text-blue-400">POST /api/v1/products/:productId/launch</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span>2. Backend validates active subscription & entitlements</span>
              <span className="text-emerald-400">Entitlement Verified</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span>3. Backend generates short-lived signed launch token + nonce</span>
              <span className="text-violet-400">Session Signed</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span>4. Frontend opens internal route /hub/launch/:token</span>
              <span className="text-slate-400">Zero Raw Links Exposed</span>
            </div>
          </div>
        </div>

        <RiskDisclaimerBanner />
      </div>
    </div>
  );
};
