import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { LOGOS } from '../../lib/logos';
import {
  Zap,
  Cpu,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ChevronDown,
  Layers,
  Activity,
  BarChart2,
  Clock,
  Sparkles,
  Globe,
  Radio,
  Sliders,
  AlertTriangle
} from 'lucide-react';
import { CryptoPaymentModal } from '../../components/ui/CryptoPaymentModal';
import { SecureLaunchModal } from '../../components/ui/SecureLaunchModal';

export const HomePage: React.FC = () => {
  const { products, plans, user } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [checkoutPlan, setCheckoutPlan] = useState<any>(null);
  const [selectedProductForLaunch, setSelectedProductForLaunch] = useState<any>(null);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const faqs = [
    {
      q: 'What is AH STORE and how does it connect to AH HUB?',
      a: 'AH STORE is our public purchasing platform where you explore product capabilities and subscribe. AH HUB is the authenticated operating system where you launch authorized software, manage subscriptions, view live signals, request AI analyses, and configure automation controls.'
    },
    {
      q: 'How does the Secure Product Launch system protect external bot URLs?',
      a: 'Our platform never exposes permanent destination URLs, secret endpoints, API tokens, or vendor credentials in frontend code or browser network traffic. When you click "Launch Product", backend servers validate your active subscription and generate a short-lived, single-use cryptographic token that renders the authorized workspace securely inside AH HUB.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We support instant global crypto payments via Binance Pay, USDT (TRC20 & BEP20), Bitcoin (BTC), Ethereum (ETH), and TON Network. Access entitlements activate automatically once blockchain network confirmation occurs.'
    },
    {
      q: 'Can I subscribe to a single product or the entire suite?',
      a: 'You can select individual plans for AH VIP Signals, AH AI Analyzer, or AH Auto Trader. Alternatively, the AH HUB Suite bundle grants complete access to all three products with a discount of over 28%.'
    },
    {
      q: 'Is there a guarantee on trading results or signals?',
      a: 'No. In strict compliance with financial regulations, we never promise guaranteed returns, win rates, or financial outcomes. All tools provide technological market research, structured insights, and configurable automation. Users control all risk parameters.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden border-b border-slate-900/50 bg-slate-950">
        {/* Background Ambient Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.15]"
            >
              أفضل أنواع بوتات <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                لي منصه كوتيكس
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              ثلاثة بوتات احترافية متخصصة لمنصة كوتيكس (Quotex): بوت زمني بالثواني، بوت تحليل فني للسوق العالمي، وبوت تحليل شارت OTC.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button
                onClick={() => navigateTo(user ? '#/hub' : '#/register')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 group"
              >
                <span>{user ? 'Open AH HUB Dashboard' : 'Start Free Account'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('#/products')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-slate-200 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore Products</span>
              </button>
            </motion.div>

            {/* Trust Microcopy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Signed Launch Sessions
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-400" /> Zero Exposed Endpoint Secrets
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-violet-400" /> Global Crypto Checkout
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TRUST / PROOF STRIP ================= */}
      <section className="py-10 bg-slate-950 border-b border-slate-900 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-blue-400 mx-auto" />
              <div className="font-bold text-slate-200">Encrypted Sessions</div>
              <div className="text-[11px] text-slate-500">256-Bit SSL Auth</div>
            </div>
            <div className="space-y-1">
              <Lock className="w-5 h-5 text-emerald-400 mx-auto" />
              <div className="font-bold text-slate-200">Zero Url Exposure</div>
              <div className="text-[11px] text-slate-500">Signed Launch Tokens</div>
            </div>
            <div className="space-y-1">
              <Activity className="w-5 h-5 text-violet-400 mx-auto" />
              <div className="font-bold text-slate-200">Real-Time Status</div>
              <div className="text-[11px] text-slate-500">WebSocket Updates</div>
            </div>
            <div className="space-y-1">
              <Globe className="w-5 h-5 text-amber-400 mx-auto" />
              <div className="font-bold text-slate-200">Global Payments</div>
              <div className="text-[11px] text-slate-500">USDT / BTC / ETH / TON</div>
            </div>
            <div className="space-y-1 col-span-2 md:col-span-1">
              <Clock className="w-5 h-5 text-indigo-400 mx-auto" />
              <div className="font-bold text-slate-200">Responsive Support</div>
              <div className="text-[11px] text-slate-500">Dedicated Ticket Desk</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT ECOSYSTEM SECTION ================= */}
      <section className="py-24 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Product Suite</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Three software engines. One command center.
            </h2>
            <p className="text-slate-400 text-sm">
              Each product operates within its own dedicated authenticated workspace inside AH HUB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(prod => {
              const isSignals = prod.id === 'vip-signals';
              const isAi = prod.id === 'ai-analyzer';

              return (
                <motion.div
                  key={prod.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between hover:border-blue-500/50 hover:bg-slate-900 transition-all shadow-xl group"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-800 p-0.5 shadow-md bg-slate-950">
                        <img
                          src={isSignals ? LOGOS.vipSignals : isAi ? LOGOS.aiAnalyzer : LOGOS.autoTrader}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[11px] font-mono font-semibold text-slate-300">
                        {prod.version}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs text-slate-300">
                      {prod.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW AH HUB WORKS ================= */}
      <section className="py-24 bg-slate-900/40 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Seamless Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From account setup to product launch in 4 steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                desc: 'Register your secure AH HUB profile with instant email verification.'
              },
              {
                step: '02',
                title: 'Choose Product Plan',
                desc: 'Select individual plans or the full AH HUB Suite bundle.'
              },
              {
                step: '03',
                title: 'Complete Payment',
                desc: 'Pay globally via USDT, BTC, ETH, TON, or Binance Pay with instant confirmation.'
              },
              {
                step: '04',
                title: 'Launch & Operate',
                desc: 'Access your dedicated product workspace securely inside AH HUB.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative">
                <span className="text-3xl font-black text-blue-500/30 font-mono">{item.step}</span>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPARISON TABLE ================= */}
      <section className="py-24 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Product Matrix</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Compare product capabilities.
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-200 border-b border-slate-800 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Capability</th>
                  <th className="p-4 text-blue-400">AH VIP Signals</th>
                  <th className="p-4 text-violet-400">AH AI Analyzer</th>
                  <th className="p-4 text-emerald-400">AH Auto Trader</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="p-4 font-semibold text-white">Primary Objective</td>
                  <td className="p-4 text-slate-300">Real-Time Market Setup Alerts</td>
                  <td className="p-4 text-slate-300">Gemini Research Synthesis</td>
                  <td className="p-4 text-slate-300">Execution Automation Tools</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Multi-Asset Feeds</td>
                  <td className="p-4 text-emerald-400 font-bold">✓ Included</td>
                  <td className="p-4 text-emerald-400 font-bold">✓ Included</td>
                  <td className="p-4 text-slate-400">User Configured</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">AI Projections</td>
                  <td className="p-4 text-slate-500">—</td>
                  <td className="p-4 text-emerald-400 font-bold">✓ Gemini 2.5 Engine</td>
                  <td className="p-4 text-slate-500">—</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Emergency Stop Switch</td>
                  <td className="p-4 text-slate-500">—</td>
                  <td className="p-4 text-slate-500">—</td>
                  <td className="p-4 text-emerald-400 font-bold">✓ Included (150ms kill)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">API Key Access</td>
                  <td className="p-4 text-slate-400">Read-Only</td>
                  <td className="p-4 text-slate-400">REST Export</td>
                  <td className="p-4 text-emerald-400 font-bold">✓ Full REST & Webhook</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-24 bg-slate-900/30 border-b border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Clear Answers</span>
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-semibold text-sm text-slate-100 flex items-center justify-between hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 border-t border-slate-900/60 bg-slate-950 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Build your market workflow in AH HUB.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Join thousands of traders using AH VIP Signals, AH AI Analyzer, and AH Auto Trader.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigateTo('#/register')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Create Your Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('#/pricing')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-200 font-semibold text-sm transition-colors"
            >
              View Pricing & Plans
            </button>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {checkoutPlan && (
        <CryptoPaymentModal
          plan={checkoutPlan}
          billingInterval="monthly"
          isOpen={!!checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          onSuccess={() => navigateTo('#/hub')}
        />
      )}

      {/* Secure Launch Modal */}
      {selectedProductForLaunch && (
        <SecureLaunchModal
          product={selectedProductForLaunch}
          isOpen={!!selectedProductForLaunch}
          onClose={() => setSelectedProductForLaunch(null)}
        />
      )}
    </div>
  );
};
