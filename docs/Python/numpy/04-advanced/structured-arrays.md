---
layout: default
title: Structured Arrays
parent: 04 - Advanced
grand_parent: NumPy
nav_order: 4
---

# Structured Arrays

Work with heterogeneous data using fields and record arrays.

## What are Structured Arrays?

Structured arrays (also called record arrays) allow you to store data with different types in a single array, with named fields like a database table or dictionary.

```python
import numpy as np

# Define structured type with fields
dtype = [('name', 'U10'), ('age', int), ('height', float)]

# Create structured array
people = np.array([
    ('Alice', 25, 5.8),
    ('Bob', 30, 6.1),
    ('Charlie', 28, 5.9)
], dtype=dtype)

print(people['name'])   # ['Alice' 'Bob' 'Charlie']
print(people['age'])    # [25 30 28]
```

## Defining Structured Dtypes

### Using List of Tuples

```python
# Each tuple: (field_name, dtype)
dtype = [
    ('name', 'U10'),
    ('age', int),
    ('score', float),
    ('pass', bool)
]

arr = np.array([
    ('Alice', 25, 95.5, True),
    ('Bob', 30, 87.2, True),
    ('Charlie', 22, 60.0, False)
], dtype=dtype)
```

### Using Dictionary

```python
dtype = {
    'names': ['name', 'age', 'score'],
    'formats': ['U10', int, float]
}

arr = np.array([
    ('Alice', 25, 95.5),
    ('Bob', 30, 87.2)
], dtype=dtype)
```

### Complex Example

```python
# Mixed types with different sizes
dtype = [
    ('id', '<i4'),           # 32-bit int
    ('name', 'U30'),         # Unicode string
    ('weight', '<f4'),       # 32-bit float
    ('active', bool),        # Boolean
    ('data', '<f8', (3,))    # 3-element float array
]

sample = np.array([
    (1, 'Alice', 65.5, True, [1.0, 2.0, 3.0]),
    (2, 'Bob', 72.0, False, [4.0, 5.0, 6.0])
], dtype=dtype)
```

## Accessing Field Data

### By Field Name

```python
dtype = [('name', 'U10'), ('age', int), ('score', float)]
data = np.array([
    ('Alice', 25, 95.5),
    ('Bob', 30, 87.2),
    ('Charlie', 22, 60.0)
], dtype=dtype)

# Access single field
names = data['name']   # ['Alice' 'Bob' 'Charlie']
ages = data['age']     # [25 30 22]

# Access single record
first = data[0]        # ('Alice', 25, 95.5)
print(first['name'])   # 'Alice'
```

### Multiple Fields

```python
# Extract multiple fields
subset = data[['name', 'score']]
print(subset.dtype.names)  # ('name', 'score')
```

## Creating from Existing Data

### From Python Lists

```python
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 22]
scores = [95.5, 87.2, 60.0]

# Stack columns
dtype = [('name', 'U10'), ('age', int), ('score', float)]
data = np.array(list(zip(names, ages, scores)), dtype=dtype)
```

### Using rec.array()

```python
# Simpler syntax for record arrays
data = np.rec.array([
    (1, 'Alice', 95.5),
    (2, 'Bob', 87.2),
    (3, 'Charlie', 60.0)
], dtype=[('id', int), ('name', 'U10'), ('score', float)])

# Access fields as attributes
print(data.id)    # [1 2 3]
print(data.name)  # ['Alice' 'Bob' 'Charlie']
```

## Filtering Structured Arrays

### Boolean Indexing

```python
dtype = [('name', 'U10'), ('age', int), ('score', float)]
data = np.array([
    ('Alice', 25, 95.5),
    ('Bob', 30, 87.2),
    ('Charlie', 22, 60.0)
], dtype=dtype)

# Filter by condition
mask = data['score'] > 80
high_scores = data[mask]
# [('Alice', 25, 95.5) ('Bob', 30, 87.2)]

# Filter by multiple conditions
mask = (data['age'] > 23) & (data['score'] > 85)
filtered = data[mask]
```

