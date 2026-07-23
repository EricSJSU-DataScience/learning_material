---
layout: default
title: 02 - Getting Started
parent: NumPy
nav_order: 2
has_children: true
---

# Getting Started with NumPy

Practical guide to creating, manipulating, and operating on arrays.

## Contents

- [Array Creation](array-creation.md) - Multiple ways to create arrays
- [Operations](operations.md) - Arithmetic and mathematical operations
- [Indexing and Slicing](indexing.md) - Access and modify array elements

## Quick Examples

### Create an Array
```python
import numpy as np

# From Python list
a = np.array([1, 2, 3, 4, 5])

# With specific dtype
b = np.array([1, 2, 3], dtype=np.float32)

# Filled with values
c = np.zeros((3, 3))
d = np.ones(5)
e = np.arange(10)
f = np.linspace(0, 10, 5)
```

### Perform Operations
```python
a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

# Element-wise operations
print(a + b)      # [11 22 33 44 55]
print(a * 2)      # [ 2  4  6  8 10]
print(np.sqrt(a)) # [1. 1.41421356 ...]

# Aggregations
print(a.sum())    # 15
print(a.mean())   # 3.0
print(a.max())    # 5
```

### Index and Slice
```python
a = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

# Single element
print(a[3])       # 3

# Slice
print(a[2:5])     # [2 3 4]

# Reverse
print(a[::-1])    # [9 8 7 6 5 4 3 2 1 0]
```

## Learning Path

1. Start with **[Array Creation](array-creation.md)** to learn different ways to create arrays
2. Move to **[Operations](operations.md)** to perform computations
3. Explore **[Indexing and Slicing](indexing.md)** to access and modify data

---

**Prerequisites**: Complete [Basics](../01-basics/) first for foundational concepts.
