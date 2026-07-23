---
layout: default
title: Array Creation
parent: 02 - Getting Started
grand_parent: NumPy
nav_order: 1
---

# Array Creation

There are many ways to create NumPy arrays. This section covers the most common and useful methods.

## From Python Sequences

### From Lists

The simplest way is to pass a Python list to `np.array()`:

```python
import numpy as np

# 1D array
a = np.array([1, 2, 3, 4, 5])
print(a)
# Output: [1 2 3 4 5]

# 2D array from nested lists
b = np.array([[1, 2, 3], [4, 5, 6]])
print(b)
# Output:
# [[1 2 3]
#  [4 5 6]]

# 3D array
c = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
```

### From Tuples

Arrays can also be created from tuples:

```python
# From tuple
a = np.array((1, 2, 3, 4, 5))

# From nested tuples
b = np.array(((1, 2, 3), (4, 5, 6)))
```

### Data Type Inference

NumPy automatically infers the data type from the elements:

```python
# Integers → int64
a = np.array([1, 2, 3])
print(a.dtype)  # int64

# Floats → float64
b = np.array([1.0, 2.0, 3.0])
print(b.dtype)  # float64

# Mixed → float64 (upcasting)
c = np.array([1, 2.0, 3])
print(c.dtype)  # float64

# Strings → Unicode strings
d = np.array(['a', 'b', 'c'])
print(d.dtype)  # <U1
```

## Specifying Data Type

Explicitly specify the data type using the `dtype` parameter:

```python
# Integer types
a = np.array([1, 2, 3], dtype=np.int32)
b = np.array([1, 2, 3], dtype=np.int64)
c = np.array([1, 2, 3], dtype=np.uint8)  # Unsigned

# Float types
d = np.array([1, 2, 3], dtype=np.float32)
e = np.array([1, 2, 3], dtype=np.float64)

# Complex numbers
f = np.array([1+2j, 3+4j], dtype=np.complex128)

# Boolean
g = np.array([True, False, True], dtype=np.bool_)
```

## Placeholder Arrays

Create arrays with initial placeholder content (faster than filling afterward):

### zeros() - Array of Zeros

```python
# 1D array of zeros
a = np.zeros(5)
print(a)
# Output: [0. 0. 0. 0. 0.]

# 2D array of zeros
b = np.zeros((3, 4))
print(b)
# Output:
# [[0. 0. 0. 0.]
#  [0. 0. 0. 0.]
#  [0. 0. 0. 0.]]

# Specify dtype
c = np.zeros((2, 3), dtype=np.int32)
```

### ones() - Array of Ones

```python
# 1D array of ones
a = np.ones(5)
print(a)
# Output: [1. 1. 1. 1. 1.]

# 2D array of ones
b = np.ones((3, 4))

# 3D array with specific dtype
c = np.ones((2, 3, 4), dtype=np.float32)
```

### empty() - Uninitialized Array

```python
# Create without initializing (fast but contains garbage values)
a = np.empty(5)
print(a)
# Output: [6.23042070e-307 4.67296746e-307 ...]  # Random values

# 2D array
b = np.empty((2, 3))

# Useful when you'll fill it immediately:
c = np.empty((1000, 1000))
# ... fill c with data ...
```

## Ranges of Numbers

### arange() - Like Python's range()

Create arrays with a sequence of numbers:

```python
# 0 to 9
a = np.arange(10)
print(a)
# Output: [0 1 2 3 4 5 6 7 8 9]

# 2 to 9 (10 not included)
b = np.arange(2, 10)
print(b)
# Output: [2 3 4 5 6 7 8 9]

# 0 to 10 with step of 2
c = np.arange(0, 10, 2)
print(c)
# Output: [0 2 4 6 8]

# Float arguments
d = np.arange(0, 2, 0.3)
print(d)
# Output: [0.  0.3 0.6 0.9 1.2 1.5 1.8]
```

### linspace() - Evenly Spaced Values

When using floating point step sizes, `linspace()` is more reliable:

```python
# 5 values from 0 to 10
a = np.linspace(0, 10, num=5)
print(a)
# Output: [ 0.   2.5  5.   7.5 10. ]

# 100 values from 0 to 2π
from numpy import pi
x = np.linspace(0, 2*pi, 100)

# 10 values from 1 to 100
b = np.linspace(1, 100, 10)
print(b)
# Output: [  1.  12.  23.  34.  45.  56.  67.  78.  89. 100.]
```

