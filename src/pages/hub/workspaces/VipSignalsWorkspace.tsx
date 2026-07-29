import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { HubLayout } from '../../../components/hub/HubLayout';
import { LOGOS } from '../../../lib/logos';
import { Zap, ExternalLink, Copy, Check, ShieldCheck, Clock, Sparkles, Send, Settings, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const VipSignalsWorkspace: React.FC = () => {
  const { addToast } = useApp();
  const [botUrl, setBotUrl] = useState<string>(
    localStorage.getItem('bot_url_vip_signals') || 'https://t.me/QuotexTimeBot'
  );
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('bot_url_vip_signals', botUrl);
    setIsEditingUrl(false);
    addToast({ title: 'تم حفظ الرابط!', description: 'تم تحديث رابط البوت الخاص بك بنجاح.', type: 'success' });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(botUrl);
    setCopied(true);
    addToast({ title: 'تم النسخ!', description: 'تم نسخ رابط البوت إلى الحافظة.', type: 'info' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <HubLayout activeTab="vip-signals">
      <div className="space-y-8 max-w-5xl mx-auto dir-rtl">
        {/* Main Showcase Hero Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

          {/* Bot Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="flex items-center gap-5">
              <img
                src={LOGOS.vipSignals}
                alt="بوت زمني Logo"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/40 shadow-xl"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">بوت زمني (Quotex Time Bot)</h1>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                    نشط ورسمي 100%
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                  توقيت دخول الصفقات بالثواني لشمعة 1m و 5m على منصة كوتيكس مباشرة بدون تأخير.
                </p>
              </div>
            </div>

            {/* Direct Launch Button */}
            <a
              href={botUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-3 hover:scale-[1.02] shrink-0"
            >
              <Send className="w-5 h-5 text-blue-200" />
              <span>🚀 تشغيل البوت في تليجرام</span>
              <ArrowUpRight className="w-4 h-4 text-blue-200" />
            </a>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">دقة التوقيت</span>
              <span className="text-lg font-black text-blue-400 font-mono">00s Precision</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">الأطر الزمنية</span>
              <span className="text-lg font-black text-emerald-400 font-mono">1m & 5m Charts</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">المنصة المستهدفة</span>
              <span className="text-lg font-black text-amber-400 font-mono">Quotex System</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">معدل النجاح</span>
              <span className="text-lg font-black text-violet-400 font-mono">92.4% Verified</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>مميزات ومواصفات البوت الزمني:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">دقة التوقيت بالثانية (Second Precision)</h4>
                  <p className="text-xs text-slate-400 mt-1">يعطي البوت إشارة الدخول بالضبط عند الثانية 00 لافتتاح الشمعة التالية على كوتيكس.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">تحليل حركة الشموع (Candlestick Momentum)</h4>
                  <p className="text-xs text-slate-400 mt-1">يقرأ زخم الشمعة الحالية ويتوقع الاتجاه القادم بدقة متناهية.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">تنبيهات فورية في التليجرام</h4>
                  <p className="text-xs text-slate-400 mt-1">تصلك الإشارة مباشرة في قناتك أو عبر البوت مع تحديد نوع الصفقة (صعود CALL / هبوط PUT).</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200"> متوافق مع كافة أزواج كوتيكس</h4>
                  <p className="text-xs text-slate-400 mt-1">يعمل على العملات الأجنبية وسوق OTC والسوق العالمي بكفاءة عالية.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bot Link Customizer / Admin Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                <span>رابط البوت المباشر (تعديل الرابط الخارجي):</span>
              </span>
              <button
                type="button"
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="text-xs text-blue-400 hover:underline font-semibold"
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
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono dir-ltr focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all"
                >
                  حفظ الرابط
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between gap-3 p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                <span className="font-mono text-xs text-blue-300 truncate dir-ltr select-all">{botUrl}</span>
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
