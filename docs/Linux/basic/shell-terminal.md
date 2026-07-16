---
layout: default
title: Shell & Terminal
parent: Basic
grand_parent: Linux
nav_order: 3
---

# Shell & Terminal

The **terminal** is the window you type into. The **shell** is the program that reads your commands and runs them. The most common shell is **bash**.

## Useful Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Autocomplete file/command name |
| `↑` / `↓` | Browse command history |
| `Ctrl + C` | Kill running command |
| `Ctrl + L` | Clear the screen |
| `Ctrl + A` | Jump to start of line |
| `Ctrl + E` | Jump to end of line |

## Command Structure

```bash
command  [options]  [arguments]
ls       -la        /home/eric
```

- **command** — the program to run
- **options** — flags that modify behavior, usually start with `-`
- **arguments** — what to operate on (file, directory, etc.)

## Getting Help

```bash
man ls          # full manual for ls
ls --help       # quick help summary
```
