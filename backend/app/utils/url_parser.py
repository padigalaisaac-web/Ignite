import re
from typing import Tuple
from urllib.parse import urlparse

OWNER_REPO_REGEX = re.compile(r"^[A-Za-z0-9_.-]+$")

def parse_and_validate_github_url(repo_url: str) -> Tuple[str, str]:
    """
    Parses and strictly validates a GitHub repository URL or slug.
    Supports formats:
      - https://github.com/owner/repo
      - https://github.com/owner/repo/
      - https://github.com/owner/repo/tree/main
      - http://github.com/owner/repo
      - github.com/owner/repo
      - owner/repo
      - git@github.com:owner/repo.git
    Returns (owner, repo).
    Raises ValueError if invalid or suspicious.
    """
    if not repo_url or not isinstance(repo_url, str):
        raise ValueError("Repository URL cannot be empty.")

    cleaned = repo_url.strip()

    # Handle SSH git clone URLs: git@github.com:owner/repo.git
    if cleaned.startswith("git@github.com:"):
        path_part = cleaned[len("git@github.com:"):].strip("/")
        parts = [p for p in path_part.split("/") if p]
        if len(parts) >= 2:
            owner = parts[0].strip()
            repo = parts[1].strip()
            if repo.endswith(".git"):
                repo = repo[:-4]
            if OWNER_REPO_REGEX.match(owner) and OWNER_REPO_REGEX.match(repo):
                return owner, repo

    # Handle raw slug like: owner/repo or owner/repo/ (when no scheme or domain provided)
    if not cleaned.startswith("http://") and not cleaned.startswith("https://") and not cleaned.startswith("github.com/"):
        parts = [p.strip() for p in cleaned.split("/") if p.strip()]
        if len(parts) == 2:
            owner, repo = parts[0], parts[1]
            if repo.endswith(".git"):
                repo = repo[:-4]
            if OWNER_REPO_REGEX.match(owner) and OWNER_REPO_REGEX.match(repo):
                return owner, repo

    # Normalize domain prefix: github.com/owner/repo -> https://github.com/owner/repo
    if cleaned.startswith("github.com/") or cleaned.startswith("www.github.com/"):
        cleaned = "https://" + cleaned
    elif not cleaned.startswith("http://") and not cleaned.startswith("https://"):
        cleaned = "https://" + cleaned

    try:
        parsed = urlparse(cleaned)
    except Exception as e:
        raise ValueError(f"Malformed URL: {str(e)}")

    hostname = (parsed.hostname or "").lower()
    if hostname != "github.com" and hostname != "www.github.com":
        raise ValueError(
            f"Only public github.com repositories are supported. Received '{hostname or cleaned}' instead."
        )

    # Path parts: /owner/repo/...
    path = parsed.path.strip("/")
    path_parts = [p.strip() for p in path.split("/") if p.strip()]

    if len(path_parts) < 2:
        raise ValueError("Invalid GitHub URL. Must specify both owner and repository name (e.g. https://github.com/owner/repository).")

    owner = path_parts[0]
    repo = path_parts[1]

    if repo.endswith(".git"):
        repo = repo[:-4]

    # Security check: disallow special characters and path traversal
    if not OWNER_REPO_REGEX.match(owner) or not OWNER_REPO_REGEX.match(repo):
        raise ValueError("Owner and repository name contain invalid characters.")

    if owner in [".", ".."] or repo in [".", ".."]:
        raise ValueError("Invalid repository path traversal attempt.")

    return owner, repo
