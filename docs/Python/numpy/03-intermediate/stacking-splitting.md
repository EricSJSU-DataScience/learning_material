---
layout: default
title: Stacking and Splitting
parent: 03 - Intermediate
grand_parent: NumPy
nav_order: 3
---

# Stacking and Splitting Arrays

Combine and separate arrays efficiently.

## Stacking Arrays

### vstack() - Vertical Stack

Stack arrays row-wise (increases rows):

```python
import numpy as np

a = np.array([[1, 2, 3]])
b = np.array([[4, 5, 6]])
c = np.vstack((a, b))
# [[1 2 3]
#  [4 5 6]]
```

### hstack() - Horizontal Stack

Stack arrays column-wise (increases columns):

```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])
c = np.hstack((a, b))
# [[1 2 5 6]
#  [3 4 7 8]]
```

### column_stack()

Stack 1D arrays as columns:

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = np.column_stack((a, b))
# [[1 4]
#  [2 5]
#  [3 6]]
```

### concatenate()

General concatenation along axis:

```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# Along rows (axis=0)
c = np.concatenate((a, b), axis=0)

# Along columns (axis=1)
d = np.concatenate((a, b), axis=1)
```

### stack()

Stack arrays along new axis:

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = np.stack((a, b), axis=0)
# [[1 2 3]
#  [4 5 6]]
```

## Splitting Arrays

### hsplit() - Horizontal Split

Split array into multiple arrays (column-wise):

```python
a = np.arange(12).reshape(2, 6)
# Split into 3 equal parts
result = np.hsplit(a, 3)
# Returns list of 3 arrays with shape (2, 2)

# Split at specific columns
result = np.hsplit(a, (2, 4))  # Split after cols 2 and 4
```

### vsplit() - Vertical Split

Split array into multiple arrays (row-wise):

```python
a = np.arange(12).reshape(4, 3)
# Split into 2 equal parts
result = np.vsplit(a, 2)
# Returns list of 2 arrays with shape (2, 3)
```

### array_split()

Split along specified axis:

```python
a = np.arange(12).reshape(3, 4)

# Split along axis 1 (columns)
result = np.array_split(a, 2, axis=1)
# 2 arrays with shape (3, 2)
```

## Practical Examples

### Combining datasets

```python
# Combine measurements from different days
day1 = np.array([20, 22, 19, 23])
day2 = np.array([21, 23, 20, 24])
day3 = np.array([22, 24, 21, 25])

# Stack into 3x4 array
all_data = np.vstack((day1, day2, day3))
print(all_data.shape)  # (3, 4)
```

### Separating data

```python
# RGB image data
img = np.random.randint(0, 256, (100, 100, 3))
r, g, b = np.split(img, 3, axis=2)
print(r.shape)  # (100, 100, 1)
```

### Batch processing

```python
# Split large array into batches
data = np.arange(1000)
batch_size = 100
batches = np.array_split(data, len(data) // batch_size)
for batch in batches:
    print(len(batch))  # Process each batch
```

## Comparison Table

| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `vstack` | Stack row-wise | List of arrays | Single array |
| `hstack` | Stack column-wise | List of arrays | Single array |
| `stack` | Stack on new axis | List of arrays | Single array |
| `hsplit` | Split columns | Single array, num/indices | List of arrays |
| `vsplit` | Split rows | Single array, num/indices | List of arrays |

## Key Takeaways

- **vstack/hstack**: Stack multiple arrays
- **concatenate**: Most flexible stacking
- **hsplit/vsplit**: Split along specific axis
- Stacking increases dimensions
- Splitting decreases dimensions
- Use for data preparation and batch processing

---

**Next:** [Advanced Topics](../04-advanced/index.md)
