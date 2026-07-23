---
layout: default
title: 03 - History & Inspection
parent: Git Guide
grand_parent: Linux
nav_order: 3
---

# Examining History and Inspecting Status

This section covers how to view commit history, compare changes, search code, and inspect repository status.

## Table of Contents
- [git log](#git-log)
- [git diff](#git-diff)
- [git status](#git-status)
- [git show](#git-show)
- [git grep](#git-grep)
- [git bisect](#git-bisect)

---

## git log

**Purpose:** Show commit logs and history

**Syntax:**
```bash
git log [options]
```

**What it does:**
- Displays commit history in reverse chronological order
- Shows commit hash, author, date, and message
- Allows filtering and formatting of commits
- Helps understand project evolution

**Common Examples:**

```bash
# View commit history (basic)
git log

# View last 5 commits
git log -5

# View commits in one-line format
git log --oneline

# View with author and time info
git log --pretty=format:"%h - %an, %ar : %s"

# View all branches
git log --all

# View commits for a specific file
git log myfile.txt

# View commits in graph format (showing branches)
git log --graph --oneline --all

# View commits by specific author
git log --author="John Doe"

# View commits since a date
git log --since="2024-01-01"

# View commits by keyword in message
git log --grep="fix"

# View commits with diff
git log -p

# View commits with stats
git log --stat
```

**Common Formats:**

```bash
# One-liner version (compact)
git log --oneline -10

# Detailed format
git log --pretty=fuller

# Custom format
git log --format="%H %an %ae %s"

# Graph visualization (branches and merges)
git log --graph --oneline --all
```

**Useful Combinations:**

```bash
# View all commits across all branches with graph
git log --all --graph --oneline --decorate

# View commits not yet pushed
git log origin/main..main

# View commits between two versions
git log v1.0..v2.0

# Find when a line was introduced
git log -p -S "specific code line"

# View commits affecting specific lines
git log -L 10,20:myfile.txt
```

---

## git diff

**Purpose:** Show changes between commits, branches, or working tree

**Syntax:**
```bash
git diff [options] [commit/branch] [commit/branch]
```

**What it does:**
- Displays differences between files in different states
- Shows what was added (green +) and removed (red -)
- Helps review changes before committing
- Can compare any two commits or branches

**Common Examples:**

```bash
# View unstaged changes
git diff

# View staged changes (changes to be committed)
git diff --staged

# View changes in a specific file
git diff myfile.txt

# Compare two commits
git diff abc123..def456

# Compare current branch with main
git diff main

# Compare two branches
git diff branch1 branch2

# View word-level differences (instead of line-level)
git diff --word-diff

# View with statistics
git diff --stat

# View as side-by-side
git diff --no-color
```

**Workflow Example:**

```bash
# 1. Make changes to file
echo "new feature" >> app.js

# 2. See what changed
git diff app.js

# 3. Stage changes
git add app.js

# 4. See staged changes
git diff --staged app.js

# 5. Commit
git commit -m "Add feature"
```

---

## git status

**Purpose:** Show the working tree status

**Syntax:**
```bash
git status [options]
```

**What it does:**
- Displays current branch name
- Shows modified files (not staged)
- Shows staged files (ready to commit)
- Shows untracked files (new files Git doesn't know about)
- Suggests next commands you can run

**Common Examples:**

```bash
# Full status
git status

# Short status format
git status -s

# Very short status
git status --short

# Porcelain format (machine-readable)
git status --porcelain
```

**Status Indicators:**

```
# In short format:
M  = Modified
A  = Added
D  = Deleted
R  = Renamed
C  = Copied
U  = Updated
?? = Untracked

# Two columns:
[staged status][working tree status] filename

# Example output:
M  file1.js     # staged modification
 M file2.js     # unstaged modification
A  file3.js     # staged addition
?? file4.js     # untracked file
```

**Typical Workflow:**

```bash
# 1. Check status
git status

# 2. See which files changed
git status -s

# 3. Stage files
git add file1.js file2.js

# 4. Verify staging
git status

# 5. Commit
git commit -m "Update files"

# 6. Verify clean working tree
git status
```

---

## git show

**Purpose:** Show various types of objects (commits, tags, etc.)

**Syntax:**
```bash
git show [options] <object>
```

**What it does:**
- Displays detailed information about a specific commit, tag, or object
- Shows commit metadata and the actual changes
- Similar to `git log -p` for a single commit
- Can display other object types (blobs, trees)

**Common Examples:**

```bash
# Show specific commit
git show abc123

# Show latest commit
git show HEAD

# Show specific file at a commit
git show abc123:myfile.txt

# Show tag information
git show v1.0

# Show with statistics
git show --stat

# Show in compact format
git show --oneline

# Show only names of changed files
git show --name-only

# Show only name status (added/modified/deleted)
git show --name-status
```

**Practical Examples:**

```bash
# See what was changed in last commit
git show

# See what was in a file at specific commit
git show abc123:src/app.js

# See commit that introduced a specific tag
git show v2.0

# Compare versions of a file
git show v1.0:README.md
git show v2.0:README.md
```

---

## git grep

**Purpose:** Print lines matching a pattern (search code)

**Syntax:**
```bash
git grep [options] <pattern>
```

**What it does:**
- Searches for text patterns in tracked files
- Faster than regular grep on large projects
- Searches only versioned files (ignores .gitignore'd files)
- Supports regular expressions and case sensitivity

**Common Examples:**

```bash
# Search for a word
git grep "TODO"

# Search case-insensitive
git grep -i "function"

# Search with line numbers
git grep -n "error"

# Search in specific commit
git grep "pattern" abc123

# Search with context lines
git grep -C 3 "bug"

# Search multiple patterns (AND)
git grep --all-match -e "pattern1" -e "pattern2"

# Count occurrences
git grep -c "import"

# Show filenames only
git grep -l "database"

# Search in specific file type
git grep "const" -- "*.js"

# Search excluding files
git grep "TODO" -- ':!node_modules/'
```

**Practical Examples:**

```bash
# Find all TODO comments
git grep -n "TODO" | head -20

# Find all console.log statements
git grep "console\.log"

# Find all import statements
git grep "^import " -- "*.ts"

# Find deprecated function calls
git grep "oldFunction" -- "*.js"

# Find lines that changed with specific content
git grep -p "pattern"
```

---

## git bisect

**Purpose:** Use binary search to find the commit that introduced a bug

**Syntax:**
```bash
git bisect <subcommand>
```

**What it does:**
- Performs binary search through commit history
- Helps identify which commit introduced a bug
- Requires marking commits as "good" or "bad"
- Automatically checkouts commits to test

**Common Workflow:**

```bash
# 1. Start bisect session
git bisect start

# 2. Mark current commit as bad (has the bug)
git bisect bad

# 3. Mark a known good commit
git bisect good v1.0
# or
git bisect good abc123

# 4. Test the commit Git checked out
# (Manually test if bug exists)

# 5. Tell bisect if good or bad
git bisect good    # if no bug
git bisect bad     # if bug exists

# 6. Repeat testing until found
# Git will checkout middle commit
# Test and mark as good/bad
# Eventually finds the problematic commit

# 7. End bisect session
git bisect reset
```

**Alternative - Automated Bisect:**

```bash
# Run a script that exits 0 if good, non-zero if bad
git bisect start
git bisect bad HEAD
git bisect good v1.0
git bisect run ./test-script.sh

# Git automatically tests and finds the bad commit
```

**Example:**

```bash
# Let's say bug exists in current code, but not in v1.0
$ git bisect start
$ git bisect bad                    # Mark HEAD as bad
$ git bisect good v1.0              # Mark v1.0 as good

# Git checks out middle commit
Bisecting: 10 revisions left to test after this (roughly 3 steps)
[commit1234567] Some commit message

# Test the code manually or run tests
$ npm test

# Mark as good or bad
$ git bisect good    # No bug here

# Git continues bisecting
Bisecting: 5 revisions left to test after this (roughly 2 steps)
[commit9876543] Another commit

$ git bisect bad    # Bug is here

# Continue until found
# Once complete:
$ git bisect reset  # Returns to original branch
```

---

## Investigation Workflow Example

```bash
# 1. Something is broken
git status

# 2. See recent changes
git log --oneline -10

# 3. See what changed recently
git diff HEAD~5

# 4. Find commit that introduced problem
git bisect start
git bisect bad
git bisect good HEAD~20

# 5. Test and mark commits
# ... repeat steps ...

# 6. Found the problematic commit
git show <bad-commit>

# 7. Understand the change
git show <bad-commit> -- specific-file.js

# 8. Fix the code
git log --oneline <bad-commit>^..<good-commit>
```

---

## Next Steps

Continue to [Branching & Merging](04-branching-and-merging.md) to learn how to manage development branches.
