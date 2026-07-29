import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_PRODUCTS,
  INITIAL_PLANS,
  MOCK_USERS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_ENTITLEMENTS,
  INITIAL_SIGNALS,
  INITIAL_AI_REPORTS,
  INITIAL_TRADER_BOTS,
  INITIAL_COUPONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CHANGELOG
} from './src/data/mockDb';
import {
  User,
  Product,
  Plan,
  Subscription,
  Entitlement,
  PaymentIntent,
  LaunchSession,
  VipSignal,
  AiAnalysisReport,
  AutoTraderBot,
  Coupon,
  AuditLog,
  SupportTicket,
  Announcement,
  ChangelogEntry
} from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database State Engine
let users: User[] = [...MOCK_USERS];
let products: Product[] = [...INITIAL_PRODUCTS];
let plans: Plan[] = [...INITIAL_PLANS];
let subscriptions: Subscription[] = [...INITIAL_SUBSCRIPTIONS];
let entitlements: Entitlement[] = [...INITIAL_ENTITLEMENTS];
let paymentIntents: PaymentIntent[] = [];
let launchSessions: Record<string, LaunchSession> = {};
let vipSignals: VipSignal[] = [...INITIAL_SIGNALS];
let aiReports: AiAnalysisReport[] = [...INITIAL_AI_REPORTS];
let traderBots: AutoTraderBot[] = [...INITIAL_TRADER_BOTS];
let coupons: Coupon[] = [...INITIAL_COUPONS];
let auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
let announcements: Announcement[] = [...INITIAL_ANNOUNCEMENTS];
let changelog: ChangelogEntry[] = [...INITIAL_CHANGELOG];
let supportTickets: SupportTicket[] = [
  {
    id: 'tkt_701',
    userId: 'usr_demo_123',
    userName: 'Alexander Harrison',
    userEmail: 'alex@ahstore.com',
    subject: 'Question regarding Auto Trader emergency risk limit',
    category: 'Product Launch',
    status: 'open',
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    messages: [
      {
        id: 'msg_1',
        sender: 'user',
        senderName: 'Alexander Harrison',
        content: 'Hi AH Team, how quickly does the Emergency Stop kill switch cancel orders?',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: 'msg_2',
        sender: 'support',
        senderName: 'Senior Support Lead',
        content: 'Hello Alexander! The kill switch triggers server-side order cancellation within ~150ms and logs an immutable security event.',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ]
  }
];

// Helper: Lazy load Gemini AI Client
function getGeminiAi() {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey: key });
}

// Helper: Audit logging
function addAuditLog(userId: string, userEmail: string, action: string, target: string, metadata?: Record<string, any>) {
  const newLog: AuditLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId,
    userEmail,
    action,
    target,
    ipAddress: '185.220.101.5',
    timestamp: new Date().toISOString(),
    metadata
  };
  auditLogs.unshift(newLog);
  if (auditLogs.length > 200) auditLogs.pop();
}

// Helper: Crypto address generator (User specified official deposit addresses)
function generateCryptoDetails(method: string, amountUsd: number) {
  const addresses: Record<string, string> = {
    binance: '1078155293',
    usdt_trc20: 'TN1fLbmmptRyRGyvnffMeth1SoNhfPq6QX',
    usdt_bep20: '0x5f95aa05f877d2fc9a150103d84110047182483e',
    btc: 'TN1fLbmmptRyRGyvnffMeth1SoNhfPq6QX',
    eth: '0x5f95aa05f877d2fc9a150103d84110047182483e',
    ton: 'TN1fLbmmptRyRGyvnffMeth1SoNhfPq6QX'
  };

  const cryptoRates: Record<string, { rate: number; symbol: string }> = {
    binance: { rate: 1, symbol: 'USDT (Binance ID)' },
    usdt_trc20: { rate: 1, symbol: 'USDT (TRC20)' },
    usdt_bep20: { rate: 1, symbol: 'USDT (BEP20)' },
    btc: { rate: 118400, symbol: 'BTC' },
    eth: { rate: 3880, symbol: 'ETH' },
    ton: { rate: 6.85, symbol: 'TON' }
  };

  const address = addresses[method] || addresses['usdt_trc20'];
  const info = cryptoRates[method] || cryptoRates['usdt_trc20'];
  const cryptoAmount = (amountUsd / info.rate).toFixed(method === 'btc' ? 6 : method === 'eth' ? 4 : 2);

  return {
    address,
    cryptoAmount: `${cryptoAmount} ${info.symbol}`
  };
}

