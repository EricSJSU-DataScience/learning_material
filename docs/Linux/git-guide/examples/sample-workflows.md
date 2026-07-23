---
layout: default
title: Sample Workflows
parent: Examples
grand_parent: Git Guide
great_grand_parent: Linux
nav_order: 1
---

# Real-World Git Workflows

This document provides practical examples of how to use Git in common development scenarios.

## Table of Contents
- [Solo Project Setup](#solo-project-setup)
- [Feature Development](#feature-development)
- [Bug Fix Process](#bug-fix-process)
- [Code Review with Pull Requests](#code-review-with-pull-requests)
- [Release Management](#release-management)
- [Hotfix in Production](#hotfix-in-production)
- [Collaborative Team Project](#collaborative-team-project)

---

## Solo Project Setup

Starting a new personal project from scratch.

```bash
# 1. Create local repository
mkdir my-awesome-project
cd my-awesome-project
git init

# 2. Create initial files
echo "# My Awesome Project" > README.md
echo "node_modules/" > .gitignore
mkdir src
echo "console.log('Hello');" > src/app.js

# 3. First commit
git add .
git commit -m "Initial project setup"

# 4. Create GitHub repository
# (do this on GitHub website)

# 5. Connect to remote
git remote add origin https://github.com/username/my-awesome-project.git

# 6. Push to GitHub
git branch -M main
git push -u origin main

# 7. Start developing
echo "function greet() { return 'hi'; }" >> src/app.js
git add src/app.js
git commit -m "Add greet function"
git push
```

---

## Feature Development

Developing a new feature in a structured way.

```bash
# 1. Update main to latest
git switch main
git pull origin main

# 2. Create feature branch
git switch -c feature/user-authentication

# 3. First batch of work
echo "class AuthService {}" > src/auth.js
git add src/auth.js
git commit -m "Create AuthService class"

# 4. Add more features
echo "  login(user, pass) { ... }" >> src/auth.js
git add src/auth.js
git commit -m "Add login method to AuthService"

# 5. Fix and refine
echo "  logout() { ... }" >> src/auth.js
git add src/auth.js
git commit -m "Add logout method"

# 6. Review your work
git log --oneline main..HEAD

# 7. Keep updated with main
git fetch origin
git rebase origin/main

# 8. Push feature branch
git push -u origin feature/user-authentication

# 9. After Pull Request merge:
git switch main
git pull origin main
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

---

## Bug Fix Process

Finding and fixing a bug systematically.

### Scenario: App crashes when uploading large files

```bash
# 1. Create bug fix branch
git switch main
git pull origin main
git switch -c fix/large-file-upload-crash

# 2. Identify the problem using git bisect
# (if you don't know which commit caused it)
git bisect start
git bisect bad HEAD        # current version has bug
git bisect good v1.5.0     # this version was fine

# 3. Test commits that bisect suggests
# Mark as good or bad
git bisect good    # or git bisect bad
# ... repeat until found ...
git bisect reset

# 4. Examine the problematic commit
git show abc123

# 5. Fix the issue
# Edit src/upload.js
# Change: const MAX_SIZE = 1000;
# To: const MAX_SIZE = 50000;
git add src/upload.js
git commit -m "Fix: Allow larger file uploads (max 50MB)"

# 6. Test the fix
npm test

# 7. Push and create PR
git push -u origin fix/large-file-upload-crash

# 8. After review and merge
git switch main
git pull
git branch -d fix/large-file-upload-crash
```

---

## Code Review with Pull Requests

Typical GitHub/GitLab code review workflow.

### As the Code Author:

```bash
# 1. Create feature branch
git switch -c feature/new-dashboard

# 2. Make changes
echo "new dashboard code" > src/dashboard.js
git add src/dashboard.js
git commit -m "Feat: Add new dashboard component"

# 3. More changes
echo "styling" >> src/dashboard.css
git add src/dashboard.css
git commit -m "Style: Add dashboard styling"

# 4. Keep branch updated (if team is active)
git fetch origin
git rebase origin/main
git push origin feature/new-dashboard

# 5. Create Pull Request on GitHub
# - Title: "Add new dashboard component"
# - Description: "Implements the new dashboard UI design"
# - Reference issue: "Closes #456"

# 6. Respond to reviewer comments
# Make requested changes
git add .
git commit -m "Review: Address feedback on dashboard"
git push origin feature/new-dashboard

# 7. After approval and merge
git switch main
git pull origin main
git branch -d feature/new-dashboard
git push origin --delete feature/new-dashboard
```

### As the Code Reviewer:

```bash
# 1. See PR notification
# Visit GitHub/GitLab

# 2. Review changes
# Read the diff in web interface

# 3. Check out the branch locally (if needed)
git fetch origin pull/123/head:review-pr-123
git switch review-pr-123

# 4. Test the code
npm test
npm start

# 5. Review in your editor
# Look at files
git show HEAD:src/dashboard.js

# 6. Leave comments on GitHub/GitLab
# Add detailed feedback

# 7. Approve or request changes
# If request changes, mark as "Changes Requested"
# If looks good, mark as "Approved"

# 8. After all approvals, merge on GitHub
# or:
git switch main
git pull origin main
git merge --no-ff review-pr-123
git push origin main
```

---

## Release Management

Preparing and releasing a new version.

```bash
# 1. Prepare release branch
git switch main
git pull origin main
git switch -c release/v2.0.0

# 2. Update version numbers
# Edit package.json
echo '{"version": "2.0.0"}' > version.json
git add version.json
git commit -m "Bump version to 2.0.0"

# 3. Generate changelog
# (usually automated, but can be manual)
echo "## v2.0.0 - Features" > CHANGELOG.md
echo "- New dashboard" >> CHANGELOG.md
echo "- Improved performance" >> CHANGELOG.md
git add CHANGELOG.md
git commit -m "Update changelog for v2.0.0"

# 4. Bug fixes in release branch
# Fix any last-minute issues
git commit -m "Fix: Minor UI bug in dashboard"

# 5. Merge to main
git switch main
git merge --no-ff release/v2.0.0 -m "Release v2.0.0"

# 6. Tag the release
git tag -a v2.0.0 -m "Release version 2.0.0"

# 7. Merge back to develop (if using)
git switch develop
git merge --no-ff main

# 8. Push everything
git push origin main
git push origin develop
git push origin v2.0.0

# 9. Clean up
git branch -d release/v2.0.0
git push origin --delete release/v2.0.0

# 10. Create GitHub Release
# Go to GitHub -> Releases -> Create Release
# - Tag: v2.0.0
# - Title: Version 2.0.0
# - Description: Changelog content
```

---

## Hotfix in Production

Emergency fix for production bug.

```bash
# Production Issue: Login is broken!
# Version 1.9.0 is in production

# 1. Create hotfix branch from tag
git switch main
git pull origin main
git switch -c hotfix/login-bug
# or from tag:
git switch -c hotfix/login-bug v1.9.0

# 2. Quickly fix the issue
# Edit src/auth.js
git add src/auth.js
git commit -m "Hotfix: Fix critical login bug"

# 3. Test thoroughly
npm test

# 4. Create release tag
git tag -a v1.9.1 -m "Hotfix release v1.9.1"

# 5. Push immediately
git push origin hotfix/login-bug
git push origin v1.9.1

# 6. Deploy v1.9.1 to production
# (your deployment process)

# 7. Merge back to main
git switch main
git merge --no-ff hotfix/login-bug -m "Merge hotfix v1.9.1"
git push origin main

# 8. Also merge to develop
git switch develop
git merge --no-ff hotfix/login-bug
git push origin develop

# 9. Clean up
git branch -d hotfix/login-bug
git push origin --delete hotfix/login-bug
```

---

## Collaborative Team Project

Multiple developers working on the same project.

### Team Member A:

```bash
# Morning - start work
git switch main
git pull origin main

# Work on feature
git switch -c feature/api-endpoints
echo "GET /api/users" > src/routes.js
git add src/routes.js
git commit -m "Add GET users endpoint"

# Mid-day - push progress
git push -u origin feature/api-endpoints

# Continue working
echo "POST /api/users" >> src/routes.js
git add src/routes.js
git commit -m "Add POST users endpoint"
git push

# End of day - push final work
echo "DELETE /api/users/:id" >> src/routes.js
git add src/routes.js
git commit -m "Add DELETE users endpoint"
git push
```

### Team Member B:

```bash
# Morning - see what others are working on
git fetch origin
git branch -a  # see feature/api-endpoints

# Want to help with API endpoints
git switch feature/api-endpoints
git pull origin feature/api-endpoints

# Add database layer
echo "class UserDB { ... }" > src/db.js
git add src/db.js
git commit -m "Add database layer for users"
git push origin feature/api-endpoints

# Later, Team A updates
git pull origin feature/api-endpoints
# see their latest changes
git log --oneline origin/feature/api-endpoints -5
```

### Merge to Main:

```bash
# Team Lead:
# Review PR for feature/api-endpoints
git fetch origin

# Check it out locally
git switch feature/api-endpoints
git pull origin feature/api-endpoints

# Test everything
npm test
npm start

# Merge to main
git switch main
git pull origin main
git merge --no-ff feature/api-endpoints -m "Merge API endpoints feature"
git push origin main

# Clean up
git branch -d feature/api-endpoints
git push origin --delete feature/api-endpoints

# Notify team
# "API endpoints merged! Everyone pull main"

# Both Team Members:
git switch main
git pull origin main
```

---

## Undoing Mistakes

### Oops! I Committed to Wrong Branch

```bash
# Current state: main branch has my work

# 1. Save the commit
COMMIT_HASH=$(git log -1 --format="%H")

# 2. Undo on main
git reset --soft HEAD~1

# 3. Create correct branch
git switch -c feature/correct-branch

# 4. Commit properly
git commit -m "Feature description"

# 5. Push feature branch
git push -u origin feature/correct-branch

# 6. Main is clean
git switch main
git status  # should be clean
```

### I Pushed Something Broken to Main!

```bash
# 1. Check what's pushed
git log origin/main -3

# 2. Identify bad commit
git show abc123  # Shows the breaking commit

# 3. Revert the commit (safest option)
git revert abc123
git push origin main

# OR - reset if no one pulled yet
git reset --hard HEAD~1
git push --force-with-lease origin main
```

### I Accidentally Deleted a Branch

```bash
# Don't panic! Branch still exists as reference
git reflog

# Find the commit
git reflog | grep "feature-important"

# Recover the branch
git switch -c feature-important abc123
git push -u origin feature-important
```

---

## Tips and Tricks

### View a File at Specific Commit

```bash
# See how file looked in past
git show abc123:src/app.js

# Compare versions
git show v1.0:package.json
git show v2.0:package.json
```

### Find When Something Broke

```bash
# Use blame to see who changed what
git blame src/problematic.js

# Shows line-by-line when changed and by whom
```

### Stash Work in Progress

```bash
# Save work without committing
git stash

# Do something else
git switch another-branch

# Come back and restore
git switch original-branch
git stash pop
```

### Check What You're About to Push

```bash
# See what's different from remote
git log origin/main..main

# See actual diff
git diff origin/main..main

# Then push safely
git push origin main
```

---

## Common Command Cheatsheet

```bash
# Daily workflow
git status                              # Check status
git pull origin main                    # Get latest
git switch -c feature/new-feature       # Create branch
git add .                               # Stage changes
git commit -m "Description"             # Commit
git push -u origin feature/new-feature  # Push new branch
git log --oneline                       # View commits

# Collaboration
git fetch origin                        # Get remote updates
git merge origin/main                   # Merge updates
git push origin feature-branch          # Push changes
git push origin --delete old-branch     # Delete branch

# Investigation
git log --oneline -10                   # Recent commits
git diff main                           # See changes vs main
git show abc123                         # View specific commit
git blame filename                      # Who changed what

# Fixing mistakes
git reset --soft HEAD~1                 # Undo commit, keep changes
git restore filename                    # Discard changes
git revert abc123                       # Create undo commit
git reflog                              # Find lost commits
```

---

## Workflow Decision Tree

```
START
 |
 +-- New feature? ---------> git switch -c feature/...
 |                           |
 |                           +-> Code -> Commit -> Push
 |                           |
 |                           +-> Review -> Merge -> Done
 |
 +-- Bug fix? --------------> git switch -c fix/...
 |                           |
 |                           +-> Find issue -> Fix -> Test
 |                           |
 |                           +-> Push -> Review -> Merge
 |
 +-- Release? --------------> git switch -c release/...
 |                           |
 |                           +-> Update version -> Tag
 |                           |
 |                           +-> Merge to main -> Push tag
 |
 +-- Production emergency? -> git switch -c hotfix/...
 |                           |
 |                           +-> Quick fix -> Tag new version
 |                           |
 |                           +-> Deploy -> Merge back
 |
 +-- Getting latest? -------> git pull origin main
 |                           |
 |                           +-- Resolve conflicts if needed
 |
 +-- Sharing work? ---------> git push origin branch-name
                            |
                            +-- Create Pull Request
                            |
                            +-- After merge, delete branch
```

---

## Conclusion

These workflows represent common real-world scenarios. The key principles are:

1. **Use branches** for features and fixes
2. **Commit frequently** with clear messages
3. **Pull before push** to avoid conflicts
4. **Review code** before merging
5. **Keep main stable** - only merge tested code
6. **Tag releases** for version tracking
7. **Document changes** with commit messages

Practice these workflows and git will become second nature!
