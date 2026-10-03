export interface ProjectOverview {
  name: string;
  description: string;
  technologies: string[];
}

export interface ArchitectureComponent {
  name: string;
  type: string; // 'frontend' | 'api' | 'service' | 'database' | 'worker' | 'cli' | 'util'
  description: string;
  connects_to: string[];
}

export interface Architecture {
  summary: string;
  components: ArchitectureComponent[];
}

export interface ImportantFile {
  path: string;
  purpose: string;
  importance: string;
}

export interface ContributorGuide {
  starting_point: string;
  reason: string;
  suggested_contribution: string;
}

export interface PotentialIssue {
  file: string;
  description: string;
  reason: string;
  confidence: 'low' | 'medium' | 'high';
}

export interface RepoAnalysis {
  project_overview: ProjectOverview;
  architecture: Architecture;
  code_flow: string;
  important_files: ImportantFile[];
  contributor_guide: ContributorGuide;
  potential_issues: PotentialIssue[];
}

export interface RepositoryMeta {
  owner: string;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  default_branch: string;
  stars: number;
  forks: number;
  open_issues: number;
  language?: string;
  license?: string;
  total_tree_files: number;
  analyzed_file_count: number;
  ai_provider: string;
  ai_model: string;
}

export interface AnalyzeResponse {
  success: boolean;
  repository: RepositoryMeta;
  analysis: RepoAnalysis;
  message?: string;
}

export interface HealthResponse {
  status: string;
  version: string;
  ai_provider: string;
  ai_model: string;
}
