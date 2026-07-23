---
layout: default
title: Data Types
parent: 04 - Advanced
grand_parent: NumPy
nav_order: 3
---

# Data Types in NumPy

Understanding NumPy's type system and type conversion.

## NumPy Data Types

NumPy supports many data types for numerical and other data.

### Common Numeric Types

```python
import numpy as np

# Integers
int8, int16, int32, int64      # Signed integers
uint8, uint16, uint32, uint64  # Unsigned integers

# Floats
float16, float32, float64      # Floating point (half, single, double)

# Complex
complex64, complex128           # Complex numbers

# Boolean
bool_                          # Boolean (True/False)

# Others
object                         # Python objects
string_, unicode_              # Strings
```

## Creating Arrays with Specific Types

```python
import numpy as np

# Specify dtype at creation
a = np.array([1, 2, 3], dtype=np.float32)
b = np.array([1, 2, 3], dtype=np.int8)
c = np.array([1+2j, 3+4j], dtype=np.complex128)

# Using string shortcuts
d = np.array([1, 2, 3], dtype='f4')   # float32
e = np.array([1, 2, 3], dtype='i2')   # int16
f = np.array([True, False], dtype='b') # bool
```

## Type Information

```python
a = np.array([1.5, 2.5, 3.5])

# Get dtype
print(a.dtype)           # float64
print(a.dtype.name)      # 'float64'
print(a.dtype.itemsize)  # bytes per element (8)

# Check type
print(a.dtype == np.float64)  # True
```

## Type Casting

### astype() - Convert Array Type

```python
a = np.array([1.5, 2.5, 3.5])

# Convert to integer (truncates)
b = a.astype(np.int32)  # [1 2 3]
c = a.astype('int64')   # [1 2 3] as int64

# Convert to boolean
d = a.astype(bool)      # [True True True]

# astype() always creates a copy
print(b.base is None)   # True
```

### Automatic Type Promotion

NumPy automatically promotes types when mixing different types:

```python
a = np.array([1, 2, 3], dtype=np.int32)
b = np.array([1.5, 2.5], dtype=np.float64)

# Result is float64 (higher precision)
c = a[0] + b[0]  # 2.5 (float64)

# Array operation
d = np.array([1, 2], dtype=np.int32)
result = d + 1.5  # float64 array
```

## Type Promotion Order

When combining types, NumPy follows this hierarchy (simplified):

```
bool → int8 → int16 → int32 → int64 → 
float16 → float32 → float64 → complex64 → complex128
```

More specific data type takes precedence.

## String and Object Types

```python
# String arrays
names = np.array(['Alice', 'Bob', 'Charlie'])
print(names.dtype)  # <U7 (Unicode string, max 7 chars)

# Fixed-length strings
data = np.array(['A', 'B', 'C'], dtype='U1')

# Object arrays (can hold anything)
mixed = np.array([1, 'hello', 3.14], dtype=object)
print(mixed)  # [1 'hello' 3.14]
```

## Byte Order

```python
# Byte order for integer types
a = np.array([1, 256], dtype=np.int32)

# Check byte order
print(a.dtype.byteorder)  # '<' (little-endian) or '>' (big-endian)

# Byte-swap
b = a.byteswap()
```

## Complex Numbers

```python
# Creating complex arrays
a = np.array([1+2j, 3+4j])
print(a.dtype)  # complex128

# Accessing real and imaginary parts
print(a.real)  # [1 3]
print(a.imag)  # [2 4]

# Complex conjugate
print(a.conj())  # [1-2j 3-4j]

# Magnitude and phase
print(np.abs(a))      # Magnitude
print(np.angle(a))    # Phase angle
```

## Type Safety and Precision

### Integer Overflow

```python
a = np.array([255], dtype=np.uint8)
a += 1
print(a)  # [0] - overflow wraps around!

# Prevent overflow - use larger dtype
b = np.array([255], dtype=np.int32)
b += 1
print(b)  # [256] - no overflow
```

### Floating-Point Precision

```python
# float32 vs float64
a = np.array([0.1, 0.2, 0.3], dtype=np.float32)
b = np.array([0.1, 0.2, 0.3], dtype=np.float64)

print(a.sum())  # 0.60000002384185791
print(b.sum())  # 0.59999999999999998
```

## Finding Dtype

```python
data = [1, 2, 3]

# NumPy will choose a dtype
arr = np.array(data)
print(arr.dtype)  # int64 (or int32 depending on platform)

# Mixed data defaults to object
mixed = [1, 'a', 3.14]
arr = np.array(mixed)
print(arr.dtype)  # object
```

## Converting Between Types

### Common Conversions

```python
# Integer to float
a = np.array([1, 2, 3], dtype=np.int32)
b = a.astype(np.float64)

# Float to int (truncates decimals)
c = np.array([1.5, 2.9, 3.1], dtype=np.float64)
d = c.astype(np.int32)  # [1 2 3]

# To boolean
e = np.array([1, 0, 2, 0])
f = e.astype(bool)  # [True False True False]

# To string
g = np.array([1, 2, 3])
h = g.astype(str)  # ['1' '2' '3']
```

## Performance Impact

Different dtypes have performance implications:

```python
import time

# float32 is faster but less precise
a = np.random.randn(10000000).astype(np.float32)
start = time.time()
_ = np.sum(a)
print(f"float32: {time.time() - start:.6f}s")

# float64 is more precise but slightly slower
b = np.random.randn(10000000).astype(np.float64)
start = time.time()
_ = np.sum(b)
print(f"float64: {time.time() - start:.6f}s")
```

## Key Takeaways

- NumPy supports many data types (int, float, complex, bool, object)
- Specify dtype at array creation for control
- Type promotion happens automatically when mixing types
- Use `astype()` to convert array types
- Different types have different memory and speed trade-offs
- Be aware of integer overflow and floating-point precision
- Object dtype is slower but most flexible

---

**Next:** [Structured Arrays](structured-arrays.md)

