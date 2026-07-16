---
layout: default
title: sort & uniq
parent: Data Analysis
grand_parent: Linux
nav_order: 5
---

# sort & uniq

## sort — Sort Lines

```bash
sort file.txt                    # alphabetical sort
sort -r file.txt                 # reverse order
sort -n file.txt                 # numeric sort
sort -k2 data.csv                # sort by column 2
sort -t',' -k3 -n data.csv       # sort CSV by column 3 numerically
sort -u file.txt                 # sort and remove duplicates
```

## uniq — Remove Duplicate Lines

`uniq` only removes **adjacent** duplicates, so always sort first.

```bash
sort file.txt | uniq             # remove duplicates
sort file.txt | uniq -c          # count occurrences of each line
sort file.txt | uniq -d          # show only duplicate lines
sort file.txt | uniq -u          # show only unique lines
```

## Practical Examples

```bash
# Count unique values in column 1 of a CSV
cut -d',' -f1 data.csv | sort | uniq -c | sort -rn

# Find duplicate emails in a list
sort emails.txt | uniq -d

# Get all unique categories in column 3
cut -d',' -f3 data.csv | tail -n +2 | sort | uniq
```
