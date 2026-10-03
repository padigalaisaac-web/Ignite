import React from 'react';
import { 
  Layout, 
  GitFork, 
  FileCode, 
  Terminal, 
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
    { key: 'overview' as TabKey, label: 'Overview', icon: Layout },
    { key: 'architecture' as TabKey, label: 'Architecture', icon: GitFork },
    { key: 'files' as TabKey, label: 'Important Files', icon: FileCode, count: filesCount },
    { key: 'flow' as TabKey, label: 'Code Flow', icon: Terminal },
    { key: 'contribute' as TabKey, label: 'Contribute', icon: HeartHandshake, highlight: true },
    { key: 'issues' as TabKey, label: 'Potential Issues', icon: AlertTriangle, count: issuesCount, alert: issuesCount > 0 },
  ];

  return (
    <div className="border-b border-[#30363d] bg-[#0d1117] sticky top-14 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`flex items-center gap-2 py-3 px-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors cursor-pointer select-none ${
                  isActive
                    ? 'border-[#f78166] text-[#f0f6fc] font-semibold'
                    : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#30363d]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#f0f6fc]' : 'text-[#6e7681]'}`} />
                <span>{tab.label}</span>

                {typeof tab.count === 'number' && tab.count > 0 && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[11px] font-mono ${
                      tab.alert 
                        ? 'bg-[#3d1f14] text-[#f85149] border border-[#f85149]/30' 
                        : 'bg-[#21262d] text-[#c9d1d9]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}

                {tab.highlight && (
                  <span className="text-[10px] font-mono uppercase bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40 px-1.5 py-0.2 rounded">
                    Start Here
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
