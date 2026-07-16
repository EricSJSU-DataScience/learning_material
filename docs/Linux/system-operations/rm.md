---
layout: default
title: rm
parent: System Operations
grand_parent: Linux
nav_order: 8
---

# rm — Remove

## Usage

```bash
rm [options] file
```

## Examples

```bash
rm file.txt                  # delete a file
rm file1.txt file2.txt       # delete multiple files
rm *.log                     # delete all .log files
rm -r old_project/           # delete a directory and all its contents
rm -i file.txt               # ask for confirmation before deleting
```

## Key Options

| Option | Description |
|--------|-------------|
| `-r` | Recursive — required to delete directories |
| `-i` | Interactive — confirm each deletion |
| `-f` | Force — no error if file doesn't exist |

## Warning

**There is no trash bin.** Deleted files are gone permanently.

```bash
# Dangerous — deletes everything without asking
rm -rf folder/

# Safer habit — always use -i when unsure
rm -ri folder/
```
