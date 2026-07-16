---
layout: default
title: ls
parent: System Operations
grand_parent: Linux
nav_order: 3
---

# ls — List Files

## Usage

```bash
ls [options] [directory]
```

## Common Options

| Option | Description |
|--------|-------------|
| `-l` | Long format (permissions, size, date) |
| `-a` | Show hidden files (starting with `.`) |
| `-h` | Human-readable sizes (KB, MB) |
| `-t` | Sort by modification time (newest first) |
| `-r` | Reverse sort order |

## Examples

```bash
ls                  # basic list
ls -l               # detailed list
ls -la              # detailed + hidden files
ls -lh              # detailed + readable sizes
ls -lt              # sort by newest first
ls /etc             # list a specific directory
```

## Sample Output

```
-rw-r--r-- 1 eric users  4.2K Jul 1 data.csv
drwxr-xr-x 2 eric users  4.0K Jul 2 projects/
```

`d` at the start means it's a directory; `-` means it's a file.
