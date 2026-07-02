---
layout: default
title: JOINs
parent: SQL
nav_order: 2
---

# SQL JOINs

## INNER JOIN

Returns only rows that match in both tables.

```sql
SELECT users.name, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

## LEFT JOIN

Returns all rows from the left table; unmatched rows from the right are NULL.

```sql
SELECT users.name, orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```
