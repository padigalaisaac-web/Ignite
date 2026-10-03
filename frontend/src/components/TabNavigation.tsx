import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  FileCode2, 
  GitFork, 
  HeartHandshake, 
  AlertTriangle 
} from 'lucide-react';

export type TabKey = 'overview' | 'architecture' | 'files' | 'flow' | 'contribute' | 'issues';

interface TabNavigationProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  filesCount?: number;
  issuesCount?: number;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  filesCount = 0,
  issuesCount = 0
}) => {
  const tabs = [
    { key: 'overview' as TabKey, label: 'Overview', icon: LayoutDashboard },
    { key: 'architecture' as TabKey, label: 'Architecture', icon: Layers },
    { key: 'files' as TabKey, label: 'Important Files', icon: FileCode2, count: filesCount },
    { key: 'flow' as TabKey, label: 'Code Flow', icon: GitFork },
    { key: 'contribute' as TabKey, label: 'Contribute', icon: HeartHandshake, highlight: true },
    { key: 'issues' as TabKey, label: 'Potential Issues', icon: AlertTriangle, count: issuesCount, alert: issuesCount > 0 },
  ];

  return (
    <div className="border-b border-slate-800 bg-slate-950/40 backdrop-blur sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? tab.highlight 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : tab.highlight
                    ? 'text-emerald-400/90 hover:text-emerald-300 hover:bg-emerald-950/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (tab.highlight ? 'text-emerald-400' : 'text-cyan-400') : 'text-slate-500'}`} />
                <span>{tab.label}</span>

                {typeof tab.count === 'number' && tab.count > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      tab.alert 
                        ? 'bg-amber-950 text-amber-400 border border-amber-500/40' 
                        : isActive 
                        ? 'bg-cyan-950 text-cyan-300' 
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}

                {tab.highlight && !isActive && (
                  <span className="ml-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