**linspace vs arange:**
- `arange(start, stop, step)`: Specify the step size
- `linspace(start, stop, num)`: Specify number of points
- Use `linspace` when you need exact number of values
- Use `arange` when you know the step size

## Special Arrays

### eye() - Identity Matrix

```python
# 3x3 identity matrix
a = np.eye(3)
print(a)
# Output:
# [[1. 0. 0.]
#  [0. 1. 0.]
#  [0. 0. 1.]]

# With different dtype
b = np.eye(3, dtype=np.int32)
```

### full() - Array Filled with Value

```python
# 1D array filled with 7
a = np.full(5, 7)
print(a)
# Output: [7 7 7 7 7]

# 2D array filled with 3.14
b = np.full((3, 3), 3.14)
print(b)
# Output:
# [[3.14 3.14 3.14]
#  [3.14 3.14 3.14]
#  [3.14 3.14 3.14]]
```

### diagonal() - Extract Diagonal

```python
a = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
diag = np.diag(a)
print(diag)
# Output: [1 5 9]

# Create diagonal matrix
b = np.diag([1, 2, 3])
print(b)
# Output:
# [[1 0 0]
#  [0 2 0]
#  [0 0 3]]
```

## Random Arrays

Create arrays with random values:

```python
import numpy as np

# Create random number generator
rng = np.random.default_rng(seed=42)  # seed for reproducibility

# Random floats [0, 1)
a = rng.random(5)
print(a)
# Output: [0.77395605 0.43887844 0.85859792 0.69736803 0.09417735]

# 2D array of random floats
b = rng.random((3, 4))

# Random integers [0, 5)
c = rng.integers(0, 5, size=10)
print(c)
# Output: [4 0 0 1 3 0 2 2 4 0]

# Random values from normal distribution
d = rng.normal(loc=0, scale=1, size=1000)
```

## *_like Functions

Create arrays with the same shape as another array:

```python
a = np.array([[1, 2, 3], [4, 5, 6]])

# zeros_like - zeros with same shape/dtype
b = np.zeros_like(a)
print(b)
# Output:
# [[0 0 0]
#  [0 0 0]]

# ones_like - ones with same shape/dtype
c = np.ones_like(a)

# empty_like - empty with same shape/dtype
d = np.empty_like(a)
```

## Converting Between Formats

### From Python List
```python
python_list = [1, 2, 3, 4, 5]
arr = np.array(python_list)
```

### To Python List
```python
arr = np.array([1, 2, 3, 4, 5])
python_list = arr.tolist()
```

### Converting Data Type
```python
a = np.array([1, 2, 3], dtype=np.int32)
b = a.astype(np.float64)
print(b.dtype)  # float64
```

## Common Creation Pattern

Here's how you typically create arrays in practice:

```python
import numpy as np

# For known values - use array()
data = np.array([1, 2, 3, 4, 5])

# For unknown values (to be filled) - use zeros() or empty()
result = np.zeros((100, 100))

# For sequences - use arange() or linspace()
x_values = np.linspace(0, 10, 1000)

# For random data - use random
random_data = np.random.default_rng().random((50, 50))
```

## Performance Tip

Creating placeholder arrays is faster than growing arrays:

```python
# Slow - growing array
result = np.array([])
for i in range(1000):
    result = np.append(result, i)

# Fast - pre-allocate
result = np.empty(1000)
for i in range(1000):
    result[i] = i
```

## Summary Table

| Function | Purpose | Example |
|----------|---------|---------|
| `array()` | From Python sequence | `np.array([1,2,3])` |
| `zeros()` | All zeros | `np.zeros((3,3))` |
| `ones()` | All ones | `np.ones(5)` |
| `empty()` | Uninitialized | `np.empty((2,3))` |
| `arange()` | Range with step | `np.arange(0, 10, 2)` |
| `linspace()` | Evenly spaced | `np.linspace(0, 10, 5)` |
| `eye()` | Identity matrix | `np.eye(3)` |
| `full()` | Filled with value | `np.full(5, 7)` |
| `random()` | Random values | `np.random.random(5)` |

## Next Steps

- [Operations](operations.md) - Perform calculations on arrays
- [Indexing and Slicing](indexing.md) - Access array elements
