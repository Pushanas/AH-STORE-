import {
  User,
  Product,
  Plan,
  Subscription,
  Entitlement,
  VipSignal,
  AiAnalysisReport,
  AutoTraderBot,
  Coupon,
  NotificationItem,
  Announcement,
  SupportTicket,
  AuditLog,
  ChangelogEntry
} from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'vip-signals',
    name: 'بوت زمني (Quotex)',
    tagline: 'تحليل وتوقيت الصفقات بالثانية لمنصة كوتيكس (Quotex Time Bot)',
    description: 'بوت التوقيت الزمني المتقدم لحساب وقت إغلاق الشمعة ودخول الصفقات بالثواني المحددة على منصة Quotex.',
    longDescription: 'بوت زمني هو الأداة المخصصة لمتداولي منصة كوتيكس (Quotex) التي تقدم تحليلاً زمنياً متقدماً لحركة الشمعة. يعتمد البوت على تقنيات العد التنازلي والدورات الزمنية الصارمة لتحديد اللحظة الدقيقة بالثانية لدخول صفقات الـ 1 Minute و 5 Minutes بنسب نجاح عالية.',
    status: 'active',
    version: 'v3.5.0',
    badge: 'كوتيكس زمني',
    iconName: 'Clock',
    features: [
      'توقيت دقيق بدقة الثواني لشمعة 1m و 5m على منصة كوتيكس',
      'إشارات دخول زمني بدعم العداد التنازلي المباشر (Candle Countdown)',
      'متوافق مع حسابات Quotex الحقيقية والتجريبية',
      'تحليل الدورات الزمنية واستراتيجيات انتهاء الصفقة (Expiry Seconds)',
      'تنبيهات صوتية وبصرية فورية عند اكتمال شرط الدخول الزمني',
      'إحصائيات دقيقة لنسبة نجاح الصفقات الزمنية السابقة'
    ],
    eligibilityNote: 'متاح فور الاشتراك في اشتراك البوت الزمني أو باقة AH HUB المتكاملة.',
    requiredPlanIds: ['signals-pro', 'ah-suite']
  },
  {
    id: 'ai-analyzer',
    name: 'بوت تحليل فني سوق عالمي (Quotex)',
    tagline: 'تحليل المؤشرات والاتجاه العام لأسواق كوتيكس العالمية (Global Market Bot)',
    description: 'بوت الذكاء الاصطناعي الفني لتحليل أزواج العملات الحقيقية والذهب (EUR/USD, GBP/USD, Gold) المتاحة في كوتيكس.',
    longDescription: 'بوت تحليل فني سوق عالمي يقوم بتحليل معمق لجميع أزواج الفوركس والمعادن في السوق المباشر لـ Quotex. باستخدام نماذج الذكاء الاصطناعي Gemini، يتم دمج المؤشرات المتقدمة (RSI, Bollinger, MACD) وقراءة خطوط الاتجاه لتقديم قراءة شاملة ونقاط دخول فائقة الدقة.',
    status: 'active',
    version: 'v2.9.0',
    badge: 'ذكاء اصطناعي 2.5',
    iconName: 'Cpu',
    features: [
      'تحليل فني فوري مدعوم بالذكاء الاصطناعي Gemini 2.5',
      'تغطية جميع أزواج العملات العالمية المباشرة على منصة Quotex',
      'رسم تلقائي لمستويات الدعم والمقاومة وخطوط الترند (S/R Levels)',
      'مؤشر قوة الاتجاه ونسبة الاحتمالية لكل اتجاه (صعود / هبوط)',
      'متابعة أوقات السيولة العالمية وتجنب أوقات الأخبار القوية',
      'تصدير تقارير التحليل الفني الشاملة بضغطة زر'
    ],
    eligibilityNote: 'يتطلب اشتراك نشط في بوت تحليل فني سوق عالمي أو باقة AH HUB.',
    requiredPlanIds: ['analyzer-pro', 'ah-suite']
  },
  {
    id: 'auto-trader',
    name: 'بوت تحليل شارت OTC (Quotex)',
    tagline: 'خوارزميات مخصصة لكشف أنماط وسيولة شارت OTC لكوتيكس (Quotex OTC Bot)',
    description: 'بوت متطور متخصص في قراءة حركة الشارت المغلق (Quotex OTC) وتفادي الاختراقات الوهمية.',
    longDescription: 'بوت تحليل شارت OTC مصمم خصيصاً للتداول في أوقات إغلاق السوق العالمي على منصة Quotex. تعتمد خوارزمياته على كشف الأنماط الخاصة بالـ OTC والسيولة الاصطناعية لمنع الخسائر وتوفير إدارات مخاطر صارمة مثل حد الخسارة اليومي وإيقاف الطوارئ.',
    status: 'active',
    version: 'v4.2.0',
    badge: 'خاص بـ OTC كوتيكس',
    iconName: 'ShieldAlert',
    features: [
      'خوارزميات فحص شارت OTC المخصصة لمنصة Quotex',
      'كشف نماذج الشموع الانعكاسية والاستمرارية في سوق الـ OTC',
      'نظام إدارة مخاطر صارم: حد الخسارة اليومي (Daily Loss Cap)',
      'مقبض إيقاف الطوارئ السريع (Emergency Stop Kill-Switch) خلال 150ms',
      'سجل تدقيق أمان كامل لجميع القرارات والإشارات',
      'ربط وتنبيهات مباشرة عبر الـ Webhooks والرابط المباشر'
    ],
    eligibilityNote: 'تطبق شروط إدارة المخاطر. يتطلب اشتراكاً نشطاً.',
    requiredPlanIds: ['trader-pro', 'ah-suite']
  }
];

