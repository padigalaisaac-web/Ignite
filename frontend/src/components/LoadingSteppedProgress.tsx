import React, { useEffect, useState } from 'react';
import { Check, Loader2, Terminal } from 'lucide-react';

interface LoadingSteppedProgressProps {
  repoUrl: string;
}

const STEPS = [
  { id: 1, text: 'Connecting to GitHub API & verifying repository...' },
  { id: 2, text: 'Reading recursive Git tree structure...' },
  { id: 3, text: 'Selecting core manifests & architecture files...' },
  { id: 4, text: 'Building bounded code context payload...' },
  { id: 5, text: 'Generating developer guide with open-weight model...' },
  { id: 6, text: 'Validating structured Pydantic schema...' },
  { id: 7, text: 'Finalizing developer workspace...' },
];

export const LoadingSteppedProgress: React.FC<LoadingSteppedProgressProps> = ({ repoUrl }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const intervals = [1200, 1500, 1800, 2200, 2800, 1200];
    let step = 0;

    const stepTimer = setInterval(() => {
      step++;
      if (step < STEPS.length - 1) {
        setCurrentStepIndex(step);
      }
    }, intervals[step] || 2000);

    return () => clearInterval(stepTimer);
  }, []);

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / STEPS.length) * 100));

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 rounded-lg bg-[#161b22] border border-[#30363d] shadow-sm font-mono text-left">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#21262d] text-xs">
        <div className="flex items-center gap-2 text-[#8b949e]">
          <Terminal className="w-4 h-4 text-[#58a6ff]" />
          <span className="text-[#f0f6fc] font-semibold">repopilot-runner</span>
          <span className="text-[#6e7681]">--repo</span>
          <span className="text-[#c9d1d9] truncate max-w-xs">{repoUrl}</span>
        </div>
        <div className="flex items-center gap-3 text-[#8b949e]">
          <span>{elapsedSeconds}s</span>
          <span className="text-[#58a6ff] font-bold">{progressPercent}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#0d1117] h-1.5 rounded-full my-4 overflow-hidden border border-[#21262d]">
        <div 
          className="h-full bg-[#1f6feb] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Execution Stages List */}
      <div className="space-y-2.5 text-xs">
        {STEPS.map((step, index) => {
          const isDone = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 transition-colors ${
                isCurrent 
                  ? 'text-[#f0f6fc] font-medium' 
                  : isDone 
                  ? 'text-[#8b949e]' 
                  : 'text-[#6e7681]'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 text-[#58a6ff] animate-spin" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30363d]" />
                )}
              </div>
              <span>
                [{step.id}/{STEPS.length}] {step.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Terminal Footer */}
      <div className="mt-6 pt-3 border-t border-[#21262d] flex items-center justify-between text-[11px] text-[#6e7681]">
        <span>Engine: Open-Weight Model + Pydantic v2 Schema Guard</span>
        <span>PID: 8000</span>
      </div>
    </div>
  );
};
