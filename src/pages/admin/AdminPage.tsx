import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { HubLayout } from '../../components/hub/HubLayout';
import { fetchAdminOverview, grantAdminEntitlement } from '../../lib/api';
import { User, Subscription, Entitlement, PaymentIntent } from '../../types';
import { ShieldCheck, UserCheck, CreditCard, Key, Lock, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, addToast } = useApp();
  const [data, setData] = useState<{
    users: User[];
    subscriptions: Subscription[];
    entitlements: Entitlement[];
    paymentIntents: PaymentIntent[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Grant entitlement modal form state
  const [targetUserId, setTargetUserId] = useState('');
  const [targetProductId, setTargetProductId] = useState('vip-signals');

  const loadData = async () => {
    try {
      const res = await fetchAdminOverview();
      setData(res);
      setLoading(false);
    } catch (err: any) {
      addToast({ title: 'Admin Load Error', description: err.message, type: 'error' });
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUserId) return;
    try {
      await grantAdminEntitlement(targetUserId, targetProductId);
      addToast({ title: 'Entitlement Granted', description: `Granted ${targetProductId} to ${targetUserId}`, type: 'success' });
      loadData();
    } catch (err: any) {
      addToast({ title: 'Grant Failed', description: err.message, type: 'error' });
    }
  };

  if (user?.role !== 'admin' && user?.role !== 'super_admin') {
    return (
      <HubLayout activeTab="admin">
        <div className="p-8 text-center text-rose-400 font-bold space-y-2">
          <AlertTriangle className="w-12 h-12 mx-auto text-rose-500" />
          <p>Access Denied. Administrative privileges required.</p>
        </div>
      </HubLayout>
    );
  }

  return (
    <HubLayout activeTab="admin">
      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ADMINISTRATIVE OVERWATCH ROUTER</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Platform Operations Control</h1>
          <p className="text-xs text-slate-400">Manage global user entitlements, confirm manual payments, and monitor security nonces.</p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs">Loading platform telemetry...</div>
        ) : (
          <div className="space-y-8">
            {/* Quick Actions / Grant Form */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Manual License Override</h3>
              <form onSubmit={handleGrant} className="flex flex-wrap items-center gap-3 text-xs">
                <select
                  value={targetUserId}
                  onChange={e => setTargetUserId(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                >
                  <option value="">Select Target User</option>
                  {data?.users.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>

                <select
                  value={targetProductId}
                  onChange={e => setTargetProductId(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                >
                  <option value="vip-signals">AH VIP Signals</option>
                  <option value="ai-analyzer">AH AI Analyzer</option>
                  <option value="auto-trader">AH Auto Trader</option>
                </select>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
                >
                  Grant Product Access
                </button>
              </form>
            </div>

            {/* Platform Users & Subscriptions Table */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Registered Users & Active Entitlements</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3">User</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Active Subscriptions</th>
                      <th className="p-3">Entitlements</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {data?.users.map(u => {
                      const userEnts = data.entitlements.filter(e => e.userId === u.id && e.active);
                      const userSub = data.subscriptions.find(s => s.userId === u.id);

                      return (
                        <tr key={u.id}>
                          <td className="p-3 font-semibold text-white">
                            {u.name} <br />
                            <span className="text-[10px] text-slate-500 font-mono">{u.email}</span>
                          </td>
                          <td className="p-3 font-mono">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-emerald-400">
                            {userSub ? userSub.planId : 'None'}
                          </td>
                          <td className="p-3 font-mono">
                            <div className="flex gap-1 flex-wrap">
                              {userEnts.map(e => (
                                <span key={e.id} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">
                                  {e.productId}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </HubLayout>
  );
};
