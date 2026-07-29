import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Key } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, addToast } = useApp();
  const [email, setEmail] = useState('alex@ahstore.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigateTo('#/hub');
    } catch (err: any) {
      addToast({ title: 'Sign In Failed', description: err.message, type: 'error' });
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
          <h2 className="text-2xl font-black text-white">Sign In to AH HUB</h2>
          <p className="text-xs text-slate-400">Access your active product workspaces & subscriptions</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => navigateTo('#/forgot-password')}
                className="text-blue-400 hover:underline text-[11px]"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating Session...' : 'Sign In to Operating System'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="font-semibold text-slate-300">Demo User Credentials:</div>
          <div>User: <span className="font-mono text-blue-400">alex@ahstore.com</span></div>
          <div>Admin: <span className="font-mono text-violet-400">admin@ahstore.com</span></div>
        </div>

        <div className="text-center text-xs text-slate-400">
          Don&apos;t have an account?{' '}
          <button onClick={() => navigateTo('#/register')} className="text-blue-400 font-bold hover:underline">
            Register Account
          </button>
        </div>
      </div>
    </div>
  );
};
