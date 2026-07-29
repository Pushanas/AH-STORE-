import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { launchProduct } from '../../lib/api';
import { Product } from '../../types';
import { ShieldCheck, Lock, RefreshCw, AlertCircle, ArrowRight, X, ExternalLink } from 'lucide-react';

interface SecureLaunchModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const SecureLaunchModal: React.FC<SecureLaunchModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { user, addToast } = useApp();
  const [step, setStep] = useState<'verifying' | 'generating' | 'ready' | 'error'>('verifying');
  const [launchData, setLaunchData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen && user) {
      handleLaunchSequence();
    }
  }, [isOpen, user, product]);

  const handleLaunchSequence = async () => {
    setStep('verifying');
    setErrorMessage('');
    try {
      // Step 1: Verification pause
      await new Promise(r => setTimeout(r, 600));
      setStep('generating');

      // Step 2: Request signed launch session from backend
      const res = await launchProduct(product.id, user?.id || 'usr_demo_123');
      if (res.success) {
        setLaunchData(res);
        setStep('ready');
      }
    } catch (err: any) {
      setStep('error');
      setErrorMessage(err.message || 'Access authorization failed');
      addToast({ title: 'Launch Denied', description: err.message, type: 'error' });
    }
  };

  if (!isOpen) return null;

  const handleProceed = () => {
    if (launchData?.internalLaunchPath) {
      window.location.hash = `#${launchData.internalLaunchPath}`;
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 text-slate-100"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AH HUB Secure Workspace Launch</h3>
                <p className="text-xs text-slate-400">{product.name} ({product.version})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Sequence Display */}
          <div className="space-y-4 py-2">
            {step === 'verifying' && (
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
                <h4 className="text-sm font-semibold text-slate-200">Verifying Subscription Entitlement...</h4>
                <p className="text-xs text-slate-400">Checking active license status and server-side role permissions.</p>
              </div>
            )}

            {step === 'generating' && (
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-3">
                <ShieldCheck className="w-8 h-8 text-violet-400 animate-pulse mx-auto" />
                <h4 className="text-sm font-semibold text-slate-200">Minting Signed Short-Lived Session...</h4>
                <p className="text-xs text-slate-400">Generating cryptographic token nonce and recording security audit log entry.</p>
              </div>
            )}

            {step === 'ready' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    Authorized Single-Use Launch Token Granted
                  </div>
                  <p className="text-slate-300">Session verified. Zero sensitive endpoints or implementation keys exposed in browser source.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Token Nonce:</span>
                    <span className="text-blue-400">{launchData?.launchToken?.substring(0, 24)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Valid Until:</span>
                    <span className="text-slate-300">{new Date(launchData?.expiresAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceed}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  Enter Authenticated Workspace
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 'error' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-rose-400 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    Launch Authorization Failed
                  </div>
                  <p className="text-slate-300 leading-relaxed">{errorMessage}</p>
                </div>

                <button
                  onClick={() => {
                    window.location.hash = '#/pricing';
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  View Subscription Plans & Upgrade
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
