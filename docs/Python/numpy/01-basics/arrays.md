---
layout: default
title: Array Fundamentals
parent: 01 - Basics
grand_parent: NumPy
nav_order: 2
---

# Array Fundamentals

## What is an ndarray?

NumPy's main object is the `ndarray` class, also known as `array`. It represents an N-dimensional, homogeneous array of fixed-size items. All elements must be of the same data type.

```python
import numpy as np

# Create an array
a = np.array([1, 2, 3, 4, 5])
print(type(a))  # <class 'numpy.ndarray'>
```

## Key Characteristics of NumPy Arrays

1. **Homogeneous**: All elements must be the same type
2. **Fixed size**: Once created, the total number of elements cannot change
3. **Fixed shape**: The array must be "rectangular" (not jagged)
4. **Multi-dimensional**: Can have any number of dimensions

These restrictions enable NumPy to:
- Make arrays faster than Python lists
- Use less memory
- Provide convenient syntax for common operations

## Creating Arrays

### From Python Lists

The simplest way to create an array is from a Python list:

```python
# 1D array from list
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

### Important: Correct Syntax

A common mistake is passing multiple arguments instead of a single sequence:

```python
# WRONG - will raise TypeError
a = np.array(1, 2, 3, 4)

# CORRECT - pass a sequence
a = np.array([1, 2, 3, 4])
```

### Arrays with Placeholders

NumPy provides functions to create arrays with initial placeholder content:

```python
# Array of zeros
zeros = np.zeros(5)
# Output: [0. 0. 0. 0. 0.]

# Array of ones
ones = np.ones(5)
# Output: [1. 1. 1. 1. 1.]

# Empty array (random initial values)
empty = np.empty(5)
# Output: [3.73603959e-262  6.02658058e-154 ...]  # may vary

# 2D arrays
zeros_2d = np.zeros((3, 4))
ones_2d = np.ones((2, 3))
```

### Arrays with Ranges

Create arrays with sequences of numbers:

```python
# Range of integers
a = np.arange(10)
# Output: [0 1 2 3 4 5 6 7 8 9]

# Range with step
b = np.arange(0, 10, 2)
# Output: [0 2 4 6 8]

# Evenly spaced values
c = np.linspace(0, 10, 5)
# Output: [ 0.   2.5  5.   7.5 10. ]
```

## Specifying Data Types

By default, NumPy infers the data type from the input. You can explicitly specify it:

```python
# Integer array
a = np.array([1, 2, 3], dtype=np.int32)

# Float array
b = np.array([1, 2, 3], dtype=np.float64)

# Complex array
c = np.array([1, 2, 3], dtype=np.complex128)

# Boolean array
d = np.array([True, False, True], dtype=np.bool_)

# When creating with zeros or ones
e = np.zeros(5, dtype=np.int64)
f = np.ones((3, 3), dtype=np.float32)
```

## Accessing and Modifying Elements

### Indexing

Arrays use 0-based indexing, just like Python lists:

```python
a = np.array([10, 20, 30, 40, 50])

# Access single element
print(a[0])   # 10
print(a[4])   # 50
print(a[-1])  # 50 (last element)

# For 2D arrays
b = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(b[0, 0])   # 1 (row 0, column 0)
print(b[1, 2])   # 6 (row 1, column 2)
print(b[2, 1])   # 8
```

### Slicing

Like Python lists, you can use slice notation:

```python
a = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

# Slice from index 2 to 5 (5 not included)
print(a[2:5])    # [2 3 4]

# Slice from start to index 5
print(a[:5])     # [0 1 2 3 4]

# Slice from index 5 to end
print(a[5:])     # [5 6 7 8 9]

# Every second element
print(a[::2])    # [0 2 4 6 8]

# Reverse array
print(a[::-1])   # [9 8 7 6 5 4 3 2 1 0]
```

### Modifying Elements

Arrays are mutable; you can modify elements:

```python
a = np.array([1, 2, 3, 4, 5])

# Change single element
a[0] = 10
print(a)  # [10  2  3  4  5]

# Change multiple elements
a[1:3] = [20, 30]
print(a)  # [10 20 30  4  5]

# Assign from another array
b = np.array([100, 200, 300, 400, 500])
a = b
print(a)  # [100 200 300 400 500]
```

## Important Difference: Views vs Copies

A key difference between NumPy arrays and Python lists:

**Python list slicing creates a copy:**
```python
list_a = [1, 2, 3, 4, 5]
list_b = list_a[1:3]
list_b[0] = 99
print(list_a)  # [1, 2, 3, 4, 5] - unchanged
```

**NumPy array slicing creates a view:**
```python
arr_a = np.array([1, 2, 3, 4, 5])
arr_b = arr_a[1:3]
arr_b[0] = 99
print(arr_a)   # [1, 99, 3, 4, 5] - modified!
```

This saves memory but requires care when modifying slices. See [Copies and Views](../03-intermediate/copies-views.md) for more details.

## Multi-dimensional Indexing

For 2D arrays (matrices), use row and column indices:

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# Single element
print(matrix[0, 0])    # 1
print(matrix[2, 1])    # 8

# Row slicing
print(matrix[0, :])    # [1 2 3] (first row)
print(matrix[:, 0])    # [1 4 7] (first column)

# Range slicing
print(matrix[1:, 1:])  # [[5 6]
                       #  [8 9]]
```

## Iteration

### 1D arrays

Iterate over elements:

```python
a = np.array([1, 2, 3, 4, 5])
for element in a:
    print(element)
```

### 2D arrays

Iteration is over the first axis (rows):

```python
matrix = np.array([[1, 2, 3], [4, 5, 6]])
for row in matrix:
    print(row)
# Output:
# [1 2 3]
# [4 5 6]
```

### Iterate over all elements

Use the `.flat` attribute:

```python
matrix = np.array([[1, 2, 3], [4, 5, 6]])
for element in matrix.flat:
    print(element)
# Output: 1 2 3 4 5 6
```

## Array Operations

### Element-wise arithmetic

Operations are applied to each element:

```python
a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

# Addition
print(a + b)     # [11 22 33 44 55]

# Subtraction
print(b - a)     # [ 9 18 27 36 45]

# Multiplication
print(a * b)     # [ 10  40  90 160 250]

# Division
print(b / a)     # [10. 10. 10. 10. 10.]

# Power
print(a ** 2)    # [ 1  4  9 16 25]
```

### Operations with scalars

Broadcasting applies the operation to each element:

```python
a = np.array([1, 2, 3, 4, 5])

print(a + 10)    # [11 12 13 14 15]
print(a * 3)     # [ 3  6  9 12 15]
print(a / 2)     # [0.5 1.  1.5 2.  2.5]
```

## Next Steps

- [Array Attributes](attributes.md) - Explore shape, dtype, and more
- [Array Creation](../02-quickstart/array-creation.md) - More creation methods
- [Operations](../02-quickstart/operations.md) - Perform computations
