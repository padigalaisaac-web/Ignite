import re
from typing import Tuple
from urllib.parse import urlparse

OWNER_REPO_REGEX = re.compile(r"^[A-Za-z0-9_.-]+$")

def parse_and_validate_github_url(repo_url: str) -> Tuple[str, str]:
    """
    Parses and strictly validates a GitHub repository URL or slug.
    Returns (owner, repo).
    Raises ValueError if invalid or suspicious.
    """
    if not repo_url or not isinstance(repo_url, str):
        raise ValueError("Repository URL cannot be empty.")

    cleaned = repo_url.strip()
    
    # Check for direct slug format: owner/repo
    if "/" in cleaned and not cleaned.startswith("http://") and not cleaned.startswith("https://") and not cleaned.startswith("git@"):
        parts = cleaned.split("/")
        if len(parts) == 2 and parts[0] != "github.com":
            owner, repo = parts[0].strip(), parts[1].strip()
            if repo.endswith(".git"):
                repo = repo[:-4]
            if OWNER_REPO_REGEX.match(owner) and OWNER_REPO_REGEX.match(repo):
                return owner, repo

    # Add scheme if missing
    if not cleaned.startswith("http://") and not cleaned.startswith("https://"):
        cleaned = "https://" + cleaned

    try:
        parsed = urlparse(cleaned)
    except Exception as e:
        raise ValueError(f"Malformed URL: {str(e)}")

    hostname = (parsed.hostname or "").lower()
    if hostname != "github.com" and hostname != "www.github.com":
        raise ValueError("Only public github.com repositories are supported. (e.g., https://github.com/owner/repository)")

    path = parsed.path.strip("/")
    path_parts = [p for p in path.split("/") if p]

    if len(path_parts) < 2:
        raise ValueError("Invalid GitHub URL. Must specify both owner and repository name (e.g. https://github.com/owner/repository).")

    owner = path_parts[0].strip()
    repo = path_parts[1].strip()

    if repo.endswith(".git"):
        repo = repo[:-4]

    # Security check: disallow special characters and path traversal
    if not OWNER_REPO_REGEX.match(owner) or not OWNER_REPO_REGEX.match(repo):
        raise ValueError("Owner and repository name contain invalid characters.")

    if owner in [".", ".."] or repo in [".", ".."]:
        raise ValueError("Invalid repository path traversal attempt.")

    return owner, repo
