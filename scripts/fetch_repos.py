#!/usr/bin/env python3
"""
Fetch all original (non-fork) repositories for jonsflow user via gh CLI.
Enriches with GitHub Pages status and writes to data/repos.json.
"""

import json
import subprocess
import sys
from pathlib import Path
from typing import Any, Optional

def run_gh_command(args: list[str]) -> str:
    """Run a gh CLI command and return output."""
    try:
        result = subprocess.run(
            ["gh"] + args,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running 'gh {' '.join(args)}': {e.stderr}", file=sys.stderr)
        sys.exit(1)
    except FileNotFoundError:
        print("Error: 'gh' CLI not found. Install it from https://github.com/cli/cli", file=sys.stderr)
        sys.exit(1)

def fetch_repos() -> list[dict[str, Any]]:
    """Fetch all repos via gh CLI."""
    print("Fetching repositories...")
    output = run_gh_command([
        "repo", "list", "jonsflow",
        "--limit", "100",
        "--json", "name,isFork,primaryLanguage,url,homepageUrl,pushedAt,updatedAt,description,repositoryTopics"
    ])

    repos = json.loads(output)
    print(f"Found {len(repos)} total repositories")

    # Filter out forks and project-home itself
    filtered = [r for r in repos if not r.get("isFork") and r.get("name") != "project-home"]
    print(f"Filtered to {len(filtered)} non-fork repositories (excluding project-home)")

    return filtered

def check_github_pages(repo_name: str) -> bool:
    """Check if a repo has GitHub Pages enabled."""
    try:
        output = run_gh_command([
            "api", f"repos/jonsflow/{repo_name}/pages"
        ])
        data = json.loads(output)
        # If we get a response without error, pages are enabled
        return True
    except:
        # If API call fails, pages are not enabled
        return False

def enrich_repos(repos: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Enrich repo data with GitHub Pages status."""
    print("Checking GitHub Pages status...")
    enriched = []

    for i, repo in enumerate(repos, 1):
        print(f"  [{i}/{len(repos)}] {repo['name']}...", end=" ", flush=True)

        has_pages = check_github_pages(repo['name'])
        print(f"{'✓' if has_pages else '✗'}")

        repo_topics = repo.get("repositoryTopics") or []
        topics = [t["name"] for t in repo_topics]

        # Extract language name from object or use string directly
        lang = repo.get("primaryLanguage") or ""
        if isinstance(lang, dict):
            lang = lang.get("name", "")

        enriched_repo = {
            "name": repo["name"],
            "description": repo.get("description", ""),
            "url": repo.get("url", ""),
            "homepageUrl": repo.get("homepageUrl", "") or "",
            "primaryLanguage": lang,
            "hasGitHubPages": has_pages,
            "pushedAt": repo.get("pushedAt", ""),
            "updatedAt": repo.get("updatedAt", ""),
            "topics": topics,
            "included": True,
            "featured": False,
            "category": "",
            "sortOrder": 0
        }
        enriched.append(enriched_repo)

    # Sort by pushedAt descending
    enriched.sort(key=lambda x: x["pushedAt"] or "", reverse=True)

    # Update sortOrder based on final position
    for i, repo in enumerate(enriched):
        repo["sortOrder"] = i

    return enriched

def write_repos_json(repos: list[dict[str, Any]], output_path: Path) -> None:
    """Write repos to JSON file."""
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(repos, f, indent=2)

    print(f"\nWrote {len(repos)} repositories to {output_path}")

def main():
    repos = fetch_repos()
    enriched = enrich_repos(repos)

    output_path = Path(__file__).parent.parent / "data" / "repos.json"
    write_repos_json(enriched, output_path)
    print("✓ Done!")

if __name__ == "__main__":
    main()
