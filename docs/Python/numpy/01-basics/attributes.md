---
layout: default
title: Array Attributes
parent: 01 - Basics
grand_parent: NumPy
nav_order: 3
---

# Array Attributes

Understanding array attributes is crucial for working effectively with NumPy. These attributes tell you important information about your arrays and control how they behave.

## Core Attributes

### ndim - Number of Dimensions

The `ndim` attribute returns the number of axes (dimensions) of the array.

```python
import numpy as np

# 1D array
a = np.array([1, 2, 3, 4, 5])
print(a.ndim)  # 1

# 2D array
b = np.array([[1, 2, 3], [4, 5, 6]])
print(b.ndim)  # 2

# 3D array
c = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(c.ndim)  # 3
```

### shape - Dimensions of the Array

The `shape` attribute is a tuple of integers indicating the size of the array in each dimension.

```python
# 1D array
a = np.array([1, 2, 3, 4, 5])
print(a.shape)  # (5,)

# 2D array (3 rows, 4 columns)
b = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
print(b.shape)  # (3, 4)

# 3D array
c = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]])
print(c.shape)  # (2, 2, 3)
```

**Understanding Shape:**
- Shape is a tuple where length = ndim
- For a matrix with n rows and m columns, shape is (n, m)
- For 1D array with 5 elements, shape is (5,)

```python
# Example: Understanding shape
matrix = np.array([[1, 2, 3, 4],
                   [5, 6, 7, 8],
                   [9, 10, 11, 12]])

print(matrix.ndim)    # 2 (it's a matrix)
print(matrix.shape)   # (3, 4) - 3 rows, 4 columns
print(len(matrix.shape))  # 2 (same as ndim)
```

### size - Total Number of Elements

The `size` attribute is the total number of elements in the array. It equals the product of all dimensions.

```python
# 1D array
a = np.array([1, 2, 3, 4, 5])
print(a.size)  # 5

# 2D array
b = np.array([[1, 2, 3], [4, 5, 6]])
print(b.size)  # 6 (2 rows × 3 columns)

# 3D array
c = np.zeros((2, 3, 4))
print(c.size)  # 24 (2 × 3 × 4)

# Verify: size equals product of shape
d = np.ones((5, 4, 3))
import math
print(d.size == math.prod(d.shape))  # True
```

### dtype - Data Type

The `dtype` attribute describes the type of elements in the array. All elements must have the same type.

```python
# Integer array
a = np.array([1, 2, 3])
print(a.dtype)  # int64 (or int32 depending on system)

# Float array
b = np.array([1.0, 2.0, 3.0])
print(b.dtype)  # float64

# Complex array
c = np.array([1+2j, 3+4j])
print(c.dtype)  # complex128

# Boolean array
d = np.array([True, False, True])
print(d.dtype)  # bool

# Object array (can hold any Python object)
e = np.array(['a', 'b', 'c'])
print(e.dtype)  # <U1 (Unicode string, length 1)
```

**Common Data Types:**

| Type | Description | Example |
|------|-------------|---------|
| `int8`, `int16`, `int32`, `int64` | Signed integers | -128 to 127 for int8 |
| `uint8`, `uint16`, `uint32`, `uint64` | Unsigned integers | 0 to 255 for uint8 |
| `float32`, `float64` | Floating point | Single/double precision |
| `complex64`, `complex128` | Complex numbers | 1+2j |
| `bool` | Boolean | True/False |
| `object` | Python objects | Any Python object |
| `str_` | String | Text data |

**Specifying dtype:**

```python
# During array creation
a = np.array([1, 2, 3], dtype=np.float32)
b = np.zeros((3, 3), dtype=np.int64)
c = np.ones(5, dtype=np.complex128)

# Converting dtype
d = np.array([1, 2, 3], dtype=np.int32)
e = d.astype(np.float64)  # Convert to float
print(e.dtype)  # float64
```

