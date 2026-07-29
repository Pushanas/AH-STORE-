import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HubLayout } from '../../components/hub/HubLayout';
import { Settings, ShieldCheck, Key, User, Globe, Lock, Copy, Check } from 'lucide-react';

export const HubSettingsPage: React.FC = () => {
  const { user, addToast } = useApp();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [apiKey, setApiKey] = useState('ah_sk_live_9a8f7b6c5d4e3f2a1b0c9d8e7f');
  const [copied, setCopied] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast({ title: 'API Token Copied', description: 'Secret key saved to clipboard.', type: 'info' });
  };

  const handleGenerateNewKey = () => {
    const newKey = `ah_sk_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
    setApiKey(newKey);
    addToast({ title: 'New API Token Mined', description: 'Old key revoked immediately.', type: 'success' });
  };

  return (
    <HubLayout activeTab="settings">
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-2xl font-black text-white">Account Settings & Security</h1>
          <p className="text-xs text-slate-400">Manage credentials, two-factor authentication, and developer API keys.</p>
        </div>

        {/* Profile Details Box */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white">Profile Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Full Name</span>
              <span className="font-bold text-slate-200">{user?.name}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-[10px] block uppercase">Email Address</span>
              <span className="font-bold text-slate-200">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* 2FA Box */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Two-Factor Security (2FA)</h3>
              <p className="text-xs text-slate-400">Enforce time-based OTP requirement on product workspace launches.</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                twoFactorEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {twoFactorEnabled ? '2FA Enabled' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        {/* API Token Box */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Developer API Secret Token</h3>
            <p className="text-xs text-slate-400">Use this secret key to authenticate client API requests to AH HUB endpoints.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
            <span className="text-slate-300 truncate">{apiKey}</span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyKey}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleGenerateNewKey}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-sans font-bold"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      </div>
    </HubLayout>
  );
};
