import React, { useEffect, useState } from 'react';
import { verifyLaunchToken } from '../../lib/api';
import { VipSignalsWorkspace } from './workspaces/VipSignalsWorkspace';
import { AiAnalyzerWorkspace } from './workspaces/AiAnalyzerWorkspace';
import { AutoTraderWorkspace } from './workspaces/AutoTraderWorkspace';
import { Lock, ShieldCheck, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export const LaunchContainerPage: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [verifiedSession, setVerifiedSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Extract token from hash: #/hub/launch/token_123456
    const hash = window.location.hash;
    const match = hash.match(/#\/hub\/launch\/(.+)/);
    if (match && match[1]) {
      const tok = match[1];
      setToken(tok);
      verifyLaunchToken(tok)
        .then(res => {
          setVerifiedSession(res.session);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message || 'Signed launch token invalid or expired.');
          setLoading(false);
        });
    } else {
      setError('No launch token specified.');
      setLoading(false);
    }
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-blue-400 animate-spin mx-auto" />
          <h2 className="text-xl font-bold text-white">Verifying Signed Launch Token...</h2>
          <p className="text-xs text-slate-400 font-mono">CRYPTOGRAPHIC HANDSHAKE WITH SERVER</p>
        </div>
      </div>
    );
  }

  if (error || !verifiedSession) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="text-xl font-black text-white">Access Denied / Token Expired</h2>
          <p className="text-xs text-slate-400">{error || 'Unable to establish secure product workspace session.'}</p>
          <button
            onClick={() => navigateTo('#/hub')}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Command Center
          </button>
        </div>
      </div>
    );
  }

  // Session verified! Render the corresponding workspace inside the secure container wrapper
  const productId = verifiedSession.productId;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Security Banner for Launch Session */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2 text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>SECURE WORKSPACE SESSION // Nonce: {verifiedSession.nonce}</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Expires: {new Date(verifiedSession.expiresAt).toLocaleTimeString()}</span>
          <button
            onClick={() => navigateTo('#/hub')}
            className="text-blue-400 hover:underline flex items-center gap-1 font-sans font-bold"
          >
            ← Exit Session
          </button>
        </div>
      </div>

      {/* Render Workspace based on Product ID */}
      {productId === 'vip-signals' && <VipSignalsWorkspace />}
      {productId === 'ai-analyzer' && <AiAnalyzerWorkspace />}
      {productId === 'auto-trader' && <AutoTraderWorkspace />}
    </div>
  );
};
