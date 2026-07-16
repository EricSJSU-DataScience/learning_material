---
layout: default
title: awk
parent: Data Analysis
grand_parent: Linux
nav_order: 3
---

# awk — Text Processing

`awk` treats each line as a record and splits it into fields. Ideal for CSV/TSV processing.

## Usage

```bash
awk [options] 'program' file
```

## Key Variables

| Variable | Meaning |
|----------|---------|
| `$0` | Entire line |
| `$1`, `$2`... | Field 1, field 2... |
| `NR` | Current line number |
| `NF` | Number of fields in current line |
| `FS` | Field separator (default: space) |

## Examples

```bash
# Print specific columns (space-separated)
awk '{print $1, $3}' file.txt

# Print with CSV (comma-separated)
awk -F',' '{print $1, $3}' data.csv

# Print column 2 with header
awk -F',' 'NR==1 || {print $2}' data.csv

# Filter rows where column 3 > 100
awk -F',' '$3 > 100' data.csv

# Sum a column
awk -F',' '{sum += $2} END {print sum}' data.csv

# Count rows (excluding header)
awk -F',' 'NR>1 {count++} END {print count}' data.csv

# Print line number and line
awk '{print NR, $0}' file.txt

# Print last field of each line
awk '{print $NF}' file.txt
```

## Pattern + Action

```bash
# Only process lines matching a pattern
awk -F',' '/California/ {print $1, $3}' customers.csv

# Print header + filtered rows
awk -F',' 'NR==1 || $4 > 1000' sales.csv
```
