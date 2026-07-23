---
layout: default
title: Indexing and Slicing
parent: 02 - Getting Started
grand_parent: NumPy
nav_order: 3
---

# Indexing and Slicing

Access and modify specific elements or sections of arrays using indexing and slicing.

## 1D Array Indexing

### Basic Indexing

```python
import numpy as np

a = np.array([10, 20, 30, 40, 50])

# Access single element (0-indexed)
print(a[0])     # 10 (first element)
print(a[2])     # 30 (third element)
print(a[4])     # 50 (last element)

# Negative indices (from end)
print(a[-1])    # 50 (last element)
print(a[-2])    # 40 (second to last)
print(a[-5])    # 10 (fifth from end)
```

### Slicing

Slice syntax: `array[start:stop:step]`

```python
a = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

# Basic slice (start to stop, step of 1)
print(a[2:5])       # [2 3 4] (indices 2,3,4; 5 not included)

# From start to index 5
print(a[:5])        # [0 1 2 3 4]

# From index 5 to end
print(a[5:])        # [5 6 7 8 9]

# Every second element
print(a[::2])       # [0 2 4 6 8]

# Every third element starting at 1
print(a[1::3])      # [1 4 7]

# Reverse array
print(a[::-1])      # [9 8 7 6 5 4 3 2 1 0]

# Last three elements
print(a[-3:])       # [7 8 9]
```

### Modifying Elements

```python
a = np.array([1, 2, 3, 4, 5])

# Change single element
a[0] = 10
print(a)            # [10  2  3  4  5]

# Change slice
a[1:3] = [20, 30]
print(a)            # [10 20 30  4  5]

# Assign from another array
a[::2] = [100, 300, 500]
print(a)            # [100 20 300  4 500]
```

## 2D Array Indexing

### Basic 2D Indexing

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# Access single element
print(matrix[0, 0])     # 1 (row 0, col 0)
print(matrix[1, 2])     # 6 (row 1, col 2)
print(matrix[2, 1])     # 8 (row 2, col 1)

# Last element
print(matrix[-1, -1])   # 9
```

### 2D Slicing

```python
matrix = np.array([[1, 2, 3, 4],
                   [5, 6, 7, 8],
                   [9, 10, 11, 12]])

# First row
print(matrix[0, :])     # [1 2 3 4]
# Or simply:
print(matrix[0])        # [1 2 3 4]

# Second column
print(matrix[:, 1])     # [2 6 10]

# Submatrix (rows 0-1, columns 1-2)
print(matrix[0:2, 1:3])
# Output:
# [[2 3]
#  [6 7]]

# Every second row
print(matrix[::2, :])
# Output:
# [[ 1  2  3  4]
#  [ 9 10 11 12]]

# Reverse rows and columns
print(matrix[::-1, ::-1])
# Output:
# [[12 11 10  9]
#  [ 8  7  6  5]
#  [ 4  3  2  1]]
```

## Boolean Indexing

### Selecting Elements by Condition

```python
a = np.array([1, 2, 3, 4, 5])

# Create boolean mask
mask = a > 2
print(mask)             # [False False  True  True  True]

# Use mask to select elements
result = a[mask]
print(result)           # [3 4 5]

# More complex conditions
result = a[(a > 2) & (a < 5)]
print(result)           # [3 4]
```

### Modifying with Boolean Indexing

```python
a = np.array([1, 2, 3, 4, 5])

# Modify elements matching condition
a[a > 2] = 0
print(a)                # [1 2 0 0 0]

# Conditional assignment
a = np.array([1, 2, 3, 4, 5])
a[a > 3] = a[a > 3] * 10
print(a)                # [1 2 3 40 50]
```

### 2D Boolean Indexing

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# Select elements greater than 5
result = matrix[matrix > 5]
print(result)           # [6 7 8 9]

# Set elements > 5 to zero
matrix[matrix > 5] = 0
print(matrix)
# Output:
# [[1 2 3]
#  [4 5 0]
#  [0 0 0]]
```

## Fancy Indexing

### Integer Array Indexing

```python
a = np.array([10, 20, 30, 40, 50])

# Select specific indices
indices = np.array([1, 3, 4])
result = a[indices]
print(result)           # [20 40 50]

# Can use list instead
result = a[[0, 2, 4]]
print(result)           # [10 30 50]
```

### 2D Integer Indexing

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# Select rows
rows = np.array([0, 2])
result = matrix[rows]
print(result)
# Output:
# [[1 2 3]
#  [7 8 9]]

# Select specific elements
row_indices = np.array([0, 1, 2])
col_indices = np.array([0, 1, 2])
result = matrix[row_indices, col_indices]
print(result)           # [1 5 9] (diagonal)
```

## Iteration

### 1D Array Iteration

```python
a = np.array([1, 2, 3, 4, 5])
for element in a:
    print(element)
# Output: 1 2 3 4 5
```

### 2D Array Iteration

Iteration over first axis (rows):

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])

for row in matrix:
    print(row)
# Output:
# [1 2 3]
# [4 5 6]
```

### Iterate Over All Elements

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6]])

# Using .flat attribute
for element in matrix.flat:
    print(element)
# Output: 1 2 3 4 5 6

# Using nditer()
for element in np.nditer(matrix):
    print(element)
# Output: 1 2 3 4 5 6
```

## Important: Views vs Copies

**Slicing creates a view (not a copy):**

```python
a = np.array([1, 2, 3, 4, 5])
b = a[1:4]          # Create a view

b[0] = 99           # Modify the view
print(a)            # [1 99 3 4 5] - original changed!
```

**To create an independent copy:**

```python
a = np.array([1, 2, 3, 4, 5])
b = a[1:4].copy()   # Create a copy

b[0] = 99           # Modify the copy
print(a)            # [1 2 3 4 5] - original unchanged
```

## Advanced Indexing Examples

### Replace Values

```python
a = np.array([1, 2, 3, 2, 4, 2, 5])

# Replace all 2s with 99
a[a == 2] = 99
print(a)            # [1 99 3 99 4 99 5]
```

### Extract Positive and Negative

```python
a = np.array([-3, -1, 0, 2, 4, -5])

positive = a[a > 0]
print(positive)     # [2 4]

negative = a[a < 0]
print(negative)     # [-3 -1 -5]
```

### Conditional Assignment

```python
a = np.array([1, 2, 3, 4, 5])

# Where condition is true, use value1, else value2
result = np.where(a > 2, a * 10, a)
print(result)       # [1 2 30 40 50]
```

## Performance Tip

Boolean indexing is much faster than Python loops:

```python
a = np.arange(1000000)

# NumPy (fast)
result = a[a > 500000]

# Python (slow)
result = [x for x in a if x > 500000]
```

## Common Indexing Patterns

```python
a = np.arange(10)

# Get first/last N elements
print(a[:3])        # First 3: [0 1 2]
print(a[-3:])       # Last 3: [7 8 9]

# Get middle elements
print(a[2:-2])      # Skip first 2 and last 2: [2 3 4 5 6 7]

# Get every Nth element
print(a[::2])       # Every 2nd: [0 2 4 6 8]
print(a[::3])       # Every 3rd: [0 3 6 9]

# Get elements in range
print(a[(a > 2) & (a < 7)])  # Elements > 2 and < 7: [3 4 5 6]
```

## Next Steps

- [Shape Manipulation](../03-intermediate/shape-manipulation.md) - Reshape and reorganize arrays
- [Copies and Views](../03-intermediate/copies-views.md) - Understanding memory management
