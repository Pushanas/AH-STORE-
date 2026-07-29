import React, { useState, useEffect } from 'react';
import { HubLayout } from '../../components/hub/HubLayout';
import { fetchNotifications } from '../../lib/api';
import { NotificationItem } from '../../types';
import { Bell, CheckCircle2, ShieldAlert, Zap, Cpu, Sparkles } from 'lucide-react';

export const HubNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    fetchNotifications().then(res => setNotifications(res.notifications));
  }, []);

  return (
    <HubLayout activeTab="notifications">
      <div className="space-y-6 max-w-4xl dir-rtl">
        <div>
          <h1 className="text-2xl font-black text-white">التنبيهات والإشعارات الفورية</h1>
          <p className="text-xs text-slate-400 mt-1">تحديثات السيرفرات، إشعارات الأمان، والتحديثات التقنية لبوتات التداول.</p>
        </div>

        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{n.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">{new Date(n.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </HubLayout>
  );
};
