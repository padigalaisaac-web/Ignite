import re
import base64
import logging
from typing import Dict, Any, List, Optional, Tuple
import httpx

from app.config import settings

logger = logging.getLogger(__name__)

# Extensions to ignore (binaries, multimedia, fonts, archives, compiled files)
IGNORED_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".bmp", ".tiff",
    ".mp4", ".mov", ".avi", ".webm", ".mp3", ".wav", ".ogg",
    ".zip", ".tar", ".gz", ".7z", ".rar", ".iso",
    ".exe", ".dll", ".so", ".dylib", ".bin", ".pyc", ".pyo", ".class", ".wasm",
    ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
    ".woff", ".woff2", ".ttf", ".eot", ".otf",
    ".lock", ".map", ".min.js", ".min.css", ".bundle.js"
}

# Directories to ignore
IGNORED_DIRECTORIES = {
    "node_modules", ".git", ".github", ".gitlab", ".vscode", ".idea",
    "dist", "build", "target", "out", "bin", "obj", ".next", ".nuxt",
    "venv", ".venv", "env", "__pycache__", ".pytest_cache", ".mypy_cache",
    "coverage", ".tox", ".eggs", "vendor", "pods", "assets", "static", "public"
}

# High-priority documentation and config manifests
MANIFEST_PRIORITY = {
    "readme.md": 100,
    "readme": 99,
    "readme.rst": 98,
    "readme.txt": 97,
    "architecture.md": 95,
    "design.md": 94,
    "contributing.md": 93,
    "package.json": 90,
    "pyproject.toml": 90,
    "setup.py": 89,
    "requirements.txt": 88,
    "cargo.toml": 90,
    "go.mod": 90,
    "pom.xml": 90,
    "build.gradle": 90,
    "dockerfile": 85,
    "docker-compose.yml": 84,
    "makefile": 83,
    "tsconfig.json": 80
}

# Primary entry point filenames across languages
ENTRYPOINT_NAMES = {
    "main.py", "app.py", "cli.py", "server.py", "index.py", "wsgi.py", "asgi.py",
    "index.ts", "index.js", "main.ts", "main.js", "app.ts", "app.js", "server.ts", "server.js",
    "app.tsx", "main.tsx",
    "main.go", "main.rs", "lib.rs", "application.java", "main.java"
}

