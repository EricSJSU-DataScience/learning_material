---
layout: default
title: cut
parent: Data Analysis
grand_parent: Linux
nav_order: 4
---

# cut — Extract Columns

Extracts specific columns (fields) from each line. Simpler than `awk` for basic column extraction.

## Usage

```bash
cut [options] file
```

## Key Options

| Option | Description |
|--------|-------------|
| `-f` | Field number(s) to extract |
| `-d` | Delimiter (default: tab) |
| `-c` | Character positions to extract |

## Examples

```bash
# Extract column 1 (tab-separated by default)
cut -f1 data.tsv

# Extract columns 1 and 3 from CSV
cut -d',' -f1,3 data.csv

# Extract columns 1 through 4
cut -d',' -f1-4 data.csv

# Extract by character position
cut -c1-10 file.txt              # first 10 characters of each line

# Remove the header and extract column 2
tail -n +2 data.csv | cut -d',' -f2
```

## cut vs awk

| Task | Use |
|------|-----|
| Simple column extraction | `cut` (faster, simpler) |
| Filtering rows, math, complex logic | `awk` |