export const INITIAL_PLANS: Plan[] = [
  {
    id: 'signals-pro',
    name: 'اشتراك بوت زمني (Quotex)',
    tagline: 'للمتداولين الباحثين عن دقة التوقيت بالثانية على كوتيكس',
    monthlyPrice: 49,
    yearlyPrice: 470,
    productIds: ['vip-signals'],
    features: [
      'دخول كامل لبوت زمني (Quotex Time Bot)',
      'تنبيهات فورية بدقة الثواني لشمعة 1m و 5m',
      'تحديثات مستمرة لسيولة الوقت والساعات الذهبية',
      'إحصائيات ونسب نجاح الشموع الزمنية',
      'دعم فني مخصص على مدار الساعة'
    ]
  },
  {
    id: 'analyzer-pro',
    name: 'اشتراك بوت تحليل فني سوق عالمي',
    tagline: 'لتحليل جميع أزواج الفوركس والذهب الحقيقية على كوتيكس',
    monthlyPrice: 79,
    yearlyPrice: 750,
    productIds: ['ai-analyzer'],
    features: [
      'دخول كامل لبوت التحليل الفني للسوق العالمي',
      'تحليلات ذكاء اصطناعي غير محدودة مدعومة بـ Gemini 2.5',
      'تغطي كافة أزواج العملات المباشرة والذهب على Quotex',
      'استخراج خطوط الدعم والمقاومة والترند المباشر',
      'تنبيهات الأخبار والسيولة العالية'
    ]
  },
  {
    id: 'trader-pro',
    name: 'اشتراك بوت تحليل شارت OTC',
    tagline: 'للتداول الآمن ودراسة أنماط شارت كوتيكس OTC',
    monthlyPrice: 149,
    yearlyPrice: 1430,
    productIds: ['auto-trader'],
    features: [
      'دخول كامل لبوت تحليل شارت OTC لكوتيكس',
      'خوارزميات كشف سيولة الـ OTC والأنماط التكرارية',
      'حدود حماية الرصيد وإيقاف الخسارة اليومية',
      'مقبض إيقاف الطوارئ الفوري بنقرة واحدة',
      'دعم مباشر لتهيئة استراتيجية الـ OTC'
    ],
    riskNote: 'ينصح دائماً بالتداول وفق إدارة رأس مال صارمة.'
  },
  {
    id: 'ah-suite',
    name: 'باقة بوتات كوتيكس المتكاملة (Quotex All-in-One)',
    tagline: 'الوصول الكامل لجميع البوتات الثلاثة برخصة موحدة',
    monthlyPrice: 199,
    yearlyPrice: 1890,
    featured: true,
    productIds: ['vip-signals', 'ai-analyzer', 'auto-trader'],
    features: [
      'وصول غير محدود لجميع البوتات الثلاثة على منصة Quotex',
      'بوت زمني + بوت تحليل فني سوق عالمي + بوت تحليل شارت OTC',
      'لوحة تحكم موحدة وإدارة اشتراك واحدة',
      'خصم يتجاوز 30% مقارنة بالاشتراكات المنفصلة',
      'أولوية الدعم الفني وتحديثات فورية للبوتات'
    ],
    riskNote: 'تشمل جميع البوتات الثلاثة لمنصة كوتيكس.'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'usr_demo_123',
    name: 'Alexander Harrison',
    email: 'alex@ahstore.com',
    role: 'user',
    country: 'United Kingdom',
    twoFactorEnabled: true,
    createdAt: '2025-01-15T10:30:00Z',
    lastLogin: '2026-07-29T06:30:00Z'
  },
  {
    id: 'usr_admin_999',
    name: 'Platform Administrator',
    email: 'admin@ahstore.com',
    role: 'super_admin',
    country: 'United States',
    twoFactorEnabled: true,
    createdAt: '2024-11-01T08:00:00Z',
    lastLogin: '2026-07-29T06:45:00Z'
  }
];

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub_demo_1001',
    userId: 'usr_demo_123',
    planId: 'ah-suite',
    status: 'active',
    billingInterval: 'monthly',
    currentPeriodStart: '2026-07-01T00:00:00Z',
    currentPeriodEnd: '2026-08-01T00:00:00Z',
    cancelAtPeriodEnd: false,
    paymentMethod: 'usdt_trc20',
    amount: 199,
    currency: 'USD'
  }
];

