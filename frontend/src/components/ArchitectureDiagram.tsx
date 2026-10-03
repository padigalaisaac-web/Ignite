import React from 'react';
import { 
  GitFork, 
  ArrowDown, 
  Server, 
  Layout, 
  Terminal, 
  Database, 
  Cpu, 
  CornerDownRight 
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
        return <Layout className="w-4 h-4 text-[#58a6ff]" />;
      case 'api':
      case 'gateway':
      case 'router':
        return <Server className="w-4 h-4 text-[#79c0ff]" />;
      case 'cli':
        return <Terminal className="w-4 h-4 text-[#d29922]" />;
      case 'database':
      case 'storage':
        return <Database className="w-4 h-4 text-[#3fb950]" />;
      default:
        return <Cpu className="w-4 h-4 text-[#bc8cff]" />;
    }
  };

  const components = architecture.components && architecture.components.length > 0
    ? architecture.components
    : [
        { name: 'Application Core', type: 'service', description: 'Primary logic and operations', connects_to: [] }
      ];

  return (
    <div className="space-y-6 text-left">
      {/* High-Level Summary Card */}
      <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
        <div className="text-xs font-mono uppercase text-[#8b949e] font-semibold mb-2 flex items-center gap-1.5">
          <GitFork className="w-3.5 h-3.5 text-[#58a6ff]" />
          <span>Architectural Structure</span>
        </div>
        <p className="text-sm text-[#e6edf3] leading-relaxed">
          {architecture.summary}
        </p>
      </div>

      {/* Structured Topology Diagram */}
      <div className="p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#21262d]">
          <div>
            <h4 className="text-sm font-bold text-[#f0f6fc] font-mono">
              Component Topology & Dependency Graph
            </h4>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Deduced from repository source code, routing definitions, and module imports.
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0d1117] text-[#8b949e] border border-[#21262d]">
            {components.length} Layers
          </span>
        </div>

        {/* Structured Flow Schematic */}
        <div className="max-w-2xl mx-auto space-y-3">
          {components.map((comp, idx) => {
            const hasNext = idx < components.length - 1;
            return (
              <React.Fragment key={idx}>
                {/* Node Box */}
                <div className="p-4 rounded-md bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff]/60 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded bg-[#161b22] border border-[#21262d] mt-0.5">
                        {getComponentIcon(comp.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-[#f0f6fc]">
                            {comp.name}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                            {comp.type}
                          </span>
                        </div>
                        <p className="text-xs text-[#8b949e] mt-1.5 leading-relaxed">
                          {comp.description}
                        </p>
                      </div>
                    </div>

                    {/* Dependencies */}
                    {comp.connects_to && comp.connects_to.length > 0 && (
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-[#6e7681] font-mono block">Delegates to:</span>
                        <div className="flex flex-wrap justify-end gap-1 mt-1">
                          {comp.connects_to.map((target, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-[#161b22] text-[#58a6ff] border border-[#30363d] inline-flex items-center gap-1"
                            >
                              <CornerDownRight className="w-2.5 h-2.5 text-[#6e7681]" />
                              {target}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Vertical Flow Connector */}
                {hasNext && (
                  <div className="flex justify-center py-0.5">
                    <div className="flex items-center gap-1 text-[#6e7681]">
                      <ArrowDown className="w-4 h-4" />
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
