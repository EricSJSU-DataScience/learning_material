---
layout: default
title: mkdir
parent: System Operations
grand_parent: Linux
nav_order: 4
---

# mkdir — Make Directory

## Usage

```bash
mkdir [options] directory_name
```

## Examples

```bash
mkdir projects                    # create one directory
mkdir -p projects/python/basics   # create nested directories at once
mkdir dir1 dir2 dir3              # create multiple directories
```

## Key Option

`-p` — create parent directories as needed; no error if already exists.

```bash
mkdir -p data/raw data/processed data/output
```
