---
layout: default
title: Users & Permissions
parent: Basic
grand_parent: Linux
nav_order: 4
---

# Users & Permissions

Every file in Linux has an owner and a set of permissions controlling who can read, write, or execute it.

## Reading Permissions

```bash
ls -l file.txt
# -rw-r--r-- 1 eric users 1024 Jul 1 10:00 file.txt
#  ↑↑↑↑↑↑↑↑↑
#  │└──┤└──┤└── others (r--)
#  │   └── group (r--)
#  └── owner (rw-)
```

| Symbol | Meaning |
|--------|---------|
| `r` | Read |
| `w` | Write |
| `x` | Execute |
| `-` | Permission not granted |

## chmod — Change Permissions

```bash
chmod 755 script.sh   # owner: rwx, group: r-x, others: r-x
chmod +x script.sh    # add execute permission for everyone
chmod -w file.txt     # remove write permission
```

## Common Permission Numbers

| Number | Permission |
|--------|------------|
| `777` | Everyone can read, write, execute |
| `755` | Owner full, others read+execute |
| `644` | Owner read+write, others read only |
| `600` | Owner read+write only |

## sudo — Run as Root

```bash
sudo apt install python3   # install software as root
sudo -i                    # switch to root shell (use carefully)
```
