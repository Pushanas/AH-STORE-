import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { X, Copy, Check, ShieldCheck, ArrowRight, Wallet, CheckCircle2, Send } from 'lucide-react';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RechargeModal: React.FC<RechargeModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [selectedGateway, setSelectedGateway] = useState<'trc20' | 'bep20' | 'binance'>('trc20');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('50');
  const [txHash, setTxHash] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast({ title: 'تم النسخ بنجاح!', description: 'تم نسخ العنوان/المعرف إلى الحافظة.', type: 'success' });
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleConfirmRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      addToast({ title: 'مبلغ غير صالح', description: 'يرجى إدخال مبلغ شحن صحيح.', type: 'warning' });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setAmount('50');
    setTxHash('');
    onClose();
  };

  const gateways = [
    {
      id: 'trc20' as const,
      name: 'USDT (TRC20)',
      network: 'شبكة ترون Tron (TRC-20)',
      address: 'TN1fLbmmptRyRGyvnffMeth1SoNhfPq6QX',
      badge: 'الرسوم منخفضة ووصول سريع',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400',
      icon: (
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 relative">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#26A17B]" fill="currentColor">
            <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"/>
            <path fill="#FFF" d="M12.986 11.458v6.782h-1.97v-6.782c-3.11-.2-5.5-1.127-5.5-2.222 0-1.096 2.39-2.023 5.5-2.223V4h1.97v2.793c3.11.2 5.5 1.127 5.5 2.223 0 1.095-2.39 2.022-5.5 2.222z"/>
            <path d="M12.986 9.236v-1.78c2.47.16 4.31.815 4.31 1.583 0 .767-1.84 1.423-4.31 1.583v-1.386zm-1.97 0v1.386C8.546 10.46 6.7 9.805 6.7 9.04c0-.768 1.846-1.424 4.316-1.583v1.78z" fill="#26A17B"/>
          </svg>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FF060A] rounded-full flex items-center justify-center border-2 border-slate-900">
             <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white" fill="currentColor">
               <path d="M10.283 23.322L2 6.84l9.167 15.655 8.165-15.655-9.05 16.482zM12 2L2 5.62l9.045 1.517zM13 3.652l8 2-9 1.5zM22 6.5L12.5 8.8 20.8 19zM2 7.2l9.5 2-8.3 9z"/>
             </svg>
          </div>
        </div>
      )
    },
    {
      id: 'bep20' as const,
      name: 'USDT (BEP20)',
      network: 'شبكة باينانس الذكية BNB Chain (BEP-20)',
      address: '0x5f95aa05f877d2fc9a150103d84110047182483e',
      badge: 'أقل عمولة شبكة',
      color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-400',
      icon: (
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 relative">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#26A17B]" fill="currentColor">
            <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"/>
            <path fill="#FFF" d="M12.986 11.458v6.782h-1.97v-6.782c-3.11-.2-5.5-1.127-5.5-2.222 0-1.096 2.39-2.023 5.5-2.223V4h1.97v2.793c3.11.2 5.5 1.127 5.5 2.223 0 1.095-2.39 2.022-5.5 2.222z"/>
            <path d="M12.986 9.236v-1.78c2.47.16 4.31.815 4.31 1.583 0 .767-1.84 1.423-4.31 1.583v-1.386zm-1.97 0v1.386C8.546 10.46 6.7 9.805 6.7 9.04c0-.768 1.846-1.424 4.316-1.583v1.78z" fill="#26A17B"/>
          </svg>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FCD535] rounded-full flex items-center justify-center border-2 border-slate-900">
             <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-black" fill="currentColor">
                <path d="M11.996 9.877L7.96 13.914l4.036 4.035 4.036-4.035-4.036-4.037z"/>
                <path d="M5.421 11.374l-2.54 2.54 9.115 9.114 9.115-9.114-2.54-2.54-6.575 6.574-6.575-6.574z"/>
                <path d="M11.996 2.39l-9.115 9.115 2.54 2.54 6.575-6.574 6.575 6.574 2.54-2.54z"/>
             </svg>
          </div>
        </div>
      )
    },
    {
      id: 'binance' as const,
      name: 'بينانس Pay (Binance Pay)',
      network: 'معرف باينانس Pay ID',
      address: '1078155293',
      badge: 'إيداع فوري بدون رسوم شبكة',
      color: 'from-yellow-500/20 to-orange-500/10 border-yellow-500/40 text-yellow-400',
      icon: (
        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FCD535]" fill="currentColor">
            <path d="M11.996 9.877L7.96 13.914l4.036 4.035 4.036-4.035-4.036-4.037z"/>
            <path d="M5.421 11.374l-2.54 2.54 9.115 9.114 9.115-9.114-2.54-2.54-6.575 6.574-6.575-6.574z"/>
            <path d="M11.996 2.39l-9.115 9.115 2.54 2.54 6.575-6.574 6.575 6.574 2.54-2.54z"/>
          </svg>
        </div>
      )
    }
  ];

  const activeGw = gateways.find(g => g.id === selectedGateway)!;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md dir-rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-slate-900 border border-slate-800/60 rounded-3xl shadow-2xl overflow-hidden text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/60 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">شحن رصيد حسابك (إيداع كريبتو)</h3>
                <p className="text-xs text-slate-400 mt-0.5">اختر وسيلة الدفع المناسبة واستكمل عملية الشحن فوراً</p>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">تم استلام طلب الشحن بنجاح!</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    يرجى التواصل مع الدعم الفني عبر تليجرام وإرسال إيصال الدفع (سكرين شوت) ليتم تفعيل اشتراكك وإضافة الرصيد فوراً.
                  </p>
                </div>

                <a
                  href="https://t.me/A_H_QUOTEX_SUPPORT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.664 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  <span>تواصل مع الدعم الفني لتفعيل الاشتراك</span>
                </a>
                
                <button
                  onClick={resetAndClose}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  إغلاق النافذة
                </button>
              </div>
            ) : (
              <>
                {/* Gateway Selection Buttons */}
                <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                اختر وسيلة الإيداع والشحن:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {gateways.map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGateway(g.id)}
                    className={`p-3.5 rounded-2xl border text-right transition-all relative ${
                      selectedGateway === g.id
                        ? 'border-blue-500 bg-blue-500/10 text-white shadow-sm'
                        : 'border-slate-800/60 bg-slate-900/50 text-slate-400 hover:bg-slate-800/50 hover:border-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{g.icon}</span>
                      {selectedGateway === g.id && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                    </div>
                    <div className="mt-2">
                      <div className="text-sm font-bold text-slate-100">{g.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{g.badge}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Gateway Address Card */}
            <div className={`p-5 rounded-2xl bg-gradient-to-br ${activeGw.color} border border-slate-700/50 space-y-5`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider block text-slate-300">
                    {activeGw.network}
                  </span>
                  <span className="text-sm font-bold text-white">{activeGw.name}</span>
                </div>
              </div>

              {/* QR Code */}
              {activeGw.id !== 'binance' && (
                <div className="flex justify-center py-2">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center p-2 border border-slate-800/60">
                    <QRCode
                      value={activeGw.address}
                      size={110}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox={`0 0 110 110`}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-slate-300 block">
                  {selectedGateway === 'binance' ? 'معرف باينانس Pay ID الخاص بنا:' : 'عنوان المحفظة للإيداع:'}
                </span>
                <div className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-center justify-between gap-3">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-blue-300 break-all select-all dir-ltr">
                    {activeGw.address}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(activeGw.address, activeGw.id)}
                    className="p-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 font-medium transition-colors shrink-0 flex items-center gap-1.5 text-xs"
                  >
                    {copiedKey === activeGw.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>نسخ</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {selectedGateway === 'binance'
                    ? 'افتح تطبيق Binance -> اختر Pay -> إرسال -> ادخل الـ Pay ID الموضح أعلاه.'
                    : 'قم بنسخ العنوان وإرسال USDT على الشبكة المحددة بالضبط لتجنب فقدان الأموال.'}
                </span>
              </div>
            </div>

            {/* Quick Recharge Confirmation Form */}
            <form onSubmit={handleConfirmRecharge} className="space-y-5 pt-4 border-t border-slate-800/60">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">مبلغ الشحن ($ USD):</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="10"
                      step="5"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="50"
                      className="w-full pl-16 pr-4 py-2.5 bg-slate-950/50 border border-slate-800/60 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-blue-500/50 transition-colors dir-ltr"
                    />
                    <span className="absolute left-4 top-3 text-xs font-mono font-medium text-slate-400">$ USD</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">رقم المعاملة (TxID / TxHash):</label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={e => setTxHash(e.target.value)}
                    placeholder="اختياري - لتسريع المراجعة"
                    className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-800/60 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-blue-500/50 transition-colors dir-ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>جاري تسجيل الشحن...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>تأكيد إرسال طلب الشحن</span>
                  </>
                )}
              </button>
            </form>
            </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
