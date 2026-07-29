import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { useApp } from '../../context/AppContext';
import { HubLayout } from '../../components/hub/HubLayout';
import { CreditCard, CheckCircle2, ShieldCheck, Tag, Copy, Check, Wallet, ArrowUpRight } from 'lucide-react';
import { CryptoPaymentModal } from '../../components/ui/CryptoPaymentModal';
import { RechargeModal } from '../../components/ui/RechargeModal';

export const HubBillingPage: React.FC = () => {
  const { addToast } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast({ title: 'تم النسخ!', description: 'تم نسخ العنوان بنجاح.', type: 'success' });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const depositGateways = [
    {
      id: 'binance',
      name: 'بينانس Pay (Binance Pay)',
      badge: 'إيداع فوري ID',
      value: '1078155293',
      color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
      icon: (
        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#FCD535]" fill="currentColor">
            <path d="M11.996 9.877L7.96 13.914l4.036 4.035 4.036-4.035-4.036-4.037z"/>
            <path d="M5.421 11.374l-2.54 2.54 9.115 9.114 9.115-9.114-2.54-2.54-6.575 6.574-6.575-6.574z"/>
            <path d="M11.996 2.39l-9.115 9.115 2.54 2.54 6.575-6.574 6.575 6.574 2.54-2.54z"/>
          </svg>
        </div>
      )
    },
    {
      id: 'trc20',
      name: 'USDT (TRC20 - Tron Network)',
      badge: 'شبكة ترون (سريع جداً)',
      value: 'TN1fLbmmptRyRGyvnffMeth1SoNhfPq6QX',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
      icon: (
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 relative">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#26A17B]" fill="currentColor">
            <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"/>
            <path fill="#FFF" d="M12.986 11.458v6.782h-1.97v-6.782c-3.11-.2-5.5-1.127-5.5-2.222 0-1.096 2.39-2.023 5.5-2.223V4h1.97v2.793c3.11.2 5.5 1.127 5.5 2.223 0 1.095-2.39 2.022-5.5 2.222z"/>
            <path d="M12.986 9.236v-1.78c2.47.16 4.31.815 4.31 1.583 0 .767-1.84 1.423-4.31 1.583v-1.386zm-1.97 0v1.386C8.546 10.46 6.7 9.805 6.7 9.04c0-.768 1.846-1.424 4.316-1.583v1.78z" fill="#26A17B"/>
          </svg>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF060A] rounded-full flex items-center justify-center border-2 border-slate-900">
             <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="currentColor">
               <path d="M10.283 23.322L2 6.84l9.167 15.655 8.165-15.655-9.05 16.482zM12 2L2 5.62l9.045 1.517zM13 3.652l8 2-9 1.5zM22 6.5L12.5 8.8 20.8 19zM2 7.2l9.5 2-8.3 9z"/>
             </svg>
          </div>
        </div>
      )
    },
    {
      id: 'bep20',
      name: 'USDT (BEP20 - BNB Smart Chain)',
      badge: 'شبكة باينانس الذكية',
      value: '0x5f95aa05f877d2fc9a150103d84110047182483e',
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
      icon: (
        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 relative">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#26A17B]" fill="currentColor">
            <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"/>
            <path fill="#FFF" d="M12.986 11.458v6.782h-1.97v-6.782c-3.11-.2-5.5-1.127-5.5-2.222 0-1.096 2.39-2.023 5.5-2.223V4h1.97v2.793c3.11.2 5.5 1.127 5.5 2.223 0 1.095-2.39 2.022-5.5 2.222z"/>
            <path d="M12.986 9.236v-1.78c2.47.16 4.31.815 4.31 1.583 0 .767-1.84 1.423-4.31 1.583v-1.386zm-1.97 0v1.386C8.546 10.46 6.7 9.805 6.7 9.04c0-.768 1.846-1.424 4.316-1.583v1.78z" fill="#26A17B"/>
          </svg>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FCD535] rounded-full flex items-center justify-center border-2 border-slate-900">
             <svg viewBox="0 0 24 24" className="w-3 h-3 text-black" fill="currentColor">
                <path d="M11.996 9.877L7.96 13.914l4.036 4.035 4.036-4.035-4.036-4.037z"/>
                <path d="M5.421 11.374l-2.54 2.54 9.115 9.114 9.115-9.114-2.54-2.54-6.575 6.574-6.575-6.574z"/>
                <path d="M11.996 2.39l-9.115 9.115 2.54 2.54 6.575-6.574 6.575 6.574 2.54-2.54z"/>
             </svg>
          </div>
        </div>
      )
    }
  ];

  return (
    <HubLayout activeTab="billing">
      <div className="space-y-6 dir-rtl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">إدارة الرصيد وعناوين الإيداع الرسمية</h1>
            <p className="text-sm text-slate-400 mt-1">
              شحن الرصيد متوفر فوراً عبر USDT (TRC20 / BEP20) وبينانس Pay ID بشكل مباشر.
            </p>
          </div>
          <button
            onClick={() => setIsRechargeModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>شحن رصيد الآن</span>
          </button>
        </div>

        {/* Deposit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depositGateways.map(gw => (
            <div key={gw.id} className={`p-6 rounded-2xl bg-gradient-to-br ${gw.color} border space-y-5 hover:scale-[1.01] transition-transform`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{gw.icon}</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900/50 border border-slate-700/50 text-[10px] font-semibold text-slate-200">
                  {gw.badge}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{gw.name}</h3>
                <p className="text-xs text-slate-300 mt-1">العنوان المعتمد للإيداع والشحن:</p>
              </div>

              {/* QR Code */}
              {gw.id !== 'binance' && (
                <div className="flex justify-center py-2">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center p-2 border border-slate-800">
                    <QRCode
                      value={gw.value}
                      size={110}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      viewBox={`0 0 110 110`}
                    />
                  </div>
                </div>
              )}

              <div className="p-3 bg-slate-950/50 border border-slate-800/50 rounded-xl flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-blue-300 break-all select-all dir-ltr">
                  {gw.value}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(gw.value, gw.id)}
                  className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 transition-colors shrink-0"
                  title="نسخ العنوان"
                >
                  {copiedKey === gw.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions & Help */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60 space-y-5">
          <div className="flex items-center gap-2 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">تعليمات الإيداع والتفعيل الفوري</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-300 leading-relaxed">
            <div className="space-y-1">
              <span className="font-semibold text-blue-400 block">1. اختر الشبكة:</span>
              <p className="text-slate-400">انسخ عنوان TRC20 أو BEP20 أو بينانس ID الموضح أعلاه.</p>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-blue-400 block">2. حول المبلغ:</span>
              <p className="text-slate-400">قم بتحويل المبلغ المطلوب لشحن حسابك أو الاشتراك في البوتات.</p>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-blue-400 block">3. التفعيل الفوري:</span>
              <p className="text-slate-400">يتم تأكيد الطلب فور تحويل المبلغ وتأكيد المعاملة.</p>
            </div>
          </div>
        </div>
      </div>

      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
      />
    </HubLayout>
  );
};
