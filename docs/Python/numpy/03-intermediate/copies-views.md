---
layout: default
title: Copies and Views
parent: 03 - Intermediate
grand_parent: NumPy
nav_order: 2
---

# Copies and Views

Understanding memory management in NumPy.

## What's the Difference?

**View** - reference to original data
- Changes affect original array
- Faster, uses less memory
- Created by slicing and reshaping

**Copy** - independent data
- Changes don't affect original
- Slower, uses more memory
- Created explicitly with `.copy()`

## Creating Views

**Slicing always creates a view:**
```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
b = a[1:4]       # view of elements 1-3
b[0] = 99
print(a)         # [1, 99, 3, 4, 5] - changed!
```

**Reshaping creates a view (when possible):**
```python
a = np.arange(12)
b = a.reshape(3, 4)  # view
b[0, 0] = 99
print(a[0])      # 99 - original changed
```

## Creating Copies

**Use .copy() for independent data:**
```python
a = np.array([1, 2, 3, 4, 5])
b = a[1:4].copy()  # copy
b[0] = 99
print(a)           # [1, 2, 3, 4, 5] - unchanged
```

**Advanced indexing always creates a copy:**
```python
a = np.arange(9).reshape(3, 3)
b = a[[0, 2]]      # fancy indexing - copy
b[0, 0] = 99
print(a[0, 0])     # still original value
```

## Checking View vs Copy

**Use the .base attribute:**
```python
a = np.arange(9)

# View
b = a[1:5]
print(b.base is a)        # True - b is a view

# Copy
c = a[1:5].copy()
print(c.base is None)     # True - c is independent
```

## flatten() vs ravel()

**ravel() - view**
```python
a = np.array([[1, 2], [3, 4]])
b = a.ravel()
b[0] = 99
print(a[0, 0])   # 99 - original changed
```

**flatten() - copy**
```python
c = a.flatten()
c[0] = 99
print(a[0, 0])   # still original value
```

## When to Use Each

Use **views** when:
- Memory is a concern
- Speed is important
- You're doing temporary operations
- Reading data (won't modify)

Use **copies** when:
- You need independent data
- Changes shouldn't affect original
- Sharing data with external code
- Safety is priority over speed

## Performance Impact

```python
import time

# Large array
a = np.arange(1000000)

# View is instant
start = time.time()
b = a[::2]
print(f"View: {time.time() - start:.6f}s")

# Copy takes time
start = time.time()
c = a[::2].copy()
print(f"Copy: {time.time() - start:.6f}s")
# Copy is typically 10-100x slower
```

## Key Takeaways

- Slicing creates views (link to original)
- `.copy()` creates independent arrays
- Check `.base` attribute to verify
- Views are faster and more memory-efficient
- Use copies when you need safety
- Advanced indexing always creates copies

---

**Next:** [Stacking and Splitting](stacking-splitting.md)
