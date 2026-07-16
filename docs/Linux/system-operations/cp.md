---
layout: default
title: cp
parent: System Operations
grand_parent: Linux
nav_order: 6
---

# cp — Copy

## Usage

```bash
cp [options] source destination
```

## Examples

```bash
cp file.txt backup.txt              # copy file to new name
cp file.txt /home/eric/backup/      # copy file to directory
cp -r projects/ projects_backup/    # copy entire directory
cp *.csv /data/raw/                 # copy all CSV files
```

## Key Options

| Option | Description |
|--------|-------------|
| `-r` | Recursive — required for copying directories |
| `-i` | Interactive — ask before overwriting |
| `-u` | Only copy if source is newer than destination |

## Warning

`cp` overwrites the destination without warning by default. Use `-i` to be safe:

```bash
cp -i file.txt existing.txt   # asks: "overwrite existing.txt?"
```
