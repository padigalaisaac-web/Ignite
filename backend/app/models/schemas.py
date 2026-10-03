from typing import List, Optional, Literal
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    repo_url: str = Field(..., description="Public GitHub repository URL (e.g. https://github.com/owner/repo)")

class ProjectOverview(BaseModel):
    name: str = Field(..., description="Name of the project")
    description: str = Field(..., description="What the project does and its main purpose")
    technologies: List[str] = Field(default_factory=list, description="Main languages, frameworks, and libraries used")

class ArchitectureComponent(BaseModel):
    name: str = Field(..., description="Component or layer name (e.g., API Gateway, State Store, Core Parser)")
    type: str = Field("service", description="Type of component: frontend, api, service, database, worker, cli, util")
    description: str = Field(..., description="Role and responsibility of this component")
    connects_to: List[str] = Field(default_factory=list, description="Names of other components this connects or delegates to")

class Architecture(BaseModel):
    summary: str = Field(..., description="High-level architectural summary of how the major parts work together")
    components: List[ArchitectureComponent] = Field(default_factory=list, description="Structured components of the architecture")

class ImportantFile(BaseModel):
    path: str = Field(..., description="File path relative to repository root")
    purpose: str = Field(..., description="What this file does in the project")
    importance: str = Field(..., description="Why this file matters to a developer")

class ContributorGuide(BaseModel):
    starting_point: str = Field(..., description="Specific file or directory where a new contributor should begin")
    reason: str = Field(..., description="Detailed explanation of why this starting point is ideal")
    suggested_contribution: str = Field(..., description="One realistic, practical first contribution a developer could make")

class PotentialIssue(BaseModel):
    file: str = Field(..., description="File path or component where the issue was noticed")
    description: str = Field(..., description="Concise description of the potential issue or area needing review")
    reason: str = Field(..., description="Evidence and rationale observed from repository files")
    confidence: Literal["low", "medium", "high"] = Field("medium", description="Confidence level based strictly on code evidence")

class RepoAnalysis(BaseModel):
    project_overview: ProjectOverview
    architecture: Architecture
    code_flow: str = Field(..., description="Explanation of the main execution or request flow in simple developer terms")
    important_files: List[ImportantFile] = Field(default_factory=list)
    contributor_guide: ContributorGuide
    potential_issues: List[PotentialIssue] = Field(default_factory=list)

class RepositoryMeta(BaseModel):
    owner: str
    name: str
    full_name: str
    description: Optional[str] = None
    html_url: str
    default_branch: str = "main"
    stars: int = 0
    forks: int = 0
    open_issues: int = 0
    language: Optional[str] = None
    license: Optional[str] = None
    total_tree_files: int = 0
    analyzed_file_count: int = 0
    ai_provider: str = "ollama"
    ai_model: str = "llama3.2"

class AnalyzeResponse(BaseModel):
    success: bool = True
    repository: RepositoryMeta
    analysis: RepoAnalysis
    message: Optional[str] = None

class HealthResponse(BaseModel):
    status: str = "ok"
    version: str = "1.0.0"
    ai_provider: str
    ai_model: str