### itemsize - Size in Bytes

The `itemsize` attribute is the size in bytes of each element in the array.

```python
# Itemsize depends on dtype
a = np.array([1, 2, 3], dtype=np.int32)
print(a.itemsize)  # 4 (32 bits / 8)

b = np.array([1.0, 2.0, 3.0], dtype=np.float64)
print(b.itemsize)  # 8 (64 bits / 8)

c = np.array([1+2j], dtype=np.complex128)
print(c.itemsize)  # 16 (128 bits / 8)

# Itemsize equals dtype.itemsize
print(a.itemsize == a.dtype.itemsize)  # True
```

### data - Memory Buffer

The `data` attribute is a buffer containing the actual elements. You usually won't access this directly, but it's useful to know it exists.

```python
a = np.array([1, 2, 3, 4, 5])
print(a.data)  # <memory at 0x...>
```

## Checking Attributes

### Quick Summary with Multiple Attributes

Here's a practical example showing all key attributes:

```python
import numpy as np

# Create various arrays
arr_1d = np.array([1, 2, 3, 4, 5])
arr_2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
arr_float = np.array([1.1, 2.2, 3.3], dtype=np.float32)

# Display attributes
for name, arr in [("1D", arr_1d), ("2D", arr_2d), ("Float32", arr_float)]:
    print(f"\n{name} Array:")
    print(f"  ndim: {arr.ndim}")
    print(f"  shape: {arr.shape}")
    print(f"  size: {arr.size}")
    print(f"  dtype: {arr.dtype}")
    print(f"  itemsize: {arr.itemsize} bytes")
```

Output:
```
1D Array:
  ndim: 1
  shape: (5,)
  size: 5
  dtype: int64
  itemsize: 8 bytes

2D Array:
  ndim: 2
  shape: (3, 3)
  size: 9
  dtype: int64
  itemsize: 8 bytes

Float32 Array:
  ndim: 1
  shape: (3,)
  size: 3
  dtype: float32
  itemsize: 4 bytes
```

## Practical Example: Understanding Array Structure

```python
# Create a 3D array
data = np.zeros((2, 3, 4), dtype=np.float64)

print("Array Structure:")
print(f"Number of dimensions: {data.ndim}")
print(f"Shape: {data.shape} → 2 tables, 3 rows, 4 columns each")
print(f"Total elements: {data.size}")
print(f"Data type: {data.dtype}")
print(f"Size per element: {data.itemsize} bytes")
print(f"Total memory: {data.size * data.itemsize} bytes")
```

## Attributes for Different Purposes

### For Memory Understanding
- `itemsize`: Bytes per element
- `size`: Total elements
- Calculate total memory: `size * itemsize`

### For Array Manipulation
- `shape`: Understanding dimensions for reshaping
- `ndim`: Number of loops needed for iteration
- `dtype`: Ensuring compatible operations

### For Data Type Verification
- `dtype`: Check if array is integer, float, etc.
- `dtype.name`: Get string name of type

```python
# Verify data types
a = np.array([1, 2, 3])
print(a.dtype.name)  # 'int64'

b = np.array([1.0, 2.0, 3.0])
print(b.dtype.name)  # 'float64'

# Check properties
print(np.issubdtype(a.dtype, np.integer))  # True
print(np.issubdtype(b.dtype, np.floating))  # True
```

## Key Takeaways

1. **ndim**: Number of axes (1D, 2D, 3D, etc.)
2. **shape**: Dimensions as a tuple (rows, cols, etc.)
3. **size**: Total number of elements
4. **dtype**: Data type of elements (int, float, etc.)
5. **itemsize**: Memory size per element in bytes

These attributes help you understand and manipulate arrays effectively.

## Next Steps

- [Creating Arrays](../02-quickstart/array-creation.md) - Learn more creation methods
- [Basic Operations](../02-quickstart/operations.md) - Perform array operations
