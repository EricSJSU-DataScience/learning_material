---
layout: default
title: Functions
parent: Python
nav_order: 2
---

# Python Functions

## Defining a Function

```python
def greet(name):
    return f"Hello, {name}!"

greet("Alice")  # "Hello, Alice!"
```

## Default Parameters

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
```

## Lambda

```python
square = lambda x: x ** 2
square(5)  # 25
```
