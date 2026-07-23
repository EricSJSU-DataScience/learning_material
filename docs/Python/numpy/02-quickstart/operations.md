---
layout: default
title: Operations
parent: 02 - Getting Started
grand_parent: NumPy
nav_order: 2
---

# Array Operations

NumPy operations are efficient and vectorized, meaning they work on entire arrays without explicit loops.

## Basic Arithmetic Operations

### Element-wise Operations

Operations apply to each element individually:

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

# Addition
print(a + b)       # [11 22 33 44 55]

# Subtraction
print(b - a)       # [ 9 18 27 36 45]

# Multiplication (element-wise, not matrix multiply)
print(a * b)       # [ 10  40  90 160 250]

# Division
print(b / a)       # [10. 10. 10. 10. 10.]

# Power
print(a ** 2)      # [ 1  4  9 16 25]

# Modulo
print(a % 2)       # [1 0 1 0 1]

# Floor division
print(b // a)      # [10 10 10 10 10]
```

### Operations with Scalars (Broadcasting)

```python
a = np.array([1, 2, 3, 4, 5])

# Scalar operations apply to each element
print(a + 10)      # [11 12 13 14 15]
print(a * 2)       # [ 2  4  6  8 10]
print(a / 2)       # [0.5 1.  1.5 2.  2.5]
print(10 - a)      # [9 8 7 6 5]
```

### In-place Operations

Modify arrays in place using `+=`, `*=`, etc.:

```python
a = np.array([1, 2, 3, 4, 5])

# In-place operations
a += 10         # a = a + 10
print(a)        # [11 12 13 14 15]

a *= 2          # a = a * 2
print(a)        # [22 24 26 28 30]

# In-place operations save memory (no temporary array)
```

## Comparison Operations

Create boolean arrays:

```python
a = np.array([1, 2, 3, 4, 5])

# Greater than
print(a > 2)        # [False False  True  True  True]

# Less than
print(a < 4)        # [ True  True  True False False]

# Equal to
print(a == 3)       # [False False  True False False]

# Not equal
print(a != 3)       # [ True  True False  True  True]

# Greater than or equal
print(a >= 3)       # [False False  True  True  True]
```

## Logical Operations

Combine boolean arrays:

```python
a = np.array([1, 2, 3, 4, 5])

# AND - both conditions true
print((a > 2) & (a < 5))    # [False False  True  True False]

# OR - at least one condition true
print((a < 2) | (a > 4))    # [ True False False False  True]

# NOT - negation
print(~(a > 3))             # [ True  True  True False False]

# all() - all elements True?
print((a > 0).all())        # True

# any() - any element True?
print((a > 10).any())       # False
```

## Mathematical Functions

NumPy provides many mathematical functions (called **universal functions** or **ufuncs**):

```python
import numpy as np

a = np.array([1, 4, 9, 16, 25])

# Square root
print(np.sqrt(a))       # [1. 2. 3. 4. 5.]

# Absolute value
b = np.array([-1, -2, 3, -4, 5])
print(np.abs(b))        # [1 2 3 4 5]

# Exponential
c = np.array([0, 1, 2, 3])
print(np.exp(c))        # [ 1.  2.71828183  7.3890561  20.08553692]

# Logarithm
d = np.array([1, 10, 100])
print(np.log10(d))      # [0. 1. 2.]

# Trigonometric functions
x = np.array([0, np.pi/2, np.pi])
print(np.sin(x))        # [0.00000000e+00 1.00000000e+00 1.22464680e-16]
print(np.cos(x))        # [ 1.  0. -1.]

# Rounding
e = np.array([1.234, 2.567, 3.891])
print(np.round(e))      # [1. 3. 4.]
print(np.floor(e))      # [1. 2. 3.]
print(np.ceil(e))       # [2. 3. 4.]
```

**Common Mathematical Functions:**
- Square root: `np.sqrt()`
- Power: `np.power()` or `**` operator
- Absolute value: `np.abs()`
- Exponential: `np.exp()`
- Logarithm: `np.log()`, `np.log10()`, `np.log2()`
- Trigonometric: `np.sin()`, `np.cos()`, `np.tan()`
- Rounding: `np.round()`, `np.floor()`, `np.ceil()`

## Aggregation Functions

Calculate single values from arrays:

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])

# Sum all elements
print(a.sum())          # 15

# Mean (average)
print(a.mean())         # 3.0

# Median
print(np.median(a))     # 3.0

# Standard deviation
print(a.std())          # ~1.41

# Variance
print(a.var())          # 2.0

# Minimum and maximum
print(a.min())          # 1
print(a.max())          # 5

# Product of all elements
print(a.prod())         # 120 (1*2*3*4*5)

# Cumulative sum
print(np.cumsum(a))     # [ 1  3  6 10 15]

# Cumulative product
print(np.cumprod(a))    # [  1   2   6  24 120]
```

### Aggregation Along Axes (2D Arrays)

For multi-dimensional arrays, aggregate along specific axes:

```python
import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

# Sum entire array
print(a.sum())          # 45

# Sum along rows (axis=1)
print(a.sum(axis=1))    # [6 15 24]

# Sum along columns (axis=0)
print(a.sum(axis=0))    # [12 15 18]

# Mean along axis 0 (columns)
print(a.mean(axis=0))   # [4. 5. 6.]

# Max along axis 1 (rows)
print(a.max(axis=1))    # [3 6 9]

# Min along axis 0 (columns)
print(a.min(axis=0))    # [1 2 3]
```

## Matrix Operations

### Matrix Multiplication

Important: `*` is element-wise, `@` or `.dot()` is matrix multiplication:

```python
import numpy as np

A = np.array([[1, 1],
              [0, 1]])

B = np.array([[2, 0],
              [3, 4]])

# Element-wise multiplication (NOT matrix multiply)
print(A * B)
# Output:
# [[2 0]
#  [0 4]]

# Matrix multiplication
print(A @ B)  # Python 3.5+
# Output:
# [[5 4]
#  [3 4]]

# Alternative: .dot() method
print(A.dot(B))
# Output:
# [[5 4]
#  [3 4]]
```

### Transpose

```python
a = np.array([[1, 2, 3],
              [4, 5, 6]])

# Using .T attribute
print(a.T)
# Output:
# [[1 4]
#  [2 5]
#  [3 6]]

# Using .transpose() method
print(a.transpose())
# Same result as .T
```

## Type Casting and Upcasting

When combining arrays of different types, NumPy uses **upcasting**:

```python
import numpy as np

a = np.array([1, 2, 3], dtype=np.int32)        # int32
b = np.linspace(0, np.pi, 3)                   # float64

# Result is float64 (more general type)
c = a + b
print(c.dtype)      # float64
```

## Boolean Indexing

Use boolean arrays to select elements:

```python
a = np.array([1, 2, 3, 4, 5])

# Create boolean mask
mask = a > 2
print(mask)         # [False False  True  True  True]

# Use mask to select elements
result = a[mask]
print(result)       # [3 4 5]

# Modify selected elements
a[a > 2] = 0
print(a)            # [1 2 0 0 0]
```

## Finding Elements

### argmax() and argmin()

Find indices of maximum/minimum values:

```python
a = np.array([3, 1, 4, 1, 5, 9])

# Index of maximum value
print(np.argmax(a))     # 5 (value is 9)

# Index of minimum value
print(np.argmin(a))     # 1 (value is 1)

# For 2D arrays, use axis parameter
b = np.array([[1, 2, 3], [4, 5, 6]])
print(np.argmax(b, axis=1))  # [2 2] (max index in each row)
```

### nonzero()

Find indices of non-zero elements:

```python
a = np.array([0, 1, 0, 2, 3, 0])
indices = np.nonzero(a)
print(indices)          # (array([1, 3, 4]),)
print(a[indices])       # [1 2 3]
```

## Sorting

```python
a = np.array([3, 1, 4, 1, 5, 9, 2, 6])

# Sort array
print(np.sort(a))       # [1 1 2 3 4 5 6 9]

# Get sorting indices
indices = np.argsort(a)
print(indices)          # [1 3 6 0 2 4 7 5]

# Sort in descending order
print(np.sort(a)[::-1]) # [9 6 5 4 3 2 1 1]
```

## Performance Notes

NumPy operations are typically 10-100x faster than Python loops:

```python
import numpy as np
import time

n = 1000000

# NumPy way (vectorized)
a = np.arange(n)
start = time.time()
result = a * 2
numpy_time = time.time() - start

# Python list way
b = list(range(n))
start = time.time()
result = [x * 2 for x in b]
python_time = time.time() - start

print(f"NumPy: {numpy_time:.6f}s")
print(f"Python: {python_time:.6f}s")
print(f"Speedup: {python_time/numpy_time:.1f}x")
```

## Next Steps

- [Indexing and Slicing](indexing.md) - Access and select array elements
- [Shape Manipulation](../03-intermediate/shape-manipulation.md) - Reshape and reorganize arrays
