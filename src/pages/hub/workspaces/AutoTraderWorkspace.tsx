import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { HubLayout } from '../../../components/hub/HubLayout';
import { LOGOS } from '../../../lib/logos';
import { ShieldAlert, ExternalLink, Copy, Check, ShieldCheck, Sparkles, Send, Settings, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const AutoTraderWorkspace: React.FC = () => {
  const { addToast } = useApp();
  const [botUrl, setBotUrl] = useState<string>(
    localStorage.getItem('bot_url_auto_trader') || 'https://t.me/QuotexOtcBot'
  );
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('bot_url_auto_trader', botUrl);
    setIsEditingUrl(false);
    addToast({ title: 'تم حفظ الرابط!', description: 'تم تحديث رابط بوت تحليل شارت OTC بنجاح.', type: 'success' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(botUrl);
    setCopied(true);
    addToast({ title: 'تم النسخ!', description: 'تم نسخ رابط البوت إلى الحافظة.', type: 'info' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <HubLayout activeTab="auto-trader">
      <div className="space-y-8 max-w-5xl mx-auto dir-rtl">
        {/* Main Showcase Hero Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

          {/* Bot Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="flex items-center gap-5">
              <img
                src={LOGOS.autoTrader}
                alt="بوت تحليل شارت OTC Logo"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xl"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">بوت تحليل شارت OTC (Quotex OTC)</h1>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                    نشط ورسمي 100%
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                  خوارزمية مخصصة لقراءة حركة أسواق كوتيكس OTC وتفادي الاختراقات الوهمية.
                </p>
              </div>
            </div>

            {/* Direct Launch Button */}
            <a
              href={botUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 hover:scale-[1.02] shrink-0"
            >
              <Send className="w-5 h-5 text-emerald-200" />
              <span>🚀 تشغيل البوت في تليجرام</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-200" />
            </a>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">السوق المستهدف</span>
              <span className="text-lg font-black text-emerald-400 font-mono">Quotex OTC</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">كشف الاختراقات</span>
              <span className="text-lg font-black text-blue-400 font-mono">Anti-Fakeout</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">السيولة المكتشفة</span>
              <span className="text-lg font-black text-amber-400 font-mono">Liquidity Tracker</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">معدل النجاح</span>
              <span className="text-lg font-black text-violet-400 font-mono">93.1% OTC Winrate</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>مميزات خوارزمية تحليل أسواق OTC:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">حماية فائقة من الاختراقات الوهمية (Anti-Fakeout)</h4>
                  <p className="text-xs text-slate-400 mt-1">يميز البوت بين الكسر الحقيقي والاختراق الوهمي الذي يحدث متكرراً في خوارزميات OTC.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">قراءة شمعية متقدمة لأسواق كوتيكس OTC</h4>
                  <p className="text-xs text-slate-400 mt-1">مصمم خصيصاً للتكيف مع سلوك أسواق عطلة نهاية الأسبوع وأزواج OTC المخصصة.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">إشارات لصفقات 1 دقيقة و 5 دقائق</h4>
                  <p className="text-xs text-slate-400 mt-1">إشارات واضحة تحدد الزوج، وقت الدخول بالضبط، والمدة الزمنية الموصى بها.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">إدارة المخاطر وحجم الصفقة</h4>
                  <p className="text-xs text-slate-400 mt-1">توصيات مدمجة لإدارة رأس المال وتحديد القيمة المناسبة للتداول دون مخاطرة.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bot Link Customizer / Admin Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" />
                <span>رابط البوت المباشر (تعديل الرابط الخارجي):</span>
              </span>
              <button
                type="button"
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="text-xs text-emerald-400 hover:underline font-semibold"
              >
                {isEditingUrl ? 'إلغاء التعديل' : 'تعديل الرابط'}
              </button>
            </div>

            {isEditingUrl ? (
              <form onSubmit={handleSaveUrl} className="flex gap-2">
                <input
                  type="url"
                  value={botUrl}
                  onChange={e => setBotUrl(e.target.value)}
                  placeholder="https://t.me/YourBotUsername"
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono dir-ltr focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all"
                >
                  حفظ الرابط
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <span className="font-mono text-xs text-emerald-300 truncate dir-ltr select-all">{botUrl}</span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </HubLayout>
  );
};
