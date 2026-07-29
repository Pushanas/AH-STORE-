import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { createPaymentIntent, simulateConfirmPayment, validateCoupon } from '../../lib/api';
import { Plan, PaymentMethod, PaymentIntent } from '../../types';
import { X, Check, Copy, CheckCircle2, Clock, ShieldCheck, ArrowRight, RefreshCw, Tag } from 'lucide-react';

interface CryptoPaymentModalProps {
  plan: Plan;
  billingInterval: 'monthly' | 'yearly';
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CryptoPaymentModal: React.FC<CryptoPaymentModalProps> = ({
  plan,
  billingInterval,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user, addToast, refreshSubscriptions } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('usdt_trc20');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [intent, setIntent] = useState<PaymentIntent | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const basePrice = billingInterval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  let finalPrice = basePrice;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      finalPrice = basePrice * (1 - appliedCoupon.discountValue / 100);
    } else {
      finalPrice = Math.max(0, basePrice - appliedCoupon.discountValue);
    }
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError('');
    try {
      const res = await validateCoupon(couponCode);
      if (res.valid) {
        setAppliedCoupon(res.coupon);
        addToast({ title: 'Coupon Applied', description: `${res.coupon.code} applied successfully`, type: 'success' });
      }
    } catch (err: any) {
      setCouponError(err.message || 'Invalid coupon code');
    }
  };

  const handleGenerateInvoice = async () => {
    if (!user) {
      addToast({ title: 'Authentication Required', description: 'Please sign in to proceed with checkout.', type: 'warning' });
      return;
    }
    setIsCreatingIntent(true);
    try {
      const res = await createPaymentIntent({
        userId: user.id,
        planId: plan.id,
        billingInterval,
        paymentMethod: selectedMethod,
        couponCode: appliedCoupon ? appliedCoupon.code : undefined
      });
      setIntent(res.intent);
    } catch (err: any) {
      addToast({ title: 'Checkout Error', description: err.message, type: 'error' });
    } finally {
      setIsCreatingIntent(false);
    }
  };

  const handleSimulatePayment = async () => {
    if (!intent) return;
    setIsConfirming(true);
    try {
      const res = await simulateConfirmPayment(intent.id);
      if (res.success) {
        addToast({ title: 'Payment Confirmed', description: `${plan.name} activated successfully!`, type: 'success' });
        await refreshSubscriptions();
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      addToast({ title: 'Verification Error', description: err.message, type: 'error' });
    } finally {
      setIsConfirming(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const methods: { id: PaymentMethod; name: string; icon: string; badge: string; address: string }[] = [
    { id: 'usdt_trc20', name: 'USDT (TRC20)', icon: '🟢', badge: 'رسوم منخفضة (Tron)', address: 'TN1fLbmmptRyRGyvnffMeth1SoNhfPq6QX' },
    { id: 'usdt_bep20', name: 'USDT (BEP20)', icon: '🟡', badge: 'شبكة BNB Smart Chain', address: '0x5f95aa05f877d2fc9a150103d84110047182483e' },
    { id: 'binance', name: 'بينانس Pay (Binance Pay)', icon: '💎', badge: 'إيداع فوري ID: 1078155293', address: '1078155293' },
    { id: 'btc', name: 'USDT (TRC20 Alternative)', icon: '🟢', badge: 'Tron Network', address: 'TN1fLbmmptRyRGyvnffMeth1SoNhfPq6QX' },
    { id: 'eth', name: 'USDT (BEP20 Alternative)', icon: '🟡', badge: 'BNB Chain', address: '0x5f95aa05f877d2fc9a150103d84110047182483e' },
    { id: 'ton', name: 'Binance Pay ID', icon: '💎', badge: 'ID: 1078155293', address: '1078155293' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">AH HUB Checkout</span>
              <h3 className="text-xl font-bold text-white mt-0.5">{plan.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {!intent ? (
              <>
                {/* Order Summary Box */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Selected Plan</span>
                    <span className="font-semibold text-slate-200">{plan.name} ({billingInterval})</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-sm text-emerald-400">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-{appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}%` : `$${appliedCoupon.discountValue}`}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">Total Payable</span>
                    <span className="text-2xl font-black text-white">${finalPrice.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Have a promo code?</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        placeholder="Enter coupon (e.g. LAUNCH20)"
                        className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-rose-400 mt-1">{couponError}</p>}
                </div>

                {/* Crypto Payment Method Selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Select Crypto Payment Gateway</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {methods.map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMethod(m.id)}
                        className={`p-3 rounded-2xl border text-left transition-all relative ${
                          selectedMethod === m.id
                            ? 'border-blue-500 bg-blue-500/10 text-white shadow-lg shadow-blue-500/10'
                            : 'border-slate-800/80 bg-slate-950/40 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{m.icon}</span>
                          {selectedMethod === m.id && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                        </div>
                        <div className="mt-2">
                          <div className="text-xs font-bold text-slate-200">{m.name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{m.badge}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleGenerateInvoice}
                  disabled={isCreatingIntent}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {isCreatingIntent ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating Secure Crypto Address...
                    </>
                  ) : (
                    <>
                      Proceed to Payment Details
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            ) : (
              /* Active Invoice / Payment Address View */
              <div className="space-y-5">
                {/* Status Timeline */}
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs text-blue-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
                    <span>Awaiting Blockchain Transfer</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">Expires in 30:00</span>
                </div>

                {/* Amount to Send */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center space-y-1">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Exact Amount to Transfer</span>
                  <div className="text-3xl font-black text-white">{intent.cryptoAmount}</div>
                  <p className="text-xs text-slate-400 mt-1">Equivalent to ${intent.amount.toFixed(2)} USD</p>
                </div>

                {/* Deposit Address Box */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Deposit Address ({intent.paymentMethod.toUpperCase()})</label>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-blue-300 break-all select-all">{intent.cryptoAddress}</span>
                    <button
                      onClick={() => handleCopy(intent.cryptoAddress)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors shrink-0"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-400 space-y-1.5 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Verified Payment Gateway
                  </div>
                  <p>Send the exact amount to the address above. Access entitlement to AH HUB product workspaces activates automatically upon network confirmation.</p>
                </div>

                {/* Simulation Control for testing */}
                <div className="pt-2">
                  <button
                    onClick={handleSimulatePayment}
                    disabled={isConfirming}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    {isConfirming ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Verifying Transaction On-Chain...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Simulate Payment Verification (Instant Test Activation)
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
