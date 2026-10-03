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
    <div className="max-w-2xl mx-auto my-8 p-6 rounded-2xl bg-rose-950/40 border border-rose-500/40 shadow-xl backdrop-blur-md text-left">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-base font-bold text-white tracking-tight">
            Repository Analysis Error
          </h3>
          <p className="text-xs sm:text-sm text-rose-200 leading-relaxed font-mono">
            {message}
          </p>

          {/* Contextual guidance */}
          {isRateLimit && (
            <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Rate Limit Solution:</span>
              </div>
              <p>
                Add a free GitHub Personal Access Token to <code className="text-cyan-300">backend/.env</code> as <code className="text-cyan-300">GITHUB_TOKEN=...</code> to increase limits from 60 to 5,000 requests/hour.
              </p>
            </div>
          )}

          {isNotFound && (
            <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <Globe className="w-3.5 h-3.5" />
                <span>Verification Check:</span>
              </div>
              <p>
                Verify that the repository is public and spelled correctly in the format <code className="text-cyan-300">https://github.com/owner/repo</code>.
              </p>
            </div>
          )}

          {isTimeout && (
            <div className="mt-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <Clock className="w-3.5 h-3.5" />
                <span>Timeout Note:</span>
              </div>
              <p>
                The repository may contain large manifests or the AI daemon is warming up. Try again or check the configured model in <code className="text-cyan-300">backend/.env</code>.
              </p>
            </div>
          )}

          <div className="pt-3 flex items-center gap-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            )}
            {onReset && (
              <button
                onClick={onReset}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors cursor-pointer border border-slate-700"
              >
                <span>Enter Another Repository</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
