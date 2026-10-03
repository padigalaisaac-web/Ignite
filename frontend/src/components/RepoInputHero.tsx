import React, { useState } from 'react';
import { ArrowRight, Code2, Layers, GitPullRequest, ShieldAlert } from 'lucide-react';

interface RepoInputHeroProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  aiProviderName?: string;
  aiModelName?: string;
}

const QUICK_EXAMPLES = [
  { label: 'Express.js', url: 'https://github.com/expressjs/express', desc: 'Node.js Web Framework' },
  { label: 'Flask', url: 'https://github.com/pallets/flask', desc: 'Python Microframework' },
  { label: 'FastAPI', url: 'https://github.com/tiangolo/fastapi', desc: 'Python API Framework' },
  { label: 'Octocat Hello-World', url: 'https://github.com/octocat/Hello-World', desc: 'Minimal Demo Repo' },
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
      setLocalError('Please enter a GitHub repository URL or slug (e.g. owner/repo).');
      return;
    }
    setLocalError('');
    onAnalyze(repoUrl.trim());
  };

  const handleQuickPick = (url: string) => {
    setRepoUrl(url);
    setLocalError('');
    onAnalyze(url);
  };

  return (
    <div className="relative py-12 md:py-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[250px] bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 font-mono mb-6 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>MLH Hacktoberfest • Best Open-Source AI Project</span>
          {aiModelName && (
            <span className="text-cyan-400 border-l border-slate-700 pl-2">
              {aiModelName} {aiProviderName ? `(${aiProviderName})` : ''}
            </span>
          )}
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          RepoPilot <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI</span>
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-slate-200 font-medium tracking-tight">
          Understand any unfamiliar open-source repository.
        </p>
        <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
          Paste a GitHub repository and let open-weight AI explain the codebase, architecture, important files, and where you should start contributing.
        </p>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl focus-within:border-cyan-500/80 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
            <div className="relative flex-1 flex items-center pl-3">
              <svg className="w-5 h-5 text-slate-500 mr-2.5 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                  if (localError) setLocalError('');
                }}
                disabled={isLoading}
                placeholder="https://github.com/owner/repository"
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base outline-none font-mono py-2"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze Repository</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          {localError && (
            <p className="mt-2 text-xs text-rose-400 text-left pl-3 font-mono">{localError}</p>
          )}
        </form>

        {/* Quick Examples */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="text-slate-500 font-mono">Quick Try:</span>
          {QUICK_EXAMPLES.map((ex) => (
            <button
              key={ex.url}
              onClick={() => handleQuickPick(ex.url)}
              disabled={isLoading}
              className="px-3 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 transition-all font-mono text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title={ex.desc}
            >
              <span>{ex.label}</span>
            </button>
          ))}
        </div>

        {/* Feature Pillars */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Visual Architecture</h3>
            <p className="text-xs text-slate-400 mt-1">
              Dynamic multi-layer diagram mapping frontend, APIs, core services, and dependencies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Important Files Map</h3>
            <p className="text-xs text-slate-400 mt-1">
              Filters out noise and surfaces the critical source files and why they matter.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <GitPullRequest className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Contributor Starting Point</h3>
            <p className="text-xs text-slate-400 mt-1">
              Clear "Where should I start?" guidance and actionable first PR suggestions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">Grounded Issue Triage</h3>
            <p className="text-xs text-slate-400 mt-1">
              Observations based strictly on code evidence labeled "Needs Review" to prevent hallucinations.
            </p>
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="mt-12 text-xs text-slate-500 font-mono tracking-wider">
          Open Source • AI-Powered • Developer Tool
        </div>
      </div>
    </div>
  );
};
