import React from 'react';
import { 
  Layers, 
  ArrowDown, 
  Server, 
  Layout, 
  Terminal, 
  Database, 
  Cpu, 
  Workflow, 
  Link2 
} from 'lucide-react';
import type { Architecture } from '../types';

interface ArchitectureDiagramProps {
  architecture: Architecture;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ architecture }) => {
  const getComponentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'frontend':
      case 'ui':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'api':
      case 'routes':
      case 'gateway':
        return <Server className="w-5 h-5 text-blue-400" />;
      case 'cli':
        return <Terminal className="w-5 h-5 text-amber-400" />;
      case 'database':
      case 'storage':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'worker':
      case 'queue':
        return <Workflow className="w-5 h-5 text-purple-400" />;
      default:
        return <Cpu className="w-5 h-5 text-indigo-400" />;
    }
  };

  const getTypeBadgeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'frontend':
      case 'ui':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30';
      case 'api':
      case 'gateway':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/30';
      case 'cli':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/30';
      case 'database':
      case 'storage':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30';
      case 'worker':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/30';
      default:
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30';
    }
  };

  const components = architecture.components && architecture.components.length > 0
    ? architecture.components
    : [
        { name: 'Application Core', type: 'service', description: 'Primary logic and operations', connects_to: [] }
      ];

  return (
    <div className="space-y-6">
      {/* High-Level Summary Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          System Architecture Summary
        </h3>
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
          {architecture.summary}
        </p>
      </div>

      {/* Visual Component Flow Diagram */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md relative">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Visual Execution & Data Topology</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Generated dynamically from open-weight model analysis of repository files and modules.
            </p>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
            {components.length} Components Mapped
          </span>
        </div>

        {/* Dynamic Topology Cards */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {components.map((comp, idx) => {
            const hasNext = idx < components.length - 1;
            return (
              <React.Fragment key={idx}>
                {/* Component Block */}
                <div className="group p-5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all shadow-md relative">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0 group-hover:border-cyan-500/30 transition-colors">
                        {getComponentIcon(comp.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h5 className="font-semibold text-white text-base font-mono">
                            {comp.name}
                          </h5>
                          <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${getTypeBadgeStyle(comp.type)}`}>
                            {comp.type}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                          {comp.description}
                        </p>
                      </div>
                    </div>

                    {/* Component Connections */}
                    {comp.connects_to && comp.connects_to.length > 0 && (
                      <div className="sm:text-right shrink-0 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                        <span className="text-[10px] text-slate-500 font-mono block">Delegates to:</span>
                        <div className="flex flex-wrap sm:justify-end gap-1 mt-1">
                          {comp.connects_to.map((target, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700/60 inline-flex items-center gap-1"
                            >
                              <Link2 className="w-2.5 h-2.5 text-cyan-400" />
                              {target}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Directional Flow Arrow */}
                {hasNext && (
                  <div className="flex items-center justify-center py-1">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-3 bg-slate-700" />
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-sm">
                        <ArrowDown className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-0.5 h-3 bg-slate-700" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
