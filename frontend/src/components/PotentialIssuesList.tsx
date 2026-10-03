import React from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';
import type { PotentialIssue } from '../types';

interface PotentialIssuesListProps {
  issues: PotentialIssue[];
}

export const PotentialIssuesList: React.FC<PotentialIssuesListProps> = ({ issues }) => {
  const getConfidenceBadge = (confidence: 'low' | 'medium' | 'high') => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return (
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#3d1f14] text-[#f85149] border border-[#f85149]/30 font-semibold">
            High Confidence
          </span>
        );
      case 'medium':
        return (
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#382800] text-[#d29922] border border-[#d29922]/30 font-semibold">
            Medium Confidence
          </span>
        );
      case 'low':
      default:
        return (
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d] font-semibold">
            Low Confidence
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Notice Banner */}
      <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#d29922] shrink-0 mt-0.5" />
        <div className="text-xs text-[#8b949e] leading-relaxed">
          <span className="font-semibold text-[#f0f6fc] font-mono block mb-0.5">
            Static Observations • Needs Human Review
          </span>
          These items are synthesized strictly from inspecting repository file trees, manifests, and source modules.
          They highlight potential architectural gaps or missing developer configurations rather than confirmed defects.
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {issues && issues.length > 0 ? (
          issues.map((issue, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#21262d]">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#d29922] shrink-0" />
                  <span className="text-xs font-mono font-semibold text-[#f0f6fc]">
                    Advisory #{idx + 1}
                  </span>
                  <span className="font-mono text-xs text-[#58a6ff] bg-[#0d1117] px-2 py-0.5 rounded border border-[#21262d]">
                    {issue.file}
                  </span>
                </div>
                <div>{getConfidenceBadge(issue.confidence)}</div>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#f0f6fc]">
                  {issue.description}
                </h4>
              </div>

              <div className="p-3 rounded bg-[#0d1117] border border-[#21262d] text-xs font-mono text-[#8b949e] leading-relaxed">
                <span className="text-[#6e7681] uppercase font-bold text-[10px] block mb-1">
                  Evidence / Observed Context:
                </span>
                {issue.reason}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-[#161b22] rounded-lg border border-[#30363d] text-[#8b949e] text-xs font-mono">
            <CheckCircle className="w-6 h-6 text-[#3fb950] mx-auto mb-2" />
            <p className="font-semibold text-[#f0f6fc]">No structural anomalies detected</p>
            <p className="text-[11px] text-[#6e7681] mt-1">
              Repository manifests, configurations, and core layouts align with open-source project standards.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
