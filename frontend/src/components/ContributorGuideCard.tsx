import React, { useState } from 'react';
import { 
  HeartHandshake, 
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

  const cloneCommand = `git clone ${repository.html_url}.git\ncd ${repository.name}\ngit checkout -b fix/first-contribution`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Primary Contributor Starting Point Card */}
      <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#21262d]">
          <HeartHandshake className="w-5 h-5 text-[#3fb950]" />
          <div>
            <span className="text-[11px] font-mono text-[#3fb950] font-semibold uppercase">
              Contributor Blueprint
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#f0f6fc] tracking-tight">
              Where should I start?
            </h2>
          </div>
        </div>

        {/* Recommended Starting Point */}
        <div className="space-y-4">
          <div className="p-4 rounded-md bg-[#0d1117] border border-[#30363d]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs text-[#8b949e] font-mono uppercase font-semibold">
                Recommended Starting File / Directory
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#58a6ff] bg-[#161b22] px-2.5 py-1 rounded border border-[#30363d] flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-[#8b949e]" />
                  {guide.starting_point}
                </span>
                <button
                  onClick={handleCopyFile}
                  className="p-1 text-[#8b949e] hover:text-[#f0f6fc] rounded hover:bg-[#21262d] transition-colors cursor-pointer"
                  title="Copy path"
                >
                  {copiedFile ? (
                    <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#21262d]">
              <span className="text-[11px] text-[#6e7681] font-mono uppercase font-semibold block mb-1">
                Rationale
              </span>
              <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
                {guide.reason}
              </p>
            </div>
          </div>

          {/* Suggested First Contribution */}
          <div className="p-4 rounded-md bg-[#0d1117] border border-[#30363d]">
            <span className="text-[11px] text-[#3fb950] font-mono uppercase font-semibold block mb-1">
              Suggested First Contribution
            </span>
            <p className="text-xs sm:text-sm text-[#c9d1d9] leading-relaxed">
              {guide.suggested_contribution}
            </p>
          </div>
        </div>
      </div>

      {/* Terminal Quickstart & Pull Request Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Terminal Quickstart */}
        <div className="p-5 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#8b949e]">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#58a6ff]" />
              <span className="font-semibold text-[#f0f6fc]">Local Branch Setup</span>
            </div>
            <button
              onClick={handleCopyCommand}
              className="text-[#58a6ff] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedCommand ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3.5 rounded bg-[#0d1117] border border-[#21262d] text-xs font-mono text-[#c9d1d9] overflow-x-auto leading-relaxed">
            <code>{cloneCommand}</code>
          </pre>
        </div>

        {/* PR Contribution Checklist */}
        <div className="p-5 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-semibold text-[#f0f6fc]">
            <GitPullRequest className="w-4 h-4 text-[#3fb950]" />
            <span>Contribution Checklist</span>
          </div>
          <ul className="space-y-2 text-xs text-[#8b949e]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
              <span>Inspect <code className="text-[#58a6ff] bg-[#0d1117] px-1 rounded">{guide.starting_point}</code> to grasp module contracts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
              <span>Verify that dependencies and existing test suites execute cleanly.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
              <span>Commit modular, atomic changes with conventional commit messages.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
              <span>Submit a pull request referencing target issue numbers if applicable.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