/* ==========================================================================
   API ROUTES (/api/v1/*)
   ========================================================================== */

// Auth Endpoints
app.post('/api/v1/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  user.lastLogin = new Date().toISOString();
  addAuditLog(user.id, user.email, 'USER_LOGIN', 'Authentication Portal');
  res.json({
    token: `token_${user.id}_${Date.now()}`,
    user
  });
});

app.post('/api/v1/auth/register', (req: Request, res: Response) => {
  const { name, email, password, country } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const newUser: User = {
    id: `usr_${Date.now()}`,
    name,
    email,
    role: 'user',
    country: country || 'International',
    twoFactorEnabled: false,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

  users.push(newUser);
  addAuditLog(newUser.id, newUser.email, 'USER_REGISTER', 'AH HUB Platform');

  res.json({
    token: `token_${newUser.id}_${Date.now()}`,
    user: newUser
  });
});

app.get('/api/v1/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Default demo user fallback for smooth demo preview experience
    const demoUser = users.find(u => u.id === 'usr_demo_123') || users[0];
    return res.json({ user: demoUser });
  }
  const userId = authHeader.replace('Bearer ', '').split('_')[1];
  const user = users.find(u => u.id === userId) || users[0];
  res.json({ user });
});

// Products & Plans
app.get('/api/v1/products', (req: Request, res: Response) => {
  res.json({ products });
});

app.get('/api/v1/plans', (req: Request, res: Response) => {
  res.json({ plans });
});

