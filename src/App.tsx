import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/ToastContainer';
import { CommandPalette } from './components/ui/CommandPalette';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { VipSignalsPage } from './pages/public/VipSignalsPage';
import { AiAnalyzerPage } from './pages/public/AiAnalyzerPage';
import { AutoTraderPage } from './pages/public/AutoTraderPage';
import { PricingPage } from './pages/public/PricingPage';
import { ComparePage } from './pages/public/ComparePage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { SecurityPage } from './pages/public/SecurityPage';
import { ChangelogPage } from './pages/public/ChangelogPage';
import { ReviewsPage } from './pages/public/ReviewsPage';
import { FaqPage } from './pages/public/FaqPage';
import { ContactPage } from './pages/public/ContactPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Legal Pages
import { TermsPage } from './pages/legal/TermsPage';
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { RiskPage } from './pages/legal/RiskPage';
import { RefundPage } from './pages/legal/RefundPage';
import { AcceptableUsePage } from './pages/legal/AcceptableUsePage';

// AH HUB Pages
import { HubOverviewPage } from './pages/hub/HubOverviewPage';
import { VipSignalsWorkspace } from './pages/hub/workspaces/VipSignalsWorkspace';
import { AiAnalyzerWorkspace } from './pages/hub/workspaces/AiAnalyzerWorkspace';
import { AutoTraderWorkspace } from './pages/hub/workspaces/AutoTraderWorkspace';
import { HubBillingPage } from './pages/hub/HubBillingPage';
import { HubNotificationsPage } from './pages/hub/HubNotificationsPage';
import { HubSupportPage } from './pages/hub/HubSupportPage';
import { HubSettingsPage } from './pages/hub/HubSettingsPage';
import { LaunchContainerPage } from './pages/hub/LaunchContainerPage';

// Admin Page
import { AdminPage } from './pages/admin/AdminPage';

const RouterContent: React.FC = () => {
  const { user } = useApp();
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isHubRoute = currentHash.startsWith('#/hub');
  const isAdminRoute = currentHash.startsWith('#/admin');

  const renderRoute = () => {
    if (currentHash.startsWith('#/hub/launch/')) {
      return <LaunchContainerPage />;
    }

    switch (currentHash) {
      case '#/':
      case '#':
        return <HomePage />;
      case '#/vip-signals':
        return <VipSignalsPage />;
      case '#/ai-analyzer':
        return <AiAnalyzerPage />;
      case '#/auto-trader':
        return <AutoTraderPage />;
      case '#/pricing':
        return <PricingPage />;
      case '#/compare':
        return <ComparePage />;
      case '#/how-it-works':
        return <HowItWorksPage />;
      case '#/security':
        return <SecurityPage />;
      case '#/changelog':
        return <ChangelogPage />;
      case '#/reviews':
        return <ReviewsPage />;
      case '#/faq':
        return <FaqPage />;
      case '#/contact':
        return <ContactPage />;
      case '#/login':
      case '#/register':
      case '#/forgot-password':
        return <HubOverviewPage />;
      case '#/legal/terms':
        return <TermsPage />;
      case '#/legal/privacy':
        return <PrivacyPage />;
      case '#/legal/risk-disclosure':
        return <RiskPage />;
      case '#/legal/refund':
        return <RefundPage />;
      case '#/legal/acceptable-use':
        return <AcceptableUsePage />;

      // AH HUB Routes
      case '#/hub':
        return <HubOverviewPage />;
      case '#/hub/products/vip-signals':
      case '#/hub/workspaces/vip-signals':
        return <VipSignalsWorkspace />;
      case '#/hub/products/ai-analyzer':
      case '#/hub/workspaces/ai-analyzer':
        return <AiAnalyzerWorkspace />;
      case '#/hub/products/auto-trader':
      case '#/hub/workspaces/auto-trader':
        return <AutoTraderWorkspace />;
      case '#/hub/billing':
        return <HubBillingPage />;
      case '#/hub/notifications':
        return <HubNotificationsPage />;
      case '#/hub/support':
        return <HubSupportPage />;
      case '#/hub/settings':
        return <HubSettingsPage />;

      // Admin
      case '#/admin':
        return <AdminPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative">
      {!isHubRoute && !isAdminRoute && <Navbar />}
      <main className="flex-1">
        {renderRoute()}
      </main>
      {!isHubRoute && !isAdminRoute && <Footer />}
      <ToastContainer />
      <CommandPalette />

      {/* Global Floating Telegram Support Button */}
      <a
        href="https://t.me/A_H_QUOTEX_SUPPORT"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:bg-blue-500 hover:scale-110 transition-all group"
        title="تواصل مع الدعم الفني"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.664 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </a>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RouterContent />
    </AppProvider>
  );
}
