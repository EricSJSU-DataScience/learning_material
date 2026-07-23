---
layout: default
title: Introduction to NumPy
parent: 01 - Basics
grand_parent: NumPy
nav_order: 1
---

# Introduction to NumPy

## What is NumPy?

NumPy (Numerical Python) is an open source Python library that's widely used in science and engineering for:

- Working with multidimensional arrays and matrices
- Performing mathematical and statistical operations
- Linear algebra and signal processing
- Random number generation
- Fourier transforms and more

The core object is the **homogeneous multidimensional array** (`ndarray`), which is a table of elements (usually numbers) of the same type, indexed by a tuple of non-negative integers.

## Importing NumPy

The standard convention is to import NumPy as `np`:

```python
import numpy as np
```

This widespread convention allows you to access NumPy features with a short prefix (`np.`) while distinguishing NumPy from other packages with similar names.

## Why Use NumPy?

### Python Lists vs NumPy Arrays

Python lists are excellent, general-purpose containers that can hold different data types. However, NumPy arrays are superior for numerical computing:

| Aspect | Python List | NumPy Array |
|--------|------------|------------|
| Homogeneity | Mixed types allowed | Same type required |
| Speed | Slower | Much faster (written in C) |
| Memory | More memory needed | Memory efficient |
| Syntax | Explicit loops | Vectorized operations |
| Functionality | Limited math ops | Rich mathematical library |

### When to Use NumPy

Use NumPy when you have:

- Large quantities of homogeneous (same-type) numerical data
- Need for fast numerical operations
- Scientific computing or data science tasks
- Multi-dimensional data to manipulate

## A Simple Example

```python
import numpy as np

# Create an array from a Python list
a = np.array([1, 2, 3, 4, 5])
print(a)
# Output: [1 2 3 4 5]

# Perform operations
b = a * 2
print(b)
# Output: [ 2  4  6  8 10]

# Calculate mean
print(a.mean())
# Output: 3.0

# Compare with Python list approach
list_a = [1, 2, 3, 4, 5]
list_b = [x * 2 for x in list_a]  # Need explicit loop!
```

## Key Features of NumPy

1. **N-Dimensional Arrays**: Work with arrays of any dimensionality
2. **Vectorization**: Write code without explicit loops
3. **Broadcasting**: Apply operations to arrays of different shapes intelligently
4. **Integration**: Works seamlessly with other scientific Python libraries
5. **Performance**: C-based implementation for speed
6. **Memory Efficiency**: Optimized storage for numerical data

## Array Dimensions

NumPy supports arrays of any dimensionality:

- **0-D (scalar)**: Single number `5`
- **1-D (vector)**: `[1, 2, 3]`
- **2-D (matrix)**: `[[1, 2], [3, 4]]`
- **3-D and beyond**: Tensors and higher-dimensional arrays

Example:

```python
# 1D array
a = np.array([1, 2, 3])
print(a.ndim)  # Output: 1

# 2D array
b = np.array([[1, 2, 3], [4, 5, 6]])
print(b.ndim)  # Output: 2

# 3D array
c = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(c.ndim)  # Output: 3
```

## What Makes NumPy Special?

NumPy makes numerical computing in Python practical and efficient by:

1. **Exploiting homogeneity**: All elements are the same type, enabling optimizations
2. **Vectorization**: Operations work on entire arrays without explicit loops
3. **Memory layout**: Careful storage in memory for cache efficiency
4. **C extensions**: Performance-critical operations written in C
5. **Broadcasting**: Intelligent handling of different-shaped arrays

## Next Steps

Continue learning:
- [Array Fundamentals](arrays.md) - Understand ndarray objects
- [Array Attributes](attributes.md) - Explore shape, dtype, and more

Or jump to [Getting Started](../02-quickstart/) for practical examples.
