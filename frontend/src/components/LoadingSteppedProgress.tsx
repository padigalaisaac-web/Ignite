import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2, Sparkles } from 'lucide-react';

interface LoadingSteppedProgressProps {
  repoUrl: string;
}

const STEPS = [
  { id: 1, text: 'Connecting to GitHub...' },
  { id: 2, text: 'Reading repository structure...' },
  { id: 3, text: 'Selecting important files...' },
  { id: 4, text: 'Understanding the codebase...' },
  { id: 5, text: 'Generating developer guide...' },
  { id: 6, text: 'Validating AI analysis...' },
  { id: 7, text: 'Complete' },
];

export const LoadingSteppedProgress: React.FC<LoadingSteppedProgressProps> = ({ repoUrl }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Progressively advance through the steps to provide rich real-time feedback
    const intervals = [1200, 1500, 1800, 2500, 3000, 1500];
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step < STEPS.length - 1) {
        setCurrentStepIndex(step);
      }
    }, intervals[step] || 2000);

    return () => clearInterval(timer);
  }, []);

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / STEPS.length) * 100));

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Analyzing Repository</h3>
            <p className="text-xs text-slate-400 font-mono truncate max-w-sm">
              {repoUrl}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-cyan-400 font-mono">
            {progressPercent}%
          </span>
          <p className="text-[10px] text-slate-500 font-mono">Pipeline In Progress</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full my-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Stepped Checklist */}
      <div className="space-y-3">
        {STEPS.map((step, index) => {
          const isDone = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 text-xs sm:text-sm transition-all duration-300 ${
                isCurrent 
                  ? 'text-cyan-300 font-medium pl-1' 
                  : isDone 
                  ? 'text-slate-400' 
                  : 'text-slate-600'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <span className="absolute w-3 h-3 rounded-full bg-cyan-400/30 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
              ) : (
                <Circle className="w-4 h-4 text-slate-700 shrink-0" />
              )}
              <span className="font-mono">
                {step.id}. {step.text}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Running open-weight AI analysis & file context synthesis
        </span>
        <span className="hidden sm:inline">RepoPilot AI Engine</span>
      </div>
    </div>
  );
};