// Payments & Subscriptions
app.post('/api/v1/payments/create-intent', (req: Request, res: Response) => {
  const { userId, planId, billingInterval, paymentMethod, couponCode } = req.body;
  const targetUser = users.find(u => u.id === userId) || users[0];
  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    return res.status(400).json({ error: 'Selected plan not found.' });
  }

  let basePrice = billingInterval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  
  // Apply coupon discount if applicable
  if (couponCode) {
    const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.active);
    if (coupon) {
      if (coupon.discountType === 'percentage') {
        basePrice = basePrice * (1 - coupon.discountValue / 100);
      } else {
        basePrice = Math.max(0, basePrice - coupon.discountValue);
      }
      coupon.currentRedemptions += 1;
    }
  }

  const details = generateCryptoDetails(paymentMethod || 'usdt_trc20', basePrice);
  const intent: PaymentIntent = {
    id: `pi_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId: targetUser.id,
    planId: plan.id,
    billingInterval: billingInterval || 'monthly',
    amount: basePrice,
    currency: 'USD',
    paymentMethod: paymentMethod || 'usdt_trc20',
    cryptoAddress: details.address,
    cryptoAmount: details.cryptoAmount,
    status: 'pending',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 mins window
  };

  paymentIntents.push(intent);
  addAuditLog(targetUser.id, targetUser.email, 'PAYMENT_INTENT_CREATED', `Plan: ${plan.name}`, { intentId: intent.id, amount: basePrice });

  res.json({ intent });
});

app.get('/api/v1/payments/:id/status', (req: Request, res: Response) => {
  const intent = paymentIntents.find(p => p.id === req.params.id);
  if (!intent) {
    return res.status(404).json({ error: 'Payment intent not found.' });
  }
  res.json({ intent });
});

// Simulate Crypto Deposit Confirmation (Verifies payment server-side & activates subscription)
app.post('/api/v1/payments/:id/simulate-confirm', (req: Request, res: Response) => {
  const intent = paymentIntents.find(p => p.id === req.params.id);
  if (!intent) {
    return res.status(404).json({ error: 'Payment intent not found.' });
  }

  intent.status = 'confirmed';
  intent.confirmedAt = new Date().toISOString();
  intent.transactionHash = `0x${Math.random().toString(36).substring(2, 18)}${Math.random().toString(36).substring(2, 18)}`;

  // Deactivate old active subscriptions for user
  subscriptions.forEach(sub => {
    if (sub.userId === intent.userId && sub.status === 'active') {
      sub.status = 'canceled';
    }
  });

  // Create active subscription
  const plan = plans.find(p => p.id === intent.planId);
  const periodMs = intent.billingInterval === 'yearly' ? 365 * 24 * 3600 * 1000 : 30 * 24 * 3600 * 1000;
  const newSub: Subscription = {
    id: `sub_${Date.now()}`,
    userId: intent.userId,
    planId: intent.planId,
    status: 'active',
    billingInterval: intent.billingInterval,
    currentPeriodStart: new Date().toISOString(),
    currentPeriodEnd: new Date(Date.now() + periodMs).toISOString(),
    cancelAtPeriodEnd: false,
    paymentMethod: intent.paymentMethod,
    amount: intent.amount,
    currency: 'USD'
  };
  subscriptions.push(newSub);

  // Re-generate entitlements
  entitlements = entitlements.filter(e => e.userId !== intent.userId);
  if (plan) {
    plan.productIds.forEach((prodId, idx) => {
      entitlements.push({
        id: `ent_${Date.now()}_${idx}`,
        userId: intent.userId,
        productId: prodId,
        planId: plan.id,
        active: true,
        expiresAt: newSub.currentPeriodEnd
      });
    });
  }

  const targetUser = users.find(u => u.id === intent.userId) || users[0];
  addAuditLog(targetUser.id, targetUser.email, 'PAYMENT_VERIFIED_CONFIRMED', `Plan: ${plan?.name}`, {
    intentId: intent.id,
    txHash: intent.transactionHash
  });

  res.json({
    success: true,
    intent,
    subscription: newSub,
    entitlements: entitlements.filter(e => e.userId === intent.userId)
  });
});

app.get('/api/v1/subscriptions/me', (req: Request, res: Response) => {
  const userId = req.query.userId as string || 'usr_demo_123';
  const userSubs = subscriptions.filter(s => s.userId === userId && s.status === 'active');
  const userEnts = entitlements.filter(e => e.userId === userId && e.active);

  res.json({
    subscriptions: userSubs,
    entitlements: userEnts
  });
});

/* ==========================================================================
   SECURE PRODUCT LAUNCH ARCHITECTURE (/api/v1/products/:productId/launch)
   ========================================================================== */
app.post('/api/v1/products/:productId/launch', (req: Request, res: Response) => {
  const { productId } = req.params;
  const { userId } = req.body;
  const targetUserId = userId || 'usr_demo_123';
  const user = users.find(u => u.id === targetUserId) || users[0];

  // 1. Verify product existence & maintenance status
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  if (product.status === 'maintenance') {
    return res.status(403).json({ error: 'Product is currently under maintenance. Please try again later.' });
  }

  // 2. Verify server-side entitlement
  const hasEntitlement = entitlements.some(
    e => e.userId === targetUserId && e.productId === productId && e.active && new Date(e.expiresAt) > new Date()
  );

  if (!hasEntitlement) {
    addAuditLog(user.id, user.email, 'LAUNCH_DENIED_NO_ENTITLEMENT', `Product: ${product.name}`);
    return res.status(403).json({
      error: `Active subscription to ${product.name} required. Please subscribe or upgrade your plan in AH HUB.`
    });
  }

  // 3. Generate short-lived, single-use signed launch session
  const token = `launch_token_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
  const nonce = `nonce_${Math.random().toString(36).substring(2, 10)}`;
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour validity

  const session: LaunchSession = {
    token,
    productId: productId as any,
    userId: targetUserId,
    expiresAt,
    nonce,
    launchedAt: new Date().toISOString()
  };

  launchSessions[token] = session;

  addAuditLog(user.id, user.email, 'SECURE_PRODUCT_LAUNCHED', `Product: ${product.name}`, { token, nonce });

  // Return ONLY the short-lived application launch token to the client. NO secret URLs!
  res.json({
    success: true,
    launchToken: token,
    productId,
    productName: product.name,
    expiresAt,
    internalLaunchPath: `/hub/launch/${token}`
  });
});

