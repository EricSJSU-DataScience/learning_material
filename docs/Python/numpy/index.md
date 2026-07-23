---
layout: default
title: NumPy
parent: Python
nav_order: 1
has_children: true
---

# NumPy - Numerical Python

A comprehensive guide to NumPy, the fundamental library for numerical computing in Python.

NumPy (Numerical Python) is an open source Python library that's widely used in science and engineering. The NumPy library contains multidimensional array data structures, such as the homogeneous, N-dimensional `ndarray`, and a large library of functions that operate efficiently on these data structures.

## Why NumPy?

- **Performance**: Arrays are much faster than Python lists for numerical operations
- **Memory Efficiency**: NumPy arrays use less memory than Python lists
- **Convenience**: Vectorized operations eliminate the need for explicit loops
- **Integration**: Foundation for other scientific libraries (SciPy, Pandas, Matplotlib)

## Learning Path

| Section | Topics |
|---------|--------|
| [Basics](01-basics/) | Introduction, array fundamentals, attributes |
| [Getting Started](02-quickstart/) | Array creation, operations, indexing |
| [Intermediate](03-intermediate/) | Shape manipulation, copying, advanced operations |
| [Advanced](04-advanced/) | Broadcasting, advanced indexing, specialized functions |
| [Examples](examples/) | Practical examples and real-world use cases |

## Quick Start

```python
import numpy as np

# Create an array
a = np.array([1, 2, 3, 4, 5])

# Array operations
b = a * 2
c = a + 10

# Shape and attributes
print(a.shape)   # (5,)
print(a.dtype)   # int64
```

---

Start with [Basics](01-basics/) if you're new to NumPy.
