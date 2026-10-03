import logging
from typing import Dict, Any

from app.utils.url_parser import parse_and_validate_github_url
from app.services.github_service import github_service
from app.services.ai_service import ai_service
from app.models.schemas import AnalyzeResponse, RepositoryMeta

logger = logging.getLogger(__name__)

class RepositoryAnalyzer:
    """
    Coordinates the end-to-end repository analysis pipeline:
    URL Validation -> Metadata -> Tree -> File Selection -> Context Building -> AI Analysis -> Schema Validation
    """
    async def analyze(self, repo_url: str) -> AnalyzeResponse:
        # Step 1: Validate URL & parse owner/repo
        owner, repo = parse_and_validate_github_url(repo_url)
        logger.info(f"Analyzing repository: {owner}/{repo}")

        # Step 2: Fetch repository metadata
        meta = await github_service.get_repository_info(owner, repo)

        # Step 3: Fetch file tree
        tree = await github_service.get_repository_tree(owner, repo, meta["default_branch"])
        if not tree:
            raise ValueError(f"Repository '{owner}/{repo}' has no files on branch '{meta['default_branch']}'.")

        # Step 4: Filter and select relevant files
        selected_file_paths = github_service.filter_and_select_relevant_files(tree)
        if not selected_file_paths:
            raise ValueError("No eligible code or documentation files found in repository to analyze.")

        # Step 5: Fetch content of selected files and build context
        file_contents = await github_service.fetch_file_contents(
            owner, repo, meta["default_branch"], selected_file_paths
        )

        # Step 6 & 7: Open-weight AI model analysis and structured validation
        analysis = await ai_service.analyze_repository(meta, tree, file_contents)

        # Step 8: Build repository metadata summary
        provider_info = ai_service.get_provider_info()
        repo_metadata = RepositoryMeta(
            owner=meta["owner"],
            name=meta["name"],
            full_name=meta["full_name"],
            description=meta["description"],
            html_url=meta["html_url"],
            default_branch=meta["default_branch"],
            stars=meta["stars"],
            forks=meta["forks"],
            open_issues=meta["open_issues"],
            language=meta["language"],
            license=meta["license"],
            total_tree_files=len(tree),
            analyzed_file_count=len(file_contents),
            ai_provider=provider_info["provider"],
            ai_model=provider_info["model"]
        )

        return AnalyzeResponse(
            success=True,
            repository=repo_metadata,
            analysis=analysis,
            message="Analysis completed successfully."
        )

repository_analyzer = RepositoryAnalyzer()
