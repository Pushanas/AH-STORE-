import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HubLayout } from '../../components/hub/HubLayout';
import { HelpCircle, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const HubSupportPage: React.FC = () => {
  const { addToast } = useApp();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState([
    { id: 'TKT-9921', subject: 'Exchange API Latency Query', status: 'OPEN', date: '2026-07-28' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTkt = { id: `TKT-${Math.floor(1000 + Math.random()*9000)}`, subject, status: 'OPEN', date: new Date().toISOString().split('T')[0] };
    setTickets([newTkt, ...tickets]);
    setSubject('');
    setMessage('');
    addToast({ title: 'Support Ticket Created', description: `Ticket ID ${newTkt.id} logged.`, type: 'success' });
  };

  return (
    <HubLayout activeTab="support">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-black text-white">Support Desk & Live Inquiries</h1>
          <p className="text-xs text-slate-400">Direct technical communication channel with AH STORE engineers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Ticket Form */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white">Open Support Ticket</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Auto Trader Strategy Connection"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Describe your question or issue..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20"
              >
                Submit Ticket
              </button>
            </form>
          </div>

          {/* Active Tickets List */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Your Tickets</h3>
            <div className="space-y-3 text-xs font-mono">
              {tickets.map(tkt => (
                <div key={tkt.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{tkt.id}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px]">{tkt.status}</span>
                  </div>
                  <div className="text-slate-300 font-sans">{tkt.subject}</div>
                  <div className="text-[10px] text-slate-500">{tkt.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HubLayout>
  );
};
