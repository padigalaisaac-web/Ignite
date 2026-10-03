import { Terminal, GitFork } from 'lucide-react';

interface CodeFlowViewProps {
  codeFlow: string;
}

export const CodeFlowView: React.FC<CodeFlowViewProps> = ({ codeFlow }) => {
  const lines = codeFlow
    .split(/\n+/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#21262d]">
          <Terminal className="w-4 h-4 text-[#58a6ff]" />
          <div>
            <h3 className="text-sm font-bold text-[#f0f6fc] font-mono">
              Execution & Request Lifecycle Flow
            </h3>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Runtime control propagation from bootstrap entrypoint to service execution.
            </p>
          </div>
        </div>

        {/* Structured Sequence */}
        <div className="space-y-3">
          {lines.length > 1 ? (
            lines.map((stepText, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-xs font-mono text-[#8b949e] shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="p-3 rounded-md bg-[#0d1117] border border-[#21262d] flex-1 text-xs text-[#c9d1d9] leading-relaxed">
                  {stepText.replace(/^[0-9]+[\.\)]\s*/, '').replace(/^[-*]\s*/, '')}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-md bg-[#0d1117] border border-[#21262d] text-xs text-[#c9d1d9] leading-relaxed font-mono whitespace-pre-line">
              {codeFlow}
            </div>
          )}
        </div>
      </div>

      {/* Engineering Summary Note */}
      <div className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] flex items-start gap-3 text-xs text-[#8b949e]">
        <GitFork className="w-4 h-4 text-[#58a6ff] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#c9d1d9] font-mono">Control Flow Note:</strong> Trace this sequence when reproducing bugs or placing debugger breakpoints. New features should hook into the appropriate lifecycle phase.
        </p>
      </div>
    </div>
  );
};