app.get('/api/v1/launch/verify/:token', (req: Request, res: Response) => {
  const { token } = req.params;
  const session = launchSessions[token];

  if (!session) {
    return res.status(404).json({ error: 'Launch token is invalid or expired.' });
  }

  if (new Date(session.expiresAt) < new Date()) {
    delete launchSessions[token];
    return res.status(401).json({ error: 'Launch token has expired. Please re-launch from AH HUB.' });
  }

  const product = products.find(p => p.id === session.productId);
  res.json({
    valid: true,
    session,
    product
  });
});

/* ==========================================================================
   PRODUCT WORKSPACE APIS
   ========================================================================== */

// VIP Signals
app.get('/api/v1/signals', (req: Request, res: Response) => {
  res.json({ signals: vipSignals });
});

// AI Analyzer (Integrates Gemini API when key is available)
app.post('/api/v1/ai/analyze', async (req: Request, res: Response) => {
  const { symbol, timeframe } = req.body;
  const targetSymbol = (symbol || 'BTC/USDT').toUpperCase();
  const tf = timeframe || '4H';

  const ai = getGeminiAi();
  if (ai) {
    try {
      const prompt = `Analyze financial market asset ${targetSymbol} on ${tf} timeframe. Output a structured json format with fields: overallSentiment ('BULLISH'|'BEARISH'|'CONSOLIDATING'), confidenceScore (number 70-98), keyDrivers (array of 3 strings), technicalSummary (string), macroOverview (string), scenarios (object with bullishCase, bearishCase, baseCase). Keep tone professional and compliance-focused without profit guarantees.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      const text = response.text || '';
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const newReport: AiAnalysisReport = {
            id: `rep_${Date.now()}`,
            symbol: targetSymbol,
            assetName: targetSymbol.replace('/USDT', ''),
            timeframe: tf,
            overallSentiment: parsed.overallSentiment || 'BULLISH',
            confidenceScore: parsed.confidenceScore || 88,
            keyDrivers: parsed.keyDrivers || ['Institutional inflow surge', 'Moving average alignment'],
            technicalSummary: parsed.technicalSummary || 'Strong momentum above key moving averages.',
            macroOverview: parsed.macroOverview || 'Global monetary liquidity support.',
            scenarios: parsed.scenarios || {
              bullishCase: 'Breakout continuation.',
              bearishCase: 'Support retest.',
              baseCase: 'Range consolidation.'
            },
            createdAt: new Date().toISOString()
          };
          aiReports.unshift(newReport);
          return res.json({ report: newReport });
        }
      } catch (err) {
        // Fallback if AI JSON parsing fails
      }
    } catch (err) {
      console.error('Gemini API call failed, falling back to analysis engine', err);
    }
  }

  // Fallback financial analysis engine
  const mockReport: AiAnalysisReport = {
    id: `rep_${Date.now()}`,
    symbol: targetSymbol,
    assetName: targetSymbol.includes('BTC') ? 'Bitcoin' : targetSymbol.includes('ETH') ? 'Ethereum' : targetSymbol.includes('NVDA') ? 'NVIDIA Corp' : targetSymbol,
    timeframe: tf,
    overallSentiment: targetSymbol.includes('SHORT') ? 'BEARISH' : 'BULLISH',
    confidenceScore: Math.floor(Math.random() * 10) + 85,
    keyDrivers: [
      `Volume expansion on ${targetSymbol} order book depth`,
      'Institutional spot liquidity accumulation pattern',
      'Macro rate environment supporting risk asset allocation'
    ],
    technicalSummary: `Structural higher-low formation on ${tf} timeframe with bullish momentum RSI reading of 61.`,
    macroOverview: 'Global central bank balance sheet expansion providing underlying liquidity floor.',
    scenarios: {
      bullishCase: `Sustained breakout above resistance targets +8.5% expansion.`,
      bearishCase: `Loss of immediate support triggers secondary liquidity sweep (-4.2%).`,
      baseCase: `Consolidation within defined technical channel over the next 24-48 hours.`
    },
    createdAt: new Date().toISOString()
  };

  aiReports.unshift(mockReport);
  res.json({ report: mockReport });
});

app.get('/api/v1/ai/reports', (req: Request, res: Response) => {
  res.json({ reports: aiReports });
});

// Auto Trader APIs
app.get('/api/v1/trader/bots', (req: Request, res: Response) => {
  res.json({ bots: traderBots });
});

app.post('/api/v1/trader/emergency-stop', (req: Request, res: Response) => {
  const { botId, userId } = req.body;
  const targetUser = users.find(u => u.id === userId) || users[0];

  traderBots.forEach(bot => {
    if (!botId || bot.id === botId) {
      bot.status = 'EMERGENCY_STOPPED';
    }
  });

  addAuditLog(targetUser.id, targetUser.email, 'EMERGENCY_KILL_SWITCH_TRIGGERED', botId ? `Bot: ${botId}` : 'ALL BOTS SUSPENDED', {
    reason: 'User manual emergency action'
  });

  res.json({
    success: true,
    message: 'Emergency Stop Executed. All strategy order routers have been halted server-side.',
    bots: traderBots
  });
});

// Coupons
app.post('/api/v1/coupons/validate', (req: Request, res: Response) => {
  const { code } = req.body;
  const coupon = coupons.find(c => c.code.toUpperCase() === (code || '').toUpperCase() && c.active);

  if (!coupon) {
    return res.status(404).json({ error: 'Invalid or expired coupon code.' });
  }

  res.json({ valid: true, coupon });
});

// Support Tickets
app.get('/api/v1/support/tickets', (req: Request, res: Response) => {
  res.json({ tickets: supportTickets });
});

app.post('/api/v1/support/tickets', (req: Request, res: Response) => {
  const { subject, category, message, userId } = req.body;
  const targetUser = users.find(u => u.id === userId) || users[0];

  const newTicket: SupportTicket = {
    id: `tkt_${Date.now()}`,
    userId: targetUser.id,
    userName: targetUser.name,
    userEmail: targetUser.email,
    subject: subject || 'General Inquiry',
    category: category || 'General',
    status: 'open',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: `msg_${Date.now()}`,
        sender: 'user',
        senderName: targetUser.name,
        content: message || '',
        timestamp: new Date().toISOString()
      }
    ]
  };

  supportTickets.unshift(newTicket);
  res.json({ ticket: newTicket });
});

// Admin Management APIs
app.get('/api/v1/admin/overview', (req: Request, res: Response) => {
  res.json({
    totalUsers: users.length,
    activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
    totalRevenueUsd: subscriptions.reduce((acc, s) => acc + s.amount, 14280),
    activeProducts: products.filter(p => p.status === 'active').length,
    pendingPayments: paymentIntents.filter(p => p.status === 'pending').length,
    systemStatus: 'Operational (100% Uptime)',
    auditLogs: auditLogs.slice(0, 10)
  });
});

app.get('/api/v1/admin/audit-logs', (req: Request, res: Response) => {
  res.json({ auditLogs });
});

app.get('/api/v1/admin/users', (req: Request, res: Response) => {
  res.json({ users });
});

app.post('/api/v1/admin/grant-entitlement', (req: Request, res: Response) => {
  const { userId, productId, days } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const durationMs = (days || 30) * 24 * 3600 * 1000;
  const expiresAt = new Date(Date.now() + durationMs).toISOString();

  const newEnt: Entitlement = {
    id: `ent_admin_${Date.now()}`,
    userId,
    productId,
    planId: 'ah-suite',
    active: true,
    expiresAt
  };

  entitlements.push(newEnt);
  addAuditLog('usr_admin_999', 'admin@ahstore.com', 'ADMIN_MANUAL_ENTITLEMENT_GRANT', `User: ${user.email}, Product: ${productId}`);

  res.json({ success: true, entitlement: newEnt });
});

app.get('/api/v1/announcements', (req: Request, res: Response) => {
  res.json({ announcements: announcements.filter(a => a.active) });
});

app.get('/api/v1/changelog', (req: Request, res: Response) => {
  res.json({ changelog });
});

/* ==========================================================================
   VITE & STATIC FILE SERVING
   ========================================================================== */

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AH STORE + AH HUB] Server running at http://localhost:${PORT}`);
  });
}

startServer();