### Sorting

```python
# Sort by age
sorted_by_age = np.sort(data, order='age')

# Sort by multiple fields
sorted_data = np.sort(data, order=['score', 'name'])

# Reverse sort
sorted_desc = data[np.argsort(data['score'])[::-1]]
```

## Practical Examples

### Database-like Operations

```python
# Store employee records
employees = np.array([
    (1, 'Alice', 'Engineering', 120000),
    (2, 'Bob', 'Sales', 95000),
    (3, 'Charlie', 'Engineering', 115000),
    (4, 'Diana', 'HR', 90000)
], dtype=[('id', int), ('name', 'U20'), ('dept', 'U20'), ('salary', int)])

# Filter by department
eng = employees[employees['dept'] == 'Engineering']
print(eng['name'])  # ['Alice' 'Charlie']

# Find highest salary
highest_paid = employees[np.argsort(employees['salary'])[-1]]
print(highest_paid['name'], highest_paid['salary'])
# Diana 120000

# Calculate average salary by department
for dept in np.unique(employees['dept']):
    mask = employees['dept'] == dept
    avg = employees['salary'][mask].mean()
    print(f"{dept}: {avg:.2f}")
```

### Time Series Data

```python
# Store time series with multiple channels
dtype = [
    ('timestamp', 'U19'),
    ('sensor1', float),
    ('sensor2', float),
    ('sensor3', float)
]

measurements = np.array([
    ('2024-01-01 10:00:00', 20.5, 65.3, 1013.25),
    ('2024-01-01 10:01:00', 20.6, 65.1, 1013.30),
    ('2024-01-01 10:02:00', 20.7, 64.9, 1013.28)
], dtype=dtype)

# Extract single sensor data
sensor1_data = measurements['sensor1']
# [20.5 20.6 20.7]
```

### Mixed Measurement Data

```python
# Different measurement types
dtype = [
    ('location', 'U20'),
    ('temperature', float),
    ('humidity', float),
    ('quality_index', int)
]

data = np.array([
    ('Room A', 22.5, 45.3, 85),
    ('Room B', 21.8, 48.1, 92),
    ('Room C', 23.1, 42.7, 88)
], dtype=dtype)

# Filter by condition
good_quality = data[data['quality_index'] > 87]
```

## Operations on Structured Arrays

### Calculations on Fields

```python
dtype = [('x', float), ('y', float), ('z', float)]
points = np.array([
    (1.0, 2.0, 3.0),
    (4.0, 5.0, 6.0)
], dtype=dtype)

# Calculate distance from origin
distances = np.sqrt(
    points['x']**2 + points['y']**2 + points['z']**2
)
```

### Adding/Removing Fields

```python
# Create base array
data = np.array([
    ('Alice', 95.5),
    ('Bob', 87.2)
], dtype=[('name', 'U10'), ('score', float)])

# Add new field
new_dtype = [('name', 'U10'), ('score', float), ('grade', 'U1')]
new_data = np.zeros(len(data), dtype=new_dtype)

# Copy old fields
new_data['name'] = data['name']
new_data['score'] = data['score']

# Assign grades
new_data['grade'] = np.where(data['score'] >= 90, 'A', 'B')
```

## Viewing Structured Data

```python
# Nice formatting
import numpy as np

data = np.array([
    (1, 'Alice', 95.5),
    (2, 'Bob', 87.2)
], dtype=[('id', int), ('name', 'U10'), ('score', float)])

# Print nicely
np.set_printoptions(suppress=True)
print(data)

# Convert to string for display
print('\n'.join([str(row) for row in data]))
```

## Key Takeaways

- Structured arrays store heterogeneous data with named fields
- Define dtype using list of tuples or dictionary
- Access fields by name using bracket notation
- Perfect for database-like operations
- Supports filtering, sorting, and calculations
- More efficient than Python lists of dictionaries
- Can store complex nested data structures

---

**Next:** [Universal Functions (ufuncs)](ufuncs.md)
