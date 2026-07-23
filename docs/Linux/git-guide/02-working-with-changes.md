---
layout: default
title: 02 - Working with Changes
parent: Git Guide
grand_parent: Linux
nav_order: 2
---

# Working with Changes

This section covers how to stage, modify, and remove files in your Git repository.

## Table of Contents
- [git add](#git-add)
- [git restore](#git-restore)
- [git rm](#git-rm)
- [git mv](#git-mv)
- [git commit](#git-commit)

---

## git add

**Purpose:** Add file contents to the index (staging area)

**Syntax:**
```bash
git add [files or patterns]
```

**What it does:**
- Stages changes (new files, modifications) for the next commit
- Moves content from working directory to the staging area (index)
- Allows you to choose which changes to include in your commit
- Doesn't modify the repository until you run `git commit`

**Common Examples:**

```bash
# Add a single file
git add README.md

# Add multiple files
git add file1.js file2.js file3.js

# Add all changes in current directory
git add .

# Add all changes in entire repository
git add -A

# Add all changes interactively (choose what to add)
git add -p

# Add all modified files (but not new files)
git add -u

# Add by pattern
git add src/*.js
git add *.txt
```

**Typical workflow:**
```bash
# Make changes to files
echo "Hello World" > greeting.txt

# Stage the changes
git add greeting.txt

# Check what's staged
git status

# Commit the staged changes
git commit -m "Add greeting file"
```

---

## git restore

**Purpose:** Restore working tree files

**Syntax:**
```bash
git restore [options] <pathspec>
```

**What it does:**
- Discards changes in working directory, reverting files to their last committed state
- Can also unstage files from the staging area
- Does NOT affect commit history
- Cannot recover deleted files that were never committed

**Common Examples:**

```bash
# Discard changes in a file (revert to last commit)
git restore myfile.txt

# Discard changes in multiple files
git restore file1.js file2.js

# Discard all changes in working directory
git restore .

# Unstage a file (remove from staging area, keep changes)
git restore --staged myfile.txt

# Unstage all files
git restore --staged .

# Discard changes AND unstage
git restore --staged --worktree myfile.txt
```

**When to use:**
- You made mistakes and want to discard them
- You staged wrong files and need to unstage them
- You want to go back to the last committed version

**Warning:** Changes are lost permanently (unless in Git reflog)

---

## git rm

**Purpose:** Remove files from the working tree and from the index

**Syntax:**
```bash
git rm [options] <pathspec>
```

**What it does:**
- Removes files from both the working directory and staging area
- Stages the deletion for the next commit
- Similar to `rm` followed by `git add`
- Tracks the deletion in Git history

**Common Examples:**

```bash
# Remove a single file
git rm old-file.txt

# Remove multiple files
git rm file1.js file2.js

# Remove all .log files
git rm *.log

# Remove a file but keep it locally (only remove from repo)
git rm --cached myfile.txt

# Remove entire directory
git rm -r src/

# Force removal (even if file has uncommitted changes)
git rm -f myfile.txt
```

**Typical workflow:**
```bash
# Remove file from working tree and index
git rm old-feature.js

# Check status
git status  # shows "deleted: old-feature.js"

# Commit the deletion
git commit -m "Remove deprecated old-feature.js"
```

**Note:** Use `git rm --cached` to stop tracking a file without deleting it locally (useful for configuration files).

---

## git mv

**Purpose:** Move or rename a file, directory, or symlink

**Syntax:**
```bash
git mv <source> <destination>
```

**What it does:**
- Renames or moves files/directories within the repository
- Automatically stages the change
- Preserves Git history for the moved file
- Simpler than `rm` followed by `add`

**Common Examples:**

```bash
# Rename a file
git mv old-name.js new-name.js

# Move file to different directory
git mv src/app.js src/modules/app.js

# Move and rename
git mv src/old.js dest/new.js

# Move entire directory
git mv old-folder/ new-folder/

# Force move (overwrite if destination exists)
git mv -f source.js dest.js
```

**Typical workflow:**
```bash
# Rename file
git mv utils.js helpers.js

# Check status
git status  # shows "renamed: utils.js -> helpers.js"

# Commit
git commit -m "Rename utils.js to helpers.js"
```

**Tip:** Git tracks content, so renaming a file preserves its history in `git log` and `git blame`.

---

## git commit

**Purpose:** Record changes to the repository

**Syntax:**
```bash
git commit [options] [-m "message"]
```

**What it does:**
- Creates a new commit with all staged changes
- Records metadata (author, date, message)
- Creates a permanent snapshot in repository history
- Each commit has a unique SHA-1 hash identifier

**Common Examples:**

```bash
# Commit with message
git commit -m "Add login feature"

# Commit with longer message
git commit -m "Add login feature" -m "Implements OAuth2 authentication with Google"

# Commit all modified files (skip staging)
git commit -a -m "Update all files"

# Amend last commit (add more changes)
git commit --amend -m "Fixed: Add login feature"

# Amend without changing message
git commit --amend --no-edit

# Interactive commit (review changes)
git commit -p

# Empty commit (no files changed)
git commit --allow-empty -m "Trigger CI/CD"

# Sign commit (with GPG key)
git commit -S -m "Secure commit"
```

**Typical workflow:**
```bash
# Make changes
echo "new content" > file.txt

# Stage changes
git add file.txt

# Check what's being committed
git diff --staged

# Commit
git commit -m "Update file with new content"

# View the commit
git log -1
```

**Commit Message Best Practices:**
```bash
# Good commit messages:
git commit -m "Fix: Resolve null pointer exception in login"
git commit -m "Feat: Add password reset functionality"
git commit -m "Refactor: Simplify authentication logic"
git commit -m "Docs: Update README with setup instructions"
```

**Common Prefixes:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

---

## Common Workflow Example

```bash
# 1. Create or modify files
echo "Hello World" > hello.txt

# 2. Check status
git status

# 3. Stage changes
git add hello.txt

# 4. Review staged changes
git diff --staged

# 5. Commit
git commit -m "Add hello.txt"

# 6. View commit
git log -1
```

---

## Next Steps

Once comfortable with staging and committing, move to [History & Inspection](03-history-and-inspection.md) to learn how to review your work.
