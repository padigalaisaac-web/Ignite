import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  GitPullRequest, 
  Copy, 
  Check, 
  Terminal, 
  FileCode,
  CheckCircle2
} from 'lucide-react';
import type { ContributorGuide, RepositoryMeta } from '../types';

interface ContributorGuideCardProps {
  guide: ContributorGuide;
  repository: RepositoryMeta;
}

export const ContributorGuideCard: React.FC<ContributorGuideCardProps> = ({ guide, repository }) => {
  const [copiedFile, setCopiedFile] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const handleCopyFile = () => {
    navigator.clipboard.writeText(guide.starting_point);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const cloneCommand = `git clone ${repository.html_url}.git\ncd ${repository.name}\ngit checkout -b my-first-contribution`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Contribution Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-semibold">
              Contributor Onboarding Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Where should I start?
            </h2>
          </div>
        </div>

        {/* Recommended Starting Point Spotlight */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-emerald-400 font-mono font-medium uppercase tracking-wider">
              Recommended Starting Point
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                {guide.starting_point}
              </span>
              <button
                onClick={handleCopyFile}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                title="Copy path"
              >
                {copiedFile ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-xs text-slate-400 font-mono font-semibold uppercase mb-1">Why Start Here?</h4>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              {guide.reason}
            </p>
          </div>
        </div>

        {/* Suggested First Contribution Card */}
        <div className="mt-6 p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Suggested First Contribution</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Targeted Actionable Task
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {guide.suggested_contribution}
          </p>
        </div>
      </div>

      {/* Developer Quickstart Commands & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quickstart Terminal */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Developer Quickstart</span>
            </div>
            <button
              onClick={handleCopyCommand}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedCommand ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy commands</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
            <code>{cloneCommand}</code>
          </pre>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Creates a local isolated branch for your first pull request.
          </p>
        </div>

        {/* Contribution Best Practices Checklist */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-3 flex items-center gap-2">
            <GitPullRequest className="w-4 h-4 text-emerald-400" />
            Hacktoberfest PR Checklist
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Review existing issues & discussions on GitHub to confirm scope.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Inspect <code className="bg-slate-800 px-1 rounded text-cyan-300">{guide.starting_point}</code> before modifying adjacent modules.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Ensure tests pass locally and commit with clean, descriptive messages.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Submit a well-documented PR referencing any related issues.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
