---
layout: default
title: Shape Manipulation
parent: 03 - Intermediate
grand_parent: NumPy
nav_order: 1
---

# Shape Manipulation

Change array structure without changing data.

## Reshaping Arrays

```python
import numpy as np

a = np.arange(12)
b = a.reshape(3, 4)  # returns reshaped array
print(b.shape)       # (3, 4)

# Use -1 to auto-calculate dimension
c = a.reshape(2, -1)  # -1 means "calculate this"
print(c.shape)        # (2, 6)
```

## Flattening Arrays

**flatten()** - creates a copy
```python
a = np.array([[1, 2, 3], [4, 5, 6]])
b = a.flatten()  # new array
a[0, 0] = 99
print(b[0, 0])   # still 1 (independent copy)
```

**ravel()** - creates a view (faster)
```python
c = a.ravel()    # view of original
a[0, 0] = 99
print(c[0, 0])   # now 99 (same data)
```

## Transposing

```python
a = np.array([[1, 2, 3], [4, 5, 6]])
print(a.T)         # transpose using .T
print(a.transpose())  # same as .T

# For higher dimensions, specify axis order
b = np.ones((2, 3, 4))
c = b.transpose(2, 0, 1)  # new shape: (4, 2, 3)
```

## Expanding Dimensions

**newaxis** adds dimension of size 1
```python
a = np.array([1, 2, 3])
print(a.shape)           # (3,)

b = a[:, np.newaxis]     # add column dimension
print(b.shape)           # (3, 1)

c = a[np.newaxis, :]     # add row dimension
print(c.shape)           # (1, 3)
```

**expand_dims()**
```python
a = np.array([1, 2, 3])
b = np.expand_dims(a, axis=0)  # (1, 3)
c = np.expand_dims(a, axis=1)  # (3, 1)
```

## Stacking Arrays

**vstack** - stack vertically (row-wise)
```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6]])
c = np.vstack((a, b))
# [[1 2]
#  [3 4]
#  [5 6]]
```

**hstack** - stack horizontally (column-wise)
```python
d = np.hstack((a, b.T))
# [[1 2 5]
#  [3 4 6]]
```

## Splitting Arrays

**hsplit** - split horizontally
```python
a = np.arange(12).reshape(2, 6)
result = np.hsplit(a, 3)  # split into 3 equal parts
```

**vsplit** - split vertically
```python
b = np.arange(12).reshape(4, 3)
result = np.vsplit(b, 2)  # split into 2 equal parts
```

## Key Takeaways

- `reshape()`: change shape, returns view when possible
- `ravel()`: flatten to 1D view (fast)
- `flatten()`: flatten to 1D copy (safe but slower)
- `.T`: transpose (adds dimensions)
- `newaxis`: expand dimensions
- Stack/Split: combine or separate arrays

---

**Next:** [Copies and Views](copies-views.md)
