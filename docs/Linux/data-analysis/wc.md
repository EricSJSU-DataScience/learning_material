---
layout: default
title: wc
parent: Data Analysis
grand_parent: Linux
nav_order: 6
---

# wc — Word Count

Counts lines, words, and characters in a file.

## Usage

```bash
wc [options] file
```

## Options

| Option | Description |
|--------|-------------|
| `-l` | Count lines only |
| `-w` | Count words only |
| `-c` | Count bytes/characters only |

## Examples

```bash
wc file.txt                      # lines, words, characters
wc -l data.csv                   # how many rows (including header)
wc -l *.csv                      # row count of each CSV file

# Count rows excluding header
tail -n +2 data.csv | wc -l

# Count files in a directory
ls | wc -l
```

## Sample Output

```bash
$ wc data.csv
  1000  5320  48200 data.csv
# lines  words  chars  filename
```
