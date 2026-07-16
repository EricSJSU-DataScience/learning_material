---
layout: default
title: sed
parent: Data Analysis
grand_parent: Linux
nav_order: 2
---

# sed — Stream Editor

Used for find-and-replace and text transformations on files or streams.

## Usage

```bash
sed [options] 'command' file
```

## Examples

### Find and Replace

```bash
# Replace first occurrence per line
sed 's/old/new/' file.txt

# Replace ALL occurrences per line (g = global)
sed 's/old/new/g' file.txt

# Case-insensitive replace
sed 's/error/ERROR/gi' file.txt

# Replace in-place (edit the actual file)
sed -i 's/old/new/g' file.txt

# Replace in-place and keep a backup
sed -i.bak 's/old/new/g' file.txt
```

### Delete Lines

```bash
sed '/pattern/d' file.txt          # delete lines matching pattern
sed '1d' file.txt                  # delete first line (e.g. header)
sed '/^$/d' file.txt               # delete empty lines
```

### Print Specific Lines

```bash
sed -n '5p' file.txt               # print line 5
sed -n '1,10p' file.txt            # print lines 1 to 10
sed -n '/error/p' file.txt         # print lines matching pattern
```

### Data Cleaning Example

```bash
# Remove leading/trailing spaces
sed 's/^ *//;s/ *$//' data.csv

# Remove Windows line endings
sed 's/\r//' data.csv > clean.csv
```
