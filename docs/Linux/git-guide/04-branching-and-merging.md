---
layout: default
title: 04 - Branching & Merging
parent: Git Guide
grand_parent: Linux
nav_order: 4
---

# Branching, Merging, and Tagging

This section covers managing development branches, merging changes, rebasing, and creating version tags.

## Table of Contents
- [git branch](#git-branch)
- [git switch](#git-switch)
- [git merge](#git-merge)
- [git rebase](#git-rebase)
- [git reset](#git-reset)
- [git tag](#git-tag)

---

## git branch

**Purpose:** List, create, or delete branches

**Syntax:**
```bash
git branch [options] [branch-name]
```

**What it does:**
- Creates, deletes, or lists branches
- Branches are lightweight pointers to commits
- Allows parallel development on different features
- Main branch is typically named "main" or "master"

**Common Examples:**

```bash
# List local branches
git branch

# List all branches (local and remote)
git branch -a

# List remote branches
git branch -r

# Create new branch
git branch feature-login

# Create branch and checkout immediately
git branch -c feature-login

# Create branch from specific commit
git branch feature-login abc123

# Delete branch
git branch -d feature-login

# Force delete branch (even if not merged)
git branch -D feature-login

# Rename branch
git branch -m old-name new-name

# Rename current branch
git branch -m new-name

# Set upstream branch
git branch -u origin/main

# Show tracking info
git branch -vv

# Delete remote branch
git branch -dr origin/feature-old
```

**Branch Information:**

```bash
# Verbose listing (shows last commit)
git branch -v

# Show merged branches
git branch --merged

# Show unmerged branches
git branch --no-merged

# Show branches with more details
git branch -vv
```

**Practical Workflow:**

```bash
# 1. Create feature branch
git branch feature-new-ui

# 2. Switch to it (or use git switch/checkout)
git checkout feature-new-ui

# 3. Make changes
echo "new UI code" > ui.js
git add ui.js
git commit -m "Implement new UI"

# 4. Check branch status
git branch -v

# 5. Switch back to main
git checkout main

# 6. Delete feature branch (after merging)
git branch -d feature-new-ui
```

---

## git switch

**Purpose:** Switch between branches (modern alternative to checkout)

**Syntax:**
```bash
git switch [options] <branch>
```

**What it does:**
- Changes the current branch (working directory updates automatically)
- Simpler and clearer than `git checkout`
- Can create and switch in one command
- Newer Git versions prefer this over `checkout`

**Common Examples:**

```bash
# Switch to existing branch
git switch main

# Switch to previous branch
git switch -

# Create and switch to new branch
git switch -c feature-login

# Create from specific commit
git switch -c feature-login abc123

# Detached HEAD (checkout specific commit)
git switch abc123

# Switch and update files from branch
git switch --force main

# Switch with merge
git switch --merge main
```

**Comparison with Checkout:**

```bash
# Old way (git checkout)
git checkout feature-branch
git checkout -b feature-new

# New way (git switch)
git switch feature-branch
git switch -c feature-new
```

**Typical Workflow:**

```bash
# 1. Create and switch in one command
git switch -c feature-api

# 2. Make changes
echo "API code" > api.js
git add api.js
git commit -m "Add API endpoints"

# 3. Switch back to main
git switch main

# 4. Switch back to feature
git switch feature-api
```

---

## git merge

**Purpose:** Join two or more development histories together

**Syntax:**
```bash
git merge [options] <branch-name>
```

**What it does:**
- Combines commits from another branch into current branch
- Creates merge commit showing history of both branches
- Handles conflicts when same lines were changed differently
- Updates working directory to merged state

**Common Examples:**

```bash
# Merge feature branch into main
git switch main
git merge feature-login

# Merge with specific merge strategy
git merge -s recursive feature-branch

# Merge without creating merge commit (fast-forward only)
git merge --ff-only feature-branch

# Merge and always create merge commit
git merge --no-ff feature-branch

# Merge with message
git merge -m "Merge login feature" feature-login

# Abort merge (if conflicts)
git merge --abort

# Continue merge (after resolving conflicts)
git merge --continue
```

**Merge Strategies:**

```bash
# Fast-forward merge (if possible)
git merge --ff branch

# Always create merge commit
git merge --no-ff branch

# Recursive merge (default for multiple bases)
git merge -s recursive branch

# Resolve strategy
git merge -s resolve branch

# Octopus merge (multiple branches)
git merge branch1 branch2 branch3
```

**Handling Conflicts:**

```bash
# 1. Start merge (conflicts occur)
git merge feature-branch

# 2. Check conflicted files
git status

# 3. Edit files to resolve conflicts
# (look for <<<<<<, ======, >>>>>> markers)

# 4. Stage resolved files
git add resolved-file.js

# 5. Complete merge
git commit -m "Merge feature-branch"

# OR abort if something's wrong
git merge --abort
```

**Conflict Resolution Example:**

```
<<<<<<< HEAD
const version = "1.0";
=======
const version = "2.0";
>>>>>>> feature-branch
```

Solution: Edit to desired version, remove markers, and commit.

---

## git rebase

**Purpose:** Reapply commits on top of another base tip

**Syntax:**
```bash
git rebase [options] <base-branch>
```

**What it does:**
- Rewrites commit history by applying commits on new base
- Creates cleaner, linear history (vs merge commits)
- Useful for keeping feature branches up to date
- Powerful but can be dangerous if misused
- Never rebase public/shared branches

**Common Examples:**

```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Rebase and merge in one step
git rebase --interactive --autosquash main

# Continue rebase (after resolving conflicts)
git rebase --continue

# Abort rebase
git rebase --abort

# Skip current commit during rebase
git rebase --skip

# Rebase onto specific commit
git rebase abc123

# Rebase range of commits
git rebase --onto new-base old-base new-tip
```

**Interactive Rebase (Squash Commits):**

```bash
# Start interactive rebase for last 3 commits
git rebase -i HEAD~3

# In editor, change "pick" to commands:
# p (pick) - use commit
# r (reword) - use commit but edit message
# s (squash) - use commit but meld into previous
# f (fixup) - like squash but discard log message
# d (drop) - remove commit

# Example:
# pick abc1234 First commit
# squash def5678 Second commit
# squash ghi9012 Third commit
# This combines all three into one

# Then edit the combined commit message
```

**Rebase Workflow:**

```bash
# 1. Feature branch is outdated
git switch feature-api
git log --oneline -5
# Shows old commits based on old main

# 2. Rebase onto updated main
git rebase main

# 3. Check if conflicts
git status

# 4. If conflicts, resolve them
# Edit conflicted files
git add resolved-file.js
git rebase --continue

# 5. Complete rebase
# Feature now based on latest main
```

**When to Use Rebase vs Merge:**

```bash
# Use merge for shared/public branches
git switch main
git merge feature-branch

# Use rebase for local feature branches
git switch feature-branch
git rebase main
```

---

## git reset

**Purpose:** Reset current HEAD to the specified state

**Syntax:**
```bash
git reset [options] <commit>
```

**What it does:**
- Moves HEAD and branch pointer to specified commit
- Can unstage changes, discard commits, or both
- Different modes affect working tree and staging area
- Useful for undoing commits or fixing mistakes

**Reset Modes:**

```bash
# --soft: Keep changes, redo commit
git reset --soft HEAD~1

# --mixed (default): Keep files, unstage changes
git reset --mixed HEAD~1

# --hard: Discard everything, go to commit
git reset --hard HEAD~1
```

**Common Examples:**

```bash
# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes unstaged)
git reset --mixed HEAD~1
# or just:
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Unstage specific file
git reset HEAD myfile.txt

# Unstage all files
git reset HEAD

# Reset to specific commit
git reset abc123

# Reset to remote state
git reset origin/main
```

**Practical Scenarios:**

```bash
# Scenario 1: Wrong commit message
git reset --soft HEAD~1
# Re-edit files if needed
git commit -m "Correct message"

# Scenario 2: Included wrong file
git reset --mixed HEAD~1
git add correct-files.js
git reset -- wrong-file.js
git commit -m "Correct commit"

# Scenario 3: Undo recent changes completely
git reset --hard HEAD~3
# Goes back 3 commits, discards all changes
```

---

## git tag

**Purpose:** Create, list, delete or verify a tag object signed with GPG

**Syntax:**
```bash
git tag [options] [tag-name]
```

**What it does:**
- Creates named reference to specific commit (typically for releases)
- Lightweight tags are just pointers
- Annotated tags are full objects with metadata
- Used for marking release points (v1.0, v2.1, etc.)

**Common Examples:**

```bash
# List all tags
git tag

# List tags matching pattern
git tag -l "v1.*"

# Create lightweight tag
git tag v1.0

# Create annotated tag (with message)
git tag -a v1.0 -m "Release version 1.0"

# Create tag for specific commit
git tag v1.0 abc123

# Create signed tag (GPG)
git tag -s v1.0 -m "Signed release"

# Show tag details
git show v1.0

# Delete local tag
git tag -d v1.0

# Delete remote tag
git push origin --delete v1.0

# Push specific tag
git push origin v1.0

# Push all tags
git push origin --tags

# Checkout tag (detached HEAD)
git checkout v1.0

# Create branch from tag
git switch -c release-v1.0 v1.0
```

**Tag Types:**

```bash
# Lightweight tag (just a pointer)
git tag v1.0

# Annotated tag (full object with metadata)
git tag -a v1.0 -m "Release v1.0"
git show v1.0  # Shows tagger, date, message

# Signed tag (with GPG signature)
git tag -s v1.0 -m "Signed release"
```

**Typical Release Workflow:**

```bash
# 1. Make sure everything is ready
git switch main
git pull

# 2. Verify last commit
git log -1

# 3. Create release tag
git tag -a v2.0.0 -m "Release version 2.0.0"

# 4. Push tag to remote
git push origin v2.0.0

# 5. Verify it's there
git tag -l
git ls-remote --tags origin
```

---

## Complex Workflow Example

```bash
# 1. Create feature branch
git switch -c feature-new-auth

# 2. Make commits
echo "auth code" > auth.js
git add auth.js
git commit -m "Add auth module"

echo "more auth" >> auth.js
git add auth.js
git commit -m "Enhance auth"

# 3. Main branch gets updates (from teammates)
git switch main
git pull

# 4. Rebase feature on updated main
git switch feature-new-auth
git rebase main

# 5. Resolve any conflicts
# git add files
# git rebase --continue

# 6. Switch to main and merge
git switch main
git merge feature-new-auth

# 7. Tag the release
git tag -a v1.2.0 -m "Release v1.2.0"

# 8. Push everything
git push origin main
git push origin v1.2.0

# 9. Delete feature branch
git branch -d feature-new-auth
git push origin --delete feature-new-auth
```

---

## Next Steps

Continue to [Collaboration](05-collaboration.md) to learn how to share your work with others.
