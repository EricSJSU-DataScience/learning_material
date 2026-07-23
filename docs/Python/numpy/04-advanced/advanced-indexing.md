---
layout: default
title: Advanced Indexing
parent: 04 - Advanced
grand_parent: NumPy
nav_order: 2
---

# Advanced Indexing

Complex selection and manipulation of array elements.

## Types of Advanced Indexing

Advanced indexing uses arrays to select elements, allowing powerful and flexible data selection.

## Boolean Indexing

Use boolean arrays to select elements that meet a condition.

```python
import numpy as np

# Create array
a = np.array([1, 2, 3, 4, 5, 6])

# Boolean mask
mask = a > 3
result = a[mask]  # [4 5 6]

# With 2D arrays
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
result = arr[arr > 4]  # [5 6 7 8 9] - flattened result
```

### Creating Masks

```python
data = np.array([10, 20, 30, 40, 50])

# Single condition
mask1 = data > 25  # [False False True True True]

# Multiple conditions
mask2 = (data > 15) & (data < 45)
# [False True True True False]

# Combining with logical operators
mask3 = (data < 20) | (data > 40)
# [True True False False True]

# Negation
mask4 = ~(data > 30)  # [True True True False False]
```

## Fancy Indexing

Use integer arrays to select specific elements.

```python
# 1D array with integer indexing
a = np.array([10, 20, 30, 40, 50])
indices = np.array([0, 2, 4])
result = a[indices]  # [10 30 50]

# 2D array with integer pairs
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
rows = np.array([0, 1, 2])
cols = np.array([2, 1, 0])
result = arr[rows, cols]  # [3 5 7] - diagonal anti-pattern
```

## Combined Indexing

Mix different indexing types.

```python
arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

# Slice and fancy index
result = arr[:2, [0, 2]]
# [[1 3]
#  [5 7]]

# Slice and boolean
mask = arr[0] > 2
result = arr[1:, mask]
# [[6 7 8]
#  [10 11 12]]
```

## Practical Examples

### Filter by condition

```python
# Get all values above threshold
data = np.array([1, 5, 2, 8, 3, 9, 4])
threshold = 4
result = data[data > threshold]  # [5 8 9]
```

### Extract specific rows

```python
# Select rows 0, 2, 4 from matrix
matrix = np.arange(20).reshape(5, 4)
selected_rows = matrix[[0, 2, 4]]  # rows 0, 2, 4
```

### Find and extract indices

```python
data = np.array([10, 20, 15, 30, 25])

# Find indices of values > 20
indices = np.where(data > 20)  # (array([1, 3]),)
selected = data[indices]  # [20 30]

# More readable version
selected = data[np.where(data > 20)]  # [20 30]
```

### Extracting multiple conditions

```python
data = np.array([1, 5, 2, 8, 3, 9, 4, 7])

# Between 3 and 8
mask = (data >= 3) & (data <= 8)
result = data[mask]  # [5 8 3 7]

# Using where for indices
indices = np.where(mask)
```

### Extracting non-zero elements

```python
arr = np.array([[1, 0, 2], [0, 3, 0], [4, 0, 5]])

# Find non-zero values and their indices
nonzero = np.nonzero(arr)  # Returns tuple of indices
values = arr[nonzero]  # [1 2 3 4 5]

# Get coordinates of non-zero elements
coords = np.argwhere(arr != 0)
# [[0 0]
#  [0 2]
#  [1 1]
#  [2 0]
#  [2 2]]
```

## Performance Considerations

### Views vs Copies

**Fancy indexing always creates a copy:**

```python
a = np.arange(10)
b = a[[2, 4, 6]]  # Copy (not a view)
b[0] = 999
print(a[2])  # Still 2 (original unchanged)
```

**Boolean indexing always creates a copy:**

```python
a = np.arange(10)
mask = a > 5
b = a[mask]  # Copy (not a view)
b[0] = 999
print(a[6])  # Still 6 (original unchanged)
```

## Common Patterns

### Finding maximum/minimum indices

```python
data = np.array([3, 1, 4, 1, 5, 9])

# Index of max value
max_idx = np.argmax(data)  # 5

# Index of min value
min_idx = np.argmin(data)  # 1

# Extract the values
print(data[max_idx])  # 9
print(data[min_idx])  # 1
```

### Sorting indices

```python
data = np.array([3, 1, 4, 1, 5])
sorted_indices = np.argsort(data)  # [1 3 0 2 4]

# Get sorted data
sorted_data = data[sorted_indices]  # [1 1 3 4 5]
```

### Replacing values

```python
data = np.array([1, 2, 3, 4, 5])

# Replace all values > 3 with 10
data[data > 3] = 10  # [1 2 3 10 10]

# Replace specific indices
data[[0, 2]] = 0  # [0 2 0 10 10]
```

## Key Differences Summary

| Method | Syntax | Returns | Type |
|--------|--------|---------|------|
| Boolean | `arr[arr > 5]` | Filtered values | Copy |
| Fancy | `arr[[1, 3, 5]]` | Selected elements | Copy |
| Combined | `arr[mask, cols]` | Filtered subset | Copy |

## Key Takeaways

- Boolean indexing filters based on conditions
- Fancy indexing selects specific elements by position
- Both create copies (not views)
- Combine with regular slicing for powerful selections
- Use `np.where()` to find indices matching conditions
- `np.argmax()` and `np.argmin()` find extreme indices
- Advanced indexing is slower than simple slicing but very flexible

---

**Next:** [Data Types](data-types.md)
