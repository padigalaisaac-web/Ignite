import React, { useState } from 'react';
import { FileCode, Copy, Check, ExternalLink, Search } from 'lucide-react';
import type { ImportantFile, RepositoryMeta } from '../types';

interface ImportantFilesTableProps {
  files: ImportantFile[];
  repository: RepositoryMeta;
}

export const ImportantFilesTable: React.FC<ImportantFilesTableProps> = ({ files, repository }) => {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const filteredFiles = files.filter(f => 
    f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.importance.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <span>Important Repository Files & Folders</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Key entrypoints, manifests, and core architectural components identified by AI.
          </p>
        </div>

        {/* Filter input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter files..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 font-mono"
          />
        </div>
      </div>

      {/* Files Grid / List */}
      <div className="grid grid-cols-1 gap-3.5">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, idx) => {
            const githubFileUrl = `${repository.html_url}/blob/${repository.default_branch}/${file.path}`;
            const isCopied = copiedPath === file.path;

            return (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-sm group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* File Path & Badge */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-semibold text-cyan-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 flex items-center gap-1.5 group-hover:border-cyan-500/40 transition-colors">
                        <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                        {file.path}
                      </span>
                      <button
                        onClick={() => handleCopy(file.path)}
                        className="p-1 text-slate-500 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Copy file path"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={githubFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-slate-500 hover:text-cyan-400 rounded hover:bg-slate-800 transition-colors"
                        title="Open file on GitHub"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Purpose */}
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <span className="text-slate-500 font-mono text-[11px] block uppercase font-medium">Purpose</span>
                      {file.purpose}
                    </div>

                    {/* Importance */}
                    <div className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                      <span className="text-slate-500 font-mono text-[11px] block uppercase font-medium">Why It Matters</span>
                      {file.importance}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-500 text-sm font-mono">
            No files matched your filter query.
          </div>
        )}
      </div>
    </div>
  );
};
