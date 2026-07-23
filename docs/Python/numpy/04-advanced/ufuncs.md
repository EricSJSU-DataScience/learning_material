---
layout: default
title: Universal Functions (ufuncs)
parent: 04 - Advanced
grand_parent: NumPy
nav_order: 5
---

# Universal Functions (ufuncs)

Element-wise operations and vectorization.

## What are ufuncs?

Universal functions (ufuncs) are functions that operate element-wise on arrays. They're implemented in C and are much faster than Python loops.

```python
import numpy as np

# Scalar operation
result = np.sqrt(9)      # 3.0

# Array operation - applies to each element
arr = np.array([1, 4, 9, 16])
result = np.sqrt(arr)    # [1. 2. 3. 4.]
```

## Mathematical ufuncs

### Trigonometric Functions

```python
x = np.array([0, np.pi/4, np.pi/2, np.pi])

# Sine, cosine, tangent
print(np.sin(x))    # [0.         0.70710678 1.         0.        ]
print(np.cos(x))    # [1.         0.70710678 0.         -1.        ]
print(np.tan(x))    # [0.         1.        1.63312394 -0.        ]

# Inverse functions
angles = np.array([0, 0.5, 1.0])
print(np.arcsin(angles))  # arcsin
print(np.arccos(angles))  # arccos
print(np.arctan(angles))  # arctan
```

### Exponential and Logarithm

```python
x = np.array([1, 2, 3, 4])

# Exponential
print(np.exp(x))      # [e^1 e^2 e^3 e^4]
print(np.exp2(x))     # [2^1 2^2 2^3 2^4]

# Logarithm
print(np.log(x))      # Natural log
print(np.log10(x))    # Base-10 log
print(np.log2(x))     # Base-2 log
```

### Power and Roots

```python
x = np.array([1, 4, 9, 16])

# Square root
print(np.sqrt(x))     # [1. 2. 3. 4.]

# Cubic root
print(np.cbrt(x))     # [1. 1.58740105 2.08008383 2.51984210]

# General power
print(np.power(x, 2))  # [1 16 81 256]
```

### Rounding

```python
x = np.array([1.2, 1.5, 1.7, 2.5])

print(np.floor(x))    # [1. 1. 1. 2.] - round down
print(np.ceil(x))     # [2. 2. 2. 3.] - round up
print(np.round(x))    # [1. 2. 2. 2.] - round to nearest
print(np.trunc(x))    # [1. 1. 1. 2.] - truncate
```

## Comparison ufuncs

```python
x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 2, 2, 4, 5])

print(np.equal(x, y))        # [False True False True True]
print(np.not_equal(x, y))    # [True False True False False]
print(np.less(x, y))         # [True False False False False]
print(np.less_equal(x, y))   # [True True False True True]
print(np.greater(x, y))      # [False False True False False]
print(np.greater_equal(x, y))# [False True True True True]
```

## Logical ufuncs

```python
x = np.array([True, True, False, False])
y = np.array([True, False, True, False])

print(np.logical_and(x, y))  # [True False False False]
print(np.logical_or(x, y))   # [True True True False]
print(np.logical_xor(x, y))  # [False True True False]
print(np.logical_not(x))     # [False False True True]
```

## Aggregate ufuncs

These ufuncs reduce arrays to single values:

```python
x = np.array([1, 2, 3, 4, 5])

# Sum and product
print(np.add.reduce(x))      # 15 (sum)
print(np.multiply.reduce(x)) # 120 (factorial-like)

# Min and max
print(np.minimum.reduce(x))  # 1 (min)
print(np.maximum.reduce(x))  # 5 (max)
```

## Output Parameters

Ufuncs support an optional `out` parameter to store results:

```python
x = np.array([1, 2, 3, 4])
result = np.empty_like(x, dtype=float)

# Compute and store in result
np.sqrt(x, out=result)
print(result)  # [1. 1.41421356 1.73205081 2.]

# In-place operation
x = x.astype(float)
np.sqrt(x, out=x)
print(x)  # [1. 1.41421356 1.73205081 2.]
```

## Creating Custom ufuncs

### Using frompyfunc()

```python
# Convert Python function to ufunc
def myfunction(x, y):
    return x**2 + y**2

# Create ufunc (input/output types in and out)
ufunc = np.frompyfunc(myfunction, 2, 1)

# Use on arrays
x = np.array([1, 2, 3])
y = np.array([4, 5, 6])
result = ufunc(x, y)
print(result)  # [17 29 45]
```

## Ufunc Methods

### accumulate() - Running Computation

```python
x = np.array([1, 2, 3, 4, 5])

# Running sum
print(np.add.accumulate(x))      # [1 3 6 10 15]

# Running product
print(np.multiply.accumulate(x)) # [1 2 6 24 120]

# Running max
print(np.maximum.accumulate(x))  # [1 2 3 4 5]
```

### reduceat() - Grouped Computation

```python
x = np.array([10, 20, 30, 40, 50])
indices = np.array([0, 2, 4])

# Sum between indices
print(np.add.reduceat(x, indices))
# [60 70 50] - sums at positions [0-2, 2-4, 4]
```

## Vectorization Benefits

Compare Python loop vs ufunc:

```python
import time
import numpy as np

# Large arrays
n = 10000000
x = np.random.randn(n)
y = np.random.randn(n)

# Method 1: Python loop (slow)
start = time.time()
result = np.zeros(n)
for i in range(n):
    result[i] = np.sqrt(x[i]**2 + y[i]**2)
print(f"Loop: {time.time() - start:.4f}s")

# Method 2: Vectorized (fast)
start = time.time()
result = np.sqrt(x**2 + y**2)
print(f"Vectorized: {time.time() - start:.4f}s")
# Vectorized is 10-100x faster!
```

## Common ufunc Patterns

### Element-wise Arithmetic

```python
x = np.array([1, 2, 3, 4])
y = np.array([10, 20, 30, 40])

# All these use ufuncs internally
print(x + y)      # np.add
print(x - y)      # np.subtract
print(x * y)      # np.multiply
print(x / y)      # np.divide
print(x ** 2)     # np.power
print(x % 3)      # np.mod
```

### Conditional Operations

```python
x = np.array([1, 2, 3, 4, 5])

# Using where with ufuncs
result = np.where(x > 3, np.sqrt(x), x**2)
# Apply sqrt to elements > 3, square to others
# [1 4 9 2.         2.23606798]
```

## Performance Tips

1. **Use ufuncs instead of loops** - Much faster
2. **Avoid creating intermediate arrays** - Use `out` parameter
3. **Use appropriate dtypes** - float32 faster than float64 for memory-bound operations
4. **Vectorize early** - Think in array operations, not loops

## Key Takeaways

- Ufuncs are element-wise functions implemented in C
- Much faster than Python loops (10-100x)
- Support mathematical, comparison, and logical operations
- Support aggregation methods (reduce, accumulate)
- Can be customized with `out` parameter
- Core to NumPy's performance advantage
- Use vectorized operations whenever possible

---

**Next:** [Examples](../examples/index.md)
