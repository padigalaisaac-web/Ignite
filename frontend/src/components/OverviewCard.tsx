import React from 'react';
import { 
  Star, 
  GitFork, 
  AlertCircle, 
  FileCode, 
  Scale, 
  ExternalLink, 
  Cpu, 
  GitBranch,
  Layers,
  CheckCircle2
} from 'lucide-react';
import type { ProjectOverview, RepositoryMeta } from '../types';

interface OverviewCardProps {
  overview: ProjectOverview;
  repository: RepositoryMeta;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ overview, repository }) => {
  return (
    <div className="space-y-6 text-left">
      {/* Primary Repository Metadata Header */}
      <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-[#21262d]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] border border-[#30363d]">
                {repository.language || 'Software'}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#21262d] flex items-center gap-1">
                <GitBranch className="w-3 h-3 text-[#6e7681]" />
                {repository.default_branch}
              </span>
              {repository.license && repository.license !== 'None' && (
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#21262d] flex items-center gap-1">
                  <Scale className="w-3 h-3 text-[#6e7681]" />
                  {repository.license}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">
              {overview.name || repository.name}
            </h2>

            <p className="text-sm text-[#8b949e] max-w-3xl leading-relaxed">
              {overview.description}
            </p>
          </div>

          {/* GitHub Link & Key Statistics */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-xs font-medium border border-[#30363d] transition-colors"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-[#8b949e]" />
            </a>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e]">
              <span className="flex items-center gap-1 bg-[#0d1117] px-2 py-1 rounded border border-[#21262d]">
                <Star className="w-3.5 h-3.5 text-[#e3b341]" />
                <span className="text-[#c9d1d9]">{repository.stars.toLocaleString()}</span>
              </span>
              <span className="flex items-center gap-1 bg-[#0d1117] px-2 py-1 rounded border border-[#21262d]">
                <GitFork className="w-3.5 h-3.5 text-[#8b949e]" />
                <span className="text-[#c9d1d9]">{repository.forks.toLocaleString()}</span>
              </span>
              <span className="flex items-center gap-1 bg-[#0d1117] px-2 py-1 rounded border border-[#21262d]">
                <AlertCircle className="w-3.5 h-3.5 text-[#f85149]" />
                <span className="text-[#c9d1d9]">{repository.open_issues.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Technology Stack Tags */}
        <div className="pt-6">
          <div className="text-xs font-mono uppercase text-[#8b949e] font-semibold mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>Detected Technologies & Frameworks</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {overview.technologies && overview.technologies.length > 0 ? (
              overview.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#0d1117] text-[#c9d1d9] border border-[#21262d] text-xs font-mono"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-xs text-[#6e7681] font-mono">No specific technologies identified</span>
            )}
          </div>
        </div>
      </div>

      {/* Telemetry & Analysis Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div className="flex items-center justify-between text-[#8b949e] text-xs font-mono mb-1">
            <span>Repository Files</span>
            <FileCode className="w-4 h-4 text-[#6e7681]" />
          </div>
          <div className="text-xl font-bold text-[#f0f6fc] font-mono">
            {repository.total_tree_files.toLocaleString()}
          </div>
          <p className="text-[11px] text-[#6e7681] mt-1 font-mono">Total Git tree blobs</p>
        </div>

        <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div className="flex items-center justify-between text-[#8b949e] text-xs font-mono mb-1">
            <span>Key Files Analyzed</span>
            <FileCode className="w-4 h-4 text-[#58a6ff]" />
          </div>
          <div className="text-xl font-bold text-[#f0f6fc] font-mono">
            {repository.analyzed_file_count}
          </div>
          <p className="text-[11px] text-[#6e7681] mt-1 font-mono">Filtered manifests & core logic</p>
        </div>

        <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div className="flex items-center justify-between text-[#8b949e] text-xs font-mono mb-1">
            <span>AI Model Engine</span>
            <Cpu className="w-4 h-4 text-[#bc8cff]" />
          </div>
          <div className="text-sm font-bold text-[#f0f6fc] font-mono truncate" title={repository.ai_model}>
            {repository.ai_model}
          </div>
          <p className="text-[11px] text-[#6e7681] mt-1 font-mono truncate" title={repository.ai_provider}>
            {repository.ai_provider}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div className="flex items-center justify-between text-[#8b949e] text-xs font-mono mb-1">
            <span>Schema Validation</span>
            <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
          </div>
          <div className="text-sm font-bold text-[#3fb950] font-mono">
            Pydantic v2 Verified
          </div>
          <p className="text-[11px] text-[#6e7681] mt-1 font-mono">Type-checked JSON</p>
        </div>
      </div>
    </div>
  );
};
