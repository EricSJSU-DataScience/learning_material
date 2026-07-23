---
layout: default
title: Broadcasting
parent: 04 - Advanced
grand_parent: NumPy
nav_order: 1
---

# Broadcasting

Apply operations to arrays of different shapes.

## What is Broadcasting?

Broadcasting allows NumPy to perform operations on arrays of different shapes by automatically expanding smaller arrays to match larger ones.

```python
import numpy as np

# Scalar with array
a = np.array([1, 2, 3])
b = 2
result = a * b  # [2, 4, 6]

# 1D array with 2D array
a = np.array([[1, 2, 3], [4, 5, 6]])
b = np.array([1, 2, 3])
result = a + b
# [[2, 4, 6],
#  [5, 7, 9]]
```

## Broadcasting Rules

When operating on two arrays, NumPy compares shapes element-wise starting from the **right**:

1. If dimensions are equal, no action needed
2. If one dimension is 1, it's stretched to match
3. If shapes can't be reconciled, raise an error

## Shape Alignment Examples

### Compatible Shapes

```
Image  (3D array): 256 x 256 x 3
Scale  (1D array):             3
Result (3D array): 256 x 256 x 3  ✓
```

```
A (4D array):  8 x 1 x 6 x 1
B (3D array):      7 x 1 x 5
Result (4D):   8 x 7 x 6 x 5  ✓
```

### Incompatible Shapes

```
A (1D array):  3
B (1D array):  4
Result:        ERROR - trailing dimensions don't match
```

## Practical Examples

### Normalizing columns

```python
data = np.array([[1, 2, 3],
                 [4, 5, 6],
                 [7, 8, 9]])

# Subtract mean of each column
means = data.mean(axis=0)  # [4. 5. 6.] - shape (3,)
normalized = data - means  # Broadcasting works!
# [[−3. −3. −3.]
#  [ 0.  0.  0.]
#  [ 3.  3.  3.]]
```

### Scaling image channels

```python
# RGB image (height, width, channels)
image = np.random.randint(0, 256, (100, 100, 3))

# Scale each channel differently
scale = np.array([1.0, 1.2, 0.8])  # shape (3,)
scaled = image * scale  # Broadcasting extends scale
```

### Creating outer product

```python
a = np.array([1, 2, 3, 4])      # shape (4,)
b = np.array([10, 20, 30])      # shape (3,)

# Add dimensions to broadcast
result = a[:, np.newaxis] + b    # shape (4, 3)
# [[11, 21, 31],
#  [12, 22, 32],
#  [13, 23, 33],
#  [14, 24, 34]]
```

## Memory Efficiency

Broadcasting doesn't actually create copies of data - it uses "virtual" dimensions:

```python
a = np.array([1, 2, 3, 4, 5])
b = a * 2  # Doesn't create copy of 'a'
           # Uses stride tricks to avoid memory overhead
```

This makes broadcasting much faster than manually repeating arrays.

## Common Broadcasting Patterns

### Centering data

```python
data = np.random.randn(100, 50)
means = data.mean(axis=0)  # shape (50,)
centered = data - means     # Broadcasting
```

### Standardizing data

```python
means = data.mean(axis=0)
stds = data.std(axis=0)
standardized = (data - means) / stds
```

### Batch operations

```python
# Apply function to each row
x = np.arange(12).reshape(3, 4)
factors = np.array([2, 3, 4])[:, np.newaxis]  # shape (3, 1)
result = x * factors  # Each row scaled differently
```

## When Broadcasting Fails

```python
a = np.ones((3, 4))
b = np.ones((3, 5))

result = a + b  
# ValueError: operands could not be broadcast together
```

Solution: reshape or transpose one array first.

## Performance Tip

Broadcasting is vectorized (C-level), so it's much faster than Python loops:

```python
# Fast - broadcasting
result = a[:, np.newaxis] * b[np.newaxis, :]

# Slow - Python loop
result = np.zeros((len(a), len(b)))
for i in range(len(a)):
    for j in range(len(b)):
        result[i, j] = a[i] * b[j]
```

## Key Takeaways

- Shapes align from **right to left**
- Dimension size of 1 is stretched to match others
- Missing dimensions are treated as 1
- No actual copying occurs (memory efficient)
- Much faster than explicit loops
- Used for vectorized operations

---

**Next:** [Advanced Indexing](advanced-indexing.md)
