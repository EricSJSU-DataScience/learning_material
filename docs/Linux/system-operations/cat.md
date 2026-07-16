---
layout: default
title: cat
parent: System Operations
grand_parent: Linux
nav_order: 9
---

# cat — Display File Contents

## Usage

```bash
cat [options] file
```

## Examples

```bash
cat file.txt                    # print file to screen
cat file1.txt file2.txt         # print two files in sequence
cat file1.txt file2.txt > combined.txt   # merge into one file
cat -n file.txt                 # show line numbers
```

## Viewing Large Files

`cat` dumps everything at once. For large files use:

```bash
less file.txt    # scroll up/down with arrow keys, q to quit
head file.txt    # show first 10 lines
tail file.txt    # show last 10 lines
head -n 20 file.txt   # show first 20 lines
tail -n 5 file.txt    # show last 5 lines
tail -f log.txt  # follow a file as it grows (useful for logs)
```
