export type Role = 'user' | 'admin' | 'super_admin';

export type ProductId = 'vip-signals' | 'ai-analyzer' | 'auto-trader';

export type ProductStatus = 'active' | 'maintenance' | 'deprecated' | 'coming_soon';

export type PlanId = 'signals-pro' | 'analyzer-pro' | 'trader-pro' | 'ah-suite';

export type PaymentMethod = 'binance' | 'usdt_trc20' | 'usdt_bep20' | 'btc' | 'eth' | 'ton';

export type PaymentStatus = 
  | 'pending' 
  | 'awaiting_confirmation' 
  | 'confirmed' 
  | 'failed' 
  | 'expired' 
  | 'refunded';

export type SubscriptionStatus = 'active' | 'pending' | 'expired' | 'canceled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  country?: string;
  twoFactorEnabled: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface Product {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  status: ProductStatus;
  version: string;
  badge?: string;
  iconName: string;
  features: string[];
  eligibilityNote?: string;
  requiredPlanIds: PlanId[];
}

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  featured?: boolean;
  productIds: ProductId[];
  features: string[];
  limitations?: string[];
  riskNote?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: PlanId;
  status: SubscriptionStatus;
  billingInterval: 'monthly' | 'yearly';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: string;
}

export interface Entitlement {
  id: string;
  userId: string;
  productId: ProductId;
  planId: PlanId;
  active: boolean;
  expiresAt: string;
}

export interface PaymentIntent {
  id: string;
  userId: string;
  planId: PlanId;
  billingInterval: 'monthly' | 'yearly';
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  cryptoAddress: string;
  cryptoAmount: string;
  qrCodeUrl?: string;
  status: PaymentStatus;
  transactionHash?: string;
  createdAt: string;
  expiresAt: string;
  confirmedAt?: string;
}

export interface LaunchSession {
  token: string;
  productId: ProductId;
  userId: string;
  expiresAt: string;
  nonce: string;
  launchedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiresAt: string;
  maxRedemptions: number;
  currentRedemptions: number;
  active: boolean;
  applicablePlanIds?: PlanId[];
}

export interface VipSignal {
  id: string;
  symbol: string;
  assetClass: 'Crypto' | 'Forex' | 'Indices' | 'Commodities' | 'OTC' | 'OTC Market';
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  entryRange: string;
  takeProfitTargets: string[];
  stopLoss: string;
  timeframe: string;
  confidenceScore: number;
  riskRewardRatio: string;
  status: 'ACTIVE' | 'TARGET_HIT' | 'STOP_HIT' | 'EXPIRED';
  timestamp: string;
  analysisText: string;
}

export interface AiAnalysisReport {
  id: string;
  symbol: string;
  assetName: string;
  timeframe: string;
  overallSentiment: 'BULLISH' | 'BEARISH' | 'CONSOLIDATING';
  confidenceScore: number;
  keyDrivers: string[];
  technicalSummary: string;
  macroOverview: string;
  scenarios: {
    bullishCase: string;
    bearishCase: string;
    baseCase: string;
  };
  createdAt: string;
}

export interface AutoTraderBot {
  id: string;
  name: string;
  strategy: string;
  status: 'RUNNING' | 'PAUSED' | 'EMERGENCY_STOPPED' | 'DRAFT';
  pairs: string[];
  maxDrawdownLimitPct: number;
  dailyLossCapUsd: number;
  tradeSizeUsd: number;
  totalTrades: number;
  winRatePct: number;
  pnlPercentage: number;
  lastExecution: string;
  riskLevel: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'security';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  severity: 'info' | 'update' | 'warning' | 'maintenance';
  publishedAt: string;
  targetAudience: 'all' | 'subscribers';
  active: boolean;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: 'Billing' | 'Product Launch' | 'API' | 'General';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: 'user' | 'support';
    senderName: string;
    content: string;
    timestamp: string;
    isInternalNote?: boolean;
  }[];
}

export interface ChangelogEntry {
  id: string;
  productId: ProductId | 'platform';
  version: string;
  title: string;
  releaseDate: string;
  changes: {
    type: 'feature' | 'improvement' | 'fix' | 'security';
    description: string;
  }[];
}