export const INITIAL_ENTITLEMENTS: Entitlement[] = [
  {
    id: 'ent_1',
    userId: 'usr_demo_123',
    productId: 'vip-signals',
    planId: 'ah-suite',
    active: true,
    expiresAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'ent_2',
    userId: 'usr_demo_123',
    productId: 'ai-analyzer',
    planId: 'ah-suite',
    active: true,
    expiresAt: '2026-08-01T00:00:00Z'
  },
  {
    id: 'ent_3',
    userId: 'usr_demo_123',
    productId: 'auto-trader',
    planId: 'ah-suite',
    active: true,
    expiresAt: '2026-08-01T00:00:00Z'
  }
];

export const INITIAL_SIGNALS: VipSignal[] = [
  {
    id: 'sig_101',
    symbol: 'EUR/USD (Quotex Live)',
    assetClass: 'Forex',
    direction: 'LONG',
    entryRange: '1.0850 (دخول زمني: دقيقة 00:00)',
    takeProfitTargets: ['صعود (CALL)', 'انتهاء: 1 Min', 'نسبة ربح كوتيكس 92%'],
    stopLoss: 'تأكيد الإغلاق الزمني',
    timeframe: '1M',
    confidenceScore: 94,
    riskRewardRatio: 'Quotex 1m Time',
    status: 'ACTIVE',
    timestamp: '2026-07-29T07:15:00Z',
    analysisText: 'البوت الزمني: بداية دورة انعكاسية زمنية عند الثانية 00 مع ارتداد قوي من مستوى الدعم.'
  },
  {
    id: 'sig_102',
    symbol: 'GBP/USD OTC (Quotex)',
    assetClass: 'OTC Market',
    direction: 'SHORT',
    entryRange: '1.2740 (دخول زمني: دقيقة 00:00)',
    takeProfitTargets: ['هبوط (PUT)', 'انتهاء: 5 Min', 'نسبة ربح كوتيكس 95%'],
    stopLoss: 'تأكيد الإغلاق الزمني',
    timeframe: '5M',
    confidenceScore: 91,
    riskRewardRatio: 'Quotex 5m OTC',
    status: 'TARGET_HIT',
    timestamp: '2026-07-29T06:50:00Z',
    analysisText: 'بوت OTC: تم كشف نمط السيولة الاصطناعية وهبوط حاد مع نهاية الـ 5 دقائق.'
  },
  {
    id: 'sig_103',
    symbol: 'USD/JPY (Quotex Live)',
    assetClass: 'Forex',
    direction: 'LONG',
    entryRange: '154.20 (دخول فني)',
    takeProfitTargets: ['صعود (CALL)', 'انتهاء: 1 Min', 'نسبة ربح كوتيكس 89%'],
    stopLoss: 'تأكيد الدعم 154.10',
    timeframe: '1M',
    confidenceScore: 88,
    riskRewardRatio: 'Quotex Global',
    status: 'ACTIVE',
    timestamp: '2026-07-29T06:30:00Z',
    analysisText: 'بوت السوق العالمي: اختراق اتجاه صاعد مع تأكيد من مؤشر RSI وشمعة ابتلاعية.'
  },
  {
    id: 'sig_104',
    symbol: 'AUD/CAD OTC (Quotex)',
    assetClass: 'OTC Market',
    direction: 'LONG',
    entryRange: '0.9125 (دخول زمني)',
    takeProfitTargets: ['صعود (CALL)', 'انتهاء: 1 Min', 'نسبة ربح كوتيكس 93%'],
    stopLoss: 'تأكيد الدعم 0.9115',
    timeframe: '1M',
    confidenceScore: 92,
    riskRewardRatio: 'Quotex OTC',
    status: 'ACTIVE',
    timestamp: '2026-07-29T06:00:00Z',
    analysisText: 'بوت OTC: اكتمال شمعة الهامور وتأكيد الصعود عند الدقيقة المحددة.'
  }
];

