import React from 'react';
import { Terminal, Cpu, RotateCcw, ExternalLink } from 'lucide-react';
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
    <header className="border-b border-[#30363d] bg-[#161b22] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Brand & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-7 h-7 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff] group-hover:border-[#58a6ff]/60 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#f0f6fc] tracking-tight">RepoPilot</span>
              <span className="text-[11px] font-mono text-[#8b949e] border border-[#30363d] bg-[#0d1117] px-1.5 py-0.2 rounded">
                v1.0
              </span>
            </div>
          </button>

          {repository && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#8b949e] pl-3 border-l border-[#30363d]">
              <span className="text-[#6e7681]">/</span>
              <span className="text-[#8b949e]">{repository.owner}</span>
              <span className="text-[#6e7681]">/</span>
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58a6ff] hover:underline font-semibold flex items-center gap-1"
              >
                {repository.name}
                <ExternalLink className="w-3 h-3 text-[#6e7681]" />
              </a>
            </div>
          )}
        </div>

        {/* Right: Runtime Info & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Active Model Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#8b949e]">
            <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
            <Cpu className="w-3.5 h-3.5 text-[#6e7681]" />
            <span className="text-[#c9d1d9] font-medium" title={aiProvider ? `Provider: ${aiProvider}` : undefined}>
              {aiModel || 'Open-Weight Model'}
            </span>
          </div>

          {repository && onReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-xs font-medium border border-[#30363d] transition-colors cursor-pointer"
              title="Inspect another repository"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#8b949e]" />
              <span className="hidden sm:inline">New Analysis</span>
            </button>
          )}

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#8b949e] hover:text-[#f0f6fc] rounded hover:bg-[#21262d] transition-colors"
            title="GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};
