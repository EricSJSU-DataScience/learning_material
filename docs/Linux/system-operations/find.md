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

## Search by Name

```bash
find . -name "data.csv"              # exact name in current dir
find . -name "*.csv"                 # all CSV files
find /home -name "*.py"              # all Python files in /home
find . -iname "*.CSV"                # case-insensitive match
```

## Search by Type

```bash
find . -type f                       # files only
find . -type d                       # directories only
find . -type d ! -name ".*"          # directories, excluding hidden ones
```

## Search by Size

```bash
find . -size +10M                    # files larger than 10MB
find . -size -1k                     # files smaller than 1KB
find . -size +1M -size -500M         # between 1MB and 500MB
```

## Search by Time

```bash
find . -mtime -7                     # modified in last 7 days
find . -mtime +30                    # not modified in over 30 days
find . -newer reference.txt          # modified more recently than a file
```

## Count Results

```bash
# Count all files in current directory tree
find . -type f | wc -l

# Count non-hidden subdirectories (useful during data collection)
find . -type d ! -name ".*" | wc -l

# Count collected CSV files so far
find . -name "*.csv" -type f | wc -l
```

## Run a Command on Results

```bash
find . -name "*.log" -delete              # delete all .log files
find . -name "*.csv" -exec wc -l {} \;   # count lines in each CSV
find . -name "*.py" -exec grep -l "import pandas" {} \;  # find files using pandas
```

## Combine Conditions

```bash
find . -name "*.csv" -size +1M            # CSV files larger than 1MB
find . -type f -mtime -1 -name "*.json"   # JSON files modified today
find . -type d ! -name ".*" -maxdepth 2   # non-hidden dirs, max 2 levels deep
```
