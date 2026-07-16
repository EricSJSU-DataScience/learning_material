---
layout: default
title: Pipes & Redirection
parent: Data Analysis
grand_parent: Linux
nav_order: 7
---

# Pipes & Redirection

The real power of Linux is chaining commands together.

## Pipe `|`

Sends output of one command as input to the next.

```bash
command1 | command2 | command3
```

### Examples

```bash
# Find errors and count them
grep "error" log.txt | wc -l

# Top 10 most common values in column 2
cut -d',' -f2 data.csv | sort | uniq -c | sort -rn | head -10

# Show unique categories, sorted
cut -d',' -f3 data.csv | tail -n +2 | sort | uniq

# Search running processes
ps aux | grep python
```

## Redirection

| Symbol | Action |
|--------|--------|
| `>` | Write output to file (overwrite) |
| `>>` | Append output to file |
| `<` | Read input from file |
| `2>` | Redirect error messages to file |

### Examples

```bash
# Save output to file
grep "error" log.txt > errors.txt

# Append to existing file
grep "warning" log.txt >> errors.txt

# Save errors separately
python script.py > output.txt 2> errors.txt

# Save both output and errors to same file
python script.py > all_output.txt 2>&1
```

## Practical Data Pipeline

```bash
# From a CSV: filter rows where column 4 > 1000,
# extract columns 1 and 2, sort, and save to new file
tail -n +2 data.csv \
  | awk -F',' '$4 > 1000 {print $1","$2}' \
  | sort \
  > filtered_output.csv
```
