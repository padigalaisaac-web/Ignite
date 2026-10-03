import React from 'react';
import { Compass, Sparkles, RotateCcw, ExternalLink } from 'lucide-react';
import type { RepositoryMeta } from '../types';

interface HeaderProps {
  repository?: RepositoryMeta | null;
  onReset?: () => void;
  aiProvider?: string;
  aiModel?: string;
}

export const Header: React.FC<HeaderProps> = ({
  repository,
  onReset,
  aiProvider,
  aiModel
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">RepoPilot</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono font-medium">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Understand. Navigate. Contribute.
            </p>
          </div>
        </div>

        {/* Center: Repository Context if analyzed */}
        {repository && (
          <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-mono">
            <span className="text-slate-500">repo:</span>
            <a 
              href={repository.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              {repository.full_name}
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* AI Model Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Model:</span>
            <span className="text-slate-200 font-medium" title={aiProvider ? `Provider: ${aiProvider}` : undefined}>
              {aiModel || 'Open-Weight Model'}
            </span>
          </div>

          {repository && onReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors shadow-sm cursor-pointer"
              title="Analyze another repository"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Analyze Another</span>
            </button>
          )}

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            title="GitHub"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};
