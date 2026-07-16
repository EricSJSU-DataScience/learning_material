---
layout: default
title: grep
parent: Data Analysis
grand_parent: Linux
nav_order: 1
---

# grep — Search Text by Pattern

## Usage

```bash
grep [options] pattern file
```

## Examples

```bash
# Basic search
grep "error" log.txt               # find lines containing "error"
grep "2024" data.csv               # find lines containing "2024"

# Case insensitive
grep -i "error" log.txt            # match Error, ERROR, error

# Show line numbers
grep -n "error" log.txt

# Invert match — show lines that DON'T match
grep -v "debug" log.txt

# Count matching lines
grep -c "error" log.txt

# Search recursively in all files
grep -r "TODO" ./project/

# Search multiple files
grep "error" *.log

# Regex patterns
grep "^2024" data.csv              # lines starting with 2024
grep "\.csv$" filelist.txt         # lines ending with .csv
grep "[0-9]\{3\}" data.txt         # lines containing 3+ digits
```

## Useful Combinations

```bash
# Find errors in last 100 lines of a log
tail -100 server.log | grep "error"

# Count how many lines have "null" in each CSV
grep -c "null" *.csv
```
