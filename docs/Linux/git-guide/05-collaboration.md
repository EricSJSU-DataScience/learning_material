---
layout: default
title: 05 - Collaboration
parent: Git Guide
grand_parent: Linux
nav_order: 5
---

# Collaboration: Sharing and Synchronizing Code

This section covers how to share your changes with others through remote repositories using fetch, pull, and push.

## Table of Contents
- [git fetch](#git-fetch)
- [git pull](#git-pull)
- [git push](#git-push)
- [Remote Repository Management](#remote-repository-management)
- [Collaboration Workflows](#collaboration-workflows)

---

## git fetch

**Purpose:** Download objects and refs from another repository or a local branch

**Syntax:**
```bash
git fetch [options] [remote] [refspec]
```

**What it does:**
- Retrieves commits, branches, and tags from remote repository
- Updates remote-tracking branches (like origin/main)
- Does NOT change your local branches or working directory
- Safe to run anytime - never loses local work
- Allows you to review changes before integrating

**Common Examples:**

```bash
# Fetch from default remote (origin)
git fetch

# Fetch all remotes
git fetch --all

# Fetch specific remote
git fetch upstream

# Fetch specific branch
git fetch origin main

# Fetch tags
git fetch --tags

# Fetch and prune (remove deleted remote branches)
git fetch --prune

# Fetch and rebase
git fetch --rebase

# See what would be fetched
git fetch --dry-run

# Fetch with depth (shallow clone)
git fetch --depth=1
```

**Understanding Remote-Tracking Branches:**

```bash
# After git fetch, you have:
# - Local branches (main, feature-branch)
# - Remote-tracking branches (origin/main, origin/feature-branch)
# These track what was last seen on remote

# View remote-tracking branches
git branch -r

# View all branches (local and remote)
git branch -a

# Compare local vs remote
git log main..origin/main  # commits on remote not local
git log origin/main..main  # commits on local not on remote
```

**Typical Workflow:**

```bash
# 1. See what changed on remote
git fetch origin

# 2. Review remote changes
git log origin/main -3

# 3. Compare with local
git log main..origin/main

# 4. Merge or rebase if ready
git merge origin/main
# or
git rebase origin/main
```

---

## git pull

**Purpose:** Fetch from and integrate with another repository or local branch

**Syntax:**
```bash
git pull [options] [remote] [branch]
```

**What it does:**
- Combination of `git fetch` + `git merge` (or rebase)
- Retrieves changes from remote and integrates them locally
- Updates current working directory
- Shortcut for fetch + merge workflow

**Common Examples:**

```bash
# Pull from default remote and branch
git pull

# Pull from specific remote
git pull origin

# Pull specific branch
git pull origin main

# Pull with rebase instead of merge
git pull --rebase

# Pull from upstream (when using forks)
git pull upstream main

# Pull with depth
git pull --depth=5

# Pull without committing merge
git pull --no-commit

# Pull with detailed output
git pull --verbose

# Pull all remotes
git pull --all
```

**Pull Modes:**

```bash
# Default: fetch + merge
git pull
# Equivalent to:
# git fetch origin
# git merge origin/main

# With rebase: fetch + rebase
git pull --rebase
# Equivalent to:
# git fetch origin
# git rebase origin/main

# No merge commit
git pull --ff-only
# Only pulls if can fast-forward
```

**Handling Conflicts:**

```bash
# 1. Pull encounters conflicts
git pull

# CONFLICT (content): Merge conflict in file.js

# 2. Check conflicted files
git status

# 3. Resolve conflicts manually
# Edit files, look for <<<<<<, ======, >>>>>> markers

# 4. Stage resolved files
git add file.js

# 5. Complete pull/merge
git commit -m "Resolve merge conflict"

# OR abort pull
git merge --abort
```

**Pull vs Fetch:**

```bash
# git fetch - only updates remote-tracking branches
git fetch
# Safe - doesn't change your work

# git pull - fetches AND merges/rebases
git pull
# Immediately integrates changes into your branch
```

---

## git push

**Purpose:** Update remote refs along with associated objects

**Syntax:**
```bash
git push [options] [remote] [branch]
```

**What it does:**
- Uploads your commits to remote repository
- Updates remote branch with your local commits
- Others can then pull your changes
- Requires write access to remote

**Common Examples:**

```bash
# Push to default remote (origin) and branch
git push

# Push to specific remote
git push origin

# Push specific branch
git push origin feature-login

# Push current branch upstream
git push -u origin feature-login
# This sets up tracking for future pushes

# Push all branches
git push origin --all

# Push all tags
git push origin --tags

# Push specific tag
git push origin v1.0

# Force push (DANGEROUS - rewrites history)
git push --force origin main

# Force with lease (safer force push)
git push --force-with-lease origin main

# Push to multiple remotes
git push --all

# Delete remote branch
git push origin --delete feature-old
# or
git push origin :feature-old

# Push and delete tag
git push origin --delete v1.0

# Dry run (see what would happen)
git push --dry-run

# Push specific range of commits
git push origin abc123:main
```

**Setting Up Upstream:**

```bash
# First push of new branch - set upstream
git push -u origin feature-branch
# Next time just type: git push

# Or set upstream after creation
git branch -u origin/feature-branch

# Check upstream
git branch -vv
```

**Force Push Scenarios:**

```bash
# DANGER: Regular force push can lose others' work
git push --force

# SAFER: Force with lease (fails if remote changed)
git push --force-with-lease

# Only use force push on:
# - Personal branches
# - After interactive rebase on own branch
# - NEVER on shared/main branches
```

**Typical Push Workflow:**

```bash
# 1. Make commits
git commit -m "Fix: resolve issue"

# 2. Check if remote has updates
git fetch

# 3. Rebase if needed
git rebase origin/main

# 4. Push to remote
git push -u origin feature-fix

# 5. Create pull request on GitHub/GitLab

# 6. After merge, delete branch
git branch -d feature-fix
git push origin --delete feature-fix
```

---

## Remote Repository Management

### Adding Remotes

```bash
# View all remotes
git remote

# View remotes with URLs
git remote -v

# Add new remote
git remote add <name> <url>

# Example:
git remote add upstream https://github.com/original/repo.git
git remote add origin https://github.com/user/repo.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin old-origin

# Change remote URL
git remote set-url origin https://github.com/user/newrepo.git

# Show remote details
git remote show origin

# Get remote URL
git config --get remote.origin.url
```

### Working with Forks

```bash
# 1. Clone your fork
git clone https://github.com/yourname/project.git
cd project

# 2. Add upstream remote
git remote add upstream https://github.com/original/project.git

# 3. Fetch from upstream
git fetch upstream

# 4. Keep your main updated
git switch main
git rebase upstream/main

# 5. Push to your fork
git push origin main

# 6. Create pull request to upstream
```

---

## Collaboration Workflows

### Feature Branch Workflow

```bash
# 1. Update main
git switch main
git pull origin main

# 2. Create feature branch
git switch -c feature-user-auth

# 3. Make commits
echo "auth logic" > auth.js
git add auth.js
git commit -m "Add authentication"

# 4. Push feature branch
git push -u origin feature-user-auth

# 5. Create Pull Request (on GitHub/GitLab)

# 6. After approval and merge, clean up
git switch main
git pull origin main
git branch -d feature-user-auth
git push origin --delete feature-user-auth
```

### Pull Request Review Process

```bash
# CONTRIBUTOR:
# 1. Fork repository
# 2. Clone fork
git clone https://github.com/yourname/project.git

# 3. Add upstream
git remote add upstream https://github.com/original/project.git

# 4. Create feature branch
git switch -c fix-issue-123

# 5. Make changes and commit
git add .
git commit -m "Fix: Resolve issue #123"

# 6. Keep updated with upstream
git fetch upstream
git rebase upstream/main

# 7. Push to your fork
git push origin fix-issue-123

# 8. Create Pull Request on GitHub

# REVIEWER:
# 1. Review code comments
# 2. Request changes if needed
# 3. Approve and merge

# CONTRIBUTOR (after merge):
# 1. Delete branch
git branch -d fix-issue-123
git push origin --delete fix-issue-123

# 2. Update local main
git fetch upstream
git switch main
git rebase upstream/main
```

### Sync Fork with Upstream

```bash
# Keep your fork up to date
# 1. Fetch from upstream
git fetch upstream

# 2. Rebase main on upstream
git switch main
git rebase upstream/main

# 3. Push updated main to your fork
git push origin main

# 4. Or, create script to run regularly
# run_sync.sh:
#!/bin/bash
git fetch upstream
git switch main
git rebase upstream/main
git push origin main
```

### Team Collaboration on Shared Branch

```bash
# TEAM MEMBER A:
# 1. Create feature
git switch -c feature-api-v2

# 2. Make commits
git commit -m "Add API endpoints"

# 3. Push regularly
git push -u origin feature-api-v2

# TEAM MEMBER B:
# 1. Get updates
git fetch origin

# 2. Review progress
git log origin/feature-api-v2 -5

# 3. Collaborate (pull and add)
git switch feature-api-v2
git pull origin feature-api-v2

# 4. Add more features
git commit -m "Add error handling"

# 5. Push
git push origin feature-api-v2

# TEAM MEMBER A:
# 1. Get updates
git pull origin feature-api-v2

# 2. Resolve any conflicts
# Edit files if conflicts

# 3. Continue working
git commit -m "Fix integration issues"
git push origin feature-api-v2
```

---

## Common Collaboration Scenarios

### Handling Merge Conflicts

```bash
# 1. Pull and conflicts occur
git pull origin main

# 2. Check status
git status

# 3. Edit conflicted files
# Look for <<<<<<, ======, >>>>>> markers
# Choose correct version or combine

# 4. Stage resolved files
git add resolved-file.js

# 5. Commit merge
git commit -m "Resolve merge conflicts with main"

# 6. Push
git push origin feature-branch
```

### Updating Branch with Latest Main

```bash
# Option 1: Merge main into branch
git switch feature-branch
git pull origin main
git push origin feature-branch

# Option 2: Rebase (cleaner history)
git switch feature-branch
git fetch origin
git rebase origin/main
git push --force-with-lease origin feature-branch
```

### Amend and Force Push

```bash
# 1. Made mistake in commit
git commit -m "typo in messge"

# 2. Fix the message
git commit --amend -m "Fix: correct message"

# 3. Need to force push (on your branch only!)
git push --force-with-lease origin feature-branch

# NEVER do this on main or shared branches!
```

### Cherry-pick Commit to Another Branch

```bash
# 1. Find commit hash
git log --oneline main -5

# 2. Switch to target branch
git switch release-branch

# 3. Cherry-pick commit
git cherry-pick abc123

# 4. Resolve conflicts if needed
# git add ...
# git cherry-pick --continue

# 5. Push
git push origin release-branch
```

---

## Troubleshooting Collaboration Issues

### My push was rejected

```bash
# Remote has changes you don't have
# Solution: Pull first
git pull origin main

# Resolve any conflicts
# Then push
git push origin main
```

### I pushed to wrong branch

```bash
# If already pushed:
# 1. Revert the commit on wrong branch
git checkout wrong-branch
git revert abc123
git push origin wrong-branch

# 2. Or reset (if no one pulled yet)
git push --force-with-lease origin wrong-branch~1:wrong-branch
```

### Accidentally committed to main

```bash
# If not pushed yet:
git reset --soft HEAD~1
git stash

# Switch to feature branch
git switch -c feature-branch
git stash pop
git commit -m "Feature"
git push origin feature-branch
```

---

## Best Practices

1. **Always pull before push** - Avoid rejection and conflicts
2. **Use feature branches** - Keep main clean and stable
3. **Small, focused commits** - Easier to review and revert if needed
4. **Write clear messages** - Help others understand your work
5. **Don't force push shared branches** - Only on personal branches
6. **Review before pushing** - Use `git diff --staged`
7. **Keep branches updated** - Rebase or merge frequently
8. **Delete old branches** - Keep repository clean

---

## Next Steps

Review [Sample Workflows](examples/sample-workflows.md) for real-world Git usage patterns.
