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
    <div className="space-y-4 text-left">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h3 className="text-base font-bold text-[#f0f6fc] font-mono flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#58a6ff]" />
            <span>Important Files & Directories</span>
          </h3>
          <p className="text-xs text-[#8b949e] mt-0.5">
            Key entrypoints, manifest specifications, and core modules ranked by centrality.
          </p>
        </div>

        {/* Filter input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#6e7681] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter files..."
            className="w-full pl-8 pr-3 py-1.5 rounded bg-[#161b22] border border-[#30363d] text-xs text-[#f0f6fc] placeholder-[#6e7681] outline-none focus:border-[#58a6ff] font-mono"
          />
        </div>
      </div>

      {/* Structured File Inspector Table */}
      <div className="rounded-lg border border-[#30363d] bg-[#161b22] overflow-hidden">
        {filteredFiles.length > 0 ? (
          <div className="divide-y divide-[#21262d]">
            {filteredFiles.map((file, idx) => {
              const githubFileUrl = `${repository.html_url}/blob/${repository.default_branch}/${file.path}`;
              const isCopied = copiedPath === file.path;

              return (
                <div 
                  key={idx}
                  className="p-4 hover:bg-[#21262d]/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#58a6ff] bg-[#0d1117] px-2 py-0.5 rounded border border-[#21262d] flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-[#8b949e]" />
                        {file.path}
                      </span>
                      <button
                        onClick={() => handleCopy(file.path)}
                        className="p-1 text-[#8b949e] hover:text-[#f0f6fc] rounded hover:bg-[#30363d] transition-colors cursor-pointer"
                        title="Copy file path"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={githubFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-[#8b949e] hover:text-[#58a6ff] rounded hover:bg-[#30363d] transition-colors"
                        title="Open file in GitHub"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                    <div>
                      <span className="text-[#6e7681] font-mono text-[10px] uppercase font-semibold block mb-0.5">
                        Purpose
                      </span>
                      <p className="text-[#c9d1d9] leading-relaxed">
                        {file.purpose}
                      </p>
                    </div>

                    <div>
                      <span className="text-[#6e7681] font-mono text-[10px] uppercase font-semibold block mb-0.5">
                        Why It Matters
                      </span>
                      <p className="text-[#8b949e] leading-relaxed">
                        {file.importance}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-[#8b949e] text-xs font-mono">
            No files matched your filter query.
          </div>
        )}
      </div>
    </div>
  );
};
