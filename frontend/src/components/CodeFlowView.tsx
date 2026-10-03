import React from 'react';
import { GitFork, Zap } from 'lucide-react';

interface CodeFlowViewProps {
  codeFlow: string;
}

export const CodeFlowView: React.FC<CodeFlowViewProps> = ({ codeFlow }) => {
  // If the flow contains numbered items or bullet points, format them into structured stages
  const lines = codeFlow
    .split(/\n+/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Execution & Request Lifecycle Flow
            </h3>
            <p className="text-xs text-slate-400">
              How requests, commands, or data propagate through the codebase at runtime.
            </p>
          </div>
        </div>

        {/* Narrative / Steps */}
        <div className="mt-6 space-y-4">
          {lines.length > 1 ? (
            <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
              {lines.map((stepText, idx) => (
                <div key={idx} className="relative group">
                  {/* Step dot */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>
                  
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 group-hover:border-cyan-500/30 transition-colors">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold mb-2 inline-block">
                      Phase {idx + 1}
                    </span>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                      {stepText.replace(/^[0-9]+[\.\)]\s*/, '').replace(/^[-*]\s*/, '')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm leading-relaxed font-sans whitespace-pre-line">
              {codeFlow}
            </div>
          )}
        </div>
      </div>

      {/* Developer Insight callout */}
      <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-3">
        <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="text-cyan-300 font-semibold font-mono block mb-0.5">Execution Summary:</span>
          Understanding this control flow enables you to set strategic breakpoints, write targeted integration tests, and trace error handling paths effectively.
        </div>
      </div>
    </div>
  );
};