export const INITIAL_AI_REPORTS: AiAnalysisReport[] = [
  {
    id: 'rep_201',
    symbol: 'EUR/USD (Quotex)',
    assetName: 'يورو / دولار - كوتيكس',
    timeframe: '1m / 5m',
    overallSentiment: 'BULLISH',
    confidenceScore: 92,
    keyDrivers: [
      'اختراق مستوى مقاومة هامي على فريم الـ 5 دقائق',
      'مؤشر RSI يظهر قاعاً مزدوجاً عند مستوى 35',
      'تطابق إشارات البوت الزمني مع الشمعة التالية'
    ],
    technicalSummary: 'السعر يتجه لإغلاق شمعة صاعدة قوية على كوتيكس. يفضل دخول صفقة صعود (CALL) مع بداية الدقيقة الجديدة.',
    macroOverview: 'سيولة عالية في جلسة لندن تدعم استمرار الصعود الحاد.',
    scenarios: {
      bullishCase: 'دخول صعود (CALL) لمدة 1-2 دقيقة بنسبة نجاح متوقعة 92%.',
      bearishCase: 'في حال كسر مستوى 1.0840، تجنب الدخول والانتظار.',
      baseCase: 'تذبذب صاعد منتظم متوافق مع خوارزمية البوت.'
    },
    createdAt: '2026-07-29T07:00:00Z'
  },
  {
    id: 'rep_202',
    symbol: 'GBP/USD OTC',
    assetName: 'باوند / دولار OTC - كوتيكس',
    timeframe: '1m / 5m',
    overallSentiment: 'BEARISH',
    confidenceScore: 89,
    keyDrivers: [
      'نمط انعكاسي قوي على شارت الـ OTC الخاص بـ Quotex',
      'ضعف سيولة الشراء عند مستوى المقاومة المرتفع'
    ],
    technicalSummary: 'تحليل شارت الـ OTC يشير إلى هبوط حاد متوقع مع بداية الشمعة التالية.',
    macroOverview: 'شارت OTC كوتيكس يعكس اتجاهاً هابطاً منظماً.',
    scenarios: {
      bullishCase: 'اختراق غير متوقع أعلى المستوى السابق يلغي الإشارة.',
      bearishCase: 'دخول صفقة هبوط (PUT) لمدة 1 دقيقة بنسبة نجاح 89%.',
      baseCase: 'استمرار الهبوط التدريجي وفق نمط خوارزمية OTC.'
    },
    createdAt: '2026-07-29T06:45:00Z'
  }
];

