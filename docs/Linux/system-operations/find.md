---
layout: default
title: find
parent: System Operations
grand_parent: Linux
nav_order: 10
---

# find — Search for Files

## Usage

```bash
find [path] [conditions]
```

## Examples

```bash
# Find by name
find . -name "data.csv"              # exact name in current dir
find . -name "*.csv"                 # all CSV files
find /home -name "*.py"              # all Python files in /home

# Find by type
find . -type f                       # files only
find . -type d                       # directories only

# Find by size
find . -size +10M                    # files larger than 10MB
find . -size -1k                     # files smaller than 1KB

# Find by modification time
find . -mtime -7                     # modified in last 7 days

# Combine conditions
find . -name "*.csv" -size +1M       # CSV files larger than 1MB
```

## Run a Command on Results

```bash
find . -name "*.log" -delete              # delete all .log files
find . -name "*.csv" -exec wc -l {} \;   # count lines in each CSV
```
