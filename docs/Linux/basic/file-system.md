---
layout: default
title: File System Structure
parent: Basic
grand_parent: Linux
nav_order: 2
---

# File System Structure

Linux uses a single tree starting from `/` (root). Everything — files, devices, processes — is a file.

## Directory Layout

```
/
├── home/        ← user home directories (~)
├── root/        ← home directory for root user
├── etc/         ← system configuration files
├── var/         ← logs, databases, variable data
├── usr/         ← user programs and libraries
├── bin/         ← essential commands (ls, cp, mv...)
├── tmp/         ← temporary files (cleared on reboot)
├── dev/         ← device files (disk, USB...)
└── proc/        ← virtual filesystem for running processes
```

## Key Shortcuts

| Symbol | Meaning |
|--------|---------|
| `/` | Root of the entire file system |
| `~` | Your home directory (`/home/username`) |
| `.` | Current directory |
| `..` | Parent directory |

## Absolute vs Relative Paths

```bash
# Absolute — starts from root
/home/eric/projects/data.csv

# Relative — starts from current location
projects/data.csv   # if you're already in /home/eric
../other/file.txt   # go up one level, then into other/
```