export const INITIAL_TRADER_BOTS: AutoTraderBot[] = [
  {
    id: 'bot_301',
    name: 'بوت زمني - كوتيكس (1m Timer)',
    strategy: 'دخول زمني بدقة الثانية (Candle Countdown)',
    status: 'RUNNING',
    pairs: ['EUR/USD', 'GBP/USD OTC', 'USD/JPY OTC'],
    maxDrawdownLimitPct: 3.5,
    dailyLossCapUsd: 500,
    tradeSizeUsd: 50,
    totalTrades: 320,
    winRatePct: 88.5,
    pnlPercentage: 24.8,
    lastExecution: '2026-07-29T07:14:00Z',
    riskLevel: 'MODERATE'
  },
  {
    id: 'bot_302',
    name: 'بوت تحليل شارت OTC - كوتيكس',
    strategy: 'كشف أنماط الـ OTC والسيولة الاصطناعية',
    status: 'RUNNING',
    pairs: ['EUR/JPY OTC', 'AUD/CAD OTC', 'GBP/JPY OTC'],
    maxDrawdownLimitPct: 2.0,
    dailyLossCapUsd: 300,
    tradeSizeUsd: 30,
    totalTrades: 215,
    winRatePct: 91.2,
    pnlPercentage: 18.4,
    lastExecution: '2026-07-29T07:10:00Z',
    riskLevel: 'CONSERVATIVE'
  },
  {
    id: 'bot_303',
    name: 'بوت تحليل فني سوق عالمي - كوتيكس',
    strategy: 'مؤشرات اتجاه ومستويات دعم/مقاومة',
    status: 'RUNNING',
    pairs: ['EUR/USD', 'GBP/USD', 'XAU/USD'],
    maxDrawdownLimitPct: 4.0,
    dailyLossCapUsd: 600,
    tradeSizeUsd: 100,
    totalTrades: 180,
    winRatePct: 86.4,
    pnlPercentage: 31.2,
    lastExecution: '2026-07-29T07:05:00Z',
    riskLevel: 'MODERATE'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup_1',
    code: 'LAUNCH20',
    discountType: 'percentage',
    discountValue: 20,
    expiresAt: '2026-12-31T23:59:59Z',
    maxRedemptions: 500,
    currentRedemptions: 84,
    active: true
  },
  {
    id: 'coup_2',
    code: 'AHVIP50',
    discountType: 'fixed',
    discountValue: 50,
    expiresAt: '2026-10-01T00:00:00Z',
    maxRedemptions: 100,
    currentRedemptions: 21,
    active: true,
    applicablePlanIds: ['ah-suite']
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_901',
    userId: 'usr_demo_123',
    userEmail: 'alex@ahstore.com',
    action: 'PRODUCT_LAUNCH',
    target: 'AH VIP Signals Workspace',
    ipAddress: '185.220.101.5',
    timestamp: '2026-07-29T06:15:22Z',
    metadata: { tokenType: 'short_lived_nonce', durationSec: 3600 }
  },
  {
    id: 'log_902',
    userId: 'usr_demo_123',
    userEmail: 'alex@ahstore.com',
    action: 'SUBSCRIPTION_RENEWAL',
    target: 'AH HUB Suite (Monthly)',
    ipAddress: '185.220.101.5',
    timestamp: '2026-07-01T00:01:10Z',
    metadata: { paymentMethod: 'usdt_trc20', amount: 199 }
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_1',
    title: 'AH VIP Signals Engine Upgrade v3.4',
    content: 'We have deployed lower latency alert processing and added Gold (XAU/USD) structured signals.',
    severity: 'update',
    publishedAt: '2026-07-25T12:00:00Z',
    targetAudience: 'all',
    active: true
  },
  {
    id: 'ann_2',
    title: 'Scheduled Maintenance Notice',
    content: 'Routine server optimization will occur on August 2nd between 02:00 - 02:30 UTC. Product launches remain active.',
    severity: 'info',
    publishedAt: '2026-07-28T09:00:00Z',
    targetAudience: 'all',
    active: true
  }
];

export const INITIAL_CHANGELOG: ChangelogEntry[] = [
  {
    id: 'chg_1',
    productId: 'vip-signals',
    version: 'v3.4.1',
    title: 'Multi-Asset Expansion & Custom Push Filters',
    releaseDate: 'July 24, 2026',
    changes: [
      { type: 'feature', description: 'Added XAU/USD and Index setups with configurable R:R thresholds.' },
      { type: 'improvement', description: 'Reduced notification delivery latency to under 120ms.' },
      { type: 'fix', description: 'Fixed websocket reconnect sync on mobile Safari.' }
    ]
  },
  {
    id: 'chg_2',
    productId: 'ai-analyzer',
    version: 'v2.8.0',
    title: 'Gemini 2.5 Market Synthesis Engine',
    releaseDate: 'July 18, 2026',
    changes: [
      { type: 'feature', description: 'Integrated Gemini 2.5 flash reasoning for scenario modeling.' },
      { type: 'feature', description: 'Added export to formatted PDF research report.' }
    ]
  },
  {
    id: 'chg_3',
    productId: 'auto-trader',
    version: 'v4.1.0',
    title: 'Hardened Risk Limits & Instant Kill-Switch',
    releaseDate: 'July 10, 2026',
    changes: [
      { type: 'security', description: 'Enforced server-side confirmation audit logs for Emergency Stop actions.' },
      { type: 'feature', description: 'Added custom daily loss cap locking engine.' }
    ]
  }
];
