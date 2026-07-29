import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, User, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, addToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [riskAccepted, setRiskAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted || !riskAccepted) {
      addToast({ title: 'Acceptance Required', description: 'Please accept Terms of Service and Risk Disclosure.', type: 'warning' });
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password, country });
      navigateTo('#/hub');
    } catch (err: any) {
      addToast({ title: 'Registration Failed', description: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 pt-24 pb-16">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 mx-auto">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="font-black text-sm text-blue-400">AH</span>
            </div>
          </div>
          <h2 className="text-2xl font-black text-white">Create AH HUB Account</h2>
          <p className="text-xs text-slate-400">Join the premier platform for market software tools</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alexander Harrison"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@ahstore.com"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Country / Region</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Compliance Checkboxes */}
          <div className="space-y-2 pt-1 text-[11px] text-slate-400">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded bg-slate-950 border-slate-800 text-blue-500 focus:ring-0"
              />
              <span>I agree to the <button type="button" onClick={() => navigateTo('#/legal/terms')} className="text-blue-400 hover:underline">Terms of Service</button> and <button type="button" onClick={() => navigateTo('#/legal/privacy')} className="text-blue-400 hover:underline">Privacy Policy</button>.</span>
            </label>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={riskAccepted}
                onChange={e => setRiskAccepted(e.target.checked)}
                className="mt-0.5 rounded bg-slate-950 border-slate-800 text-blue-500 focus:ring-0"
              />
              <span>I acknowledge the <button type="button" onClick={() => navigateTo('#/legal/risk-disclosure')} className="text-amber-400 hover:underline font-semibold">Regulatory Risk Disclosure</button> regarding market software.</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Profile...' : 'Create Account & Enter Hub'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <button onClick={() => navigateTo('#/login')} className="text-blue-400 font-bold hover:underline">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
