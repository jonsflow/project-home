#!/usr/bin/env python3
"""
Merge descriptions from git history into data/repos.json
"""

import json
import re
import subprocess
from pathlib import Path

def get_original_projects_from_git():
    """Get the original projects.js from git history"""
    try:
        result = subprocess.run(
            ["git", "show", "d2b6ddc:js/projects.js"],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError:
        print("Could not retrieve projects.js from git history")
        return None

def extract_descriptions_from_js(content):
    """Extract repo descriptions from projects.js content"""
    descriptions = {}

    # Find each object in the array and extract name and description
    # Pattern: name: "repo-name", description: "..."
    # Handle both quoted and unquoted keys
    object_pattern = r'name:\s*"([^"]+)"[^}]*?description:\s*"([^"]*(?:\\.[^"]*)*)"'

    for match in re.finditer(object_pattern, content, re.DOTALL):
        name = match.group(1)
        description = match.group(2)
        # Unescape the description
        description = description.replace('\\"', '"').replace('\\n', ' ')
        descriptions[name] = description

    return descriptions

def merge_descriptions():
    """Merge descriptions from git history into repos.json"""
    repos_path = Path(__file__).parent.parent / "data" / "repos.json"

    # Get original content from git
    original_content = get_original_projects_from_git()
    if not original_content:
        print("Skipping merge - could not get original content")
        return

    # Extract descriptions
    descriptions = extract_descriptions_from_js(original_content)

    if not descriptions:
        print("No descriptions found in git history")
        return

    print(f"Found {len(descriptions)} descriptions in git history")

    # Load current repos.json
    with open(repos_path, 'r') as f:
        repos = json.load(f)

    # Merge descriptions
    merged_count = 0
    for repo in repos:
        if repo['name'] in descriptions:
            repo['description'] = descriptions[repo['name']]
            merged_count += 1
            print(f"  ✓ {repo['name']}")

    # Save updated repos.json
    with open(repos_path, 'w') as f:
        json.dump(repos, f, indent=2)

    print(f"\n✓ Merged {merged_count}/{len(repos)} descriptions into repos.json")

if __name__ == "__main__":
    merge_descriptions()
