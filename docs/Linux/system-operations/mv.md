---
layout: default
title: mv
parent: System Operations
grand_parent: Linux
nav_order: 7
---

# mv — Move / Rename

## Usage

```bash
mv [options] source destination
```

## Examples

```bash
# Rename a file
mv old_name.txt new_name.txt

# Move a file to another directory
mv data.csv /home/eric/projects/

# Move and rename at the same time
mv data.csv /home/eric/projects/clean_data.csv

# Move a directory
mv old_folder/ new_folder/

# Move multiple files into a directory
mv file1.txt file2.txt target_dir/
```

## Key Option

| Option | Description |
|--------|-------------|
| `-i` | Ask before overwriting |

## Note

Unlike `cp`, `mv` does not keep the original — it's cut, not copy.
