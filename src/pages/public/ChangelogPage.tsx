import React, { useEffect, useState } from 'react';
import { fetchChangelog } from '../../lib/api';
import { ChangelogEntry } from '../../types';
import { Sparkles, ShieldCheck, Zap, Cpu, ShieldAlert, GitCommit } from 'lucide-react';

export const ChangelogPage: React.FC = () => {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);

  useEffect(() => {
    fetchChangelog().then(res => setEntries(res.changelog));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Continuous Evolution</span>
          <h1 className="text-4xl font-black text-white">Changelog & Release Notes</h1>
          <p className="text-sm text-slate-400">
            Track product updates, engine performance enhancements, and security releases across AH STORE & AH HUB.
          </p>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-800">
          {entries.map(entry => (
            <div key={entry.id} className="relative pl-12 space-y-3">
              <div className="absolute left-3 top-1 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-blue-400">
                <GitCommit className="w-3.5 h-3.5" />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {entry.version}
                </span>
                <span className="text-xs text-slate-500">{entry.releaseDate}</span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-lg font-bold text-white">{entry.title}</h3>
                <div className="space-y-2 text-xs text-slate-300">
                  {entry.changes.map((chg, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        chg.type === 'feature' ? 'bg-emerald-500/20 text-emerald-300' :
                        chg.type === 'security' ? 'bg-rose-500/20 text-rose-300' :
                        chg.type === 'improvement' ? 'bg-blue-500/20 text-blue-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {chg.type}
                      </span>
                      <span className="leading-relaxed">{chg.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
