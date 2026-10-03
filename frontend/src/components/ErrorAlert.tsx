import React from 'react';
import { AlertCircle, RotateCcw, KeyRound, Globe, Clock } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  onReset?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onRetry, onReset }) => {
  const isRateLimit = message.toLowerCase().includes('rate limit');
  const isTimeout = message.toLowerCase().includes('timeout');
  const isNotFound = message.toLowerCase().includes('not found') || message.toLowerCase().includes('private');

  return (
    <div className="max-w-3xl mx-auto my-8 p-5 rounded-lg bg-[#161b22] border border-[#f85149]/40 text-left text-xs font-mono">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#f85149] shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-bold text-[#f0f6fc]">
            Analysis Pipeline Execution Error
          </h3>
          <p className="text-[#f85149] leading-relaxed">
            {message}
          </p>

          {/* Contextual guidance */}
          {isRateLimit && (
            <div className="mt-2 p-3 rounded bg-[#0d1117] border border-[#21262d] text-[#8b949e] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#58a6ff]">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Rate Limit Exceeded:</span>
              </div>
              <p>
                Add a free GitHub Personal Access Token to <code className="text-[#c9d1d9]">backend/.env</code> as <code className="text-[#c9d1d9]">GITHUB_TOKEN=...</code> to increase the limit from 60 to 5,000 requests/hour.
              </p>
            </div>
          )}

          {isNotFound && (
            <div className="mt-2 p-3 rounded bg-[#0d1117] border border-[#21262d] text-[#8b949e] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#58a6ff]">
                <Globe className="w-3.5 h-3.5" />
                <span>Repository Access:</span>
              </div>
              <p>
                Verify that the repository is public and accessible at <code className="text-[#c9d1d9]">https://github.com/owner/repo</code>.
              </p>
            </div>
          )}

          {isTimeout && (
            <div className="mt-2 p-3 rounded bg-[#0d1117] border border-[#21262d] text-[#8b949e] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#58a6ff]">
                <Clock className="w-3.5 h-3.5" />
                <span>Timeout Note:</span>
              </div>
              <p>
                The repository may contain large manifests or the AI daemon is loading weights. Check the configured model in <code className="text-[#c9d1d9]">backend/.env</code>.
              </p>
            </div>
          )}

          <div className="pt-2 flex items-center gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-3 py-1.5 rounded bg-[#f85149] hover:bg-[#da3633] text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Analysis</span>
              </button>
            )}
            {onReset && (
              <button
                onClick={onReset}
                className="px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] font-medium text-xs transition-colors cursor-pointer border border-[#30363d]"
              >
                <span>Enter Another URL</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
