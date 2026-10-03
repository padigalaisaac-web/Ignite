import React, { useState } from 'react';
import { ArrowRight, Code, GitPullRequest, GitFork, ShieldCheck, Terminal, Search } from 'lucide-react';

interface RepoInputHeroProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  aiProviderName?: string;
  aiModelName?: string;
}

const PRESET_REPOSITORIES = [
  { label: 'expressjs/express', lang: 'JavaScript', langColor: '#f1e05a', desc: 'Fast, unopinionated web framework for Node.js' },
  { label: 'pallets/flask', lang: 'Python', langColor: '#3572A5', desc: 'Lightweight WSGI web application framework' },
  { label: 'tiangolo/fastapi', lang: 'Python', langColor: '#3572A5', desc: 'High performance web framework with type hints' },
  { label: 'octocat/Hello-World', lang: 'Mixed', langColor: '#8b949e', desc: 'Minimal GitHub demonstration repository' },
];

export const RepoInputHero: React.FC<RepoInputHeroProps> = ({
  onAnalyze,
  isLoading,
  aiProviderName,
  aiModelName,
}) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      setLocalError('Please specify a GitHub repository URL or slug (e.g. owner/repo).');
      return;
    }
    setLocalError('');
    onAnalyze(repoUrl.trim());
  };

  const handleQuickSelect = (slug: string) => {
    const fullUrl = `https://github.com/${slug}`;
    setRepoUrl(fullUrl);
    setLocalError('');
    onAnalyze(fullUrl);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Title & Core Purpose */}
      <div className="text-left mb-8 pb-6 border-b border-[#21262d]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#8b949e]">
            MLH Hacktoberfest • Best Open-Source AI Project
          </span>
          {aiModelName && (
            <span className="text-xs font-mono text-[#58a6ff] bg-[#0d1117] border border-[#21262d] px-2 py-0.5 rounded">
              Model: {aiModelName} {aiProviderName ? `(${aiProviderName})` : ''}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] tracking-tight">
          RepoPilot AI
        </h1>
        <p className="text-base sm:text-lg text-[#c9d1d9] mt-1 font-medium">
          Understand any unfamiliar open-source repository.
        </p>
        <p className="text-sm text-[#8b949e] mt-2 max-w-2xl leading-relaxed">
          Paste a GitHub repository and let open-weight AI explain the codebase, architecture, important files, and where you should start contributing.
        </p>
      </div>

      {/* Repository Input Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col sm:flex-row items-stretch gap-2 p-1.5 rounded-lg bg-[#161b22] border border-[#30363d] focus-within:border-[#58a6ff] focus-within:ring-1 focus-within:ring-[#58a6ff]/30 transition-all">
          <div className="flex items-center pl-3 flex-1">
            <Search className="w-4 h-4 text-[#6e7681] mr-2 shrink-0" />
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => {
                setRepoUrl(e.target.value);
                if (localError) setLocalError('');
              }}
              disabled={isLoading}
              placeholder="https://github.com/owner/repository (or owner/repo)"
              className="w-full bg-transparent text-[#f0f6fc] placeholder-[#6e7681] text-sm outline-none font-mono py-2"
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#238636] hover:bg-[#2ea043] text-white text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-sm"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing Repository...</span>
              </>
            ) : (
              <>
                <span>Analyze Repository</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {localError && (
          <p className="text-xs text-[#f85149] font-mono pl-1">{localError}</p>
        )}
      </form>

      {/* Preset Repositories Selection Table */}
      <div className="mt-8">
        <div className="text-xs font-mono uppercase text-[#8b949e] font-semibold mb-3 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#6e7681]" />
          <span>Quick Repositories</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PRESET_REPOSITORIES.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handleQuickSelect(preset.label)}
              disabled={isLoading}
              className="flex items-start justify-between p-3 rounded-lg bg-[#161b22] hover:bg-[#21262d] border border-[#21262d] hover:border-[#30363d] text-left transition-all cursor-pointer group disabled:opacity-50"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[#58a6ff] group-hover:underline">
                    {preset.label}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-[#8b949e] font-mono">
                    <span 
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: preset.langColor }}
                    />
                    <span>{preset.lang}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#8b949e] leading-snug">
                  {preset.desc}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#6e7681] group-hover:text-[#c9d1d9] shrink-0 mt-0.5 ml-2 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Technical Workflow Capabilities */}
      <div className="mt-12 pt-8 border-t border-[#21262d]">
        <div className="text-xs font-mono uppercase text-[#8b949e] font-semibold mb-4">
          Pipeline Specifications
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-lg bg-[#161b22] border border-[#21262d]">
            <div className="text-xs font-mono font-semibold text-[#f0f6fc] flex items-center gap-1.5 mb-1">
              <Code className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>AST & Tree Parsing</span>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Filters package manifests, build configs, and entrypoints while stripping binary assets.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#161b22] border border-[#21262d]">
            <div className="text-xs font-mono font-semibold text-[#f0f6fc] flex items-center gap-1.5 mb-1">
              <GitFork className="w-3.5 h-3.5 text-[#bc8cff]" />
              <span>Topology Inference</span>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Maps multi-tier relationships (Frontend, API router, services, data persistence).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#161b22] border border-[#21262d]">
            <div className="text-xs font-mono font-semibold text-[#f0f6fc] flex items-center gap-1.5 mb-1">
              <GitPullRequest className="w-3.5 h-3.5 text-[#3fb950]" />
              <span>Starting Point Spec</span>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Identifies the highest-leverage file for new contributors with actionable PR tasks.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#161b22] border border-[#21262d]">
            <div className="text-xs font-mono font-semibold text-[#f0f6fc] flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d29922]" />
              <span>Grounded Static Triage</span>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Labels observations as "Needs Review" based strictly on file evidence without hallucinations.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-8 text-center text-xs text-[#6e7681] font-mono">
        Open Source • AI-Powered • Developer Tool
      </div>
    </div>
  );
};
