---
layout: default
title: Basic Queries
parent: SQL
nav_order: 1
---

# SQL Basic Queries

## SELECT

```sql
SELECT * FROM users;
SELECT name, age FROM users;
```

## WHERE

```sql
SELECT * FROM users WHERE age > 18;
SELECT * FROM users WHERE name = 'Alice';
```

## ORDER BY / LIMIT

```sql
SELECT * FROM users ORDER BY age DESC;
SELECT * FROM users LIMIT 10;
```
