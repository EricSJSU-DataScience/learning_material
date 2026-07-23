---
layout: default
title: 01 - Basics
parent: Git Guide
grand_parent: Linux
nav_order: 1
---

# Git Basics: Getting Started

This section covers the fundamental Git commands for setting up and initializing repositories.

## Table of Contents
- [git clone](#git-clone)
- [git init](#git-init)
- [Git Global Options](#git-global-options)

---

## git clone

**Purpose:** Clone a repository into a new directory

**Syntax:**
```bash
git clone <repository-url> [directory-name]
```

**What it does:**
- Downloads a complete copy of a remote repository (including all history and branches)
- Creates a new directory with the project name
- Automatically sets up the remote "origin" pointing to the source repository
- Creates a local copy of the default branch (usually "main" or "master")

**Common Examples:**

```bash
# Clone into a new folder with default name
git clone https://github.com/user/project.git

# Clone into a specific directory
git clone https://github.com/user/project.git my-project

# Clone using SSH
git clone git@github.com:user/project.git

# Clone a specific branch only
git clone -b develop https://github.com/user/project.git
```

**When to use:**
- Getting an existing project from GitHub, GitLab, or other repositories
- Contributing to open-source projects
- Downloading code from team members

---

## git init

**Purpose:** Create an empty Git repository or reinitialize an existing one

**Syntax:**
```bash
git init [directory-name]
```

**What it does:**
- Creates a new `.git` directory that contains all Git configuration and metadata
- Initializes a local repository for version control
- Does NOT connect to any remote repository (you do that manually)
- If run in an existing repo, it reinitializes it without destroying data

**Common Examples:**

```bash
# Initialize current directory as a Git repository
git init

# Initialize a new directory and change into it
git init my-new-project
cd my-new-project

# Create bare repository (for server/shared use)
git init --bare

# Reinitialize existing repository
git init
```

**When to use:**
- Starting a brand new project locally
- Converting an existing folder to version control
- Setting up a project that will be pushed to GitHub later

**After git init, you typically:**
```bash
# Create and add files
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"

# Connect to a remote repository
git remote add origin https://github.com/user/project.git
git push -u origin main
```

---

## Git Global Options

These options work with any Git command and control Git's behavior globally.

### Common Global Options:

**`-v` or `--version`**
- Display Git version
```bash
git --version
# Output: git version 2.x.x
```

**`-h` or `--help`**
- Show help information
```bash
git --help
git clone --help
```

**`-C <path>`**
- Run Git command in a different directory
```bash
git -C /path/to/repo status
```

**`-c <name>=<value>`**
- Set configuration value temporarily
```bash
git -c user.name="John Doe" commit -m "message"
```

**`-p` or `--paginate`**
- Paginate output (for long outputs)
```bash
git -p log
```

**`-P` or `--no-pager`**
- Don't paginate output
```bash
git -P log
```

**`--bare`**
- Treat repository as bare (no working tree)
```bash
git --bare init
```

**`--git-dir=<path>`**
- Specify Git directory explicitly
```bash
git --git-dir=/path/to/.git status
```

**`--work-tree=<path>`**
- Specify working tree explicitly
```bash
git --git-dir=/path/to/.git --work-tree=/path/to/work status
```

---

## Next Steps

Once you've initialized or cloned a repository, proceed to [Working with Changes](02-working-with-changes.md) to learn how to stage and commit your work.
