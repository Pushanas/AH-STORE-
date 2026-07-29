import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HubLayout } from '../../components/hub/HubLayout';
import { LOGOS } from '../../lib/logos';
import { Zap, Cpu, ShieldAlert, ExternalLink, CheckCircle2, ShieldCheck, Wallet, ArrowUpRight, Send } from 'lucide-react';
import { RechargeModal } from '../../components/ui/RechargeModal';

export const HubOverviewPage: React.FC = () => {
  const { products } = useApp();
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const getBotDetails = (id: string) => {
    switch (id) {
      case 'vip-signals':
        return {
          title: 'بوت زمني',
          subtitle: 'توقيت بالثواني لشمعة 1m و 5m كوتيكس',
          path: '#/hub/workspaces/vip-signals',
          url: localStorage.getItem('bot_url_vip_signals') || 'https://t.me/QuotexTimeBot',
          logo: LOGOS.vipSignals,
          tag: 'كوتيكس ونظم'
        };
      case 'ai-analyzer':
        return {
          title: 'بوت تحليل فني سوق عالمي',
          subtitle: 'تحليل اتجاهات ودعم ومقاومة الأسواق العالمية',
          path: '#/hub/workspaces/ai-analyzer',
          url: localStorage.getItem('bot_url_ai_analyzer') || 'https://t.me/QuotexGlobalBot',
          logo: LOGOS.aiAnalyzer,
          tag: 'سوق عالمي'
        };
      case 'auto-trader':
      default:
        return {
          title: 'بوت تحليل شارت OTC',
          subtitle: 'قراءة شارت OTC وتفادي الاختراقات الوهمية',
          path: '#/hub/workspaces/auto-trader',
          url: localStorage.getItem('bot_url_auto_trader') || 'https://t.me/QuotexOtcBot',
          logo: LOGOS.autoTrader,
          tag: 'شارت OTC'
        };
    }
  };

  return (
    <HubLayout activeTab="overview">
      <div className="space-y-6 dir-rtl">
        {/* Top Hero Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>متجر البوتات المباشرة // جاهز للتشغيل</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              منصة تسويق ومتجر البوتات
            </h1>
            <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
              اختر البوت المناسب وابدأ التشغيل المباشر عبر تليجرام بسهولة وبدون أي تعقيد.
            </p>
          </div>

          <button
            onClick={() => setIsRechargeModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center gap-2 shrink-0"
          >
            <Wallet className="w-4 h-4 text-blue-200" />
            <span>شحن رصيد إيداع +</span>
          </button>
        </div>

        {/* 3 Main Bots Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">قائمة البوتات المتوفرة:</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(prod => {
              const bot = getBotDetails(prod.id);

              return (
                <div
                  key={prod.id}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 flex flex-col justify-between space-y-6 hover:bg-slate-900 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <img
                        src={bot.logo}
                        alt={bot.title}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-300">
                        {bot.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">{bot.title}</h3>
                      <p className="text-sm text-slate-400 mt-1 leading-relaxed">{bot.subtitle}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-950/50 p-2 rounded-lg text-center border border-slate-800/40">
                      <div className="text-[10px] text-slate-400 mb-0.5">اشتراك شهري</div>
                      <div className="text-sm font-bold text-white">$29.99</div>
                    </div>
                    <div className="bg-slate-950/50 p-2 rounded-lg text-center border border-blue-500/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-blue-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg">توفير</div>
                      <div className="text-[10px] text-blue-300 mb-0.5">اشتراك 3 شهور</div>
                      <div className="text-sm font-bold text-blue-400">$89.99</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-800/40">
                    <button
                      onClick={() => setIsRechargeModalOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Wallet className="w-4 h-4 text-blue-200" />
                      <span>BUY - شراء البوت</span>
                    </button>

                    <a
                      href="https://t.me/A_H_QUOTEX_SUPPORT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-blue-400 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.664 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                      <span>تواصل مع الدعم عبر تليجرام</span>
                    </a>

                    <button
                      onClick={() => navigateTo(bot.path)}
                      className="w-full py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-semibold text-sm transition-colors flex items-center justify-center"
                    >
                      <span>عرض التفاصيل</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Deposit Addresses */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-400" />
              <span>وسائل الشحن السريعة</span>
            </h3>
            <button
              onClick={() => navigateTo('#/hub/billing')}
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              عرض التفاصيل ←
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/40 space-y-1.5 flex flex-col justify-center">
              <span className="font-semibold text-sm text-amber-400">بينانس Pay ID</span>
              <span className="font-mono text-slate-300 text-sm font-medium select-all">1078155293</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/40 space-y-1.5 flex flex-col justify-center">
              <span className="font-semibold text-sm text-emerald-400">USDT (TRC20)</span>
              <span className="font-mono text-slate-300 text-xs truncate block select-all dir-ltr">
                TN1fLbmmptRyRGyvnffMeth1SoNhfPq6QX
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/40 space-y-1.5 flex flex-col justify-center">
              <span className="font-semibold text-sm text-blue-400">USDT (BEP20)</span>
              <span className="font-mono text-slate-300 text-xs truncate block select-all dir-ltr">
                0x5f95aa05f877d2fc9a150103d84110047182483e
              </span>
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
