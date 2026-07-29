import {
  User,
  Product,
  Plan,
  Subscription,
  Entitlement,
  PaymentIntent,
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

const API_BASE = '/api/v1';

export async function fetchMe(token?: string): Promise<{ user: User }> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    if (!res.ok) throw new Error('Failed to fetch user');
    return await res.json();
  } catch (err) {
    console.error('fetchMe error', err);
    throw err;
  }
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Login failed');
  }
  return await res.json();
}

export async function registerUser(data: { name: string; email: string; password: string; country?: string }): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Registration failed');
  }
  return await res.json();
}

export async function fetchProducts(): Promise<{ products: Product[] }> {
  const res = await fetch(`${API_BASE}/products`);
  return await res.json();
}

export async function fetchPlans(): Promise<{ plans: Plan[] }> {
  const res = await fetch(`${API_BASE}/plans`);
  return await res.json();
}

export async function createPaymentIntent(params: {
  userId: string;
  planId: string;
  billingInterval: 'monthly' | 'yearly';
  paymentMethod: string;
  couponCode?: string;
}): Promise<{ intent: PaymentIntent }> {
  const res = await fetch(`${API_BASE}/payments/create-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  if (!res.ok) throw new Error('Payment intent creation failed');
  return await res.json();
}

export async function getPaymentStatus(intentId: string): Promise<{ intent: PaymentIntent }> {
  const res = await fetch(`${API_BASE}/payments/${intentId}/status`);
  return await res.json();
}

export async function simulateConfirmPayment(intentId: string): Promise<{
  success: boolean;
  intent: PaymentIntent;
  subscription: Subscription;
  entitlements: Entitlement[];
}> {
  const res = await fetch(`${API_BASE}/payments/${intentId}/simulate-confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error('Payment confirmation failed');
  return await res.json();
}

export async function fetchUserSubscriptions(userId: string): Promise<{ subscriptions: Subscription[]; entitlements: Entitlement[] }> {
  const res = await fetch(`${API_BASE}/subscriptions/me?userId=${userId}`);
  return await res.json();
}

export async function launchProduct(productId: string, userId: string): Promise<{
  success: boolean;
  launchToken: string;
  productId: string;
  productName: string;
  expiresAt: string;
  internalLaunchPath: string;
}> {
  const res = await fetch(`${API_BASE}/products/${productId}/launch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Launch authorization failed');
  }
  return await res.json();
}

export async function verifyLaunchToken(token: string): Promise<{ valid: boolean; session: any; product: Product }> {
  const res = await fetch(`${API_BASE}/launch/verify/${token}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Token verification failed');
  }
  return await res.json();
}

export async function fetchVipSignals(): Promise<{ signals: VipSignal[] }> {
  const res = await fetch(`${API_BASE}/signals`);
  return await res.json();
}

export async function analyzeSymbol(symbol: string, timeframe: string): Promise<{ report: AiAnalysisReport }> {
  const res = await fetch(`${API_BASE}/ai/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbol, timeframe })
  });
  if (!res.ok) throw new Error('AI analysis failed');
  return await res.json();
}

export async function fetchAiReports(): Promise<{ reports: AiAnalysisReport[] }> {
  const res = await fetch(`${API_BASE}/ai/reports`);
  return await res.json();
}

export async function fetchTraderBots(): Promise<{ bots: AutoTraderBot[] }> {
  const res = await fetch(`${API_BASE}/trader/bots`);
  return await res.json();
}

export async function triggerEmergencyStop(botId?: string, userId?: string): Promise<{ success: boolean; message: string; bots: AutoTraderBot[] }> {
  const res = await fetch(`${API_BASE}/trader/emergency-stop`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ botId, userId })
  });
  return await res.json();
}

export async function updateTraderRiskLimits(params: { dailyLossCapUsd: number; maxDrawdownPct: number; riskLevel: string }): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/trader/risk-limits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return await res.json();
}

export async function validateCoupon(code: string): Promise<{ valid: boolean; coupon: Coupon }> {
  const res = await fetch(`${API_BASE}/coupons/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  if (!res.ok) throw new Error('Invalid coupon code');
  return await res.json();
}

export async function fetchNotifications(): Promise<{ notifications: NotificationItem[] }> {
  return Promise.resolve({
    notifications: [
      {
        id: 'notif_1',
        userId: 'u1',
        title: 'Security Session Token Minted',
        message: 'A short-lived signed launch token was minted for AH VIP Signals Workspace.',
        type: 'security',
        read: false,
        timestamp: new Date().toISOString()
      },
      {
        id: 'notif_2',
        userId: 'u1',
        title: 'AH HUB Suite Activated',
        message: 'Subscription license confirmed via USDT TRC20 gateway.',
        type: 'success',
        read: true,
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ]
  });
}

export async function fetchSupportTickets(): Promise<{ tickets: SupportTicket[] }> {
  const res = await fetch(`${API_BASE}/support/tickets`);
  return await res.json();
}

export async function createSupportTicket(data: { subject: string; category: string; message: string; userId: string }): Promise<{ ticket: SupportTicket }> {
  const res = await fetch(`${API_BASE}/support/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function fetchAdminOverview(): Promise<{
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenueUsd: number;
  activeProducts: number;
  pendingPayments: number;
  systemStatus: string;
  auditLogs: AuditLog[];
  users: User[];
  subscriptions: Subscription[];
  entitlements: Entitlement[];
  paymentIntents: PaymentIntent[];
}> {
  const res = await fetch(`${API_BASE}/admin/overview`);
  return await res.json();
}

export async function fetchAdminAuditLogs(): Promise<{ auditLogs: AuditLog[] }> {
  const res = await fetch(`${API_BASE}/admin/audit-logs`);
  return await res.json();
}

export async function fetchAdminUsers(): Promise<{ users: User[] }> {
  const res = await fetch(`${API_BASE}/admin/users`);
  return await res.json();
}

export async function grantAdminEntitlement(userId: string, productId: string, days: number = 30): Promise<{ success: boolean; entitlement: Entitlement }> {
  const res = await fetch(`${API_BASE}/admin/grant-entitlement`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId, days })
  });
  return await res.json();
}

export async function fetchAnnouncements(): Promise<{ announcements: Announcement[] }> {
  const res = await fetch(`${API_BASE}/announcements`);
  return await res.json();
}

export async function fetchChangelog(): Promise<{ changelog: ChangelogEntry[] }> {
  const res = await fetch(`${API_BASE}/changelog`);
  return await res.json();
}