class GitHubService:
    def __init__(self):
        self.headers = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "RepoPilot-AI"
        }
        if settings.GITHUB_TOKEN:
            self.headers["Authorization"] = f"Bearer {settings.GITHUB_TOKEN}"

    async def get_repository_info(self, owner: str, repo: str) -> Dict[str, Any]:
        """Fetch general repository metadata from GitHub API."""
        url = f"https://api.github.com/repos/{owner}/{repo}"
        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT_SECONDS) as client:
            resp = await client.get(url, headers=self.headers)
            if resp.status_code == 404:
                raise ValueError(f"Repository '{owner}/{repo}' not found on GitHub or is private.")
            elif resp.status_code in (403, 429):
                rate_limit_msg = (
                    "GitHub API rate limit exceeded. "
                    "Add a free GITHUB_TOKEN to backend/.env to increase limit to 5,000 requests/hour."
                )
                logger.warning(rate_limit_msg)
                raise ValueError(rate_limit_msg)
            elif resp.status_code != 200:
                raise ValueError(f"GitHub API error ({resp.status_code}): {resp.text}")

            data = resp.json()
            if data.get("size", 0) == 0 and not data.get("default_branch"):
                raise ValueError(f"Repository '{owner}/{repo}' appears to be empty.")

            return {
                "owner": data.get("owner", {}).get("login", owner),
                "name": data.get("name", repo),
                "full_name": data.get("full_name", f"{owner}/{repo}"),
                "description": data.get("description") or "No description provided.",
                "html_url": data.get("html_url", f"https://github.com/{owner}/{repo}"),
                "default_branch": data.get("default_branch") or "main",
                "stars": data.get("stargazers_count", 0),
                "forks": data.get("forks_count", 0),
                "open_issues": data.get("open_issues_count", 0),
                "language": data.get("language") or "Mixed",
                "license": data.get("license", {}).get("name") if data.get("license") else "None",
            }

    async def get_repository_tree(self, owner: str, repo: str, default_branch: str) -> List[Dict[str, Any]]:
        """Fetch the full recursive Git tree of the repository."""
        url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{default_branch}?recursive=1"
        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT_SECONDS) as client:
            resp = await client.get(url, headers=self.headers)
            if resp.status_code == 200:
                tree_data = resp.json()
                return [item for item in tree_data.get("tree", []) if item.get("type") == "blob"]
            
            # Fallback if git/trees is unavailable or branch differs:
            logger.warning(f"Git tree recursive endpoint returned {resp.status_code}. Falling back to contents API.")
            return await self._fallback_fetch_tree(owner, repo, "")

    async def _fallback_fetch_tree(self, owner: str, repo: str, path: str = "") -> List[Dict[str, Any]]:
        """Fallback to contents API if tree API fails."""
        url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
        files = []
        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT_SECONDS) as client:
            resp = await client.get(url, headers=self.headers)
            if resp.status_code != 200:
                return files
            items = resp.json()
            if not isinstance(items, list):
                return files
            for item in items:
                if item.get("type") == "file":
                    files.append({"path": item.get("path"), "size": item.get("size", 0)})
                elif item.get("type") == "dir" and item.get("name") not in IGNORED_DIRECTORIES:
                    sub_files = await self._fallback_fetch_tree(owner, repo, item.get("path"))
                    files.extend(sub_files)
        return files

    def filter_and_select_relevant_files(self, tree_items: List[Dict[str, Any]]) -> List[str]:
        """
        Filters out noise and ranks repository files to select the most informative files
        for architecture understanding, code flow, and contributor guidance.
        """
        scored_candidates: List[Tuple[int, str]] = []

        for item in tree_items:
            path = item.get("path", "")
            if not path:
                continue

            parts = path.split("/")
            filename = parts[-1].lower()
            name_base = filename.split(".")[0]
            ext = "." + filename.split(".")[-1] if "." in filename else ""

            # Check ignored directories
            if any(part in IGNORED_DIRECTORIES for part in parts[:-1]):
                continue

            # Check ignored file extensions
            if ext in IGNORED_EXTENSIONS or filename in ("package-lock.json", "yarn.lock", "pnpm-lock.yaml", "poetry.lock"):
                continue

            # Check for large minified files or hidden dotfiles (except .env.example, .gitignore)
            if parts[-1].startswith(".") and parts[-1] not in (".env.example", ".gitignore", ".eslintrc.json"):
                continue

            score = 0

            # 1. High priority manifests & documentation
            if filename in MANIFEST_PRIORITY:
                score += MANIFEST_PRIORITY[filename]

            # 2. Main entry points
            if filename in ENTRYPOINT_NAMES:
                score += 85
            elif name_base in ("main", "app", "index", "server", "core", "router", "routes", "api"):
                score += 70

            # 3. Code files in top-level or primary directories (e.g. src/, app/, lib/)
            depth = len(parts)
            if depth <= 2:
                score += 35
            elif depth <= 4:
                score += 20
            else:
                score += 5

            # 4. Source code extension boost
            if ext in (".py", ".ts", ".tsx", ".js", ".jsx", ".go", ".rs", ".java", ".rb", ".php", ".cs", ".cpp", ".c"):
                score += 30

            # 5. Penalize test or spec files slightly so core logic is prioritized
            if "test" in filename or "spec" in filename or "mock" in filename:
                score -= 25

            scored_candidates.append((score, path))

        # Sort by score descending
        scored_candidates.sort(key=lambda x: x[0], reverse=True)

        # Pick top N files
        selected_paths = [path for score, path in scored_candidates[:settings.MAX_ANALYSIS_FILES]]
        return selected_paths

    async def fetch_file_contents(self, owner: str, repo: str, default_branch: str, file_paths: List[str]) -> Dict[str, str]:
        """
        Fetches the contents of the selected files.
        Truncates large files to prevent blowing context limits.
        """
        results: Dict[str, str] = {}
        async with httpx.AsyncClient(timeout=settings.REQUEST_TIMEOUT_SECONDS) as client:
            for path in file_paths:
                # Raw URL is fast and avoids API rate limiting on contents
                raw_url = f"https://raw.githubusercontent.com/{owner}/{repo}/{default_branch}/{path}"
                try:
                    resp = await client.get(raw_url, headers=self.headers)
                    if resp.status_code == 200:
                        content = resp.text
                        # Truncate if exceeds max bytes
                        if len(content.encode("utf-8", errors="ignore")) > settings.MAX_FILE_BYTES:
                            truncated = content[:settings.MAX_FILE_BYTES]
                            results[path] = truncated + "\n\n... [Content truncated for context window] ..."
                        else:
                            results[path] = content
                    else:
                        # Fallback to GitHub Contents API
                        api_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}?ref={default_branch}"
                        api_resp = await client.get(api_url, headers=self.headers)
                        if api_resp.status_code == 200:
                            data = api_resp.json()
                            if data.get("encoding") == "base64" and data.get("content"):
                                decoded = base64.b64decode(data["content"]).decode("utf-8", errors="replace")
                                if len(decoded.encode("utf-8", errors="ignore")) > settings.MAX_FILE_BYTES:
                                    results[path] = decoded[:settings.MAX_FILE_BYTES] + "\n\n... [Content truncated] ..."
                                else:
                                    results[path] = decoded
                except Exception as e:
                    logger.warning(f"Failed to fetch content for file {path}: {e}")
                    results[path] = f"// Error reading file: {str(e)}"

        return results

github_service = GitHubService()
