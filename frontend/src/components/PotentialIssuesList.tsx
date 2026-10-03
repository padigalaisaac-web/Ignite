import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle } from 'lucide-react';
import type { PotentialIssue } from '../types';

interface PotentialIssuesListProps {
  issues: PotentialIssue[];
}

export const PotentialIssuesList: React.FC<PotentialIssuesListProps> = ({ issues }) => {
  const getConfidenceBadge = (confidence: 'low' | 'medium' | 'high') => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return (
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 font-semibold">
            High Confidence
          </span>
        );
      case 'medium':
        return (
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-semibold">
            Medium Confidence
          </span>
        );
      case 'low':
      default:
        return (
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
            Low Confidence
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Required Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <span className="font-bold uppercase tracking-wider block font-mono text-amber-300 mb-0.5">
            Needs Human Review • Grounded AI Analysis
          </span>
          These observations are generated strictly from the analyzed repository files and configuration manifests.
          They are labeled as potential areas for improvement or review rather than verified bugs.
        </div>
      </div>

      {/* Issues Cards */}
      <div className="space-y-4">
        {issues && issues.length > 0 ? (
          issues.map((issue, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/80 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs uppercase font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30 font-semibold">
                    Potential Issue #{idx + 1}
                  </span>
                  <span className="font-mono text-xs text-slate-300 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {issue.file}
                  </span>
                </div>
                <div>{getConfidenceBadge(issue.confidence)}</div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-white tracking-tight">
                  {issue.description}
                </h4>
              </div>

              {/* Reason / Code Evidence */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono">
                <span className="text-slate-500 uppercase font-bold text-[10px] block mb-1">
                  Code Observation / Rationale:
                </span>
                {issue.reason}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-sm">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="font-semibold text-white">No prominent structural issues flagged</p>
            <p className="text-xs text-slate-500 mt-1">
              The inspected repository files and manifests follow standard open-source layout conventions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
