import React from 'react';
import { 
  Star, 
  GitFork, 
  AlertCircle, 
  FileCode, 
  Scale, 
  ExternalLink, 
  Cpu, 
  Sparkles,
  GitBranch,
  Layers
} from 'lucide-react';
import type { ProjectOverview, RepositoryMeta } from '../types';

interface OverviewCardProps {
  overview: ProjectOverview;
  repository: RepositoryMeta;
}

export const OverviewCard: React.FC<OverviewCardProps> = ({ overview, repository }) => {
  return (
    <div className="space-y-6">
      {/* Top Main Hero Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-mono font-medium">
                {repository.language || 'Software'}
              </span>
              {repository.license && repository.license !== 'None' && (
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono flex items-center gap-1">
                  <Scale className="w-3 h-3 text-slate-400" />
                  {repository.license}
                </span>
              )}
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-400 font-mono flex items-center gap-1">
                <GitBranch className="w-3 h-3 text-slate-400" />
                {repository.default_branch}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {overview.name || repository.name}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {overview.description}
            </p>
          </div>

          {/* GitHub Link & Quick Stats */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <span>View on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
              <div className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800" title="Stars">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span>{repository.stars.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800" title="Forks">
                <GitFork className="w-3.5 h-3.5 text-slate-400" />
                <span>{repository.forks.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800" title="Open Issues">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>{repository.open_issues.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack Tags */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5 font-mono">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Detected Technologies & Ecosystem
          </h4>
          <div className="flex flex-wrap gap-2">
            {overview.technologies && overview.technologies.length > 0 ? (
              overview.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/80 text-xs font-mono font-medium hover:border-cyan-500/40 transition-colors"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 font-mono">No specific frameworks tagged</span>
            )}
          </div>
        </div>
      </div>

      {/* Metrics & AI Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>Repository Files</span>
            <FileCode className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {repository.total_tree_files.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Total blobs in recursive Git tree</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>Key Files Analyzed</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {repository.analyzed_file_count}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Manifests, entrypoints, and core modules</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>AI Architecture</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-base font-bold text-white font-mono truncate" title={repository.ai_model}>
            {repository.ai_model}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 truncate" title={repository.ai_provider}>
            Provider: {repository.ai_provider}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>Inspection Engine</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base font-bold text-emerald-400 font-mono">
            Verified
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Strict Pydantic schema validation</p>
        </div>
      </div>
    </div>
  );
};
