---
layout: default
title: watch
parent: System Operations
grand_parent: Linux
nav_order: 11
---

# watch — Run a Command Repeatedly

Runs a command at a fixed interval and displays the output fullscreen. Useful for monitoring ongoing processes.

## Usage

```bash
watch [options] 'command'
```

## Key Options

| Option | Description |
|--------|-------------|
| `-n N` | Refresh every N seconds (default: 2) |
| `-d` | Highlight differences between updates |
| `-t` | Hide the header (timestamp and command) |

Press `q` or `Ctrl+C` to exit.

---

## Example 1: Monitor data collection progress

Count how many non-hidden subdirectories have been created — useful when a scraper creates one folder per collected item:

```bash
watch -n 15 'find . -type d ! -name ".*" | wc -l'
```

Refreshes every 15 seconds. You see the folder count grow as data is collected.

---

## Example 2: Monitor disk usage

Check how much space a download or data pipeline is consuming:

```bash
watch -n 5 'du -sh ./data/'
```

`-n 5` refreshes every 5 seconds. `du -sh` shows total size in human-readable format.

---

## Example 3: Watch new files appearing

See how many CSV files have been collected so far:

```bash
watch -n 10 'find . -name "*.csv" -type f | wc -l'
```

Combine with `-d` to highlight when the count changes:

```bash
watch -n 10 -d 'find . -name "*.csv" -type f | wc -l'
```

---

## Example 4: Monitor a log file's tail

Watch the last 20 lines of a log file update in real time:

```bash
watch -n 3 'tail -20 scraper.log'
```

(For continuous log following, `tail -f` is better — but `watch` is useful when you want a clean refreshed view.)

---

## Tip: Quote the full command

Always wrap the command in single quotes so `watch` treats it as one unit:

```bash
watch -n 5 'ls -lh data/ | wc -l'   # correct
watch -n 5  ls -lh data/ | wc -l    # wrong — pipe runs outside watch
```
